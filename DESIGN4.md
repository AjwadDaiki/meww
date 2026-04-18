# MeowReel · DESIGN4.md

> **Version finale de la DA. Remplace DESIGN.md, DESIGN2.md, DESIGN3.md.**
> À lire APRÈS avoir complété l'absorption de MOODBOARD.md.

---

## 1. Concept en une phrase

**MeowReel est une pub Tamagotchi de l'an 2000 qui a pris vie : un univers kawaii pop acide peuplé de PNJ chats mignons, où chaque photo uploadée transforme ton chat en star dans une pub qu'on aurait vue dans Télérama Junior en 2001.**

---

## 2. Pourquoi ça ne peut PAS foirer cette fois

La session précédente a échoué parce que :
1. Trop de texte descriptif, pas assez d'images références
2. Pas de PNJ/mascottes donc vide visuel
3. Minimalisme par défaut de Claude Code
4. Layout "centered column" fade
5. Pas assez d'éléments animés
6. Pas de GIFs importés

**On corrige en imposant** :
- Moodboard obligatoire AVANT code (MOODBOARD.md)
- 6-10 PNJ chats générés AVANT de builder le layout
- Layout dense, éléments partout (pas centered)
- GIFs animés importés via Giphy API
- Au moins 50 éléments visuels distincts à l'écran

---

## 3. L'univers narratif

MeowReel, c'est une **fausse agence de casting pour chats**, fondée en 2001, qui a une **équipe de PNJ chats** qui bossent avec toi :

### Les 6 PNJ chats (casting team)

Chaque PNJ a un rôle dans le flow et apparaît sur la landing :

1. **CATSOMÉ** (chat roux rayé, lunettes rondes)
   - Rôle : "Head of Casting"
   - Personnalité : enthousiaste, crie toujours "GO GO GO !"
   - Apparaît : en haut à gauche, hurle à côté du CTA upload

2. **DJ MIAOU** (chat gris avec casque audio rose)
   - Rôle : "Music Director"
   - Personnalité : chill, fait signe peace
   - Apparaît : à côté des catégories Music

3. **PURRPAPARAZZI** (chat noir avec appareil photo)
   - Rôle : "Photographer"
   - Personnalité : flash permanent, exagéré
   - Apparaît : près du polaroid central

4. **CHAUPION** (chat blanc avec médaille d'or)
   - Rôle : "Sports Coach"
   - Personnalité : fierté, pose triomphante
   - Apparaît : à côté des catégories Sports

5. **DRAMATABBY** (chat gris tacheté avec chapeau haut-de-forme)
   - Rôle : "Drama Coach"
   - Personnalité : théâtral, joue les évanouissements
   - Apparaît : à côté des catégories Cinematic

6. **GLAMEOW** (chat siamois avec collier brillant)
   - Rôle : "Stylist"
   - Personnalité : chic, pose fashion
   - Apparaît : dans le coin supérieur droit

Ces PNJ sont **TOUS** visibles sur la landing. Ils sont le décor vivant. Ils ont tous des micro-animations (clignotement, hochement de tête, sourire, etc.).

### Leur génération

Via Replicate NanoBanana 2 ou Flux Schnell, prompts fixes, 1 PNG transparent par chat + 2-3 variations d'expression. Budget ~$0.60 total pour tous les PNJ.

---

## 4. Palette finale (validée par moodboard Tamagotchi 2000)

```css
:root {
  /* Candy pop (dérivée de packagings Tamagotchi original) */
  --mr-candy-pink:     #FF5FA2;  /* rose barbe à papa Bandai */
  --mr-candy-blue:     #3EC4E6;  /* bleu piscine rétro */
  --mr-candy-yellow:   #FFD93D;  /* jaune poussin Pokémon */
  --mr-candy-purple:   #B565E8;  /* violet Rare Candy */
  --mr-candy-orange:   #FF8C42;  /* orange PowerPuff */
  --mr-candy-mint:     #65E6B8;  /* mint Lisa Frank */
  --mr-candy-red:      #FF4757;  /* rouge Tamagotchi egg */

  /* Chrome metallic (très important Y2K) */
  --mr-chrome-silver:  linear-gradient(135deg, #FFFFFF 0%, #D0DFFF 30%, #8090B0 50%, #D0DFFF 70%, #FFFFFF 100%);
  --mr-chrome-pink:    linear-gradient(135deg, #FFE5F0 0%, #FF99CC 50%, #FF5FA2 100%);
  --mr-chrome-gold:    linear-gradient(135deg, #FFF9D4 0%, #FFD93D 50%, #CC9900 100%);

  /* Backgrounds multichromes (inspirés XP bubbles) */
  --mr-bg-dreamy:      radial-gradient(ellipse at 30% 40%, #FFE5F0 0%, #FFC1D8 30%, #B8E0FF 70%, #D5F5E8 100%);
  --mr-bg-bubble:      radial-gradient(circle at 70% 30%, #FFC1D8 0%, #B5DCFF 40%, #E0D5FF 80%);

  /* Typography ink */
  --mr-ink-deep:       #1A0D2E;
  --mr-ink-candy:      #5A1F7A;

  /* Paper 2001 */
  --mr-paper-glossy:   #FFFEF8;
  --mr-paper-bright:   #FFFFFC;
}
```

**Différence avec DESIGN3.md** : on passe de "tabloid papier jauni" (vintage presse) à "pub magazine brillante 2001" (candy bright). Plus frais, plus jouet, plus kawaii. Matche mieux "Tamagotchi pub".

---

## 5. Typographie

### Stack final

```css
--font-hero:          'Fredoka', 'Bangers', 'Bubblegum Sans';  /* bulle arrondie, hero */
--font-display:       'Anton', 'Abril Fatface';                 /* tabloid condensed, titres */
--font-chrome:        'Orbitron', 'Audiowide';                  /* chrome 3D, tech */
--font-handwritten:   'Caveat', 'Patrick Hand';                 /* annotations, prix */
--font-sticker:       'Permanent Marker', 'Sniglet';            /* stickers gros */
--font-pixel:         'VT323', 'Silkscreen';                    /* LCD Tamagotchi */
--font-body:          'Nunito', 'Inter';                        /* body agréable */
```

Toutes free Google Fonts. Toutes en italic-ready.

### Exemples d'usage

| Contexte | Font | Size | Traitement |
|---|---|---|---|
| Hero "MEOWREEL" | `--font-hero` | `clamp(5rem, 15vw, 12rem)` | Chrome pink gradient + outline 5px noir + shadow offset hard |
| Sous-titre action | `--font-display` | `clamp(2rem, 5vw, 4rem)` | Italic, rotation -3°, outline |
| Category cards | `--font-hero` | 1.3rem | Couleur candy-pink |
| CTA principal | `--font-display` | 1.8rem | Chrome gold, uppercase |
| Stickers | `--font-sticker` | variable | Rotation random ±20° |
| Prix gribouillés | `--font-handwritten` | 2.5rem | Rouge, souligné 2x |
| Stats Tamagotchi | `--font-pixel` | 0.9rem | LCD noir sur fond vert-gris |

---

## 6. Layout principal

### Principe clé : **single screen, 3 zones**

Pas de scroll. Le viewport est découpé en 3 zones pour que tout soit visible immédiatement.

**Desktop 1440×900 :**

```
┌─────────────────────────────────────────────────────┐
│ ZONE A — HEADER BAND [60px]                          │
│ [MEOWREEL chrome logo]  [Edition #47]  [FR|EN|ES]   │
├─────────────────────────────────────────────────────┤
│                                                      │
│ ZONE B — MAIN STAGE [540px]                         │
│                                                      │
│  [CATSOMÉ]    ┌──────────────┐    [GLAMEOW]        │
│   PNJ coin    │              │     PNJ coin         │
│   gauche      │   CHAT STAR  │     droit            │
│               │   POLAROID   │                      │
│  [Arrow       │   déchiré    │   [Stickers          │
│   "GO GO"]    │   avec vidéo │    "VIRAL!" "HOT!"   │
│               │              │    rotations         │
│  [Sticker     │   Stats      │    random]           │
│   "1€!"]      │   Tamagotchi │                      │
│               │              │   [Prix "0,99€"      │
│               └──────────────┘    gribouillé]       │
│                                                      │
│                 [HERO TITLE]                         │
│              "TON CHAT. EN PUB."                    │
│               Chrome gradient                        │
│                                                      │
│              [CTA ÉNORME JAUNE]                     │
│            "UPLOAD TON CHAT 0,99€"                  │
│                                                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│ ZONE C — CATEGORIES REEL [280px]                    │
│                                                      │
│ [PURRPAPARAZZI]                       [DJ MIAOU]    │
│                                                      │
│ ◀ [Cat1] [Cat2] [Cat3] [Cat4] [Cat5] [Cat6] ▶      │
│   vidéo  vidéo  vidéo  vidéo  vidéo  vidéo          │
│   "Jazz" "Goal" "Piano" "Ninja" "Surf" "DJ"         │
│                                                      │
│   SCENE 3 / 41                                       │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Décorations partout :**
- Sparkles qui scintillent (20+)
- Bulles chrome qui flottent (5-8)
- Arc-en-ciel coin supérieur gauche
- Petites étoiles et cœurs dispersés
- Confetti qui tombe légèrement en continu
- GIFs Giphy importés : 2-3 GIFs de chats retro pixelisés
- Formes géométriques Y2K floues en arrière-plan

**Mobile 375×812 :**

```
┌──────────────────────┐
│ HEADER [48px]        │
│ MEOWREEL chrome      │
├──────────────────────┤
│ PNJ gauche PNJ droit │
│  [Polaroid]          │
│  Chat central        │
│  stickers            │
│  ↓↓                  │
│ HERO TITLE           │
│ "TON CHAT EN PUB"    │
│                      │
│ [CTA sticky bottom]  │
│                      │
│ Carrousel 3 visibles │
│ ◀ [Cat][Cat][Cat] ▶ │
└──────────────────────┘
```

Les PNJ visibles sur mobile : 2 seulement (CATSOMÉ gauche + GLAMEOW droit), les autres cachés. Les autres PNJ apparaissent au fur et à mesure du flow.

---

## 7. Les 8 états visuels du flow

Au lieu de 4 états, on passe à 8 états micro-incrémentaux pour maximiser la dopamine.

| État | Contexte | Éléments qui apparaissent |
|---|---|---|
| 0 — Landing | Arrivée | 6 PNJ + polaroid exemple + carrousel + stickers |
| 1 — Hover upload | User hover le CTA | CATSOMÉ saute, flèche pointe vers le CTA |
| 2 — Upload modal | Click upload | Bottom sheet + PURRPAPARAZZI qui "photographe" |
| 3 — Upload success | Photo reçue | Explosion confetti + sticker "NEW!" + chat polaroid remplace le placeholder |
| 4 — Choix scène | User swipe carrousel | PNJ Sports/Cinema/Music réagissent selon la section |
| 5 — Preview loading | Scene pickée | DRAMATABBY fait "loading drama" pose |
| 6 — Preview ready | Image Flux générée | Gros "WOW!" sticker, stats Tamagotchi apparaissent lettre par lettre |
| 7 — Paying | Stripe Checkout | Redirection classique |
| 8 — Livré | Vidéo prête | Tous les PNJ font la fête, confetti fullscreen, "IT'S LIVE!" |

Chaque transition entre état = 1-2 secondes d'animation dense.

---

## 8. Assets à générer (ordre d'exécution)

### Phase A — Backgrounds (3 variants chacun, je choisis)

**A1 — Background dreamy bubble**
```
Prompt Flux Schnell :
"Y2K dreamy background, pastel multichrome gradient from bubblegum pink 
to baby blue to mint green, floating translucent bubbles, soft glow, 
Frutiger Aero aesthetic 2001, iOS wallpaper style, high resolution, 
no people no text, 2048x1536"
```

**A2 — Background candy sparkle**
```
"Y2K candy bright background, radial gradient pink purple cyan yellow, 
scattered sparkles and stars, cute kawaii aesthetic 2001, 
Tamagotchi packaging vibe, bubblegum palette, no text no people, 
high resolution 2048x1536"
```

**A3 — Background chrome holographic**
```
"Y2K holographic chrome background, iridescent rainbow gradient, 
pearlescent surface, Lisa Frank style, soft blur, high gloss, 
no people no text, ultra saturated, 2048x1536"
```

### Phase B — PNJ chats (6 personnages, 3 expressions chacun = 18 images)

**B1 — CATSOMÉ (Head of Casting)**
```
"Kawaii cartoon illustration of a ginger striped cat character, 
wearing round glasses, big enthusiastic expression, cute mascot style 
similar to Hello Kitty and Sanrio 2001, thick black outline 3px, 
flat colors with cel-shading, standing upright waving paw excitedly, 
single character isolated on transparent background, PNG cutout, 
1024x1024, vibrant colors, no text"
```

**B2 — DJ MIAOU (Music Director)**
```
"Kawaii cartoon illustration of a gray cat character wearing pink 
headphones, chill expression making peace sign, cute Y2K mascot style, 
thick black outline, Tamagotchi aesthetic, standing upright, 
isolated on transparent PNG background, 1024x1024"
```

**B3 — PURRPAPARAZZI (Photographer)**
```
"Kawaii cartoon illustration of a black cat character with a vintage 
camera around neck, flash going off, surprised exaggerated expression, 
paparazzi pose, cute mascot 2001, thick outline, 
transparent PNG 1024x1024"
```

**B4 — CHAUPION (Sports Coach)**
```
"Kawaii cartoon illustration of a white cat character with a gold medal, 
triumphant pose arms raised, proud expression, cute athletic mascot, 
Y2K 2001 style, thick black outline, transparent PNG 1024x1024"
```

**B5 — DRAMATABBY (Drama Coach)**
```
"Kawaii cartoon illustration of a gray tabby cat character wearing a 
black top hat, theatrical hand to forehead pose, dramatic exaggerated 
expression, cute Y2K mascot 2001, transparent PNG 1024x1024"
```

**B6 — GLAMEOW (Stylist)**
```
"Kawaii cartoon illustration of a Siamese cat character with sparkly 
diamond collar and sunglasses, fashion pose, chic expression, 
cute glamorous Y2K mascot 2001, transparent PNG 1024x1024"
```

Pour chaque PNJ, générer 3 variantes d'expression/pose : **default**, **excited**, **talking** (avec bulle vide).

Budget : 18 images × $0.045 (NanoBanana 2 0.5K) ou $0.003 (Flux Schnell) = **~$0.05-0.80 total**.

### Phase C — Stickers Y2K chrome

Génère via Replicate ou crée en CSS/SVG :

1. VIRAL! (rose chrome gradient)
2. NEW! (jaune étoile burst)
3. HOT! (orange flame)
4. OMG! (violet explosion)
5. WOW! (bleu comic burst)
6. LIVE! (rouge rond blink)
7. STAR! (or étoile)
8. 0,99€! (rouge gribouillé)
9. MOOD (cyan bubble)
10. SLAY (rose chrome italic)

### Phase D — Decorative elements

- 10 sparkles différents (SVG inline, animés)
- 5 bubbles chrome translucides (SVG + filter blur)
- 5 arcs-en-ciel Y2K (SVG)
- 5 étoiles Y2K (SVG)
- 3 heart chrome (SVG)

### Phase E — GIFs Giphy (via nouveau MCP)

Import 5-8 GIFs via Giphy API :
- Un chat pixel qui danse
- Un Tamagotchi vintage qui clignote
- Un flash photo animé
- Confetti qui tombe
- Arc-en-ciel qui bouge

### Phase F — Vidéos preview catégories (12 prioritaires)

Via Seedance 2.0 Fast, $0.05 × 12 = $0.60.

Les 12 scènes trending (midnight-porch-musician, jazz-trumpet, rock-guitarist, club-dj, football-goal, basketball-dunk, ninja-night, samurai-edo, classical-pianist, boxing-knockout, k-pop-choreo, cowboy-far-west).

**Budget total assets : ~$3-5.** Pas cher pour un design premium.

---

## 9. Nouveaux MCPs à installer

En plus des 5 MCPs existants, on ajoute 2 critiques :

### Firecrawl MCP (OBLIGATOIRE)

Pour scraper le moodboard automatiquement.

```bash
claude mcp add firecrawl --scope project -- npx -y firecrawl-mcp
```

Nécessite API key gratuite sur firecrawl.dev (100 scrapes/mois gratuits).

### Giphy MCP (OBLIGATOIRE pour les GIFs animés)

Pour importer des GIFs directement via l'API Giphy.

Il n'existe pas de MCP Giphy officiel. On va créer un skill custom :

```
.claude/skills/import-gifs/SKILL.md
```

Qui utilise l'API Giphy (clé gratuite sur developers.giphy.com) pour rechercher et télécharger des GIFs par keyword.

### Figma MCP (OPTIONNEL mais recommandé)

Si tu veux designer en amont dans Figma puis générer le code :

```bash
claude mcp add figma --transport http --scope user https://mcp.figma.com/mcp
```

Pour cette session on skip Figma et on code direct, mais garde l'option.

---

## 10. Contraintes de densité visuelle

**À respecter sur chaque écran :**

- 6 PNJ chats visibles (desktop) / 2 PNJ (mobile)
- 10+ stickers colorés dispersés
- 20+ sparkles/étoiles/cœurs qui scintillent
- 5-8 bulles chrome flottantes en arrière-plan
- 2-3 GIFs animés importés
- 1 chat star polaroid central avec vidéo
- 1 carrousel de 6+ catégories (desktop) / 3 (mobile)
- 1 CTA énorme chrome gold
- 1 logo MEOWREEL chrome pink en hero
- Background gradient multichrome Y2K

**Si un écran n'a pas ces 10 éléments minimum : c'est pas assez dense.**

---

## 11. Animations permanentes (tout bouge)

Règle : **il n'y a jamais rien de statique à l'écran**. Tout anime en continu (subtilement pour certains, fort pour d'autres).

### Animations permanentes (background-level)

1. Sparkles scintillent (opacity pulse, delay random)
2. PNJ chats clignotent (blink toutes les 3-5s aléatoires)
3. Bulles chrome flottent (translate lent)
4. Background gradient respire (shift subtle)
5. Arc-en-ciel scintille
6. Stickers wiggle (rotation ±3° en loop)
7. Chrome text brille (gradient animate)
8. CTA pulse (scale 1.0 → 1.03)
9. Polaroid central balance (rotation ±1°)
10. Étoiles tournent lentement

### Animations trigger (au click/hover)

- CTA hover : scale 1.1 + chrome intensifie + wiggle
- PNJ hover : le PNJ saute + son petit "!" apparaît
- Polaroid hover : zoom léger + effet flash
- Category hover : scale 1.1 + glow gold + rotation 0°
- Upload success : confetti fullscreen + CATSOMÉ saute + flash
- Preview ready : DRAMATABBY fait pose dramatique + stats s'écrivent

---

## 12. Checklist de validation finale (21 points)

Avant de valider un écran, vérifier :

**Contenu**
- [ ] Les 6 PNJ chats sont visibles (desktop) / 2 (mobile)
- [ ] Le polaroid central contient une vidéo qui loop
- [ ] Au moins 10 stickers colorés sont placés
- [ ] Au moins 20 sparkles scintillent
- [ ] 2-3 GIFs animés sont importés
- [ ] Le CTA jaune chrome est visible et pulse

**Design**
- [ ] Background multichrome Y2K (jamais flat)
- [ ] Logo MEOWREEL en chrome pink gradient
- [ ] Typography : Fredoka hero + Anton display + Caveat manuscrit
- [ ] Couleurs : palette candy saturée
- [ ] Ombres offset (pas blur soft)
- [ ] Bordures épaisses noires (3-5px) sur tout

**Density**
- [ ] Aucun espace vide respirant > 150px de côté
- [ ] Chaque zone de l'écran a au moins 3 éléments
- [ ] Grille cassée volontairement (rotations, décalages)

**Animation**
- [ ] Au moins 10 animations en boucle permanente
- [ ] PNJ animent (blink, move)
- [ ] Stickers wigglent
- [ ] Background respire

**UX**
- [ ] Un SEUL CTA principal visible
- [ ] Prix 0,99€ affiché clairement
- [ ] Mobile tient sans scroll
- [ ] Desktop tient sans scroll
- [ ] Flow en 3 taps mobile

Si 1 seul "non" → on refait.

---

## 13. Références à regarder EN CONSTANCE

Ces 5 images doivent rester ouvertes dans un onglet pendant tout le dev :

1. Un poster Tamagotchi 2000 (Pinterest `tamagotchi ads`)
2. Une couverture Sassy/Tiger Beat 2001
3. Un sticker Lisa Frank original
4. Un screenshot Awwwards "Y2K" recent
5. Une publicité Polly Pocket ou Hello Kitty 2000

**Règle** : à chaque doute, regarde ces 5 images. Si ton écran ressemble pas à la synthèse de ces 5, tu pars mal.

---

## 14. Résumé exécutif

**MeowReel = Tamagotchi pub 2000 avec des PNJ chats.**

Design dense, saturé, animé en permanence, 6 PNJ qui vivent à l'écran, chrome gradients partout, stickers qui pètent, GIFs animés importés, zéro scroll, un seul CTA énorme.

Quand tu doutes : **plus de PNJ, plus de stickers, plus de chrome, plus d'animation**.

Si tu penses "c'est trop chargé" : c'est EXACTEMENT BON. On est pas sur Linear, on est sur une pub de 2001 ressucitée.
