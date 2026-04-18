# MeowReel · DESIGN2.md

> **Ce fichier remplace DESIGN.md.** On pivot d'un concept "bureau casting cartoon" (trop sage, trop adulte, trop neutre) vers quelque chose qui correspond vraiment au marché TikTok et à la personnalité Ajwad : coloré, énergique, nostalgique, fun.

---

## Le nouveau concept en une phrase

**MeowReel est un Tamagotchi Y2K géant où ton chat est la superstar, un club de rêve rose-violet-jaune où chaque photo de chat devient une vidéo virale en 60 secondes pour 0,99€.**

Inspiration principale : **Y2K dream club revival × Tamagotchi 2001 × mixtape covers SoundCloud × TikTok native**.

---

## Les 5 règles fondatrices (ne jamais les oublier)

### 1. Le premier frame doit donner envie de payer

Dès que le user arrive, en 2 secondes il doit voir **un chat en train de faire un truc viral** et penser *"je veux ça pour mon chat"*. Pas de hero text à lire, pas de onboarding. La démo visuelle instantanée est la pub.

### 2. Mobile first absolu

79% des ventes viendront du mobile. Tout est pensé portrait 375px d'abord, desktop en bonus. Si ça marche pas sur iPhone SE, ça marche pas.

### 3. Un seul bouton visible à la fois

Pas de menus, pas de tabs, pas de catégories éparpillées. À chaque étape il y a **un seul truc à faire** qui est énorme, coloré, impossible à rater. On guide par la main.

### 4. Dopamine avant transaction

Le user voit **son chat** dans une catégorie AVANT de payer. Preview gratuit fix (image) = il a déjà l'émotion du résultat avant de sortir la CB. Son cerveau a déjà acheté.

### 5. Tous les éléments vivent

Rien n'est statique. Pas d'images fixes. Les polaroids bougent, les backgrounds pulsent, les boutons wiggle, les stickers scintillent. Ça doit avoir **l'énergie d'un clip musical**, pas d'une page web.

---

## Le visuel : Dream Club × Tamagotchi

### Le fond principal

Pas un fond plat. Un **fond animé en couches** :

**Couche 1 — Background gradient animé**
- Gradient radial qui pulse lentement (cycle 8s)
- Couleurs qui transitionnent doucement entre : rose bonbon → pêche → lavande → rose bonbon
- Mouvement très subtil, pas agressif

**Couche 2 — Blobs flous**
- 3-4 taches floues (`filter: blur(80px)`) qui flottent
- Couleurs saturées : magenta, cyan, jaune, orange
- Animent en boucle avec `translateX/Y` doux (cycle 20s chacun)
- Créent une profondeur liquide, sensation de "club dreamy"

**Couche 3 — Stars / sparkles**
- 15-20 petites étoiles SVG 4-branches (style sparkle années 2000)
- Scintillent en `opacity` random, tailles variées 6-14px
- Quelques grosses étoiles chrome qui tournent lentement
- Couleurs : blanc, jaune doré, rose, cyan

**Couche 4 — Grain noise**
- Overlay très subtil de grain (3-5% opacity)
- Texture papier photocopié, donne de la matière

**Couche 5 — Vignette**
- Léger assombrissement sur les bords (15%)
- Focalise l'attention au centre

### Éléments Tamagotchi intégrés

**Cadre principal = coque de Tamagotchi**
- Le contenu principal (hero, upload, catégories) est **dans un écran LCD** entouré d'une coque plastique jaune ou rose translucide
- La coque a des reflets brillants (highlights blancs semi-transparents)
- 2 petits boutons en dessous de l'écran (décoratifs ou fonctionnels pour navigation)
- Effet "on tient un Tamagotchi dans la main"

**Écran LCD**
- Fond légèrement gris-vert pâle `#D4E5D4` OU fond lavande crème `#F5E8FF`
- Les éléments à l'intérieur sont **comme des sprites** qui animent avec un léger effet pixelisé sur les contours
- Cadre noir fin autour (2-3px noir solide)

**Stats affichées autour du chat (gamification)**
Quand ton chat apparaît en preview, autour de lui s'affichent :
- `FAME ▓▓▓▓░░ 67%` (progress bar pixelisée)
- `DRAMA ▓▓▓▓▓▓ 94%`
- `VIBES ▓▓▓▓▓░ 82%`
- Ces stats sont **générées aléatoirement et de façon drôle**, juste pour le fun du screenshot TikTok

---

## Palette

```css
:root {
  /* Hero saturés */
  --mr-pink-hot:      #FF3EA5;  /* rose bonbon principal */
  --mr-pink-soft:     #FFB8D9;  /* rose pastel */
  --mr-peach:         #FFA07A;  /* pêche chaud */
  --mr-orange-tang:   #FF7A3C;  /* orange tangerine */
  --mr-yellow-pop:    #FFED4A;  /* jaune poussin fluo */
  --mr-yellow-gold:   #F5C842;  /* jaune doré chrome */
  --mr-cyan-dream:    #7DDFFB;  /* cyan rêveur */
  --mr-violet-deep:   #6B3FA0;  /* violet profond */
  --mr-lavender:      #B8A5E3;  /* lavande douce */
  --mr-green-mint:    #A8E6CF;  /* vert mint retro */

  /* Neutres chaleureux */
  --mr-cream:         #FFF4E0;  /* crème chaud */
  --mr-black-soft:    #1A1324;  /* noir violet */
  --mr-white-pure:    #FFFFFF;  /* blanc pur pour chrome */

  /* Stamp / CTA */
  --mr-red-love:      #FF3B47;  /* rouge cerise pour CTA urgent */

  /* Tamagotchi plastic */
  --mr-plastic-pink:  rgba(255, 180, 210, 0.85);
  --mr-plastic-yellow:rgba(255, 230, 130, 0.85);
  --mr-plastic-blue:  rgba(180, 220, 255, 0.85);

  /* LCD screen */
  --mr-lcd-bg:        #F5E8FF;  /* lavande crème pour écran */
  --mr-lcd-border:    #1A1324;  /* bordure écran noire */
}
```

### Règles d'usage

- **CTA principal** : jaune `--mr-yellow-pop` avec texte noir, ou rose hot + texte blanc
- **Accents paillettes** : jaune doré + cyan
- **Texte principal** : noir `--mr-black-soft` ou crème selon le fond
- **Backgrounds sections** : gradients entre 2-3 couleurs de la palette
- **Jamais de gris pur** : toujours teinté (gris-rose, gris-violet)
- **Jamais de gradient fade-to-white** : toujours gradient coloré
- **Saturation TOUJOURS haute**, jamais de couleurs fades

---

## Typographie

### Stack

```css
--font-display:    'Migra', 'Editorial New', 'Eczar', serif;   /* gros titres italiques bold */
--font-bold:       'Druk Wide', 'Anton', 'Bebas Neue', sans;   /* condensed ultra bold */
--font-pixel:      'Silkscreen', 'Press Start 2P', monospace;  /* labels LCD pixel */
--font-chrome:     'Orbitron', 'Exo 2', sans;                  /* chrome text effect 3D */
--font-body:       'Satoshi', 'Inter', -apple-system;          /* body standard */
--font-handwritten:'Caveat', 'Shadows Into Light', cursive;    /* annotations, prix */
```

### Usage

| Contexte | Font | Size | Traitement |
|---|---|---|---|
| Hero title "YOUR CAT STAR" | `--font-bold` condensed | clamp(4rem, 12vw, 8rem) | italic, text-stroke 2px noir, fill jaune ou rose |
| Category names | `--font-display` italic | 2rem | italic bold, rose hot |
| CTA "MAKE IT HAPPEN" | `--font-bold` | 1.5rem | uppercase, tracking 0.05em, chrome shadow |
| LCD stats "FAME 67%" | `--font-pixel` | 0.75rem | uppercase, color noir |
| Prix "0,99€" | `--font-handwritten` | 2rem | rotation -5°, souligné main |
| Body / FAQ | `--font-body` | 1rem | ligne normale |
| Tamagotchi brand "MEOWREEL" | `--font-chrome` | 1.2rem | chrome effect 3D |

### Chrome text effect

Pour les titres signature (le nom "MeowReel", certains CTAs importants) :

```css
.chrome-text {
  background: linear-gradient(180deg,
    #FFFFFF 0%,
    #C8D3E8 30%,
    #5A6B85 50%,
    #2A3445 60%,
    #5A6B85 75%,
    #C8D3E8 90%,
    #FFFFFF 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow:
    1px 1px 0 rgba(0,0,0,0.4),
    2px 2px 0 var(--mr-pink-hot),
    3px 3px 0 rgba(0,0,0,0.3);
  font-style: italic;
  letter-spacing: -0.02em;
}
```

### Text stroke (outline épais coloré)

Pour les gros titres pop :

```css
.pop-title {
  color: var(--mr-yellow-pop);
  -webkit-text-stroke: 3px var(--mr-black-soft);
  text-shadow:
    4px 4px 0 var(--mr-pink-hot),
    6px 6px 0 var(--mr-black-soft);
}
```

---

## Le landing : flow visuel étape par étape

### État 0 — Arrivée (0-2 secondes critiques)

**Ce que le user voit en moins d'1 seconde :**

```
┌─────────────────────────────────────────┐
│  [Background gradient rose-violet-jaune │
│   qui pulse, sparkles qui scintillent]  │
│                                         │
│     ⭐ ✨        ⭐                     │
│                                         │
│   ┌─────────────────────────┐           │
│   │  [POLAROID VIDÉO LOOP]  │  ← Chat qui joue trompette  │
│   │  Chat jazz trumpet      │    sur porch nocturne,     │
│   │  en gros au centre       │   preview LE trend Sora 2 │
│   │                          │                            │
│   │  Stats overlay :         │                            │
│   │  FAME  ▓▓▓▓▓░ 89%       │                            │
│   │  VIBES ▓▓▓▓▓▓ 96%       │                            │
│   └─────────────────────────┘           │
│                                         │
│   YOUR CAT.                             │
│   [STAR.] ← en jaune pop text-stroke    │
│                                         │
│   [UPLOAD YOUR CAT · 0,99€]             │
│   ← Bouton jaune énorme pulsant          │
│                                         │
│   🌟 2,847 cats went viral this week 🌟 │
└─────────────────────────────────────────┘
```

**Ce qu'il comprend instantanément :**
1. C'est un truc pour son chat (il voit un chat)
2. Le résultat est viral (il voit un chat qui fait un truc dingue)
3. Ça coûte 1€ (visible sur le CTA)
4. Il y a un seul bouton à presser

**Temps max pour comprendre : 2 secondes.** Si son oeil met plus, on a raté.

### État 1 — Hover / scroll (3-10s)

Au scroll léger ou après 3s :

```
┌─────────────────────────────────────────┐
│ [Polaroid vidéo 1]  [Polaroid vidéo 2]  │
│ Chat pianiste       Chat footballeur     │
│                                         │
│ [Polaroid vidéo 3]  [Polaroid vidéo 4]  │
│ Chat danseur K-pop  Chat ninja           │
│                                         │
│ ↓ MORE VIBES BELOW ↓                    │
│                                         │
│ TRENDING NOW 🔥                         │
│ [carousel horizontal des 6 scènes]      │
│                                         │
└─────────────────────────────────────────┘
```

Chaque polaroid = vidéo qui loop en auto, hover desktop = légère scale, tap mobile = preview plus grande.

### État 2 — Upload (one tap away)

User tap l'énorme CTA. Ça ouvre direct :

**Sur mobile :**
- Bottom sheet qui slide up
- Options : `📸 Take a photo` / `🖼️ Pick from library`
- Pas de formulaire, pas de texte de merde, juste 2 boutons énormes

**Sur desktop :**
- Modal centered avec dropzone énorme qui wiggle
- Texte "Drop your cat here or click to browse"
- Apparaît un chat illustré qui "attend" avec les yeux qui bougent

**Après upload :**
- Animation : la photo se transforme en polaroid qui "pop" (scale + rotate bounce)
- Shake screen léger
- Apparaît confetti de sparkles
- Message : "Perfect. Now pick your cat's moment."

### État 3 — Choose category

Une grille en plein écran, full-bleed mobile :

```
┌─────────────────────────────────────────┐
│  PICK YOUR CAT'S MOMENT                 │
│  ───────────────────────                │
│                                         │
│  🔥 TRENDING NOW                        │
│  ┌────┐ ┌────┐ ┌────┐                  │
│  │vid1│ │vid2│ │vid3│ →                │
│  └────┘ └────┘ └────┘                  │
│                                         │
│  🎵 MUSIC LEGENDS                       │
│  ┌────┐ ┌────┐ ┌────┐                  │
│  │piano│ │dj  │ │jazz│ →                │
│  └────┘ └────┘ └────┘                  │
│                                         │
│  ⚽ SPORTS HEROES                       │
│  ┌────┐ ┌────┐ ┌────┐                  │
│  │foot│ │box │ │surf│ →                │
│  └────┘ └────┘ └────┘                  │
│                                         │
│  💃 DANCE FLOOR                         │
│  [carousel]                              │
│                                         │
└─────────────────────────────────────────┘
```

**Chaque card** :
- Vidéo loop 3s (WebM < 80KB)
- Nom en bold display italic
- Hover/tap : scale + glow effect jaune
- Click : toute la card devient le centre, les autres s'estompent

### État 4 — Preview de LEUR chat (dopamine peak)

Le user a choisi "Chat pianiste" par exemple. On lui génère **une image fixe** (Flux dev ~$0.003) de SON chat dans cette scène.

```
┌─────────────────────────────────────────┐
│                                         │
│   [IMAGE FIXE générée de SON chat       │
│    en pianiste, cadre polaroid,         │
│    qui tremble d'excitation]            │
│                                         │
│                                         │
│   FAME  ▓▓▓▓▓▓ 94%                      │
│   DRAMA ▓▓▓▓▓░ 78%                      │
│   VIBES ▓▓▓▓▓▓ 99%                      │
│                                         │
│                                         │
│   [▶ MAKE IT A VIDEO · 0,99€]           │
│   ← Jaune énorme pulsant                │
│                                         │
│   ✨ Delivery in 60 seconds ✨          │
│                                         │
└─────────────────────────────────────────┘
```

**Clé psychologique** : à ce stade le user VOIT déjà son chat transformé. La dopamine est peak. Taper le bouton = libération. C'est LE moment critique de la conversion.

### État 5 — Bundle selector (upsell minimal)

Avant checkout, offre rapide :

```
┌─────────────────────────────────────────┐
│   1 VIDEO         3 VIDEOS*      10 VIDEOS│
│   0,99€           2,49€          6,99€    │
│                   ↑ popular                │
│                                             │
│   [CONTINUE]                                │
└─────────────────────────────────────────┘
```

Simple. 1 seul choix par défaut highlighted (Trio). Un tap, next.

### État 6 — Checkout Stripe

Hosted Stripe. Apple Pay/Google Pay. 1 tap.

### État 7 — Producing (loading pendant 60s)

Remplacement du "projecteur 16mm" par quelque chose de plus Y2K :

```
┌─────────────────────────────────────────┐
│                                         │
│   [TAMAGOTCHI SCREEN]                    │
│   ┌───────────────────┐                 │
│   │                    │                 │
│   │  [chat illustré    │                 │
│   │   qui saute,       │                 │
│   │   anime sprite]    │                 │
│   │                    │                 │
│   │  PRODUCING...      │                 │
│   │  ▓▓▓▓░░░░ 47%      │                 │
│   └───────────────────┘                 │
│                                         │
│   "Minou is learning the choreo..."     │
│   (message qui change toutes les 10s)   │
│                                         │
│   ✨ You can close this, we'll email ✨ │
│                                         │
└─────────────────────────────────────────┘
```

Messages rotatifs Y2K fun :
- "Minou is learning the choreo..."
- "Lights. Camera. Whiskers."
- "Auto-tuning the meows..."
- "The director is hyped..."
- "Post-processing the drama..."
- "Adding ✨ sparkles ✨..."
- "Almost ready for the premiere..."

### État 8 — Livraison (dopamine release)

```
┌─────────────────────────────────────────┐
│                                         │
│   🎉 IT'S LIVE! 🎉                      │
│                                         │
│   [VIDEO AUTOPLAY plein écran           │
│    de leur chat en action]              │
│                                         │
│   [📥 DOWNLOAD HD] [📤 SHARE TIKTOK]    │
│                                         │
│   ───────────────────────                │
│                                         │
│   WANT MORE?                             │
│   [Your cat as a DJ 🎧]                 │
│   [Your cat as a ninja 🥷]              │
│   [Your cat as a footballer ⚽]         │
│                                         │
│   + UPSELL pulse animation sur les cards │
│                                         │
└─────────────────────────────────────────┘
```

---

## Les catégories viraux qui marchent EN CE MOMENT

Priorité absolue pour V1, c'est ce qui va générer les achats :

### Section 1 — TRENDING (le trend Sora 2)

1. **Midnight Porch Musician** — chat nocturne sur perron joue instrument (LE trend, 6M+ vues)
2. **Ring Doorbell Chaos** — esthétique caméra de porte, chat qui fait du bruit à 3h
3. **Drive-Through Worker** — chat qui bosse au comptoir d'un fast-food
4. **News Anchor 3AM** — chat présente le JT de la nuit
5. **Restaurant Waiter** — chat serveur qui apporte l'addition
6. **Security Cam Confused Cat** — chat qui fait un truc suspect vu en caméra de sécurité

### Section 2 — MUSIC (les plus viraux)

7. **Jazz Trumpet** — chat smoking jazz club enfumé
8. **Rock Guitarist** — chat guitare électrique concert
9. **DJ Club Set** — chat aux platines fog machine
10. **Classical Pianist** — chat frac queue de pie
11. **Rap Booth** — chat au mic studio
12. **K-pop Idol** — chat choré K-pop néons
13. **Accordion Paris** — chat béret accordéon rue parisienne
14. **Orchestra Conductor** — chat chef d'orchestre

### Section 3 — SPORTS (énorme sur TikTok)

15. **Football Goal Celebration** — chat marque un but au Stade de France, sprint vers caméra
16. **Boxing Ring Knockout** — chat boxeur qui célèbre victoire
17. **Surfer Wave** — chat sur planche, vague géante
18. **Basketball Dunk** — chat qui dunk sur NBA court
19. **Tennis Champion** — chat qui soulève le trophée Roland Garros
20. **F1 Driver** — chat en combi F1 sur podium champagne
21. **Skater Trick** — chat qui rider en street
22. **Gymnast Gold** — chat médaille d'or olympique

### Section 4 — DANCE (TikTok natif)

23. **TikTok Trend Dance** — chat fait la choré virale du moment
24. **Ballet Classical** — chat en tutu sur scène Opéra
25. **Disco 70s** — chat costard blanc boule disco
26. **Breakdance** — chat qui fait du break carton au sol
27. **Salsa Couple** — chat danse salsa avec partenaire
28. **Ballroom Waltz** — chat valseur robe de bal

### Section 5 — CINEMATIC (les rôles rêvés)

29. **Ninja Night** — chat ninja tout en noir rooftop Tokyo
30. **Samouraï Edo** — chat samouraï armure katana décor Edo
31. **Cowboy Far West** — chat cowboy chapeau saloon
32. **Astronaut NASA** — chat combinaison ISS ou lune
33. **Gladiator Rome** — chat au Colisée armure romaine
34. **Viking Warrior** — chat viking casque longship
35. **Pirate Caribbean** — chat pirate bandana bateau
36. **Anime Hero** — chat style Ghibli vent dans les cheveux

### Section 6 — MOMENTS (cross-sell émotionnel)

37. **Birthday Party** — chat chapeau pointu gâteau bougies
38. **Wedding Day** — chat en costume/robe autel
39. **Christmas Eve** — chat père Noël ou elfe sapin
40. **Halloween** — chat costumé citrouilles
41. **Graduation** — chat toque universitaire diplôme

**Total V1 : 41 scènes.** Toutes les 6 sections sont visibles dès la landing, scroll horizontal mobile.

---

## Composants UI (tous à faire en React)

### MrScreen (Tamagotchi frame)
Wrapper principal. Écran LCD + coque plastique.

### MrButton
- Variants : `primary` (jaune pop), `secondary` (rose), `chrome` (metallic)
- Toujours avec hover scale 1.03 + shadow intensification
- Font : `--font-bold` uppercase
- Padding généreux : 1.5rem 3rem
- Border-radius : 999px (pill) ou 12px selon contexte

### MrPolaroid (vidéo card)
- Cadre polaroid blanc cassé `--mr-cream`
- Rotation random -4° à +4°
- Shadow 2 niveaux : `drop-shadow(0 8px 16px rgba(0,0,0,0.2))`
- Vidéo loop auto (Intersection Observer throttle)
- Stats overlay Tamagotchi au survol

### MrStatsBar (pixel progress)
- Label pixel font : `FAME`
- Bars faites de caractères `▓` et `░` ou SVG pixel
- Couleurs dégradées selon la stat

### MrSparkle
- Étoile 4-branches SVG
- Animation CSS `scale + opacity`
- Delay random pour éviter synchro

### MrChromeText
- Wrapper qui applique l'effet chrome 3D aux text

### MrCategoryCard
- Card avec vidéo preview en fond
- Titre en bas en display italic
- Hover : scale + glow jaune + shake léger

### MrBottomSheet (mobile upload picker)
- Slide up depuis bas
- 2 gros boutons : camera / gallery
- Backdrop blur derrière

### MrConfetti (post-upload celebration)
- Burst de sparkles + stickers qui tombent
- Dure 2 secondes

---

## Animations clés

### Hero qui pulse (0-infini)
- Background gradient cycle de 8s
- Blobs floutés translate en boucle 20s
- Sparkles : `opacity` random toutes les 1-3s

### Upload success
- Photo devient polaroid avec bounce `spring(1.2, 0.4)` sur scale
- Rotation de 15° puis settle à 3°
- Confetti burst
- Screen shake léger

### Category hover
- Scale 1.05 sur 300ms cubic-bezier
- Glow jaune appears en 200ms
- Légère rotation ±2° (wiggle)

### CTA principal pulse
- Scale 1.0 → 1.03 → 1.0 en 2s loop
- Shadow intensifie synchrone

### Preview reveal
- Image fade in over 1s
- Stats s'écrivent une à une en pixel style (500ms delay entre chaque)
- Bouton apparaît après 1.5s avec shake invitation

### Processing
- Chat Tamagotchi sprite anime en boucle (2 frames alt)
- Progress bar se remplit chunk par chunk (pixel steps)
- Messages crossfade 300ms

### Delivery celebration
- Video fullscreen fade in
- Confetti global
- Stickers "OMG" "WOW" "VIRAL" qui tombent en cascade
- CTAs apparaissent staggered

---

## Performance (critique)

### Contraintes mobile

- **LCP < 2s** : hero image optimisée, preload
- **Bundle JS < 150KB gzip** initial
- **Vidéos preview** : `poster` toujours fourni, lazy load via Intersection Observer
- **50 polaroid vidéos visibles** : ne JAMAIS jouer plus de 6 en parallèle (throttle queue)
- **Throttling save-data** : si `navigator.connection.saveData === true`, passer en mode poster-only avec tap-to-play

### Optimisations

- Images : `next/image` avec `priority` seulement sur hero
- Fonts : `next/font` avec `display: swap` + preload variable fonts
- CSS : utiliser `transform` et `opacity` pour les animations (jamais `width/height/top/left`)
- Video : WebM VP9 < 80KB chacune, H264 fallback pour Safari iOS 14-

---

## Responsive

### Mobile (375px - 767px) : l'expérience principale

- Fullscreen immersif
- 1 scène visible à la fois
- Scroll vertical + swipe horizontal dans les sections
- CTAs en bottom sticky (toujours dans le thumb zone)
- Bottom sheet pour upload picker
- Le Tamagotchi frame prend 90% width, centered

### Tablet (768px - 1023px) : mode hybride

- Tamagotchi frame 60% width
- 2 polaroids par row dans les grilles
- CTAs plus gros mais pas sticky

### Desktop (1024px+) : grand format

- Tamagotchi frame max-width 1200px
- Background gradient + blobs prennent toute la fenêtre autour
- 3-4 polaroids par row dans les grilles
- Navigation horizontale dans sections (pas de scroll latéral)

---

## Tone of voice (copy)

### Principes

1. **Courte, punchy, anglais-friendly mais OK français direct**
2. **Ton amis-se-charrient-en-club**, jamais formel
3. **Un peu dramatique, un peu ironique**
4. **Pas de "Let's!", pas de "Amazing!", pas de SaaS bullshit**
5. **Vocabulaire spécifique récurrent** :
   - "Star", "moment", "vibe", "viral", "drama", "OMG"
   - "Cast", "debut", "premiere", "release"
   - "Stream", "drop", "snap"

### Exemples

**Hero**
> YOUR CAT. **STAR.**
> 0,99€ · delivered in 60 seconds

**Sub-hero**
> 2 847 cats went viral this week. Your turn?

**Upload CTA**
> **UPLOAD YOUR CAT**
> 0,99€ · ready in a minute

**Upload modal**
> Drop your star ↓
> (or tap to pick from gallery)

**Preview reveal**
> Meet the new [nom catégorie].
> Press play to make it real.

**CTA payer**
> **MAKE IT A VIDEO · 0,99€**

**Loading messages**
- "Minou is learning the choreo..."
- "Lights. Camera. Whiskers."
- "The director is hyped..."
- "Auto-tuning the meows..."
- "Adding ✨ sparkles ✨..."
- "Almost ready for the premiere..."

**Delivery**
> **IT'S LIVE.**
> Post it. Watch it explode.

**Error**
> Hmm, that didn't land.
> [TRY AGAIN]

**404**
> This scene got cut.
> [BACK TO THE STAGE]

**Email subject**
> 🎬 [Nom chat] just went live

---

## Anti-patterns (ne JAMAIS faire)

- ❌ Couleurs pastel fade (on est pas Headspace)
- ❌ Minimalisme blanc (on est pas Apple)
- ❌ Gradient vers blanc (tue l'énergie)
- ❌ Icons Heroicons/Lucide génériques (on fait du custom SVG)
- ❌ Emojis éparpillés partout dans l'UI (1-2 par page max, dans CTAs ou copy fun)
- ❌ Corporate illustrations style Notion (on est pas un SaaS)
- ❌ Fonts géométriques pures (Inter, Poppins) en display
- ❌ Hover states subtils (tout doit être EXPRESSIVE)
- ❌ Plus d'un CTA visible à la fois
- ❌ Texte de +3 lignes quelque part sur la landing
- ❌ Footer en small grey text (même le footer est coloré)

---

## Références visuelles à ouvrir AVANT de coder

Vraiment, scroll ces sites 5-10 min pour absorber l'énergie :

1. **bandlab.com** — vibe Y2K colorée audio
2. **yeti.coffee** (old version) — couleurs saturées, typography bold
3. **discord.com** (landing) — énergie, gros titres, illustrations
4. **https://dribbble.com/tags/y2k** — recherche Y2K sur Dribbble
5. **https://www.are.na/search?q=tamagotchi+aesthetic**
6. **Carti mixtape covers** (Whole Lotta Red, Die Lit) — chrome text, dark dream
7. **Tyler The Creator Igor album art** — palettes saturées inattendues
8. **Yung Lean early covers** — dream sad boy
9. **Nintendogs UI screenshots** — cuteness + gamification
10. **Tamagotchi original photos** — référence produit
11. **https://www.instagram.com/sinkforest/** — aesthetic Y2K dream
12. **TikTok #y2kaesthetic** — scroll 20 videos pour absorber

---

## Checklist avant de valider un écran

- [ ] Est-ce que c'est **coloré et vibrant** ?
- [ ] Est-ce qu'il y a **un seul CTA évident** au-dessus du pli ?
- [ ] Est-ce qu'une vidéo de chat qui joue loop quelque part ?
- [ ] Est-ce que le prix **0,99€** est visible ?
- [ ] Le titre est-il en **gros gros gros** (min 3rem sur desktop, clamp) ?
- [ ] Au moins **5 éléments animés** en permanence (sparkles, blobs, text, etc.) ?
- [ ] Le design marche sur **iPhone SE 375px** sans scroll latéral ?
- [ ] Zero text plus long que 4 mots sur un CTA ?
- [ ] Au moins **2 éléments Tamagotchi** (screen LCD, stats bar, coque plastique, etc.) ?
- [ ] Font display en italic bold quelque part ?
- [ ] Zero couleur grise pure ?
- [ ] Ça ressemble à **aucun autre outil AI** existant ?
- [ ] Si je screenshot cette page et je la post sur TikTok, est-ce que les gens vont **screenshot et partager** ?

Si un seul non → refais.

---

## Assets à générer via Replicate

Le token est maintenant dans `.env` (`REPLICATE_API_TOKEN`).

### Backgrounds à générer

Prompts Flux Schnell (rapide, $0.003/image) :

**Bg gradient base (desktop)** :
```
"dreamy Y2K aesthetic gradient background, soft pink peach lavender cyan,
cloudy gradient, sparkles, 1999 digital art, Sanrio vibes meets vaporwave,
ultra smooth blend, high resolution, 2048x1536"
```

**Blobs floutés (à extraire ou générer transparents)** :
```
"abstract liquid blob shape, single isolated blob, hot pink magenta gradient,
transparent background, soft blur, Y2K aesthetic, PNG cutout, 1024x1024"
```
Plus variantes : cyan, yellow, violet.

**Stickers Y2K** (collection):
```
"Y2K sticker collection, single sticker isolated on transparent:
[OMG, VIRAL, STAR, WOW, HOT, NEW, LIVE], chrome text effect,
bold italic, 2001 aesthetic, PNG, 512x512, black outline"
```

**Tamagotchi plastic frame** :
```
"3D render of a translucent plastic Tamagotchi shell frame,
empty center for content, warm yellow plastic with reflections,
top-down view, soft studio lighting, cutout PNG, 1024x1024"
```
Plus variante rose, bleu.

**Cat illustration running** (pour loading state):
```
"simple pixel art cat sprite, 2-frame animation running,
Y2K aesthetic, 8-bit style, warm orange tabby,
transparent background, 256x256"
```

### Previews catégories (WebM < 80KB)

Pour chaque catégorie (41 au launch), générer via Seedance 2.0 Fast une vidéo 3s de chat dans cette scène, puis encoder en WebM.

Script à créer : `scripts/generate-previews.ts` qui itère les 41 catégories, génère, download, ffmpeg encode.

Budget total : 41 × $0.05 = **~$2.05 pour tous les previews**.

### Sounds (optionnels)

Pas de son par défaut. Toggle discret pour activer ambiant Y2K (une nappe synth dreamy + blips Tamagotchi).

Source : Freesound.org gratuit ou Epidemic Sound si budget.

---

## Accessibility (quand même)

- Tout SVG a `role="img"` + `aria-label`
- Videos ont `aria-hidden="true"` par défaut (decorative)
- Gros texte display : `aria-hidden` sur les décorations, version `sr-only` clean pour screen readers
- Focus states visibles (ring jaune 3px)
- Animations respectent `prefers-reduced-motion`
- Contraste texte sur fond : min 4.5:1 vérifié

---

## Quick win maximum pour conversion

D'après la recherche sur l'impulse buy et les données TikTok :

1. **Premier frame = démo produit** ✓ (hero = vidéo live)
2. **Prix visible dès le début** ✓ (0,99€ sur le CTA)
3. **Social proof temps réel** ✓ ("2 847 cats this week")
4. **Dopamine avant CB** ✓ (preview fixe gratuit)
5. **Apple Pay en prio sur mobile** ✓ (Stripe Checkout auto)
6. **1 seul CTA par écran** ✓ (pas de menu, pas de nav)
7. **Urgence psychologique subtile** ✓ ("delivered in 60 seconds")
8. **Cross-sell au peak dopamine** ✓ (après livraison, avant fade)

---

## Résumé pour Claude Code

Tu construis **un Tamagotchi Y2K colorée** dont l'intérieur est **un club de rêve où les chats deviennent des stars**. Palette saturée rose/jaune/violet/cyan. Typography bold italic + chrome + pixel font. Tout anime en permanence. Mobile first absolu. Premier frame montre une vidéo de chat viral. Un seul bouton énorme à la fois. Preview gratuit du chat du user avant paiement = peak dopamine. 0,99€ visible partout.

Zero SaaS. Zero Notion. Zero dark corporate. Zero pastel washed out.

Si tu hésites, toujours **plus coloré, plus bold, plus fun**.
