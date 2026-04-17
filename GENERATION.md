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

### Tier par défaut (99% des cas)

**`bytedance/seedance-2.0-fast`** (Replicate)
- Durée : 5s
- Résolution : 720p
- Coût : ~$0.05-0.08 par vidéo (estimation basée sur tier Fast)
- Temps : ~60-90s
- Qualité : excellente pour I2V, cohérence de personnage top
- Audio natif : oui (critical pour scènes musicales)

### Fallback (si Seedance Fast fail)

**`wan-video/wan-2.2-i2v-fast`** (Replicate)
- Durée : 5s
- Résolution : 480p / 720p
- Coût : ~$0.03-0.05 par vidéo
- Temps : ~40-60s
- Qualité : bonne, moins premium mais fonctionnelle
- Audio natif : non (à gérer côté post)

### Tier Premium V2 (upsell à 2,99€)

**`bytedance/seedance-2.0`** (non-fast)
- Durée : 10s
- Résolution : 1080p
- Coût : ~$0.70-1.40 par vidéo
- Qualité : cinéma
- Vendu à 2,99€ = marge 50%+

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
import { downloadAndUploadToR2 } from '@/lib/storage';
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
      // Download from Replicate (their URLs are temporary), upload to our R2
      const r2Result = await downloadAndUploadToR2({
        sourceUrl: videoUrl,
        destinationKey: `videos/${order.shortId}.mp4`,
      });

      order.status = 'done';
      order.output = {
        videoUrl: r2Result.publicUrl,
        videoFilename: `${order.shortId}.mp4`,
        durationSeconds: r2Result.duration || 5,
        resolution: r2Result.resolution || '720p',
        sizeBytes: r2Result.sizeBytes,
      };
      order.generation.completedAt = new Date();
      await order.save();

      // Enqueue delivery email
      await deliveryQueue.add('send', { orderId: order._id.toString() });

      console.log(`Order ${order.shortId} complete, video at ${r2Result.publicUrl}`);
    } catch (err) {
      console.error('R2 upload failed:', err);
      order.status = 'failed';
      order.generation.errorMessage = 'R2 upload failed';
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

### Cloudflare R2

**Pourquoi :**
- Compatible S3 API
- **Zéro egress cost** (le coût de lire les vidéos qu'on a stockées)
- Storage pas cher ($0.015 / GB / mois)
- CDN inclus

### Structure

```
meowreel-videos/
├── videos/
│   ├── MR-4A7X2K.mp4
│   ├── MR-8Y3P1Z.mp4
│   └── ...
├── previews/           # previews publics pour catégories
│   ├── midnight-porch-musician.mp4
│   └── ...
└── photos-originals/   # (optionnel, purge après 30j)
    └── ...
```

### Retention policy

- **Vidéos livrées** : garde 90 jours (permet re-download par user)
- **Photos originales** : purge après 30 jours (GDPR + coût)
- **Previews catégories** : permanent

### Upload script

```typescript
// lib/storage.ts

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function downloadAndUploadToR2({
  sourceUrl,
  destinationKey,
}: { sourceUrl: string; destinationKey: string }) {
  const response = await fetch(sourceUrl);
  const buffer = Buffer.from(await response.arrayBuffer());

  await s3.send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: destinationKey,
    Body: buffer,
    ContentType: 'video/mp4',
    CacheControl: 'public, max-age=31536000, immutable',
  }));

  return {
    publicUrl: `${process.env.R2_PUBLIC_URL}/${destinationKey}`,
    sizeBytes: buffer.byteLength,
  };
}
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
