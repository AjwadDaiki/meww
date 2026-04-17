# MeowReel · Database (MongoDB)

---

## Collections

| Collection | Rôle |
|---|---|
| `orders` | Chaque commande = un doc. Contient tout le lifecycle |
| `categories` | Liste des scènes/catégories disponibles (configurable sans redeploy) |
| `promos` | Codes promo (V2 mais schéma ready) |
| `delivery_tokens` | Tokens signés pour les URLs de livraison |
| `analytics_events` | Événements custom (optionnel, Plausible fait le gros) |

---

## Schema `orders`

```typescript
// apps/web/lib/db/models/order.ts

import mongoose, { Schema, Model } from 'mongoose';

export interface IOrder {
  _id: string;              // ObjectId auto
  shortId: string;          // ID court lisible (ex: "MR-4A7X2K") pour emails
  status: 'draft'
        | 'awaiting_payment'
        | 'paid'
        | 'processing'
        | 'done'
        | 'delivered'
        | 'failed';
  locale: 'fr' | 'en' | 'es' | 'de' | 'it' | 'pt';

  // Photo du chat
  photo: {
    originalUrl: string;    // R2 URL
    filename: string;
    mimeType: string;
    sizeBytes: number;
    uploadedAt: Date;
  };

  // Scène choisie
  scene: {
    categoryId: string;     // ref categories._id
    categorySlug: string;   // "midnight-porch-musician"
    variationId?: string;   // ex: pour "musician", variation "trumpet"
    promptUsed?: string;    // stocké pour debug
  };

  // Pricing
  bundle: 'single' | 'trio' | 'ten';  // single = 1 vidéo, trio = 3, ten = 10
  unitCount: number;        // 1, 3, ou 10
  amountCents: number;      // en centimes d'euro
  currency: 'EUR';

  // Stripe
  stripe?: {
    sessionId: string;
    paymentIntentId?: string;
    customerEmail: string;
    paidAt?: Date;
  };

  // Génération
  generation: {
    provider: 'replicate';
    model: string;          // "bytedance/seedance-2.0-fast" par ex
    jobId?: string;         // Replicate prediction ID
    startedAt?: Date;
    completedAt?: Date;
    retries: number;        // compteur retries
    errorMessage?: string;
  };

  // Output
  output?: {
    videoUrl: string;       // R2 URL (CDN public)
    videoFilename: string;
    thumbnailUrl?: string;
    durationSeconds: number;
    resolution: '480p' | '720p' | '1080p';
    sizeBytes: number;
  };

  // Livraison
  delivery?: {
    emailSentAt?: Date;
    downloadToken: string;  // signed token pour URL de download
    tokenExpiresAt: Date;
    downloadedAt?: Date;    // premier download
    downloadCount: number;
  };

  // Cross-sell tracking
  upsellParentOrderId?: string;  // si cet ordre vient d'un cross-sell

  // Meta
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string;       // pour anti-fraud (hash)
  userAgent?: string;
}

const OrderSchema = new Schema<IOrder>({
  shortId: { type: String, unique: true, required: true, index: true },
  status: {
    type: String,
    enum: ['draft', 'awaiting_payment', 'paid', 'processing', 'done', 'delivered', 'failed'],
    default: 'draft',
    index: true,
  },
  locale: { type: String, enum: ['fr','en','es','de','it','pt'], default: 'fr' },

  photo: {
    originalUrl: { type: String, required: true },
    filename: String,
    mimeType: String,
    sizeBytes: Number,
    uploadedAt: { type: Date, default: Date.now },
  },

  scene: {
    categoryId: { type: String, required: true, index: true },
    categorySlug: { type: String, required: true },
    variationId: String,
    promptUsed: String,
  },

  bundle: { type: String, enum: ['single','trio','ten'], default: 'single' },
  unitCount: { type: Number, default: 1 },
  amountCents: { type: Number, required: true },
  currency: { type: String, default: 'EUR' },

  stripe: {
    sessionId: { type: String, index: true },
    paymentIntentId: String,
    customerEmail: { type: String, index: true },
    paidAt: Date,
  },

  generation: {
    provider: { type: String, default: 'replicate' },
    model: String,
    jobId: { type: String, index: true },
    startedAt: Date,
    completedAt: Date,
    retries: { type: Number, default: 0 },
    errorMessage: String,
  },

  output: {
    videoUrl: String,
    videoFilename: String,
    thumbnailUrl: String,
    durationSeconds: Number,
    resolution: String,
    sizeBytes: Number,
  },

  delivery: {
    emailSentAt: Date,
    downloadToken: String,
    tokenExpiresAt: Date,
    downloadedAt: Date,
    downloadCount: { type: Number, default: 0 },
  },

  upsellParentOrderId: { type: Schema.Types.ObjectId, ref: 'Order' },

  ipAddress: String,
  userAgent: String,
}, { timestamps: true });

// Indexes
OrderSchema.index({ 'stripe.customerEmail': 1, createdAt: -1 });
OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ createdAt: -1 });

export const Order: Model<IOrder> = mongoose.models.Order
  || mongoose.model('Order', OrderSchema);
```

---

## Schema `categories`

```typescript
export interface ICategory {
  _id: string;
  slug: string;                    // URL-safe: "midnight-porch-musician"
  section: 'trending' | 'music' | 'dance' | 'cinematic' | 'moments';
  order: number;                   // pour tri dans la section
  active: boolean;                 // peut désactiver sans supprimer

  // Localized
  name: {
    fr: string;
    en: string;
    es: string;
  };
  tagline: {                       // micro-description 3-5 mots
    fr: string;
    en: string;
    es: string;
  };

  // Visual preview
  previewVideoUrl: string;         // loop 3s MP4 muted
  previewPosterUrl: string;        // JPG fallback

  // Génération
  basePrompt: string;              // prompt template avec {CAT_PHOTO} placeholder
  model: 'seedance-2.0-fast' | 'seedance-2.0-pro' | 'wan-2.2-i2v-fast';
  durationSeconds: 5 | 10;
  resolution: '480p' | '720p' | '1080p';
  audioPrompt?: string;            // pour audio sync si modèle supporte

  // Variations optionnelles
  variations?: Array<{
    id: string;
    name: { fr: string; en: string; es: string };
    promptModifier: string;        // ajouté au basePrompt
  }>;

  // Tags SEO
  tags: string[];
  seoKeyword: string;              // "cat playing piano ai video"

  createdAt: Date;
  updatedAt: Date;
}
```

Seed de démarrage dans `/scripts/seed-categories.ts` avec toutes les catégories du fichier `CATEGORIES.md`.

---

## Schema `delivery_tokens`

Token signé court durée pour accéder au téléchargement vidéo sans auth.

```typescript
export interface IDeliveryToken {
  _id: string;
  token: string;                   // HMAC signed, unique
  orderId: string;                 // ref orders._id
  type: 'download' | 'view';
  createdAt: Date;
  expiresAt: Date;                 // 48h par défaut
  usedCount: number;
  maxUses: number;                 // généralement unlimited dans la fenêtre
  revoked: boolean;
}
```

URL pattern :
`https://meowreel.com/final-cut/MR-4A7X2K?t=<token>`

---

## Schema `promos` (V2 ready)

```typescript
export interface IPromo {
  _id: string;
  code: string;                    // "SUMMER26"
  discountType: 'percent' | 'flat';
  discountValue: number;           // 20 = 20% OR 50 centimes
  maxUses?: number;
  usedCount: number;
  validFrom: Date;
  validUntil: Date;
  bundles: Array<'single'|'trio'|'ten'>;  // à quels bundles applicable
  active: boolean;
}
```

---

## Schema `analytics_events` (optionnel)

Si on veut tracker plus finement que Plausible :

```typescript
export interface IEvent {
  _id: string;
  sessionId: string;               // cookie / localStorage
  type: 'page_view' | 'upload_start' | 'upload_done'
      | 'category_select' | 'checkout_start' | 'paid' | 'delivered' | 'upsell_click';
  properties?: Record<string, any>;
  createdAt: Date;
  locale?: string;
  referrer?: string;
  utm?: { source?: string; medium?: string; campaign?: string };
}
```

TTL index : `createdAt` avec expire après 90 jours (GDPR clean).

---

## Indexes critiques

```javascript
// orders
db.orders.createIndex({ shortId: 1 }, { unique: true });
db.orders.createIndex({ "stripe.sessionId": 1 }, { sparse: true });
db.orders.createIndex({ "stripe.customerEmail": 1, createdAt: -1 });
db.orders.createIndex({ status: 1, createdAt: -1 });
db.orders.createIndex({ "generation.jobId": 1 }, { sparse: true });
db.orders.createIndex({ createdAt: -1 });

// categories
db.categories.createIndex({ slug: 1 }, { unique: true });
db.categories.createIndex({ section: 1, order: 1, active: 1 });

// delivery_tokens
db.delivery_tokens.createIndex({ token: 1 }, { unique: true });
db.delivery_tokens.createIndex({ orderId: 1 });
db.delivery_tokens.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });  // TTL

// analytics_events
db.analytics_events.createIndex({ sessionId: 1, createdAt: -1 });
db.analytics_events.createIndex({ createdAt: 1 }, { expireAfterSeconds: 7776000 });  // 90j
```

---

## Helpers utiles

### Génération de shortId

```typescript
import { customAlphabet } from 'nanoid';

const gen = customAlphabet('ABCDEFGHJKMNPQRSTUVWXYZ23456789', 6);
// exclusion des ambigus: 0, O, 1, I, L

export function generateShortId(): string {
  return `MR-${gen()}`;
}
// ex: "MR-4A7X2K"
```

### Signer un download token

```typescript
import crypto from 'crypto';

export function signDownloadToken(orderId: string): string {
  const payload = `${orderId}:${Date.now()}`;
  const hmac = crypto
    .createHmac('sha256', process.env.ORDER_URL_SIGNING_SECRET!)
    .update(payload)
    .digest('hex')
    .slice(0, 16);
  return Buffer.from(`${payload}:${hmac}`).toString('base64url');
}

export function verifyDownloadToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, 'base64url').toString();
    const [orderId, ts, hmac] = decoded.split(':');
    const expected = crypto
      .createHmac('sha256', process.env.ORDER_URL_SIGNING_SECRET!)
      .update(`${orderId}:${ts}`)
      .digest('hex')
      .slice(0, 16);
    if (expected !== hmac) return null;
    const age = Date.now() - parseInt(ts);
    if (age > 48 * 60 * 60 * 1000) return null;  // 48h
    return orderId;
  } catch { return null; }
}
```

---

## Migrations

Pas besoin d'un système de migrations complexe pour démarrer. Pour seeder les catégories :

```typescript
// scripts/seed-categories.ts
import { connectDb } from '../lib/db';
import { Category } from '../lib/db/models/category';
import { categories } from './categories-data';  // array TypeScript

async function main() {
  await connectDb();
  for (const cat of categories) {
    await Category.updateOne({ slug: cat.slug }, cat, { upsert: true });
  }
  console.log(`Seeded ${categories.length} categories`);
}

main().catch(console.error).finally(() => process.exit());
```

Exécuter : `pnpm seed:categories`

---

## Backups stratégie

### Daily mongodump

```bash
# /etc/cron.d/meowreel-backup
0 2 * * * root docker exec meowreel-mongo-1 \
  mongodump --uri="mongodb://$MONGO_USER:$MONGO_PASS@localhost/meowreel?authSource=admin" \
  --out=/data/backup/$(date +\%F)
```

### Upload backup → R2 bucket séparé

```bash
# Weekly sync vers R2 (survie crash total du VPS)
0 3 * * 0 root rclone sync /var/backups/mongo r2:meowreel-backups-weekly
```

### Retention

- Local VPS : 14 jours
- R2 : 90 jours

---

## Important

- **Jamais stocker la photo originale du chat plus de 30 jours** — GDPR + espace
- **Supprimer les photos après génération réussie** (on garde juste le preview + la vidéo output)
- **TTL index sur collection photos** ou job cron nightly
