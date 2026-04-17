# MeowReel · DESIGN.md

> Ce fichier est l'autorité finale sur la direction artistique de MeowReel.
> Si `BRAND.md` contredit ce fichier, **c'est `DESIGN.md` qui gagne**.
> `BRAND.md` était un premier draft "cinéma dark + or" qu'on a dégagé.

---

## Visual Treatment — Cartoon Illustré

**Style cible** : cartoon illustré adulte, entre Duolingo (personnalité, rondeur), Studio Ghibli (chaleur, détail, warm tones), Notion illustrations (clean, professional), et bande dessinée européenne ligne claire (Tintin, Moebius époque jeunesse). **PAS** kawaii japonais, **PAS** corporate flat illustration vide.

### Règles techniques SVG

- **Tout en SVG inline** pour les objets (polaroid, post-it, tampon, enveloppe, téléphone, machine à écrire, projecteur, carnet)
- **Line weight** : outlines 2.5px black #1a1614, pas d'ombres lourdes
- **Fill** : couleurs pleines depuis la palette DESIGN.md, pas de gradient
- **Shading** : cel-shading simple, 1 ton d'ombre max par objet, jamais de dégradé réaliste
- **Corners** : légèrement arrondis (radius 2-4px sur les edges des objets sauf bords de papier qui peuvent rester droits)
- **Grain** : texture papier légère en overlay sur les surfaces de fond, pas sur les objets
- **Personnalité** : les objets ont chacun une petite asymétrie charmante (le tampon a le bord légèrement ondulé, le post-it est pas droit, etc.)

### Organisation fichiers SVG

Chaque SVG est dans son propre fichier TSX dans `components/illustrations/` :
- `DeskEnvelope.tsx`, `DeskPolaroid.tsx`, `DeskPostit.tsx`, `DeskStamp.tsx`
- `DeskPhone.tsx`, `DeskNotebook.tsx`, `DeskProjector.tsx`
- `GuidingHand.tsx`, `GuideArrow.tsx`, `StepBadge.tsx`, `Checkmark.tsx`

On peut swap un SVG à la fois quand on upgrade vers hand-drawn.

### Backgrounds

Les backgrounds (bureau bois, mur liège) sont générés UNE FOIS via Replicate (Flux Schnell) en style cartoon, puis hardcodés dans `public/textures/`. Script : `pnpm generate:assets`.

Plus aucune photo détourée d'objet réel, plus de photo stock Unsplash, plus de shooting perso. Tout est SVG illustré custom ou asset généré Replicate cartoon style.

---

## UX Affordances

### 1. Flèche manuscrite de guidage

SVG path qui se trace depuis le milieu de l'écran vers l'enveloppe au chargement. Texte handwritten Caveat à côté : clé i18n `hero.cta` ("Commence ici !"). Disparaît en fade après 3s ou dès interaction user.

### 2. Copy direct sur l'enveloppe

Texte "DÉPOSE LA PHOTO DE TON CHAT" directement sur l'enveloppe, police display grande et lisible. Sous-label avec les formats acceptés. Hover : l'enveloppe lift de 4px + légère pulsation (1.5s loop).

### 3. Numérotation implicite du flow

Badges cercles numérotés 1/2/3 dans le coin des éléments clés :
- Badge "1" sur l'enveloppe
- Badge "2" apparaît sur le mur après upload
- Badge "3" apparaît sur le tampon après sélection catégorie

Style badge : cercle crème `--mr-paper` avec bordure épaisse noire `--mr-ink`, chiffre en Cormorant Garamond bold.

### 4. Hover states évidents

Tous les éléments cliquables : `cursor-pointer` + lift 2-4px + shadow qui s'accentue. Éléments complétés : checkmark vert SVG avec animation de trace.

### 5. Mini-animation de guidage

Pendant les 4 premières secondes, une main cartoon SVG fait un geste de "drop" au-dessus de l'enveloppe. Disparaît dès interaction ou après 4s.

### 6. État page selon le step

- **Avant upload** : éléments non-actuels (mur, tampon) grisés à 40% opacity
- **Après upload** : mur passe à 100% opacity + badge "2" apparaît
- **Après catégorie** : tampon passe à 100% + badge "3"

Transitions smooth avec ease-out custom sur 0.6s.

---

## Le concept en une phrase

**Tu n'arrives pas sur un site. Tu arrives sur le bureau d'une casting director d'Hollywood, vu de dessus, où chaque polaroid qu'elle a épinglé au mur est une mini-vidéo qui boucle comme dans la Daily Prophet de Harry Potter.**

---

## Pourquoi ce concept, pas un autre

1. **Le site démontre le produit en permanence** : 50 polaroids = 50 démos silencieuses qui prouvent "la photo devient vidéo" sans une seule ligne de copywriting.
2. **Tactile handmade** : même logique qu'Inkognito (carnet à dessin). C'est ta patte, tu sais la produire.
3. **Impossible à vibe-coder** : les "sites générés en 10 min" ne ressembleront jamais à ça. Barrière à l'entrée naturelle.
4. **Densité éditoriale** : chaque recoin du bureau est un détail à découvrir. Temps passé sur page up, partage TikTok up.
5. **Drôle par défaut** : un post-it *"M. Spielberg a rappelé 3x"*, un tampon `REJECTED` sur un dossier de chien. L'humour est dans les détails, pas forcé.

---

## Vue d'ensemble du bureau (landing)

Imagine une photo du dessus d'un bureau, cadrage vertical, prise d'un angle 70° (pas 90° plat, pas 45° perspective trop marquée). Ambiance lumière tungstène chaude.

### Zones du bureau (de gauche à droite, de haut en bas)

```
┌───────────────────────────────────────────────────────────────┐
│  [MUR DE LIÈGE EN ARRIÈRE-PLAN, FLOU LÉGER, POLAROIDS VIDÉO]   │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  BUREAU EN BOIS (texture réelle, pas gradient)          │  │
│  │                                                          │  │
│  │  [ENVELOPPE KRAFT]    [CARNET OUVERT]    [TÉLÉPHONE]    │  │
│  │   "SUBMISSIONS"       (titre + nav)       (notifs)      │  │
│  │   dropzone                                              │  │
│  │                                                          │  │
│  │  [CV A4]            [ZONE DE TRAVAIL]    [TASSE CAFÉ]   │  │
│  │   pile polaroids    (où tes éléments     avec rond       │  │
│  │                     apparaissent au       sur document)  │  │
│  │                     fur et à mesure)                    │  │
│  │                                                          │  │
│  │  [STYLO BIC]        [POST-ITS JAUNES]    [PELLICULE]    │  │
│  │   pose sur une      avec specs           bouts 16mm     │  │
│  │   feuille           techniques           dispersés      │  │
│  │                                                          │  │
│  └─────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Détail de chaque zone

#### Enveloppe kraft `SUBMISSIONS` (zone upload)

- Enveloppe A4 kraft brun, déchirée sur le dessus, posée en haut à gauche
- Tampon rouge sur l'enveloppe : `CASTING SUBMISSIONS 2026`
- **3-4 polaroids dépassent déjà** (photos de chats exemple, ces polaroids jouent en vidéo aussi)
- **Interaction hover** : l'enveloppe se soulève légèrement, petit effet d'ombre
- **Interaction drop** : la photo tombe dedans, l'enveloppe gobe, puis recrache un polaroid vierge qui atterrit sur le bureau

#### Carnet ouvert (titre + navigation)

- Moleskine ouvert sur 2 pages, posé au milieu-haut
- Page de gauche : titre manuscrit `MeowReel — Today's castings` en encre noire, sous-titré `Nice, France · Est. 2026`
- Page de droite : liste manuscrite des sections du mur (liens de nav) :
  - `→ Trending`
  - `→ Music` 
  - `→ Dance`
  - `→ Cinematic`
  - `→ Moments`
- Hover sur une ligne : elle se souligne au stylo rouge (animation de trait)
- Click : scroll smooth vers la section correspondante sur le mur

#### Téléphone à cadran (notifications / ticker social proof)

- Téléphone noir vintage (Bakelite), posé en haut à droite
- Petite étiquette manuscrite à côté : *"Line 2 — urgent"*
- **Si une notif arrive** (nouveau chat produit quelque part dans le monde) : le cadran tourne avec un *driiing* discret, un micro-texte apparaît à côté : *"New cast: Minou, 2s ago"*
- C'est notre ticker "social proof live" sans être kitsch

#### Zone de travail (centre du bureau)

- Vide au chargement, c'est là que **les éléments apparaissent au fur et à mesure du flow** :
  - Étape 1 (post upload) : ton polaroid fraîchement sorti de l'enveloppe
  - Étape 2 (catégorie choisie) : un deuxième polaroid décroché du mur, avec une flèche manuscrite entre les deux
  - Étape 3 (checkout) : un document `CONTRAT DE TOURNAGE` avec les bundles
  - Étape 4 (processing) : un projecteur 16mm apparaît
  - Étape 5 (delivery) : l'écran de projection du mur du fond se déplie

#### Tasse de café (easter egg / fun)

- Tasse blanche avec des taches, café fumant si tu charges la page (petit volute de vapeur CSS)
- Rond humide sur un document à côté
- **Click** : le café se renverse sur un document (animation comique). Reset au reload.

#### Post-its (humour + infos)

- 3-4 post-its jaunes dispersés, chacun avec une annotation manuscrite :
  - *"M. Spielberg a rappelé 3x"*
  - *"Demander aux avocats pour le cas Minou"*
  - *"Rdv Madame Pintard jeudi"*
  - *"Ne JAMAIS accepter le chat de Mme Dumoulin"*
- Pur humour / atmosphère. Pas d'interactif.
- **1 post-it spécial** visible partout : *"0,99€ la scène · paiement 1 tap"* — c'est notre vrai proposition de valeur, planquée au milieu des gags.

#### Le mur de liège en arrière-plan (les catégories)

- Occupe toute la largeur, visible en flou léger derrière le bureau quand t'es sur la landing
- Quand tu scrolles, la caméra monte et le mur devient le focus
- Le mur est segmenté en 5 zones (sections) avec de la ficelle colorée qui délimite :
  - `TRENDING` (ficelle rouge)
  - `MUSIC` (ficelle bleue)
  - `DANCE` (ficelle jaune)
  - `CINEMATIC` (ficelle noire)
  - `MOMENTS` (ficelle verte)
- Chaque section = 6-12 polaroids épinglés
- Des bouts de scotch, agrafes, épingles visibles
- Post-its d'intersection entre les zones

---

## Le move signature : **les polaroids qui vivent**

### Le comportement

Chaque polaroid sur le mur **n'est pas une image, c'est une vidéo** qui joue en loop **sans qu'on ait besoin de hover**. Comme un Live Photo qui bouge tout seul. Comme dans Harry Potter.

Impact :
- Le user comprend instantanément ce que fait MeowReel : "photo → vidéo", sans une ligne de texte
- C'est hypnotique, on veut rester regarder
- C'est le screenshot TikTok / Instagram qui fait viral

### Spécifications techniques

Pour que ça soit pas un désastre de perf :

- **Format** : WebM VP9 (fallback H.264 MP4 pour Safari plus ancien)
- **Résolution** : 240×320 (exact ratio polaroid), upscalable si hover/focus
- **Durée** : 2-3s, loop seamless
- **Taille fichier** : **< 80 KB chacun** (critique)
- **Compression** : `ffmpeg -i source.mp4 -c:v libvpx-vp9 -crf 35 -b:v 0 -c:a none -r 24 -vf scale=240:320 output.webm`
- **Encodage batch** : script qui prend tous les previews et les encode uniformément

### Performance (50 polaroids visibles sans crasher le mobile)

- **Intersection Observer** : seules les vidéos dans le viewport jouent, les autres sont `paused` + `preload="none"`
- **Lazy load progressif** : on charge les polaroids de la section active en priorité, les autres en defer
- **Placeholder poster** : chaque vidéo a un `poster=""` JPEG compressé (~8 KB) qui s'affiche avant le WebM charge
- **Throttling sur mobile** : détecter `navigator.connection.saveData` ou `effectiveType === '3g'` → désactiver autoplay, passer en poster statique + hover-to-play

### Fallback dégradé

Si le device est trop pauvre (vieux Android, iOS 12, ou bande passante naze) :
- Remplacer les WebM par des JPEG statiques
- Indicateur subtil "▶" overlay qui indique "click to play"
- Expérience préservée, juste moins magique

---

## Palette

**Totalement différente du BRAND.md initial.** On est plus dans le dark cinéma, on est dans le bureau chaleureux.

```css
:root {
  /* Background bureau */
  --mr-wood-dark:   #5a3a1f;  /* bois foncé (ombres du bureau) */
  --mr-wood-mid:    #9c6b34;  /* bois moyen (plus chaud pour cartoon) */
  --mr-wood-light:  #c49764;  /* bois clair (reflets) */
  --mr-cork:        #a07846;  /* liège (mur arrière) */

  /* Papier et surfaces */
  --mr-paper:       #f4ead5;  /* papier crème (polaroids, carnets) */
  --mr-paper-aged:  #ebdfc4;  /* papier jauni (documents anciens) */
  --mr-paper-shadow:#d9c9a8;  /* ombre papier sur bureau */

  /* Encres et stylos */
  --mr-ink:         #1a1614;  /* encre noire (annotations, titres) */
  --mr-ink-blue:    #2b4a6f;  /* bleu stylo bic */
  --mr-ink-red:     #d63e1d;  /* rouge tampon (plus vif pour cartoon) */

  /* Post-its et accents */
  --mr-postit:      #f4d56a;  /* jaune post-it (plus vif pour cartoon) */
  --mr-postit-pink: #e8a5c0;  /* rose post-it (alt) */

  /* États UI */
  --mr-stamp-red:   #a82a1c;  /* rouge tampon APPROVED/REJECTED */
  --mr-stamp-green: #4a6b3a;  /* vert tampon (rare, pour success) */
}
```

### Règle d'usage

- **Backgrounds** : toujours une texture (bois, liège, papier). Jamais de flat color.
- **Textes principaux** : `--mr-ink` (noir encre), PAS noir pur
- **Accents important** : `--mr-ink-red` avec parcimonie, comme un soulignage stylo
- **CTAs primaires** : tampons (fond rouge tampon + texte crème, rotation légère random ±2°)
- **Hover states** : shadow qui s'accentue (l'élément "se soulève"), pas de color change

---

## Typographie

### Stack

```css
--font-handwritten: 'Caveat', 'Homemade Apple', cursive;
--font-display:     'Editorial New', 'Migra', 'Cormorant Garamond', serif;
--font-typewriter:  'Special Elite', 'Courier Prime', monospace;
--font-body:        'Inter', -apple-system, sans-serif;
```

### Références commerciales (si budget tu peux prendre les premium)

- **Premium pick display** : `Canela` (Commercial Type) ou `Domaine Display` (Klim) ou `ITC Benguiat`
- **Premium pick handwritten** : commissioner une font custom traced à partir d'une vraie écriture (ta pote designer peut faire ça en 2 jours avec Calligraphr.com)
- **Free fallbacks qui marchent** : Editorial New est presque aussi beau que Canela et gratuit

### Usage par contexte

| Contexte | Font | Size | Couleur |
|---|---|---|---|
| Titre carnet "MeowReel — Today's castings" | `--font-handwritten` | 3.5rem | `--mr-ink` |
| Nav carnet (liens sections) | `--font-handwritten` | 1.4rem | `--mr-ink-blue` |
| Annotations post-its | `--font-handwritten` | 1.1rem | `--mr-ink` ou `--mr-ink-blue` |
| Titre officiel CONTRAT DE TOURNAGE | `--font-display` | 2.2rem | `--mr-ink` |
| Labels "SCENE · 001" | `--font-typewriter` | 0.8rem, uppercase, tracking 0.15em | `--mr-ink` |
| Body texte général (rare, on évite) | `--font-body` | 1rem | `--mr-ink` |
| Tampons (APPROVED, ACTION) | `--font-display` bold italic | 1.8rem, uppercase | `--mr-stamp-red` |
| Emails de livraison (corps) | `--font-handwritten` + `--font-display` mix | variable | - |

### Règle

- **Aucun Inter / Satoshi / Space Grotesk sauf nécessité absolue**. On bannit le SaaS font par principe.
- **Les fonts handwritten dominent** partout où il y a de la "vie" (carnet, post-its, annotations).
- **Serif display** pour tout ce qui est "officiel" (contrat, tampons, headlines majeures).
- **Typewriter** uniquement pour les specs techniques (timecodes, numéros de scène, IDs).

---

## Animations et interactions

### Principes

1. **Physique réaliste** : rien ne "slide" proprement. Les éléments tombent avec gravité, rebondissent, s'inclinent.
2. **Imperfection** : chaque polaroid a un angle légèrement différent (rotation random ±5°). Les tampons ne sont jamais droits.
3. **Sound design optionnel** : par défaut OFF, toggle discret pour activer. Sons : thwack de polaroid, click-clack de projecteur, clac de tampon, cadran de téléphone. **Très subtils**, jamais stridents.

### Animations clés

#### Upload de la photo

```
Timeline (2.5s total) :

0.0s  - User drop file dans l'enveloppe
0.2s  - Enveloppe vibre, une polaroïd vierge sort
0.5s  - Polaroid tombe vers la zone de travail (gravity physics subtle)
0.8s  - Polaroid atterrit avec micro-rebond
1.0s  - Photo apparaît progressivement (effet développement polaroid :
        filter: brightness(0.2) → 1.0, saturate(0) → 1.0 sur 1.5s)
2.5s  - Done. Le polaroid est "vivant", légèrement incliné.
```

Implémentation : Motion (ex-Framer Motion) + CSS filters animation.

#### Scroll vers le mur

```
User scrolle vers le bas
→ La caméra "monte" (parallax inversé : le bureau descend, le mur devient visible)
→ Le bureau fade légèrement en bas (on perd les détails du bureau mais on gagne le mur)
→ À 80% scroll : le mur est en focus, sections apparaissent une par une avec stagger 100ms
```

#### Sélection d'une catégorie (polaroid du mur)

```
0.0s  - Click sur polaroid
0.1s  - Le polaroid s'agrandit légèrement (scale 1.05) et rotation revient à 0°
0.3s  - Il "se détache" du mur (épingle tombe visible)
0.5s  - Il descend vers la zone de travail du bureau
0.8s  - Atterrit à côté du polaroid de l'utilisateur
1.0s  - Une flèche manuscrite se trace (SVG path animation) entre les deux
1.2s  - Texte "match" apparait au stylo rouge à côté de la flèche
```

#### Paiement (tampon ACTION)

```
0.0s  - User clique bouton "ACTION" (stylisé tampon encreur)
0.1s  - Le tampon descend verticalement vers le document sur le bureau
0.3s  - Impact : tampon frappe le document (motion blur léger),
        shake léger du bureau entier (transform: translateX +/- 2px)
0.4s  - Tampon remonte
0.5s  - Marque "APPROVED" apparaît sur le document (texture encre légèrement baveuse,
        pas parfait)
0.8s  - Redirect Stripe Checkout
```

#### Génération (loading)

```
0.0s  - Retour sur le bureau post-paiement
0.5s  - Une main (animation silhouette simple) vient prendre le polaroid du user
        et le glisse dans un projecteur 16mm
1.5s  - Projecteur s'allume, les bobines tournent, cliquetis discret
2.0s  - Sur le mur du fond, un écran de projection descend
3.0s  - Un document vierge est glissé dans une machine à écrire
3.5s  - Les messages de production commencent à s'imprimer lettre par lettre :
        "Le réalisateur prépare l'éclairage..."
        (8-12s d'affichage)
        "Maquillage en cours sur le talent..."
        (etc. rotation toutes les 12s)
```

Indicateur de progression : les bobines du projecteur tournent. Pas de progress bar bête. L'indice "ça tourne" = ça avance.

#### Livraison

```
0.0s  - Status = done détecté (polling)
0.5s  - Le projecteur passe en "projection réelle" : l'écran du mur affiche ta vidéo
1.0s  - Les bobines ralentissent, s'arrêtent
1.5s  - Une enveloppe "FOR YOU" glisse vers le bureau
2.0s  - L'enveloppe s'ouvre, un nouveau polaroid en sort (ta vidéo en miniature)
2.5s  - Deux tampons apparaissent à droite : "DOWNLOAD" (bleu) et "SHARE" (vert)
3.0s  - En dessous, 4 polaroids d'autres catégories s'alignent (cross-sell)
        avec ton chat déjà appliqué dessus en preview
```

---

## Adaptation mobile

**Critique.** 79% des achats seront mobile. Le bureau en vue de dessus marche pas sur 375px de large.

### Stratégie

On ne fait pas une "version mobile du bureau". On fait une **vue alternative** qui préserve l'esprit.

**Mobile layout :**
- Fond : texture bois mais plus serré, vue plus "close-up"
- Layout : **scroll vertical classique** avec les éléments "posés" l'un après l'autre
- Les polaroids du mur deviennent un **carousel horizontal** par section (swipe)
- Le carnet devient un **menu bas fixe** (bottom sheet style)
- L'enveloppe devient un **big dropzone** qui prend 60% de l'écran à l'ouverture
- Les tampons restent (gros CTAs circulaires rouges)
- Les animations sont simplifiées (pas de physics gravity, juste des slides)

**Élément signature préservé :** les polaroids qui jouent en vidéo auto. Ça reste le WOW mobile.

**Éléments coupés sur mobile :**
- Café fumant (nice to have)
- Téléphone à cadran (remplacé par bottom banner discret pour ticker)
- Post-its multiples (1 seul post-it pour la value prop)

### Breakpoints

```css
/* Mobile portrait: bureau simplifié vertical */
@media (max-width: 767px) { ... }

/* Tablette: bureau tight mais vue de dessus préservée */
@media (min-width: 768px) and (max-width: 1023px) { ... }

/* Desktop: full bureau expérience */
@media (min-width: 1024px) { ... }
```

---

## Assets à produire

### Backgrounds cartoon (générés Replicate, run 1x)

- [ ] Texture bureau bois cartoon (2048x1536, Flux Schnell, style Ghibli/Tintin)
- [ ] Texture mur liège cartoon (2048x1536, même style)
- [ ] Texture papier crème (overlay subtil pour grain)

Script : `pnpm generate:assets` (scripts/generate-assets.ts)

### SVG illustrés custom (components/illustrations/)

Tous en ligne claire 2.5px, fills plats, cel-shading simple :

- [ ] DeskEnvelope.tsx (enveloppe kraft ouverte, plis, tampon)
- [ ] DeskPolaroid.tsx (cadre polaroid, pin, ombre)
- [ ] DeskPostit.tsx (post-it avec coin replié, ombre, plis)
- [ ] DeskStamp.tsx (tampon encreur, bord ondulé)
- [ ] DeskPhone.tsx (téléphone à cadran Bakelite)
- [ ] DeskNotebook.tsx (carnet ouvert 2 pages)
- [ ] GuidingHand.tsx (main ligne claire, index pointé)
- [ ] GuideArrow.tsx (flèche manuscrite animée)
- [ ] StepBadge.tsx (badge cercle numéroté)
- [ ] Checkmark.tsx (coche verte animée)

### Fonts

- [ ] Caveat (Google Fonts, free) — handwritten
- [ ] Cormorant Garamond (Google Fonts, free) — display
- [ ] Special Elite (Google Fonts, free) — typewriter

### Vidéos polaroids catégories

- [ ] 40 vidéos WebM 240×320 < 80 KB chacune
- [ ] Production : toi, en utilisant Replicate directement avec ton chat + photos stock cats variées
- [ ] Budget : ~5€ pour toute la banque (40 × $0.05 sur Seedance 2.0 Fast)
- [ ] Encoder batch avec script ffmpeg
- [ ] Chaque vidéo a un poster JPEG (auto-généré)

### Sounds (optionnels)

- [ ] Thwack polaroid sur bureau (0.3s)
- [ ] Click-clack projecteur 16mm (loop 2s)
- [ ] Clac tampon encreur (0.2s)
- [ ] Driiing téléphone (1s, discret)
- [ ] Fond ambient : bruit de café/bureau très subtil (loop 30s, OFF par défaut)

Source : Freesound.org ou Epidemic Sound (si budget).

---

## États du bureau selon le flow

Le bureau n'est pas statique. Il **évolue** selon où l'user est dans le funnel.

| État | Ce qui apparaît / disparaît |
|---|---|
| Landing (vierge) | Bureau de base + enveloppe pleine + carnet + décor |
| Photo uploadée | Polaroid vierge qui sort de l'enveloppe, atterrit zone travail |
| Catégorie choisie | 2e polaroid (modèle) rejoint la zone de travail, flèche "match" |
| Bundle choisi | Document "CONTRAT DE TOURNAGE" apparaît sur le bureau |
| Pré-paiement | Tampon "ACTION" devient cliquable à droite du contrat |
| Processing | Projecteur apparaît, mur déploie écran, machine à écrire imprime |
| Delivered | Écran projette vidéo, enveloppe "FOR YOU" + tampons DOWNLOAD/SHARE + cross-sell polaroids |

**Transitions smooth entre états**, pas de "page refresh". Tout se passe sur le même bureau, avec des éléments qui arrivent/partent.

---

## Anti-patterns à éviter

- ❌ **Gradients SaaS** : pas un seul gradient sur le site. Que des textures.
- ❌ **Icons pack générique** (Heroicons, Lucide, Feather) : tout est en **SVG illustré cartoon custom** dans components/illustrations/
- ❌ **Emojis dans l'UI** : jamais (sauf email subject lines, 1 max)
- ❌ **Fonts SaaS** (Inter seul, Space Grotesk, Satoshi solo) : toujours mixer avec handwritten + serif
- ❌ **Bordures arrondies partout** : on a des vrais objets, ils ont les bords qu'ils ont
- ❌ **Animations parfaites** : tout doit être imparfait, légèrement random, un peu bancal
- ❌ **Dark mode** : on a pas de dark mode. La DA est chaleureuse, point.
- ❌ **Em-dash** : règle perso d'Ajwad
- ❌ **Phrases type "Let's get started!"** : cette vibe n'existe pas ici

---

## Références à regarder **avant de commencer**

Vraiment, ouvre ces sites et scroll 5 min chacun avant de coder :

1. **[shop.a24films.com](https://shop.a24films.com)** — editorial cinéma crème/papier
2. **[mschf.com](https://mschf.com)** — le site EST un objet
3. **[criterion.com](https://criterion.com)** — cinéma sans les clichés
4. **[familiastudio.co](https://familiastudio.co)** — agency handmade
5. **[klim.co.nz](https://klim.co.nz)** — typo + photos intentionnelles
6. **[are.na](https://are.na)** — philosophie scrapbook
7. **Harry Potter Daily Prophet scene** (YouTube : "daily prophet scene") — le feeling photos-animées
8. **Apple Live Photos** — le mécanisme qu'on reproduit
9. **[pudding.cool](https://pudding.cool)** — editorial interactif
10. **[bureau-cool.com](https://bureau-cool.com)** — bureau / atelier vibe

---

## Check final : est-ce on brand ?

Avant de valider un écran :

- [ ] Y a une **texture de vrai matériau** en background ?
- [ ] Au moins un **élément handwritten** est visible ?
- [ ] Au moins une **photo détourée d'objet réel** est présente ?
- [ ] Les angles des polaroids/tampons ne sont **pas droits** (rotation légère) ?
- [ ] **Les polaroids-vidéos** jouent en loop ?
- [ ] Pas un seul **emoji UI** ?
- [ ] Pas un seul **gradient SaaS** ?
- [ ] **Un détail drôle** est planqué (post-it, easter egg) ?
- [ ] Le **vocabulaire casting/cinéma** est respecté (screen test, scene, take, cut) ?
- [ ] Ça ressemble à **aucun autre outil AI** sur le marché ?

Si un seul `non` → on reboucle.
