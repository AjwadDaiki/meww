# MeowReel · Pipeline de génération (Replicate)

---

## Vue d'ensemble

```
[Paiement OK]
  ↓
[BullMQ job: generate-video]
  ↓
[Replicate API call avec webhook]
  ↓
[Replicate génère (~60s)]
  ↓
[Replicate callback → notre webhook]
  ↓
[Download vidéo → upload R2]
  ↓
[BullMQ job: send-delivery]
  ↓
[Email user + update status delivered]
```

---

## Choix du modèle

### Modele choisi : Seedance 2 Lite

**`bytedance/seedance-2-lite`** (Replicate)
- Duree : 5 secondes
- Resolution : 720p
- Aspect ratio : 9:16 (portrait, TikTok-native)
- Cout : ~$0.05 par video
- Temps : ~60-90s
- Qualite : excellente pour I2V, coherence de personnage top
- Audio natif : oui (critical pour scenes musicales)

**Prompts** : voir PROMPTS-SEEDANCE.md (source unique, 41 prompts structures)

**Negative prompt global** (applique a TOUTES les generations) :
```
no humans, no text overlays, no watermark, no logos,
no distorted anatomy, no extra limbs, no extra paws,
no blurry motion, no cartoon style, no anime style,
no 3D render look, no uncanny valley, no floating objects,
no glitches, no artifacts, no multiple cats, no disappearing cat
```

### Fallback (si Seedance 2 Lite fail)

**`wan-video/wan-2.2-i2v-fast`** (Replicate)
- Duree : 5s
- Resolution : 480p / 720p
- Cout : ~$0.03-0.05 par video
- Qualite : bonne, moins premium mais fonctionnelle
- Audio natif : non

### Tier Premium V2 (upsell a 2,99EUR)

**`bytedance/seedance-2.0`** (non-fast)
- Duree : 10s
- Resolution : 1080p
- Cout : ~$0.70-1.40 par video
- Vendu a 2,99EUR = marge 50%+

---

## Implémentation du worker

```typescript
// packages/worker/src/jobs/generate-video.ts

import Replicate from 'replicate';
import { Order } from '../lib/db/models/order';
import { Category } from '../lib/db/models/category';
import { addToQueue } from '../queue';

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN! });

export async function generateVideoJob(data: { orderId: string; index: number }) {
  const order = await Order.findById(data.orderId);
  if (!order) throw new Error('Order not found');

  const category = await Category.findOne({ slug: order.scene.categorySlug });
  if (!category) throw new Error('Category not found');

  // Build prompt with reference image
  const prompt = buildPrompt(category, order);

  // Update status
  order.status = 'processing';
  order.generation.startedAt = new Date();
  order.generation.model = category.model;
  await order.save();

  try {
    const prediction = await replicate.predictions.create({
      model: category.model,  // ex: "bytedance/seedance-2.0-fast"
      input: {
        image: order.photo.originalUrl,
        prompt: prompt,
        duration: category.durationSeconds,
        resolution: category.resolution,
        seed: undefined,  // random pour variations
        // Autres params selon le modèle
      },
      webhook: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhooks/replicate?orderId=${order._id}`,
      webhook_events_filter: ['completed'],
    });

    order.generation.jobId = prediction.id;
    await order.save();

    console.log(`Order ${order.shortId} → Replicate ${prediction.id} enqueued`);
  } catch (err) {
    console.error('Replicate create prediction failed:', err);

    // Retry logic avec fallback
    if (order.generation.retries < 1) {
      order.generation.retries += 1;
      order.generation.model = 'wan-video/wan-2.2-i2v-fast';  // fallback
      await order.save();
      // Re-enqueue
      await addToQueue('generate-video', data, { delay: 5000 });
    } else {
      order.status = 'failed';
      order.generation.errorMessage = err instanceof Error ? err.message : String(err);
      await order.save();
      // Notifier support
      await notifySupport(order);
    }
  }
}

function buildPrompt(category: any, order: any): string {
  let prompt = category.basePrompt;

  // Variation support
  if (order.scene.variationId && category.variations) {
    const variation = category.variations.find((v: any) => v.id === order.scene.variationId);
    if (variation) {
      prompt += ' ' + variation.promptModifier;
    }
  }

  // Append negative prompt
  prompt += `\nNegative prompt: ${category.negativePrompt || 'no text, no watermark, no blur'}`;

  return prompt;
}
```

---

## Webhook Replicate (résultat)

```typescript
// apps/web/app/api/webhooks/replicate/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { Order } from '@/lib/db/models/order';
import { connectDb } from '@/lib/db';
import { storage } from '@/lib/storage';
import { deliveryQueue } from '@/lib/queue';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  // Optional: verify Replicate webhook signature
  const orderId = req.nextUrl.searchParams.get('orderId');
  if (!orderId) return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });

  const payload = await req.json();

  await connectDb();
  const order = await Order.findById(orderId);
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

  if (payload.status === 'succeeded' && payload.output) {
    // Replicate outputs a URL (or array of URLs) to the generated video
    const videoUrl = Array.isArray(payload.output) ? payload.output[0] : payload.output;

    try {
      // Download from Replicate (their URLs are temporary), save to VPS local disk
      const result = await storage.put(
        `videos/${order.shortId}.mp4`,
        await fetch(videoUrl).then(r => r.arrayBuffer()),
        'video/mp4'
      );

      order.status = 'done';
      order.output = {
        videoUrl: result.signedUrl,
        videoFilename: `${order.shortId}.mp4`,
        durationSeconds: 5,
        resolution: '720p',
        sizeBytes: result.sizeBytes,
      };
      order.generation.completedAt = new Date();
      await order.save();

      // Enqueue delivery email
      await deliveryQueue.add('send', { orderId: order._id.toString() });

      console.log(`Order ${order.shortId} complete, video saved locally`);
    } catch (err) {
      console.error('Local storage write failed:', err);
      order.status = 'failed';
      order.generation.errorMessage = 'Storage write failed';
      await order.save();
    }
  } else if (payload.status === 'failed') {
    order.status = 'failed';
    order.generation.errorMessage = payload.error || 'Replicate generation failed';
    await order.save();
    // Trigger refund + email apology
    await handleFailedOrder(order);
  }

  return NextResponse.json({ received: true });
}
```

---

## Watermark subtil (post-process)

La plupart des modèles Replicate n'ajoutent pas notre watermark. On l'ajoute en post-process côté worker.

### Approche : ffmpeg

```typescript
import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);

async function addWatermark(inputPath: string, outputPath: string) {
  const watermarkText = 'meowreel.com';
  const cmd = `ffmpeg -i ${inputPath} \
    -vf "drawtext=text='${watermarkText}':fontfile=/fonts/Satoshi.ttf:fontsize=14:fontcolor=white@0.6:x=w-tw-10:y=h-th-10:box=1:boxcolor=black@0.3:boxborderw=4" \
    -c:a copy \
    ${outputPath}`;
  await execAsync(cmd);
}
```

Si `removeWatermark: true` (bundle trio+ten avec upgrade), on skip cette étape.

### Dockerfile worker avec ffmpeg

```dockerfile
FROM node:20-alpine
RUN apk add --no-cache ffmpeg
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --prod
COPY . .
CMD ["pnpm", "worker"]
```

---

## Stockage des vidéos

### VPS Local Disk (V1)

**Pourquoi :**
- Zero cloud dependency en V1
- Controle total, pas de vendor lock-in
- Nginx sert les fichiers avec signed URLs
- Migration vers R2 possible plus tard via interface abstraite

**Backup plan :** Rclone sync quotidien vers Hetzner Storage Box (3EUR/mois 1TB). 14j local, 90j distant.

### Structure disque VPS

```
/var/meowreel/data/
├── uploads/<YYYY>/<MM>/<DD>/<uuid>.jpg    # photos originales (purge 30j)
├── videos/<shortId>.mp4                    # vidéos livrées (purge 90j)
└── previews/<category-slug>.webm           # previews catégories (permanent)
```

Docker mount : `/var/meowreel/data` -> `/data` dans les containers.
En dev local : `./data/` a la racine du projet.

### Retention policy

- **Photos originales** : purge apres 30 jours (GDPR + espace)
- **Vidéos livrées** : garde 90 jours (permet re-download par user)
- **Previews catégories** : permanent

### URLs signées

Les vidéos sont servies via Nginx (ou handler Next.js) avec signed URLs :
`https://meowreel.com/v/MR-XXXX.mp4?t=<signature>`

Signature = HMAC SHA256 avec TTL 48h (cf DATABASE.md section download tokens).

### Interface storage abstraite

```typescript
// lib/storage/types.ts
interface StorageBackend {
  put(key: string, data: ArrayBuffer, contentType: string): Promise<StorageResult>;
  get(key: string): Promise<Buffer | null>;
  delete(key: string): Promise<void>;
  getSignedUrl(key: string, ttlSeconds?: number): string;
}

// lib/storage/local.ts  — implémentation VPS disk (V1)
// lib/storage/r2.ts     — stub pour migration future (unused V1)
```

---

## Prompt engineering

### Structure d'un bon prompt I2V

```
[SUBJECT description in 1 line + reference image marker]
[ACTION verbe principal, spécifique]
[CAMERA position, focal, movement]
[LIGHTING adjectifs précis]
[ATMOSPHERE mood words]
[STYLE cinematic, shot type]
[NEGATIVE prompt dans un second champ]
```

### Exemple vérifié

```
Subject: A photorealistic cat (based on reference image) wearing a tiny black tuxedo,
standing upright with confidence on a small jazz club stage.

Action: The cat holds a golden trumpet with its paws and plays with slight swaying motion,
eyes closed in concentration.

Camera: Medium shot at cat height, slight dolly-in, 35mm lens feel, shallow depth of field.

Lighting: Warm amber spotlight on the cat, background bokeh with distant bar lights,
smoky haze in the air.

Atmosphere: Intimate, late-night jazz club, subtle ambient chatter.

Style: Cinematic, grainy 16mm film aesthetic, warm gold tones, vintage.

Audio: Smooth solo jazz trumpet over soft brushed drums and piano chords,
intimate ambience.

Negative: no humans visible, no text or watermark, no distorted cat anatomy,
no clumsy paw movements, no blurry face, no modern elements.
```

### Règles d'or

1. **Toujours référencer "the cat based on reference image"** dans le prompt (I2V consistency)
2. **Verbes d'action spécifiques** ("plays", "holds", "steps", "turns head")
3. **Pas de style conflictuel** ("anime" + "photorealistic" = désastre)
4. **Audio prompt quand modèle le supporte** (Seedance 2.0 oui, Wan 2.2 non)
5. **Negative prompt bien fourni** : `no text`, `no watermark`, `no distorted anatomy`, `no extra limbs`, `not blurry`

---

## Handling des échecs

### Échecs courants

1. **Photo uploadée pas claire** → génération bizarre
   → retry avec modèle fallback, si toujours fail → refund + email excuse
2. **Replicate queue trop longue** → timeout > 5 min
   → switch sur Wan 2.2 qui a queue plus courte
3. **Output contient watermark Replicate** (rare)
   → strip avec ffmpeg crop et re-apply notre watermark
4. **Replicate renvoie une erreur de contenu** (très rare)
   → log, alert, refund manuel

### Retry logic

```typescript
async function generateWithRetry(order: any, maxRetries = 2) {
  const models = [
    'bytedance/seedance-2.0-fast',
    'wan-video/wan-2.2-i2v-fast',
  ];

  for (let i = 0; i <= maxRetries && i < models.length; i++) {
    try {
      const result = await callReplicate(order, models[i]);
      return result;
    } catch (err) {
      if (i === maxRetries || i === models.length - 1) {
        throw err;
      }
      await sleep(3000);  // backoff
    }
  }
}
```

---

## Queue system (BullMQ)

### Setup

```typescript
// lib/queue/index.ts

import { Queue, Worker, QueueEvents } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
});

export const videoQueue = new Queue('video-generation', { connection });
export const deliveryQueue = new Queue('email-delivery', { connection });

// Worker (dans packages/worker)
export const videoWorker = new Worker(
  'video-generation',
  async job => {
    if (job.name === 'generate') {
      await generateVideoJob(job.data);
    }
  },
  { connection, concurrency: 5 }  // 5 jobs en parallèle
);
```

### Gestion concurrence

- **1 worker avec concurrency: 5** = 5 générations Replicate simultanées
- Replicate côté lui gère son propre scheduling, on sature pas
- Si besoin scale : spawn plus de workers Docker

---

## Testing

### Test de génération end-to-end

```bash
# 1. Upload une photo de test
curl -X POST http://localhost:3000/api/upload \
  -F "file=@./test-cat.jpg" \
  -H "Content-Type: multipart/form-data"

# 2. Créer un order draft (simulation)
# 3. Trigger manually avec CLI
pnpm worker:test-job generate-video '{"orderId":"..."}'

# 4. Vérifier dans MongoDB
mongo meowreel --eval 'db.orders.find({}).pretty()'

# 5. Vérifier dans R2 que le fichier est là
rclone ls r2:meowreel-videos/videos/
```

### Modèle de test local (économique)

Utiliser Wan 2.2 I2V Fast (~$0.03 par génération) pendant le dev pour pas flamber le budget Replicate.

---

## Budget mensuel estimé

### Scénario 100 ventes/jour (3000/mois)

| Poste | Coût |
|---|---|
| Replicate (3000 × $0.05) | $150 |
| R2 storage (200 GB avg) | $3 |
| R2 API calls | $2 |
| MongoDB self-hosted | $0 (VPS déjà payé) |
| Redis self-hosted | $0 |
| VPS (OVH / Hetzner) | $20-40 |
| MailerLite (3000 emails) | $10-15 |
| Stripe fees (déjà déduits par transaction) | 0 |
| **TOTAL** | **~$200/mois** |

Revenue brut : ~2900€ (hors bundles). Marge > 90%.

### Scénario viral : 1000 ventes/jour (30k/mois)

| Poste | Coût |
|---|---|
| Replicate (30k × $0.05) | $1500 |
| R2 storage (2 TB) | $30 |
| Bande passante R2 | $0 (egress gratuit) |
| VPS scale (plus gros) | $100-200 |
| MailerLite (30k emails) | $50 |
| **TOTAL** | **~$1700/mois** |

Revenue brut : ~29 000€. Marge encore > 90%.
