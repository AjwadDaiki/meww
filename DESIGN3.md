# MeowReel · DESIGN3.md

> **Ce fichier remplace DESIGN.md et DESIGN2.md.** C'est la DA finale, validée.
> On abandonne la version "Tamagotchi cartoon fade" qui a produit un rendu cheap.
> On passe à du **tabloid Y2K scrapbook acide** : dense, bold, papier déchiré, couleurs agressives.
>
> **Si tu es Claude Code, lis ce fichier EN ENTIER avant de toucher un pixel.**

---

## 1. Le concept en une phrase

**MeowReel est un faux magazine tabloid pour chats stars, édition 2003, imprimé sur papier jauni, découpé aux ciseaux par une ado fan qui colle tout sur son mur avec du scotch, et entièrement consacré à transformer ton chat en célébrité virale pour 0,99€.**

Inspiration ancrée : **Sassy Magazine 2001** × **Lisa Frank stationery 2000** × **MTV Live branding 2003** × **scrapbook MySpace teenager 2004** × **Yung Lean early aesthetic 2012** × **Playboi Carti chrome typography**.

---

## 2. Les règles non négociables (à lire AVANT de coder)

### 2.1 — Zero scroll, single screen

Tout le contenu principal tient sur UN écran, mobile comme desktop. Pas de scroll vertical. Le user voit tout d'un coup. Les 41 catégories sont exposées via un **carrousel horizontal swipable**, pas via scroll vertical.

### 2.2 — Densité maximale

Au moins **20 éléments décoratifs visibles** à l'écran en permanence (stickers, post-its, bouts de papier déchiré, paillettes, flèches manuscrites, tampons, notes). C'est **un scrapbook**, pas une page Notion. Si ta page a l'air "clean et aérée", c'est raté.

### 2.3 — Densité en 3 secondes

Le user doit comprendre en 3 secondes maximum : *"c'est pour mon chat, c'est une vidéo, ça coûte 1€, je clique là"*. Si tu lui demandes de lire 2 phrases pour piger, c'est raté.

### 2.4 — Papier déchiré, pas découpé

Les bords des éléments (photos, catégories, post-its) sont **irréguliers, déchirés à la main**. Texture papier jauni visible sur les bords. Pas de rectangles nets. Pas de bordures droites. **Jamais de `border-radius` parfait**.

### 2.5 — Couleurs agressives, jamais fade

Toutes les couleurs sont **saturées à mort**. Si une couleur te semble "soft" ou "pastel fade", c'est FAUX. Pop acide 2001. Si tu hésites entre 2 teintes, prends la plus saturée.

### 2.6 — Les vidéos vivent partout

Chaque polaroid de catégorie loop une vraie vidéo de chat. Pas d'image statique. Si ça bouge pas, c'est raté.

### 2.7 — Un seul CTA énorme visible à la fois

Pas 3 boutons. Pas 5 choix. UN bouton principal, énorme, qui claque. Les autres actions sont secondaires visuellement.

### 2.8 — Le chat au centre

Après l'upload, le chat du user est **visuellement au centre de l'écran en permanence**, découpé en papier déchiré, bien mis en valeur. C'est la star.

---

## 3. La palette : pop acide 2001

Couleurs hex exactes. **Pas de variation autorisée.** Si tu veux une nuance, utilise les variables exactes.

```css
:root {
  /* Primaires pop acide (agressif assumé) */
  --mr-pink-shock:       #FF1E8E;  /* rose shocking Lisa Frank */
  --mr-pink-bubblegum:   #FF6BB5;  /* rose bubblegum */
  --mr-yellow-fluo:      #FFEE00;  /* jaune fluo highlighter */
  --mr-yellow-canary:    #FFD700;  /* jaune canari doré */
  --mr-cyan-pool:        #00D9F5;  /* cyan piscine */
  --mr-cyan-electric:    #1EFFFF;  /* cyan électrique */
  --mr-green-apple:      #5CFF3C;  /* vert Granny Smith */
  --mr-green-mint:       #A8FFCE;  /* vert mint pastel acide */
  --mr-red-tomato:       #FF3020;  /* rouge tomate */
  --mr-orange-neon:      #FF7A00;  /* orange néon */
  --mr-purple-grape:     #A020F0;  /* violet grappe */
  --mr-lavender-pop:     #D9A3FF;  /* lavande pop */

  /* Papier & textures */
  --mr-paper-aged:       #F4E6C2;  /* papier jauni vintage */
  --mr-paper-white:      #FBF7EC;  /* papier blanc cassé */
  --mr-paper-cream:      #F8EED9;  /* papier crème */
  --mr-paper-kraft:      #C9A876;  /* papier kraft */
  --mr-paper-stain:      #D4B87A;  /* tache jaunissement */

  /* Neutres chaleureux */
  --mr-black-ink:        #0A0811;  /* noir encre profond */
  --mr-ink-blue:         #1A2E8C;  /* bleu stylo bic */
  --mr-ink-red:          #D91424;  /* rouge correction */

  /* Chrome & metallic */
  --mr-chrome-silver:    #C8D3E8;  /* argent chrome */
  --mr-chrome-gold:      #FFD840;  /* or chrome */
}
```

### Règles d'usage strictes

- **Background principal** : `--mr-paper-aged` (jamais blanc pur)
- **CTA primaire** : fond `--mr-yellow-fluo` + texte `--mr-black-ink` (contraste violent garanti)
- **CTA secondaire** : fond `--mr-pink-shock` + texte `--mr-paper-white`
- **Titres tabloid** : `--mr-black-ink` en condensed ultra bold, parfois `--mr-red-tomato` pour les "EXCLUSIVE!"
- **Stickers "VIRAL!" "OMG!"** : rotations variées, mix de toutes les couleurs fluo
- **Texte principal body** : `--mr-black-ink` sur fond papier (jamais gris clair ni fade)
- **Annotations manuscrites** : `--mr-ink-blue` ou `--mr-ink-red` en Caveat
- **Paillettes sparkles** : `--mr-chrome-gold` + `--mr-pink-shock` + `--mr-cyan-electric`

### Anti-règles

- ❌ Jamais de `linear-gradient` qui fade vers du blanc ou du transparent
- ❌ Jamais de couleurs désaturées (tout est saturation 90%+)
- ❌ Jamais de gris neutre
- ❌ Jamais de `opacity` sous 80% sur les éléments principaux (sauf overlays)
- ❌ Jamais de pastels washed (si c'est pastel, c'est pastel **acide**, genre `--mr-green-mint`)

---

## 4. Typographie

### 4.1 — Stack complet

```css
--font-tabloid:        'Anton', 'Impact', 'Oswald', sans-serif;
  /* usage : titres tabloid ultra bold condensed */
--font-display-italic: 'Playfair Display', 'Cormorant Garamond', serif;
  /* usage : titres éditoriaux italiques */
--font-chrome:         'Orbitron', 'Exo 2', sans-serif;
  /* usage : chrome text effect, technology */
--font-handwritten:    'Caveat', 'Shadows Into Light', cursive;
  /* usage : annotations, prix, flèches */
--font-handwritten-bold: 'Permanent Marker', 'Rock Salt', cursive;
  /* usage : stickers manuscrits bold type marker */
--font-pixel:          'Silkscreen', 'Press Start 2P', monospace;
  /* usage : numéros de scène, stats pixel */
--font-body:           'Inter', 'Satoshi', sans-serif;
  /* usage : body FAQ, legal, rare */
```

**Toutes free Google Fonts sauf Satoshi (optionnel). Pas de font premium requise.**

### 4.2 — Usage par contexte

| Contexte | Font | Size | Couleur | Traitement |
|---|---|---|---|---|
| **Hero title** "MAKE YOUR CAT A STAR" | `--font-tabloid` | `clamp(3rem, 10vw, 7rem)` | `--mr-black-ink` avec outline `--mr-yellow-fluo` 4px | italic optionnel, rotation -2° |
| **Sub-headline** "0,99€ livré en 60s" | `--font-handwritten` | 1.5rem | `--mr-ink-red` | rotation -5°, souligné manuscrit |
| **Category titles** (dans polaroid) | `--font-display-italic` | 1.2rem | `--mr-black-ink` | italic bold |
| **Stickers** (VIRAL, OMG, etc.) | `--font-handwritten-bold` | variable 1rem-2.5rem | variable | rotation random ±15° |
| **CTA principal** "UPLOAD TON CHAT" | `--font-tabloid` | 1.8rem | `--mr-black-ink` sur fond jaune fluo | uppercase, tracking 0.02em |
| **Numéros scène** "SCENE 03 / 41" | `--font-pixel` | 0.85rem | `--mr-black-ink` | uppercase, tracking 0.15em |
| **Annotations manuscrites** | `--font-handwritten` | 1.1rem | `--mr-ink-blue` | rotation légère |
| **Prix gribouillés** "0,99€!" | `--font-handwritten-bold` | 2.5rem | `--mr-red-tomato` | rotation -8°, souligné 2 fois |
| **Brand chrome "MEOWREEL"** | `--font-chrome` | 1.5rem | chrome effect | italic |

### 4.3 — Effets texte signature

**Effet "outline thick + shadow offset"** (pour les hero titles) :
```css
.title-pop {
  color: var(--mr-yellow-fluo);
  -webkit-text-stroke: 4px var(--mr-black-ink);
  text-shadow:
    6px 6px 0 var(--mr-pink-shock),
    8px 8px 0 var(--mr-black-ink);
  font-weight: 900;
  letter-spacing: -0.01em;
  line-height: 0.9;
}
```

**Effet "chrome 3D"** (pour "MEOWREEL" brand) :
```css
.chrome-text {
  background: linear-gradient(180deg,
    #FFFFFF 0%,
    #C8D3E8 25%,
    #4A5A75 45%,
    #1A2438 55%,
    #4A5A75 70%,
    #C8D3E8 85%,
    #FFFFFF 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow:
    2px 2px 0 rgba(0,0,0,0.3),
    4px 4px 0 var(--mr-pink-shock);
  font-style: italic;
  letter-spacing: -0.02em;
  font-weight: 900;
}
```

**Effet "highlighter jaune"** (pour mots clés soulignés) :
```css
.highlighter {
  background: linear-gradient(180deg,
    transparent 60%,
    var(--mr-yellow-fluo) 60%,
    var(--mr-yellow-fluo) 90%,
    transparent 90%);
  padding: 0 0.1em;
}
```

---

## 5. Le layout : single screen zero scroll

### 5.1 — Desktop (1440×900 baseline)

**Layout en 12 colonnes grid, tout tient en 900px de haut.**

```
┌──────────────────────────────────────────────────────────────┐
│ [BACKGROUND papier jauni avec stickers scotchés en coins]     │
│                                                                │
│ ╔═══════════════════════╗  ╔══════════════════════════════╗  │
│ ║ [CHAT STAR]           ║  ║ HEADER                        ║  │
│ ║ Polaroid déchiré      ║  ║ MEOWREEL [chrome text]        ║  │
│ ║ 420×500px             ║  ║ "Edition #47 · April 2026"    ║  │
│ ║ Vidéo loop de chat    ║  ║                                ║  │
│ ║ (exemple hero)        ║  ║ HERO TITLE                    ║  │
│ ║                       ║  ║ MAKE YOUR                      ║  │
│ ║ Rotation -3°          ║  ║ CAT A                          ║  │
│ ║ Shadow drop 12px      ║  ║ [STAR] ← outline + shadow      ║  │
│ ║                       ║  ║                                ║  │
│ ║ [STICKER "VIRAL!"     ║  ║ Sub "0,99€! 60s delivery!"    ║  │
│ ║  par-dessus coin]     ║  ║ (handwritten rotation -5°)     ║  │
│ ╚═══════════════════════╝  ║                                ║  │
│                             ║ [CTA UPLOAD TON CHAT 0,99€]    ║  │
│                             ║  Fond jaune fluo, texte noir  ║  │
│                             ║  Rotation -1°, bordure zigzag ║  │
│                             ║                                ║  │
│                             ║ Social proof "2,847 cats this ║  │
│                             ║ week!" (sticker rotation +10°)║  │
│                             ╚══════════════════════════════╝  │
│                                                                │
│ ╔══════════════════════════════════════════════════════════╗  │
│ ║ BOTTOM STRIP — Carrousel catégories (6 visibles)         ║  │
│ ║                                                            ║  │
│ ║ [Polaroid1] [Polaroid2] [Polaroid3] [Polaroid4] [Polaroid5]║ │
│ ║  vidéo       vidéo       vidéo       vidéo       vidéo   ║ │
│ ║  chat        chat        chat        chat        chat     ║ │
│ ║  "Jazz"      "Porch"     "Ninja"     "Goal"      "DJ"    ║ │
│ ║                                                            ║  │
│ ║ [◀ swipe]  "SCENE 3/41" [pixel]  [swipe ▶]               ║  │
│ ╚══════════════════════════════════════════════════════════╝  │
│                                                                │
│ [stickers décoratifs dans les coins vides]                    │
└──────────────────────────────────────────────────────────────┘
```

**Décoration permanente** :
- Coin haut-gauche : bout de masking tape jaune scotché
- Coin haut-droit : étoile chrome rotative 5-branches
- Coin bas-gauche : bout de papier déchiré avec "MEOWREEL MAGAZINE · ISSUE #47" écrit dessus
- Coin bas-droit : sticker "0,99€!" gribouillé
- 10-15 petits sparkles de tailles variées partout
- 2-3 bouts de scotch cello visibles
- 1 post-it jaune fluo quelque part avec une note tabloid ("Breaking: cat goes viral overnight!")

### 5.2 — Mobile (375×812 baseline iPhone 13)

**Layout vertical mais TOUT visible sans scroll grâce à densité compacte.**

```
┌─────────────────────────┐
│ HEADER [40px]           │
│ MEOWREEL chrome         │
│ [sticker VIRAL! coin]   │
├─────────────────────────┤
│                          │
│ [CHAT STAR polaroid]    │
│ 280×330px               │
│ Vidéo loop              │
│ Rotation -3°            │
│ [sticker "HOT!" coin]   │
│                          │
├─────────────────────────┤
│ HERO TITLE               │
│ "MAKE YOUR               │
│  CAT A STAR"             │
│ [tabloid bold condensed] │
│                          │
│ 0,99€ ! Livré en 60s    │
│ [handwritten red]        │
├─────────────────────────┤
│ [CTA ÉNORME]             │
│ UPLOAD TON CHAT 0,99€   │
│ Jaune fluo, rotation -1° │
│ Thumb zone absolue       │
├─────────────────────────┤
│ [Carrousel 3 visibles]   │
│ ◀ [P1][P2][P3] ▶        │
│ SCENE 3/41               │
└─────────────────────────┘
```

**Tout tient dans 812px.** Pas de scroll. Si overflow, on réduit les sizes, on compacte, on ajuste. **Zero scroll mobile absolu.**

### 5.3 — États de la page (step tracking)

La page a 4 états visuels selon où le user est :

**État 1 · Arrivée (pre-upload)**
- Chat star = un chat exemple qui loop (placeholder)
- CTA principal = "UPLOAD TON CHAT"
- Carrousel = catégories exemples pour montrer ce qui existe

**État 2 · Post-upload (user a uploadé sa photo)**
- Chat star = animation qui remplace par SA photo avec effet déchirure papier (1.5s)
- Stickers "NEW!" apparaissent
- CTA change en "CHOISIS UNE SCÈNE"
- Carrousel devient interactif

**État 3 · Scène choisie**
- Chat star = preview généré (image fixe Flux) de SON chat dans la scène
- Confetti burst apparaît
- Stickers "WOW!" "OMG!" apparaissent temporairement
- CTA change en "MAKE IT A VIDEO · 0,99€"

**État 4 · Livraison (post-payment)**
- Chat star = vidéo finale autoplay
- Stickers "IT'S LIVE!" "VIRAL!"
- CTAs secondaires : DOWNLOAD + SHARE
- Un petit sticker "try another?" pour cross-sell

---

## 6. Les composants visuels

### 6.1 — Le chat star (polaroid déchiré central)

```
Structure :
- Div avec background-color: var(--mr-paper-white)
- Rotation: -3° (affirmée, pas timide)
- Box-shadow: 12px 12px 0 var(--mr-black-ink), 20px 20px 40px rgba(0,0,0,0.3)
- Clip-path pour bords déchirés (SVG path ou clip-path irregular)
- Dimensions desktop : 420×500px, mobile : 280×330px
- Padding intérieur : 16px (bordure polaroid)
- Video/image : full remaining space
- Caption en bas : font-display-italic, texte "Midnight Porch Musician"
- OPTIONAL : 1 sticker scotché sur un coin (coin random)

Clip-path pour bords déchirés irréguliers :
- Utilise une SVG mask ou un clip-path polygon avec 30-40 points irréguliers
- Ou utilise border-image avec une texture déchirée PNG
```

**Important** : le chat star est le **héros de la page**. Il doit être le 1er truc que l'œil voit.

### 6.2 — Les polaroids catégories (carrousel)

```
Structure :
- Dimensions desktop : 180×220px, mobile : 130×160px
- Chaque polaroid a rotation random ±8°
- Video WebM loop auto (Intersection Observer, max 6 parallèles)
- Caption en bas handwritten font, couleur black-ink
- Coin top-right : petit sticker "NEW" ou "HOT" aléatoire sur ~30% des cartes
- Hover (desktop) : scale 1.1, rotation redressée à 0°, translateY -8px
- Tap mobile : sélection → pop au centre

Animation quand sélectionné :
- Scale jusqu'à 1.5
- Rotation revient à 0°
- Les autres s'estompent (opacity 0.3) et translatent légèrement
- Apparition d'un sticker "CHOSEN!" qui wiggle
```

### 6.3 — Les stickers (partout, 10-20 à l'écran)

Types de stickers à générer :

```
Text stickers (font-handwritten-bold, rotation random ±15°) :
- "VIRAL!" (rose shocking, contour noir)
- "OMG!" (jaune fluo, contour noir)
- "HOT!" (rouge tomate, contour noir)
- "NEW!" (cyan electric, contour noir)
- "STAR!" (violet grape + paillette or)
- "WOW!" (vert apple, contour noir)
- "SLAY!" (pink bubblegum, contour noir)
- "ICONIC!" (chrome silver effect)
- "MOOD!" (orange neon, contour noir)
- "LIVE!" (rouge tomato, + petit point qui blink)

Shapes stickers :
- Étoile 5-branches chrome
- Cœur rose shocking avec contour noir
- Explosion comics jaune fluo (forme étoile 8-branches)
- Lèvres rouges (sticker lips)
- Flèche handwritten qui pointe (variations)
- Paillettes (3 tailles)

Rendu technique :
- SVG inline pour tous les text stickers
- Chaque sticker a son propre component React MrSticker
- Position absolute, z-index pour layering
- Animation subtile au chargement (scale in + wiggle)
- Ne JAMAIS tous au même angle ; rotation random chaque rendu
```

### 6.4 — Les bouts de papier scotchés

Des **morceaux de papier déchirés** comme décoration passive :

```
- Post-it jaune fluo (--mr-yellow-fluo) avec message manuscrit
- Bout de papier crème avec timestamp "22:47 · TUE"
- Bout de journal déchiré avec gros titre "BREAKING:"
- Morceau de scotch cello (semi-transparent, gradient shine)
- Bout de masking tape washi coloré

Positionnement :
- Toujours aux angles de la page ou des composants
- Rotation aléatoire ±20°
- Ombre portée légère
- Ne JAMAIS alignés ni symétriques
```

### 6.5 — Le CTA principal

```
Structure :
- Background: var(--mr-yellow-fluo)
- Border: 4px solid var(--mr-black-ink)
- Border-radius: 999px (pill complet)
- Padding: 1.5rem 3rem (desktop), 1.25rem 2rem (mobile)
- Font: var(--font-tabloid), uppercase, letter-spacing 0.02em
- Color: var(--mr-black-ink)
- Font-size: 1.8rem (desktop), 1.3rem (mobile)
- Rotation: -1° (pas droit, mais subtil)
- Box-shadow: 8px 8px 0 var(--mr-black-ink) (offset fixe, pas blur)
- Optional: pseudo-element avec bordure zigzag via SVG border-image

Animation :
- Pulse scale 1.0 → 1.04 → 1.0 en 2s loop
- Hover: scale 1.08, rotation 0°, shadow augmente à 12px 12px
- Active: scale 0.98, shadow réduit
```

### 6.6 — Le background principal

```
Structure en 4 couches (z-index croissant) :

Layer 1 (z:0) : texture papier jauni
  - Image background papier vieux (générée via Replicate)
  - Repeat tiled pour couvrir
  - Opacité 100%

Layer 2 (z:1) : taches et pliures
  - Quelques taches de café / vieillissement en PNG transparents
  - Pliures de papier visibles

Layer 3 (z:2) : grain noise
  - SVG feTurbulence noise
  - Opacity 8-12%
  - Mix-blend: multiply

Layer 4 (z:3) : éléments décoratifs fixes
  - Bouts de scotch en coins
  - Petits sparkles dispersés
  - Les stickers décoratifs permanents

Pas de gradient animé qui pulse. Le background est STATIQUE.
L'animation vient des éléments décoratifs et vidéos, pas du fond.
```

---

## 7. Animations

### 7.1 — Principes

- **Physique réaliste** : les éléments wiggle, rebondissent, ont de la masse
- **Imperfections** : rien n'est droit, rien n'est parfaitement synchro
- **Subtilité** : les animations tournent en boucle mais doucement, pas agressives
- **Respectez `prefers-reduced-motion`**

### 7.2 — Animations permanentes (background)

```css
/* Sparkles scintillement */
@keyframes sparkle {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}
/* Delay aléatoire pour chaque sparkle, durée 2-4s */

/* Stickers wiggle subtil (infini) */
@keyframes wiggle {
  0%, 100% { transform: rotate(var(--rot)) translateY(0); }
  50% { transform: rotate(calc(var(--rot) + 2deg)) translateY(-3px); }
}
/* Durée 6s, delay aléatoire */

/* CTA pulse */
@keyframes cta-pulse {
  0%, 100% { transform: rotate(-1deg) scale(1); }
  50% { transform: rotate(-1deg) scale(1.04); }
}
```

### 7.3 — Transitions critiques

**Upload success (état 1 → état 2)**
```
Timeline 1.5s :
0.0s : photo uploadée arrive en plein écran
0.2s : effet "flash photographique" (overlay blanc 100ms)
0.3s : photo se transforme en polaroid découpé (apparition bords déchirés)
0.5s : polaroid se positionne au centre avec bounce
0.8s : stickers "NEW!" "HOT!" popn burst avec scale bounce
1.0s : confetti burst (canvas-confetti lib)
1.2s : CTA change en "CHOISIS UNE SCÈNE"
```

**Category selection (état 2 → état 3)**
```
Timeline 0.8s :
0.0s : user tap une catégorie
0.1s : catégorie scale à 1.3, rotation 0°
0.2s : les autres s'estompent (opacity 0.3)
0.3s : flèche manuscrite se trace entre chat-star et catégorie
0.5s : loading appears "previewing your cat..."
```

**Preview reveal (image Flux dev générée)**
```
Timeline 1.2s :
0.0s : fade out "previewing..."
0.2s : image apparaît dans le polaroid central (remplace photo originale)
      avec effet déchirement papier (2 SVG masks qui s'animent)
0.5s : stats Tamagotchi s'écrivent one by one (pixel font)
      FAME ▓░░░ → ▓▓▓▓ en 0.6s
0.8s : stickers "WOW!" "OMG!" popn
1.0s : CTA change en "MAKE IT A VIDEO · 0,99€"
      wiggle exaggeré pour attirer l'attention
```

---

## 8. Responsive détaillé

### 8.1 — Mobile (375-430px)

**Priorité absolue. 79% du traffic.**

Layout :
- Chat star polaroid en haut (280×330px)
- Hero title compact dessous (3-4 lignes max)
- CTA sticky en bas de l'écran (bottom: 120px)
- Carrousel en bas (3 polaroids visibles, swipable)
- TOUT tient en 812px (iPhone 13 height)

### 8.2 — Tablet (768-1023px)

Layout hybride : le chat star occupe 1/3 gauche, le texte + CTA 2/3 droite. Carrousel en bas full width avec 5 polaroids visibles.

### 8.3 — Desktop (1024px+)

Layout 2 colonnes principales (chat star gauche, text + CTA droite). Carrousel en bas avec 6-8 polaroids visibles. Background prend toute la largeur. Éléments décoratifs disperses dans les marges latérales.

### 8.4 — Large desktop (1440px+)

Même chose que desktop mais avec `max-width: 1440px` pour le contenu centré. Background remplit tout le viewport. Plus d'espace pour stickers décoratifs dans les marges.

---

## 9. Flow utilisateur complet

### 9.1 — Arrivée (écran état 1)

User arrive sur `meowreel.com/fr`. Il voit :
- Chat exemple (placeholder vidéo "porch musician") en gros polaroid central
- Titre "MAKE YOUR CAT A STAR"
- Prix 0,99€ en gribouillé rouge
- CTA "UPLOAD TON CHAT" énorme jaune
- Carrousel de 5-6 polaroids catégories qui loop
- 15+ stickers décoratifs

**Temps visé pour comprendre** : 2 secondes.
**Temps visé pour cliquer upload** : 4-8 secondes.

### 9.2 — Upload (overlay sur écran)

User click upload. **PAS de redirection.** Un bottom sheet mobile (ou modal desktop) apparaît :
- 2 gros boutons : "📸 Prendre une photo" / "🖼️ Galerie"
- Aucun formulaire, aucun texte long

User pick sa photo. **Elle est uploadée en background** via `POST /api/upload`. Pendant l'upload :
- Loading minimaliste dans le modal (sparkles qui tournent)
- Message "Adding your cat to the cast..."

Upload fini → modal se ferme → animation transition état 1 → état 2.

### 9.3 — Choix scène (écran état 2)

Le chat star polaroid contient maintenant la photo du user. CTA change en "CHOISIS UNE SCÈNE". Le carrousel devient la focal area :
- User swipe horizontalement pour voir les catégories
- Indicateur "SCENE 3 / 41" en pixel font
- Chaque polaroid a une vidéo qui loop
- Tap sur un polaroid → sélection avec animation

**Sur mobile** : le carrousel peut devenir **fullscreen swipe** : chaque catégorie prend l'écran entier quand on swipe (style TikTok). Le chat star reste overlay top.

### 9.4 — Preview (écran état 3)

Catégorie sélectionnée → preview image généré via Flux dev (~$0.003). Le chat star polaroid affiche maintenant **le chat du user dans la scène choisie**. Stats Tamagotchi apparaissent (FAME, DRAMA, VIBES).

CTA change en "MAKE IT A VIDEO · 0,99€". Ce bouton triggers Stripe Checkout direct.

### 9.5 — Checkout

Stripe Checkout hosted page. Apple Pay / Google Pay en primary. 1 tap sur iPhone.

Retour sur `/producing/[orderId]` après paiement.

### 9.6 — Producing (écran alt)

C'est le seul moment où on QUITTE la page principale. Écran alternatif :
- Background même que principal (continuité)
- Au centre, un gros polaroid "en développement" (effet développement photo)
- Sparkles qui tournent autour
- Messages rotatifs toutes les 10s :
  - "Minou apprend la choré..."
  - "Lights. Camera. Whiskers."
  - "Le réalisateur est hype..."
  - "Presque prêt pour la première..."

Polling `/api/order/[id]` toutes les 3s.

### 9.7 — Livraison (écran état 4)

Status = `done` → transition animée vers état 4 :
- Le polaroid dans la page principale affiche maintenant la **vidéo finale** qui autoplay loop
- Stickers "IT'S LIVE!" "VIRAL!" apparaissent
- Confetti burst
- CTAs secondaires : DOWNLOAD + SHARE TIKTOK
- Petit sticker "try another?" qui link vers nouveau upload avec cross-sell

---

## 10. Content moderation visuelle

**Avant de valider un écran, répondre à ces 15 questions :**

1. Est-ce que le background est papier jauni avec texture visible ?
2. Y a-t-il au moins 15 stickers/éléments décoratifs à l'écran ?
3. Le chat star polaroid est-il le plus gros élément visuel ?
4. Y a-t-il UNE vidéo qui loop minimum à l'écran ?
5. Le prix 0,99€ est-il visible ?
6. Le CTA principal est-il jaune fluo avec contour noir ?
7. Y a-t-il au moins 3 éléments en rotation non-0° ?
8. Les bords des polaroids sont-ils déchirés (pas droits) ?
9. Le titre principal utilise-t-il font-tabloid en gros ?
10. Y a-t-il du texte handwritten quelque part ?
11. Tout tient-il sur un écran sans scroll (mobile ET desktop) ?
12. Les couleurs sont-elles saturées (pas pastel fade) ?
13. Y a-t-il au moins 2 stickers avec des couleurs flash (rose shocking, jaune fluo, cyan electric) ?
14. Est-ce que ça ressemble à AUCUN autre outil AI existant ?
15. Si je screenshot cette page sur TikTok, est-ce que les gens la partageront ?

**Si un seul "non" → refais.**

---

## 11. Assets à générer via Replicate

### 11.1 — Backgrounds (priorité 1)

Prompt Flux Schnell (3 variants à faire valider) :

**Variant A — papier vintage aggressive** :
```
aged yellowed paper texture, vintage 2001 teen magazine page background, 
visible paper grain and fibers, slight coffee stains, crinkled edges, 
warm cream to tan gradient, scanned from a 2003 scrapbook, 
high resolution photograph, flat top-down view, 4K, tileable
```

**Variant B — scrapbook chaotique** :
```
top down view of a 2002 teenage girl scrapbook page, yellowed paper, 
washi tape strips scattered, small doodles in ink, slight stains, 
empty composition ready for content, warm cream base, Y2K aesthetic, 
nostalgic photo scan quality, high detail
```

**Variant C — tabloid magazine paper** :
```
vintage tabloid magazine page background, aged pulp paper yellowed, 
subtle print dots pattern, sensationalist newspaper feel circa 2001, 
empty composition, warm sepia tones, high resolution scan, 
tabloid layout ready for headlines
```

### 11.2 — Textures paper morceaux (PNG transparents)

**Post-it déchiré fluo jaune** :
```
single yellow fluorescent post-it note, torn edges on one side, 
slight curl, drop shadow, top-down view, transparent background, 
PNG cutout, 512x512
```

**Bout de scotch cello** :
```
single piece of cellophane scotch tape, transparent with slight yellow tint, 
semi-transparent, visible shine highlights, torn edges, 
transparent background PNG, 512x256
```

**Washi tape coloré** :
```
single strip of washi decorative tape, geometric Y2K pattern, 
pink and cyan, torn edges, matte finish, top-down view, 
transparent background PNG, 512x128
```

### 11.3 — Stickers Y2K (PNG transparents)

Prompt template :
```
Y2K sticker "[WORD]", bold italic chunky marker handwritten font, 
hot pink [color] fill with thick black 4px outline, chrome edge highlights, 
explosion burst shape around text, transparent background PNG, 512x512, 
2001 aesthetic, sticker style, glossy finish
```

Mots à générer : VIRAL, OMG, HOT, NEW, STAR, WOW, SLAY, ICONIC, MOOD, LIVE

### 11.4 — Chat star placeholder video (pour hero)

1 vidéo hero de 5s de chat qui fait un truc viral (pour démo avant user upload). Utilise Seedance 2.0 Fast ($0.05). Prompt :
```
a photorealistic orange tabby cat playing a small gold trumpet on a 
dimly lit suburban porch at midnight, cat is standing upright holding 
trumpet with paws, moving slightly to rhythm, fisheye doorbell camera 
aesthetic, warm amber porch light, dark suburban background with blurry 
trees, timestamp "03:47" visible in corner, grainy security camera 
footage, 5 seconds loop
```

### 11.5 — Catégories preview (priorité 2, 12 d'abord)

Génère les 12 plus trending via Seedance 2.0 Fast ($0.05 × 12 = $0.60) :

Top priorités :
1. midnight-porch-musician
2. jazz-trumpet
3. rock-guitarist
4. club-dj
5. football-goal-celebration
6. basketball-dunk
7. ninja-night
8. samurai-edo
9. classical-pianist
10. boxing-ring-knockout
11. k-pop-choreo
12. cowboy-far-west

Après validation visuelle des 12, génère les 29 restants.

### 11.6 — Preview chat du user (runtime)

Pour la génération preview dans le flow (Flux dev $0.003) :
```
a photorealistic cat [BASED ON REFERENCE IMAGE] doing [CATEGORY ACTION],
[CATEGORY STYLE DESCRIPTION], single cat in frame, cinematic lighting,
no humans, no text, no watermark, high detail, realistic
```

---

## 12. Anti-patterns (relecture AVANT chaque commit)

**À bannir absolument :**

- ❌ Polaroids avec border-radius parfait (doivent avoir bords déchirés)
- ❌ Couleurs pastel fades (pink washed, lavande poudré, jaune moutarde light)
- ❌ Gradients qui fade vers le blanc ou le transparent
- ❌ Fonts clean SaaS (Inter seul, Space Grotesk, Poppins, Satoshi solo)
- ❌ Composants rectangulaires propres
- ❌ Shadows blur soft (toutes les shadows sont offset hard, pas blur)
- ❌ Animations subtiles (on veut de l'énergie TikTok)
- ❌ Éléments alignés sur une grille stricte (tout est légèrement bancal)
- ❌ Espaces vides "respirants" (on remplit la page)
- ❌ Copy longue (1 phrase max par élément)
- ❌ Emojis dans l'UI (sauf copy fun, email subject lines, 1 max)
- ❌ Dark mode (on reste papier jauni tout le temps)
- ❌ Hover states subtils
- ❌ Plus d'un CTA primaire visible à la fois
- ❌ Icônes Heroicons / Lucide / Material (tous les picto sont custom)
- ❌ Empty states propres (toujours ajouter stickers/papier décoratif)

---

## 13. Check final

**Avant de dire à Ajwad "c'est prêt" :**

- [ ] Lance la landing en desktop 1440px, screenshot
- [ ] Lance la landing en mobile 375px, screenshot
- [ ] Compare avec les 5 refs visuelles (Sassy magazine, Lisa Frank, etc.)
- [ ] Vérifie les 15 questions de la section 10
- [ ] Run `/brand-check` sur tous les nouveaux composants
- [ ] Test le flow upload → preview → payment sur mobile
- [ ] Vérifie qu'il y a 15+ stickers/éléments décoratifs à l'écran
- [ ] Vérifie que tout tient sans scroll vertical sur iPhone SE (375×667)
- [ ] Vérifie que les polaroids ont des bords déchirés (clip-path SVG)

Si check OK, commit et ping Ajwad pour review.

---

## 14. Références visuelles obligatoires à consulter

Claude Code, **OUVRE CES LIENS AVANT DE CODER** et absorbe la vibe :

1. **Sassy Magazine 2001 covers** : Google Images "Sassy magazine 2001 cover"
2. **Lisa Frank stationery 2000** : Google Images "Lisa Frank folder 2000"
3. **MySpace profiles 2004 screenshots** : Google Images "MySpace profile 2004"
4. **Tiger Beat magazine 2002** : Google Images "Tiger Beat magazine 2002"
5. **Playboi Carti Die Lit cover** : Google Images "Playboi Carti Die Lit"
6. **Yung Lean Unknown Death 2002 cover** : Google Images
7. **Are.na collections "Y2K"** : https://www.are.na/search?q=y2k+tabloid
8. **TLC album CrazySexyCool** : Google Images
9. **MTV Live 2003 branding** : Google Images "MTV Live 2003"
10. **Nickelodeon Magazine 2002** : Google Images

**Ton objectif** : recréer la densité, l'agressivité colorée, le chaos maîtrisé de ces références. Pas un "site moderne inspiré de". Une **reproduction fidèle de cette esthétique** transposée sur un outil AI.

---

## 15. Résumé court (à garder en tête)

**MeowReel, c'est :**
- Un **faux magazine tabloid 2003** pour chats stars
- Sur **papier jauni**, avec **bords déchirés** et **stickers partout**
- Palette **pop acide Lisa Frank** : rose shocking, jaune fluo, cyan électrique
- **Single screen sans scroll**, mobile ET desktop
- **Chat du user au centre**, gros, découpé papier
- **Carrousel horizontal** pour les 41 scènes
- Un **seul CTA jaune fluo énorme** à la fois
- **15+ éléments décoratifs** visibles toujours
- **3 taps pour payer** (upload, choisis scène, pay)

**Quand tu doutes** : ajoute plus de stickers, augmente la saturation, casse la grille, déchire les bords.

**Ça doit ressembler à** : un collage teenage 2003 ramassé sur un trottoir, scanné en HD, monté en UI moderne.
