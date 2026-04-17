# MeowReel · Features & Flows

---

## V1 — Le MVP qui doit être en prod

### Core flow (obligatoire)

1. **Landing page** avec hero vidéo virale en loop
2. **Upload photo** du chat (drag&drop + tap mobile)
3. **Preview gratuit** : frame statique du chat dans le style (image-only, ~$0.003)
4. **Sélection scène** (catégories organisées en sections)
5. **Choix bundle** (1 vidéo / 3 vidéos / 10 vidéos)
6. **Stripe Checkout** avec Apple Pay + Google Pay + CB
7. **Page producing** (loading entertaining 60-90s)
8. **Page final-cut** : vidéo autoplay + download + share
9. **Email de livraison** avec lien signé
10. **Cross-sell post-livraison** : "Autre scène avec la même photo ?"

### Features support (V1)

- **Multi-langue FR/EN/ES**
- **Watermark subtil** `meowreel.com` en bas à droite sur la vidéo (pour viralité organique)
- **Option "retirer le watermark"** +0,50€ (bundle trio et ten seulement)
- **Option "relancer en cas d'insatisfaction"** à 0,49€ (deuxième prise)
- **Magic link** par email si user perd son lien (demande via formulaire support)
- **Landing SEO** par catégorie : `/scene/midnight-porch-musician`
- **FAQ** complète
- **Pages légales** : CGV, CGU, Politique de confidentialité, Mentions légales

---

## V2 — À ajouter quand ça marche

- Codes promo
- Tier premium à 2,99€ (Seedance 2.0 Pro 1080p, 10s)
- Variations par catégorie (instrument spécifique pour musicien, tenue, etc.)
- Dashboard admin perso (stats live)
- Affiliates / ambassadeurs TikTok (pas de referral automatisé, trop complexe V1)
- Custom prompt avancé pour power users (+2€)
- Abonnement "Casting Director" pour créateurs (20 vidéos/mois à tarif préférentiel)
- Version app mobile native

---

## Détails de chaque flow

### 1. Landing page

**Structure visible (au-dessus du pli) :**

```
[NAV] MEOWREEL · STUDIOS [REC indicator blinkant]  │  FR EN ES │
                                                   │
[HERO]                                             │ [VIDEO LOOP]
  Ton chat.                                        │   autoplay muted
  En vedette.                                      │   chat porch
  ~~~~~~~~~~~~~~~                                  │   musician 4s
  0,99€ · livré par email                          │
                                                   │
  [Upload photo du chat ▲]
  JPG · PNG · HEIC                                 │
```

**En dessous du pli :**

- Section "Choisis une scène" avec 4 sections (Trending / Music / Dance / Cinematic) — chaque section a 4-6 cards avec preview vidéo loop hover
- Section "Comment ça marche" en 3 étapes (icônes custom cinéma)
- Section proof / ticker live "327 chats ont débuté leur carrière aujourd'hui"
- Footer avec legal + credits

**Tracking events :**
- `page_view` à l'arrivée
- `hero_video_played_to_end`
- `scroll_50_percent`
- `scroll_to_categories`
- `category_hover` (which category)
- `upload_start`

### 2. Upload photo

**Validation côté client :**
- Formats : JPG, PNG, HEIC, WebP
- Taille max : 10MB
- Dimensions min : 512×512
- Un seul fichier à la fois

**Validation côté serveur :**
- Check MIME type réel
- Resize si > 2048px (optimisation bande passante Replicate)
- Optionnel : détection basique "il y a un chat sur la photo" via modèle cheap (ou on lève cette contrainte, on laisse user uploader même pas un chat, c'est son choix)

**UX :**
- Preview instantané de la photo uploadée dans un cadre 4:3 cinéma
- Bouton "Changer de photo" visible
- Barre de progression si upload > 1s

**Stocker :**
- Uploadé direct sur R2 avec un UUID
- URL stockée dans le draft order

### 3. Preview gratuit avant paiement

**But :** prouver que l'IA peut transformer *leur* chat en *leur* catégorie.

**Comment :**
- User a uploadé + choisi catégorie
- Bouton optionnel "Voir un aperçu" (gratuit, 1x par session)
- Génère une **image fixe** (pas vidéo) avec Seedream 4.5 ou Flux dev (coût ~$0.003)
- Affiché dans un cadre "Polaroid" cinéma

**Pourquoi c'est critique :**
- La dopamine se déclenche AVANT la transaction
- Ils voient déjà leur chat dans le style, leur cerveau a déjà "acheté"
- Ils peuvent tester plusieurs catégories avant de payer (jusqu'à 3 previews gratuits)

**Limit anti-abuse :**
- Max 3 previews par IP par heure (Redis rate limit)
- Au-delà : "Assez de castings ! On passe au tournage ?" → push vers paiement

### 4. Choix bundle

**Display visuel cinéma :**

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ SOLO        │  │ TRIO ★      │  │ CASTING CALL│
│             │  │   populaire │  │             │
│ 0,99€       │  │ 2,49€       │  │ 6,99€       │
│ 1 scène     │  │ 3 scènes    │  │ 10 scènes   │
│             │  │             │  │             │
│ 0,99€/film  │  │ 0,83€/film  │  │ 0,70€/film  │
└─────────────┘  └─────────────┘  └─────────────┘
```

**Psychologie :**
- Le trio est mis en avant comme "populaire" (nudge)
- Le casting call sert de prix anchor haut (fait paraître le trio raisonnable)
- Prix par unité affiché pour montrer la valeur

### 5. Stripe Checkout

Voir `PAYMENT.md` pour détails complets.

**Key points :**
- Hosted checkout Stripe (pas custom) pour simplicité + sécurité
- Apple Pay + Google Pay auto-détectés par Stripe
- Email collecté (pour livraison)
- Métadonnées attachées : orderId, categoryId, locale

### 6. Page producing (loading)

**Le challenge** : 60-90s c'est long. Il faut occuper l'utilisateur.

**Structure :**

```
[Timer cinéma : 00:00 / 01:30 animé]

"Scene · 001 · Take 01"

[Messages rotatifs, change toutes les 12s]
→ "Le réalisateur prépare l'éclairage..."
→ "Maquillage en cours sur le talent..."
→ "Le chef op' cadre la scène..."
→ "Silence plateau..."
→ "Moteur..."
→ "Action !"

[Loading bar cinéma, film strip style]

[En dessous] 
Pendant que tu attends, regarde d'autres chats en action :
[Mini reel de 3 vidéos d'exemples qui loopent]

[Email rappel]
La vidéo arrive sur : jean@example.com ·
Tu peux fermer cette page, on t'enverra un lien.
```

**Technique :**
- Polling `/api/order/[id]` toutes les 3 secondes
- Quand status = `done`, redirect vers `/final-cut/[orderId]`
- Timeout à 5 minutes : si toujours pas prêt, message "La production prend plus de temps que prévu, on t'envoie la vidéo dès qu'elle est prête"

### 7. Page final-cut (livraison)

**Structure :**

```
[GRAND TITRE]
THAT'S A WRAP.

[Vidéo en gros, autoplay, loop, controls]

[CTAs]
[📥 Télécharger HD]   [📤 Partager sur TikTok]
[↗ Copy link]

───────────────────────

[CROSS-SELL]
"Ton chat vient de tuer le rôle de pianiste.
 Et si on l'essayait en ninja samouraï ?"

[Grid de 4 autres catégories avec preview]
[Bouton "Nouvelle scène · 0,99€"]

───────────────────────

[Footer]
Un email avec tes liens a été envoyé.
Il reste valide 48h.
```

**Clés :**
- Vidéo autoplay dès arrivée sur la page (cerveau en mode "wow")
- Boutons de partage natifs (Web Share API sur mobile)
- Le cross-sell apparaît après 3 secondes (laisser la dopamine monter d'abord)
- La photo uploadée est conservée 30 min pour permettre cross-sell rapide sans re-upload

### 8. Email de livraison

**Subject :**
```
🎬 Le screen test de [ton chat] est prêt
```

**Body :**
```
[Header cream paper avec logo MeowReel]

Bravo. C'est dans la boîte.

[Thumbnail vidéo cliquable, 4:3 frame cinéma]

[Bouton or : "Récupérer le montage final"]

Lien direct : https://meowreel.com/final-cut/MR-4A7X2K?t=abc...
Valide 48h · Télécharge avant que le clap ne tombe.

---

Tu veux d'autres scènes ?

[3 cards de catégories avec CTAs rapides]

---

MeowReel Studios · Produit à Nice, France
```

---

## Regles métiers importantes

### Ce qu'on fait

- ✅ Livrer en < 5 min dans 95% des cas
- ✅ Retry automatique 1x si échec Replicate (avec modèle de fallback)
- ✅ Support email humain si pb (ton@meowreel.com)
- ✅ Refund manuel si vraiment pas content (via Stripe)

### Ce qu'on fait PAS (V1)

- ❌ Pas de système de compte / login
- ❌ Pas de gallery publique des créations (privacy par défaut)
- ❌ Pas de referral (demandé retiré par le founder)
- ❌ Pas de "surprise me" (demandé retiré par le founder)
- ❌ Pas de génération de vidéos > 10s (économiquement pas viable à 0,99€)
- ❌ Pas de custom prompt (on garde le contrôle qualité)
- ❌ Pas de contenu suggestif / adulte / violent

### Content policy

Dans les CGU + filtrage basique :
- Pas d'humain identifiable sur la photo (que des animaux)
- Pas de contenu sexualisé, violent, haineux dans les prompts
- Si photo douteuse → review manuelle avant génération (rare)

---

## États d'une commande (machine à états)

```
draft
  │  [user upload photo + chose catégorie]
  ↓
awaiting_payment
  │  [Stripe checkout created, user redirected]
  ↓
paid
  │  [Stripe webhook received, job enqueued]
  ↓
processing
  │  [Replicate job running]
  ↓
done
  │  [Video downloaded + stored, email queued]
  ↓
delivered
  │  [Email sent, user notified]
  
  
  (états d'erreur)
  
paid / processing → failed
  [retry automatique 1x avec fallback model]
  → si toujours fail → refund auto via Stripe + email excuse
```

---

## Variables de conversion à optimiser

Ces variables doivent être **a/b testables** :

1. **Prix unitaire** : 0,99 vs 1,49 vs 1,99
2. **Preview gratuit** : présent ou pas
3. **Position du CTA upload** : haut ou milieu
4. **Auto-play hero video** : on/off
5. **Bundle pushed** : trio mis en avant ou pas
6. **Loading time perçu** : messages à chaque 8s / 12s / 15s
7. **Cross-sell timing** : apparaît immédiatement ou après 3s

Pour V1, on teste 1 variable à la fois en changeant la valeur pour tout le traffic, sur des périodes de 48h minimum. Pas de split testing complexe au début.

---

## Edge cases à gérer

| Cas | Comportement |
|---|---|
| User paye mais ferme la page | Email arrive quand même, pas de souci |
| Replicate down | Fallback sur Wan 2.2, puis retry, puis refund auto après 10 min |
| User upload une photo sans chat | On génère quand même, c'est à son risque (CGU) |
| User demande refund après livraison | Case-by-case, via Stripe, pas auto |
| Email de l'user rebondit | On log, on essaie de contacter via le paiement Stripe |
| Plusieurs paiements sur la même photo | On génère tout normalement |
| Photo trop petite / corrompue | Rejet à l'upload côté client, message clair |
| VPN / IP suspecte | Pas de block V1, watch avec fraud monitoring Stripe |
