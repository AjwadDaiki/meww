# CLAUDE.md — Instructions pour Claude Code

> Ce fichier est l'input principal pour Claude Code. Lire en premier avant tout travail sur ce repo.

---

## Contexte du projet

**MeowReel** = plateforme impulse-buy de génération de vidéos IA de chats à 0,99€.

Stack retenue :
- Next.js 15 App Router + TypeScript
- Tailwind CSS v4
- MongoDB (self-hosted via Docker) + Mongoose
- Redis + BullMQ pour la queue
- Stripe Checkout (Apple Pay + Google Pay)
- Replicate API (Seedance 2.0 Fast + Wan 2.2 I2V fallback)
- MailerLite pour emails
- VPS local disk pour stockage assets (signed URLs, zero cloud storage V1)
- next-intl pour i18n (FR / EN / ES)
- Docker Compose pour déploiement VPS

---

## Documents à lire avant de coder

Dans l'ordre :

1. `README.md` — overview & objectifs
2. `ARCHITECTURE.md` — stack, structure, flow
3. `DATABASE.md` — schémas MongoDB (source of truth)
4. `FEATURES.md` — specs détaillées des flows
5. `DESIGN.md` — DA complète (autorité finale sur le visuel, remplace BRAND.md)
6. `PAYMENT.md` — intégration Stripe
7. `GENERATION.md` — pipeline Replicate
8. `I18N.md` — stratégie multi-langue
9. `UX-CONVERSION.md` — règles UX à respecter absolument
10. `CATEGORIES.md` — catalog des scènes

---

## Style de code

### TypeScript

- **`strict: true`** dans tsconfig, pas de `any` sauf justifié par commentaire
- **Types explicites** sur les paramètres de fonctions publiques
- **Pas d'enums**, préférer des `const` objects avec `as const` + union types
- **Pas de `class`** sauf pour Mongoose models ou erreurs custom
- **Zod** pour toute validation d'entrée (API routes, form data)

### Imports

```typescript
// 1. External
import { NextRequest } from 'next/server';
import Stripe from 'stripe';

// 2. Internal absolute (@/*)
import { Order } from '@/lib/db/models/order';
import { connectDb } from '@/lib/db';

// 3. Relative
import { formatPrice } from './utils';
```

### Naming

- **camelCase** pour variables et fonctions
- **PascalCase** pour composants React, types, classes
- **UPPER_SNAKE_CASE** pour constantes globales
- **kebab-case** pour fichiers (ex: `category-card.tsx`)
- Fichiers de composants : 1 composant par fichier principal

### Composants React

- **Function components uniquement**, pas de class
- **Server Components par défaut** (App Router). Passer en `'use client'` seulement si nécessaire (state, listeners, browser APIs)
- **Props typées explicitement** avec interface ou type
- **Pas de default export sauf pages Next.js** (contrainte framework), sinon named exports

Exemple :

```tsx
// ✅ Server component par défaut
export function CategoryCard({ category, locale }: CategoryCardProps) {
  return <article>...</article>;
}

// ✅ Client component marqué
'use client';
export function UploadDropzone({ onUpload }: UploadDropzoneProps) {
  const [dragging, setDragging] = useState(false);
  return <div>...</div>;
}
```

### Tailwind

- **Utiliser les CSS variables du BRAND.md** (cf. `--mr-black`, `--mr-gold`, etc.) via `tailwind.config.js` theme extend
- **Classes utilitaires longues** : extraire via `cn()` helper (tailwind-merge + clsx) si réutilisé
- **Pas de CSS-in-JS** (styled-components etc.), que Tailwind + CSS variables

Exemple config tokens :

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      'mr-black': 'var(--mr-black)',
      'mr-ink': 'var(--mr-ink)',
      'mr-cream': 'var(--mr-cream)',
      'mr-gold': 'var(--mr-gold)',
      // ...
    },
    fontFamily: {
      display: ['var(--font-display)'],
      body: ['var(--font-body)'],
      mono: ['var(--font-mono)'],
    },
  },
},
```

### Mongoose

- **Modèles dans `apps/web/lib/db/models/`**, un fichier par collection
- **Interface TS exportée** en même temps que le modèle
- **Pas de logique métier dans les hooks Mongoose** (pre/post), garder les models "dumb"
- **Toujours `await connectDb()` au début des API routes** (Next.js serverless-like)

### API Routes

- **Placer dans `app/api/*/route.ts`**, nommer explicite (`route.ts` convention Next.js)
- **Valider input avec Zod** systématiquement
- **Gérer les erreurs explicitement**, retourner du JSON structuré
- **Status codes corrects** (200, 201, 400, 404, 500)
- **Jamais de try-catch silencieux** — si on catch, on log avec context

Template type :

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDb } from '@/lib/db';

const InputSchema = z.object({
  photoUrl: z.string().url(),
  categorySlug: z.string().min(1),
});

export async function POST(req: NextRequest) {
  await connectDb();

  const parsed = InputSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const result = await doThing(parsed.data);
    return NextResponse.json(result);
  } catch (err) {
    console.error('[API] /api/route failed:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
```

### BullMQ jobs

- **Chaque job = 1 fichier** dans `packages/worker/src/jobs/`
- **Idempotent** : relancer un job avec les mêmes inputs ne doit rien casser
- **Logger toute étape importante** (Pino ou console structured)
- **Retries configurés** : 3 tentatives avec backoff exponentiel par défaut
- **Timeout sur les appels externes** (Replicate, storage) : 60s max

---

## Contraintes critiques (non-négociables)

### Storage

- ✅ **Tous les assets user restent sur VPS, jamais de dépendance cloud storage en V1**
- ✅ **Interface abstraite** : lib/storage/ avec backend swappable (local V1, R2 plus tard)
- ✅ **Signed URLs** pour tous les assets user-facing (HMAC SHA256, TTL 48h)
- ❌ **Ne JAMAIS** servir un asset user sans signature valide

### Sécurité

- ❌ **Ne JAMAIS** logger un secret ou une clé API
- ❌ **Ne JAMAIS** exposer un endpoint admin sans auth
- ❌ **Ne JAMAIS** trust user input sans validation Zod
- ✅ **Toujours** vérifier la signature Stripe sur les webhooks
- ✅ **Toujours** rate-limit les endpoints publics (Redis)
- ✅ **Toujours** utiliser `env.ts` typé pour les env vars (pattern `@t3-oss/env-nextjs`)

### Apple Pay

- Le fichier `.well-known/apple-developer-merchantid-domain-association` doit être servi par Next.js (placer dans `public/.well-known/`)
- Tester avec vrai device iOS Safari avant de dire "fait"

### Paiement

- ❌ Ne JAMAIS créer un draft order avec `status: 'paid'` avant le webhook Stripe
- ❌ Ne JAMAIS lancer la génération avant que Stripe ait confirmé le paiement
- ✅ Toujours idempotent : si webhook reçu 2x (Stripe retry), on ne regénère pas 2 vidéos

### i18n

- ❌ **Aucun texte UI hardcodé en français** (ou autre langue) dans les fichiers `.tsx`
- ✅ Tout texte passe par `useTranslations()` ou `getTranslations()`
- ✅ Clés de traduction dans `messages/*.json` avec noms sémantiques (`hero.title`, pas `homepage.t1`)

### Brand

- ✅ Utiliser le vocabulaire cinéma partout ("tournage", "scène", "prise", "casting")
- ✅ Respecter la palette (mr-black, mr-cream, mr-gold, mr-red avec parcimonie)
- ✅ Typographie : Fraunces pour display, Satoshi pour body, JetBrains Mono pour technique
- ❌ Pas d'emoji dans l'UI finale (sauf email subject lines, 1 max)
- ❌ Pas d'em-dash dans le copy ("—" interdit, préférer virgule ou parenthèse)

---

## Structure des commits

Format conventional commits :

```
feat(scope): description courte

Description longue optionnelle.
```

Types autorisés : `feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `test`, `perf`.

Scopes recommandés : `upload`, `checkout`, `payment`, `generation`, `email`, `i18n`, `ui`, `db`, `worker`, `infra`.

Exemples :

```
feat(upload): add drag-and-drop with preview
fix(payment): handle expired checkout session
refactor(db): extract Order helpers to separate file
chore(deps): bump stripe to 14.x
```

---

## Tests

### Ce qui doit être testé (priorité V1)

1. **Webhooks Stripe** — signature + handlers (unit tests)
2. **Webhook Replicate** — payload handling (unit tests)
3. **Order state machine** — transitions valides/invalides (unit tests)
4. **Upload validation** — types, tailles (unit tests)
5. **Génération e2e** — de paiement à livraison (integration test, mockant Replicate)

Utiliser **Vitest** (plus rapide que Jest, native ESM).

### Ce qu'on ne teste PAS en priorité (V1)

- UI pixel-perfect (pas de visual regression)
- E2E complets Playwright (trop coûteux à maintenir pour un MVP solo)

---

## Style de PR (si on utilise PR même en solo)

Titre : même format que commit.
Description :

```markdown
## Quoi
Résumé en 2-3 lignes.

## Pourquoi
Raison business ou tech.

## Comment tester
1. Étape 1
2. Étape 2

## Screenshots (si UI)
[image]
```

---

## Gestion des décisions incertaines

**Quand Claude Code est pas sûr** :

1. **Décision technique mineure** (nommage, ordre de params, split de fonction) → décider autonomement, suivre le style existant
2. **Décision produit / UX** → relire `BRAND.md` + `UX-CONVERSION.md`, implémenter selon les principes. Si ambigu → **demander Ajwad avant de coder**, ne pas inventer
3. **Décision légale** → **toujours** demander Ajwad
4. **Décision archi impactante** (changer de DB, ajouter un service) → **toujours** demander Ajwad

---

## Anti-patterns à éviter absolument

- ❌ Ajouter des packages non-nécessaires sans demander (ex: moment.js, lodash full)
- ❌ Créer des abstractions prématurées ("au cas où on en ait besoin")
- ❌ Over-engineer une feature simple (SOLID à tout prix, factory patterns, etc.)
- ❌ Comments verbeux qui expliquent le code ligne par ligne (le code doit parler)
- ❌ TODO qu'on ne tracke nulle part (utiliser un fichier `TODO.md` ou GitHub issues)
- ❌ Exceptions silencieuses / catch vides
- ❌ Mutations d'objets globaux
- ❌ `useEffect` pour des choses qui devraient être faites server-side

---

## Conventions spécifiques MeowReel

### Order IDs

- `_id` Mongoose = ObjectId 24 chars (interne)
- `shortId` = format `MR-XXXXXX` (6 chars, nanoid, pour affichage user)
- **Toujours utiliser `shortId`** dans URLs user-facing et emails, jamais le `_id`

### URLs

```
/[locale]/                              Landing
/[locale]/scene/[category-slug]         Landing par catégorie (SEO)
/[locale]/producing/[orderShortId]      Loading post-payment
/[locale]/final-cut/[orderShortId]      Livraison
/[locale]/legal/[page]                  Pages légales
```

### Composants UI réutilisables

Placer dans `components/ui/` et préfixer avec `Mr` (MeowReel) pour éviter conflits avec libs :

- `MrButton` (variants: primary, secondary, ghost, danger)
- `MrCard`
- `MrInput`
- `MrSelect`
- `MrBadge`
- `MrClap` (le bouton clap de cinéma signature)
- `MrFilmStrip` (bande de pellicule décorative)
- `MrRegMark` (croisillon de registration)
- `MrTimecode` (affichage mono avec SCENE · TAKE)

### Loading states

Utiliser les messages de rotation définis dans `messages/*.json` (`checkout.loading.messages`). Rotation toutes les 12s via `useEffect` + interval client.

### Erreurs

Vocabulaire cinéma systématique :
- Erreur technique : "Coupez. On refait une prise."
- 404 : "Cette scène a été coupée au montage."
- Timeout : "La production prend plus de temps que prévu."

---

## Ordre de développement suggéré

Voir `TODO.md` si créé pour le détail.

Phase 1 — Foundations (2 soirées)
1. Setup repo monorepo (pnpm workspaces + Turbo)
2. Next.js + Tailwind + next-intl + Mongoose connection
3. Design system de base (colors, fonts, primitives UI)
4. Page landing basique avec upload + catégories hardcodées

Phase 2 — Paiement (1 soirée)
5. Stripe Checkout session
6. Webhook Stripe
7. Page success (producing) qui poll

Phase 3 — Génération (1-2 soirées)
8. Docker Compose dev (Mongo, Redis, Nginx)
9. BullMQ queue setup
10. Worker job: generate-video avec Replicate
11. Webhook Replicate + R2 upload
12. Worker job: send-delivery + MailerLite

Phase 4 — Polish (1 soirée)
13. Page final-cut avec cross-sell
14. Tous les loading states avec le vocabulaire cinéma
15. i18n FR/EN/ES
16. Legal pages

Phase 5 — Deploy (demi-soirée)
17. Dockerfile prod + docker-compose.prod.yml
18. Nginx + SSL (Let's Encrypt)
19. Backups + monitoring
20. Production test bout-en-bout

---

## Contacter Ajwad

Quand bloqué, ambigu, ou décision importante :

- Slack direct (workspace `hiddenlab`)
- Ou dans un message Claude : préfixer `@ajwad` pour attirer l'attention

**Préfère toujours demander que inventer.** Ajwad préfère 10 questions que 1 mauvaise décision architecturale.

---

## Derniers mots

Tu as carte blanche sur le "comment", mais respecte scrupuleusement le "quoi" défini dans les docs.

Si tu vois un truc qui cloche dans la doc → pose la question, on ajuste.

Let's ship.
