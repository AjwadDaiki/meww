# MeowReel · Architecture technique

---

## Stack retenu

| Couche | Choix | Pourquoi |
|---|---|---|
| Frontend | **Next.js 15** (App Router) + TypeScript | SSR pour SEO, streaming, best DX |
| Styling | **Tailwind CSS 4** + CSS variables | Rapidité, contrôle, tokens cohérents |
| Animation | **Motion** (ex-Framer Motion) + CSS | Micro-interactions cinéma |
| State | React Server Components + **Zustand** (client) | Minimal, pas de Redux overkill |
| Backend | Next.js API Routes (node runtime) | Monolithe simple, pas de split inutile |
| Queue | **BullMQ** (Redis) | Génération vidéo = async obligatoire |
| Database | **MongoDB** (self-hosted, Mongoose ODM) | Demandé, parfait pour schéma flexible |
| Cache | **Redis** (self-hosted) | BullMQ + session + rate limiting |
| Paiement | **Stripe Checkout** | Apple/Google Pay natifs, 0 PCI |
| Génération IA | **Replicate API** (Seedance 2.0 Fast + fallback Wan 2.2) | Meilleur modèle I2V, API simple |
| Email | **MailerLite** API | Livraison vidéo + campagnes marketing |
| Storage | **VPS local disk** + Nginx signed URLs | Zero dependency cloud storage V1, swap to R2 later if needed |
| i18n | **next-intl** | Standard Next.js, type-safe |
| Analytics | **Plausible** self-hosted | Pas de Google Analytics, RGPD clean |
| Monitoring | **Sentry** (erreurs) + **Better Stack** (uptime) | Minimum vital |
| Hosting | **VPS Hetzner** (CX22/CX32) + Docker Compose | Self-hosted, Nuremberg/Falkenstein |

---

## Structure du projet

```
meowreel/
├── apps/
│   └── web/                    # Next.js app
│       ├── app/
│       │   ├── [locale]/       # i18n routing (fr, en, es)
│       │   │   ├── page.tsx    # Landing
│       │   │   ├── scene/
│       │   │   │   └── [id]/   # Page de scène/catégorie
│       │   │   ├── producing/
│       │   │   │   └── [orderId]/   # Loading page post-payment
│       │   │   └── final-cut/
│       │   │       └── [orderId]/   # Page de livraison
│       │   ├── api/
│       │   │   ├── upload/     # Photo upload + validation
│       │   │   ├── checkout/   # Créer Stripe Checkout session
│       │   │   ├── webhooks/
│       │   │   │   ├── stripe/ # Webhook Stripe
│       │   │   │   └── replicate/ # Webhook Replicate quand vidéo prête
│       │   │   └── order/
│       │   │       └── [id]/   # Poll status order
│       │   └── layout.tsx
│       ├── components/
│       │   ├── ui/             # Primitives (Button, Input, etc.)
│       │   ├── branding/       # Logo, Clap, FilmStrip, RegMarks
│       │   ├── upload/         # Dropzone, PreviewFrame
│       │   ├── categories/     # CategoryCard, CategoryGrid
│       │   └── checkout/       # PaymentButton, BundleSelector
│       ├── lib/
│       │   ├── db/             # Mongoose connection + models
│       │   ├── stripe/         # Stripe client
│       │   ├── replicate/      # Replicate client + prompts
│       │   ├── mail/           # MailerLite client
│       │   ├── storage/        # Upload R2
│       │   ├── queue/          # BullMQ producers/consumers
│       │   └── i18n/
│       ├── messages/           # Translations JSON
│       │   ├── fr.json
│       │   ├── en.json
│       │   └── es.json
│       └── public/
│           ├── previews/       # Vidéos preview des catégories
│           └── fonts/
├── packages/
│   └── worker/                 # Worker BullMQ indépendant
│       ├── src/
│       │   ├── jobs/
│       │   │   ├── generate-video.ts
│       │   │   └── send-delivery.ts
│       │   └── index.ts
│       └── Dockerfile
├── docker-compose.yml
├── docker-compose.prod.yml
├── .env.example
└── README.md
```

---

## Services Docker (prod)

```yaml
# docker-compose.prod.yml
services:
  web:
    build: ./apps/web
    ports: ['3000:3000']
    env_file: .env.production
    depends_on: [mongo, redis]
    restart: always

  worker:
    build: ./packages/worker
    env_file: .env.production
    depends_on: [mongo, redis]
    restart: always

  mongo:
    image: mongo:7
    volumes: ['./data/mongo:/data/db']
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_USER}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASS}
    restart: always

  redis:
    image: redis:7-alpine
    volumes: ['./data/redis:/data']
    command: redis-server --requirepass ${REDIS_PASS}
    restart: always

  plausible:  # Analytics
    image: plausible/analytics:latest
    depends_on: [plausible_db, plausible_events_db]
    # ... config

  nginx:
    image: nginx:alpine
    ports: ['80:80', '443:443']
    volumes:
      - './nginx.conf:/etc/nginx/nginx.conf'
      - './data/ssl:/etc/ssl'
    depends_on: [web]
    restart: always
```

---

## Flow end-to-end

```
[USER]
  │
  │ 1. Upload photo → POST /api/upload
  │    → Validation (taille, format, face detection basique)
  │    → Upload R2, get URL
  │    → Store draft in Mongo (status: draft, photoUrl)
  │
  │ 2. Choisit catégorie → client state
  │
  │ 3. Bouton "Action" → POST /api/checkout
  │    → Créer Order (status: awaiting_payment)
  │    → Créer Stripe Checkout session
  │    → Redirect vers Stripe URL
  │
[STRIPE CHECKOUT]
  │
  │ 4. User paye (Apple Pay / Google Pay / CB)
  │
  │ 5. Stripe → POST /api/webhooks/stripe
  │    → Verify signature
  │    → Update Order (status: paid)
  │    → Enqueue BullMQ job: generate-video
  │    → Redirect user vers /producing/[orderId]
  │
[PRODUCING PAGE]
  │
  │ 6. Poll /api/order/[id] toutes les 3s
  │    → Affiche loading états ("Le réalisateur prépare...")
  │
[WORKER]
  │
  │ 7. BullMQ processe job
  │    → Appelle Replicate API avec webhook URL
  │    → Replicate met en queue
  │    → Worker met à jour status (processing)
  │
  │ 8. Replicate callback → POST /api/webhooks/replicate
  │    → Récupère URL vidéo output
  │    → Download → Upload R2 (notre CDN)
  │    → Update Order (status: done, videoUrl)
  │    → Enqueue job: send-delivery
  │
[WORKER]
  │
  │ 9. Job send-delivery
  │    → MailerLite API: email avec lien
  │    → Update Order (status: delivered)
  │
[USER]
  │
  │ 10. Page /producing détecte status=done
  │     → Redirect /final-cut/[orderId]
  │     → Autoplay vidéo + boutons download + share
  │     → CTA cross-sell: "Autre scène avec la même photo ?"
```

---

## Sécurité

### Must-have V1

- **Stripe webhook signature verification** (jamais skip)
- **Rate limiting** sur `/api/upload` et `/api/checkout` (Redis-based, 10 req/min par IP)
- **Photo validation** : taille max 10MB, formats JPG/PNG/HEIC, check MIME
- **URL d'accès vidéo signée** (expire 48h) — pas de URL permanente publique
- **CORS strict** : seulement notre domaine
- **Secrets dans .env, jamais commités**
- **HTTPS forced** via Nginx
- **Headers sécurité** : CSP, X-Frame-Options, HSTS

### Nice-to-have V2

- Cloudflare devant (DDoS + rate limiting)
- Sentry + alerting
- Backups MongoDB automatiques quotidiens

---

## Variables d'environnement

```bash
# Database
MONGODB_URI=mongodb://meowreel:pass@mongo:27017/meowreel?authSource=admin
REDIS_URL=redis://:pass@redis:6379

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PUBLISHABLE_KEY=pk_live_...

# Replicate
REPLICATE_API_TOKEN=r8_...

# File Storage (VPS local disk)
STORAGE_DATA_DIR=/data                    # Docker volume mount from /var/meowreel/data
STORAGE_SIGNING_SECRET=...                # HMAC secret for signed URLs (same as ORDER_URL_SIGNING_SECRET)

# MailerLite
MAILERLITE_API_KEY=...

# App
NEXT_PUBLIC_BASE_URL=https://meowreel.com
NEXT_PUBLIC_DEFAULT_LOCALE=fr
ORDER_URL_SIGNING_SECRET=...  # pour signer les URLs de livraison

# Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=meowreel.com

# Monitoring
SENTRY_DSN=...
```

---

## Scalability / economics

### Assumption V1

- 100 commandes / jour au démarrage
- 90 secondes de génération moyenne
- 1 worker concurrent = ~960 générations/jour théoriques
- **1 worker suffit largement** pour V1

### Si ça part en tendance

- 10 000 commandes / jour → besoin de ~12 workers concurrents
- Scale horizontal : augmenter `docker compose` replicas du service `worker`
- Replicate gère la queue upstream, pas de limite à notre niveau côté génération

### Coût par commande (unit economics)

```
Recette brute         :  0.99€
Frais Stripe (1.5%+0.25)  : -0.27€
Coût Replicate (Seedance Fast 5s) : -0.05€ (~$0.05)
Coût R2 storage + egress  : -0.002€
Coût MailerLite email    : -0.001€
Coût serveur alloué       : -0.01€
────────────────────────────
Marge nette              :  0.66€ / vidéo
```

Avec 100 ventes/jour : ~66€/jour net = ~2 000€/mois. À 1000 ventes/jour : ~20 000€/mois.

---

## Déploiement

### Dev local

```bash
# Cloner et setup
git clone [...] && cd meowreel
cp .env.example .env.local
pnpm install
docker compose -f docker-compose.dev.yml up -d mongo redis
pnpm dev  # lance web
pnpm worker:dev  # lance worker
```

### Prod (VPS)

```bash
# Sur le VPS
git pull
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d
docker compose -f docker-compose.prod.yml logs -f web
```

### Backups

```bash
# Cron quotidien (2am)
0 2 * * * docker exec mongo mongodump --out=/data/backup/$(date +\%F)
# Garder 7 jours
0 3 * * * find /data/backup -mtime +7 -delete
```

---

## Observability

### Metrics à tracker (dashboard interne simple)

- Commandes / heure
- Taux de conversion landing → payant
- Temps moyen de génération
- Taux d'échec Replicate (retry needed)
- Taux d'ouverture email de livraison
- Cross-sell conversion (clic "nouvelle scène" après livraison)
- Revenue / jour

Dashboard interne simple : une page `/admin/stats` protégée par basic auth, qui query MongoDB en live.

---

## Limitations connues V1

- Pas de compte utilisateur (voulu) → un user qui perd son email perd l'accès
  - Mitigation : magic link re-send si l'email est encore connu
- Pas de remboursement automatisé → à gérer manuellement si demande via support
- Pas de système de codes promo V1 → ajout V2 si besoin
- Pas d'A/B testing intégré V1 → on teste manuellement en changeant les variables clés
