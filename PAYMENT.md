# MeowReel · Paiement (Stripe + Apple Pay + Google Pay)

---

## Pourquoi Stripe Checkout (hosted)

- **Apple Pay + Google Pay natifs** : Stripe détecte le device et affiche automatiquement le bouton approprié. Zéro intégration séparée.
- **0 PCI compliance** : l'user saisit sa carte sur les serveurs Stripe, pas les nôtres.
- **Mobile UX parfaite** : Stripe a mieux optimisé le mobile que ce qu'on ferait en 2 semaines.
- **Multi-currency ready** : basculer sur USD, GBP, etc. = 1 config.
- **Multilingue** : Stripe Checkout est traduit en 30+ langues, détecte locale auto.
- **Fraud protection** (Radar) inclus.

**Trade-off accepté :** léger redirect Stripe → nous (vs checkout embedded). Impact conversion minimal (<2%), gain en time-to-market énorme.

---

## Flow technique

### Étape 1 — Créer la session

```typescript
// apps/web/app/api/checkout/route.ts

import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { Order } from '@/lib/db/models/order';
import { connectDb } from '@/lib/db';
import { generateShortId } from '@/lib/utils';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-04-30.basil' });

const PRICING = {
  single: { cents: 99, count: 1, label: 'Solo · 1 scène' },
  trio:   { cents: 249, count: 3, label: 'Trio · 3 scènes' },
  ten:    { cents: 699, count: 10, label: 'Casting Call · 10 scènes' },
} as const;

export async function POST(req: NextRequest) {
  await connectDb();
  const body = await req.json();
  const { draftOrderId, bundle = 'single', removeWatermark = false, locale = 'fr' } = body;

  // Validation
  if (!PRICING[bundle as keyof typeof PRICING]) {
    return NextResponse.json({ error: 'Invalid bundle' }, { status: 400 });
  }

  const bundleConfig = PRICING[bundle as keyof typeof PRICING];
  const extraCents = removeWatermark && bundle !== 'single' ? 50 : 0;
  const amount = bundleConfig.cents + extraCents;

  // Générer le shortId et l'order
  const shortId = generateShortId();
  const order = await Order.findByIdAndUpdate(
    draftOrderId,
    {
      $set: {
        shortId,
        status: 'awaiting_payment',
        bundle,
        unitCount: bundleConfig.count,
        amountCents: amount,
        locale,
      },
    },
    { new: true }
  );

  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  // Créer la session Stripe
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    locale: locale as any,  // Stripe supporte 'fr', 'en', 'es', etc.
    payment_method_types: ['card'],  // Apple/Google Pay sont auto via 'card'
    line_items: [
      {
        price_data: {
          currency: 'eur',
          unit_amount: amount,
          product_data: {
            name: bundleConfig.label,
            description: `MeowReel · Screen test pour ${order.scene.categorySlug}`,
            images: [order.photo.originalUrl],
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/producing/${order._id}?session={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}?cancelled=1`,
    metadata: {
      orderId: order._id.toString(),
      shortId,
      categorySlug: order.scene.categorySlug,
      bundle,
      removeWatermark: removeWatermark ? '1' : '0',
    },
    customer_creation: 'if_required',
    billing_address_collection: 'auto',
    allow_promotion_codes: false,  // V2 uniquement
    expires_at: Math.floor(Date.now() / 1000) + 30 * 60,  // 30 min
  });

  // Sauvegarde de la session ID
  await Order.findByIdAndUpdate(order._id, {
    $set: { 'stripe.sessionId': session.id },
  });

  return NextResponse.json({ url: session.url });
}
```

### Étape 2 — Webhook Stripe (paiement confirmé)

```typescript
// apps/web/app/api/webhooks/stripe/route.ts

import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { Order } from '@/lib/db/models/order';
import { connectDb } from '@/lib/db';
import { videoQueue } from '@/lib/queue';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-04-30.basil' });
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  await connectDb();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;
      if (!orderId) break;

      const order = await Order.findByIdAndUpdate(
        orderId,
        {
          $set: {
            status: 'paid',
            'stripe.paymentIntentId': session.payment_intent as string,
            'stripe.customerEmail': session.customer_details?.email || session.customer_email,
            'stripe.paidAt': new Date(),
          },
        },
        { new: true }
      );

      if (order) {
        // Enqueue video generation
        for (let i = 0; i < order.unitCount; i++) {
          await videoQueue.add('generate', { orderId: order._id.toString(), index: i });
        }
        console.log(`Order ${order.shortId} paid, ${order.unitCount} videos queued`);
      }
      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;
      if (orderId) {
        await Order.findByIdAndUpdate(orderId, {
          $set: { status: 'draft' },
        });
      }
      break;
    }

    case 'charge.refunded': {
      // Handle refunds - optional, log for now
      console.log('Refund received:', event.data.object);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
```

### Étape 3 — Success page (producing)

`/[locale]/producing/[orderId]` affiche le loading et polls pour le status.

```typescript
// apps/web/app/[locale]/producing/[orderId]/page.tsx
// Server component qui render la page, client component qui poll
```

---

## Configuration Stripe Dashboard

### À faire côté dashboard

1. **Activer Apple Pay** : Settings > Payments > Apple Pay > Add domain (meowreel.com)
2. **Activer Google Pay** : automatique une fois Apple Pay activé
3. **Activer Link** : oui, Stripe Link c'est 1-click pour les repeat buyers
4. **Configurer Radar** : règles de fraud par défaut OK, ajuster si nécessaire
5. **Créer Webhook endpoint** : `https://meowreel.com/api/webhooks/stripe`
   - Événements : `checkout.session.completed`, `checkout.session.expired`, `charge.refunded`
6. **Configurer Tax** (si applicable V2) : Stripe Tax gère TVA UE auto
7. **Récupérer clés** : publishable + secret + webhook signing secret dans `.env`

### Domaine Apple Pay — critique

Pour qu'Apple Pay fonctionne en prod :
1. Dashboard Stripe → Payments → Apple Pay → "Add new domain"
2. Stripe te donne un fichier à hoster : `.well-known/apple-developer-merchantid-domain-association`
3. Upload dans Next.js public folder
4. Stripe valide (< 5 min)
5. Apple Pay apparaît dans le checkout sur iOS/Safari

**En dev** : Apple Pay fonctionne pas sur localhost. Utiliser ngrok ou Cloudflare Tunnel pour tester en HTTPS.

---

## Gestion des devises

### V1 : EUR uniquement

- Tout le monde paye en EUR
- Stripe convertit auto depuis la devise de la carte du user (léger forex spread, invisible pour eux)

### V2 : multi-devise native

Stripe supporte native multi-currency. On ajouterait :

```typescript
const PRICING_BY_CURRENCY = {
  EUR: { single: 99, trio: 249, ten: 699 },
  USD: { single: 99, trio: 279, ten: 799 },  // prix locaux, pas conversion
  GBP: { single: 89, trio: 229, ten: 629 },
};
```

Détection locale via IP ou Accept-Language, puis on passe la bonne currency à Stripe.

---

## Fraud & abuse

### Risques

- Chargebacks après livraison de la vidéo
- Testeurs qui abusent du preview gratuit
- Cartes volées

### Mitigation V1

- **Stripe Radar** par défaut (gère 90% du cas commun)
- **Rate limiting** côté app : max 5 checkouts / IP / heure
- **Preview gratuit** rate-limité : 3 / IP / heure
- **CGV claires** sur non-remboursable après livraison (produit numérique consommé)
- **Pas de refund auto** : tout en review humain si plainte

### Chargeback policy

Si chargeback arrive :
1. Stripe notifie
2. On répond avec : log de livraison, IP de l'achat, download logs, email preuve, CGV
3. Taux de réussite sur produits numériques délivrés : ~60-70%
4. Si on perd : 15€ de fee Stripe + le remboursement + la vidéo déjà livrée = ~25€ de perte
5. Si le taux de chargeback dépasse 1% : Stripe nous met en warning → il faut alors revoir (verif email, ID vérifié, etc.)

---

## Multi-quantité = multi-génération

Un "trio" = 3 vidéos. Deux approches :

### Approche V1 : sélection des 3 catégories AU MOMENT du checkout

User upload photo → choisit 3 catégories différentes (checkbox sur les cards) → payes → on génère les 3 d'un coup.

### Approche alternative : crédit

User achète 3 "takes" → a un code qui lui donne 3 générations à utiliser dans les 7 jours sur n'importe quelles catégories.

**Choix V1 : Approche 1.** Plus simple, pas de gestion de crédit, meilleur UX immédiat.

---

## Testing en développement

### Cartes de test Stripe

| Scénario | Numéro |
|---|---|
| Paiement réussi | 4242 4242 4242 4242 |
| Paiement décliné | 4000 0000 0000 9995 |
| 3DS required | 4000 0025 0000 3155 |
| Insufficient funds | 4000 0000 0000 9995 |

CVC : n'importe quoi (3 chiffres). Exp : date future quelconque. ZIP : code postal valide.

### Webhook local testing

```bash
# Installer Stripe CLI
brew install stripe/stripe-cli/stripe  # macOS
# Ou télécharger : https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward webhooks to local
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# Copier le webhook signing secret affiché dans .env.local

# Trigger test events
stripe trigger checkout.session.completed
```

---

## Metrics paiement à surveiller

- **Conversion checkout** : sessions créées → paid (target 60-75% hosted)
- **Apple Pay usage rate** : % de paiements en Apple Pay (indicateur UX mobile)
- **Average time to pay** : du clic "Action" au paid webhook (target < 45s)
- **Taux de refund** : target < 2%
- **Taux de chargeback** : target < 0.5% (au-delà de 1% = problème Stripe)

---

## Checklist launch paiement

- [ ] Clés Stripe prod configurées dans `.env.production`
- [ ] Webhook endpoint déclaré sur dashboard Stripe
- [ ] Apple Pay domain validé (file uploaded + Stripe verify OK)
- [ ] Test bout-en-bout sur iPhone réel avec vraie carte (ou test mode)
- [ ] Radar activé avec règles defaut
- [ ] Email de receipt Stripe customisé (branding MeowReel)
- [ ] CGV linkées depuis le checkout
- [ ] Test mode OFF sur prod (important, sinon rien ne se passe)
- [ ] Alertes Sentry sur webhook failures
- [ ] Logs de tous les events Stripe dans MongoDB (audit trail)
