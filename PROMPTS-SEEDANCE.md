# MeowReel · PROMPTS-SEEDANCE.md

> **Fichier autorite pour tous les prompts Seedance 2.0 de generation video.**
> Les prompts ici doivent etre copies tels quels dans le code du worker (GENERATION.md).
> A chaque generation, on injecte la photo du user en @Image reference + le prompt de la categorie.

---

## 0. REGLE CRITIQUE : AMATEUR AUTHENTICITY > CINEMATIC POLISH

Les videos virales TikTok de chats qui font des trucs impossibles fonctionnent parce qu'elles IMITENT des videos amateur. Pas du cinema. Pas de drone. Pas de lighting de studio.

**La formule virale :**
- Decor 100% banal et reconnaissable (gym, cuisine, porch suburbain)
- Eclairage naturel ambiant (pas de mood light, pas de studio lighting)
- Presence humaine partielle (bras, main, jambe en bord de cadre) = signe de credibilite "c'est chez moi"
- Camera iPhone handheld medium shot, pas de dolly, pas de crane, pas de steadicam
- Vetements basiques sur le chat (t-shirt simple qui CACHE les pattes = astuce pratique pour eviter les artifacts)
- Expression chat neutre concentree, pas exageree
- Absurdite vient de l'ACTION, pas du traitement visuel

**Remplacements obligatoires dans tous les prompts :**
- "cinematic" -> "handheld iPhone footage"
- "dramatic lighting" -> "natural ambient lighting"
- "Netflix doc style" -> "home video authenticity"
- "film grain" -> "raw phone camera"
- "mood lighting" -> "overhead fluorescent / natural daylight"
- "professional camera" -> "smartphone held by friend"

**Ce qui fait qu'on y croit :**
1. Le decor est un endroit ou on a TOUS ete (gym, cuisine, porch)
2. La camera est tenue par un pote qui filme (pas un cameraman)
3. Un bout d'humain est visible (preuve que quelqu'un filme)
4. Le chat porte un petit vetement simple (cache les pattes = moins d'artifacts)
5. L'action est absurde mais le traitement est NORMAL

---

## 1. La formule qui marche

Basée sur la doc officielle Seedance 2.0 (mars 2026) et l'analyse de 500+ prompts curés sur GitHub (`YouMind-OpenLab/awesome-seedance-2-prompts`).

**Structure en 5 parties, dans cet ordre strict :**

```
SUBJECT + ACTION + CAMERA + STYLE + TIMELINE
```

1. **SUBJECT** : qui/quoi, décrit précisément (1-2 phrases)
2. **ACTION** : un seul verbe au présent + mouvement unique du sujet
3. **CAMERA** : shot size + angle + movement (UN seul mouvement principal)
4. **STYLE** : aesthetic + lighting + color grade
5. **TIMELINE** (optionnel) : découpage 5s ou 10s

### Règles critiques (pour éviter le look AI cringe)

❌ **Ne jamais faire** :
- Spécifier du jargon photo ("24fps, f/2.8, ISO 800, 85mm")
- Cumuler plusieurs mouvements caméra ("push-in, then pan, then zoom")
- Mettre le chat ET un humain dans le cadre (conflits de focus)
- Utiliser "cute", "kawaii", "adorable" (pousse vers cartoon)
- Dire "cartoon", "animated", "3D render" (on veut photoreal)

✅ **Toujours faire** :
- Décrire le rythme comme tu parlerais à un éditeur ("slow, smooth, gentle")
- UN mouvement caméra principal par shot
- Séparer clairement mouvement caméra / mouvement sujet
- Ancrer le style avec des références réelles ("16mm film grain", "doorbell camera aesthetic", "iPhone footage")
- Inclure un négatif prompt court pour éviter les artifacts

---

## 2. Template de base réutilisable

Tous les prompts MeowReel suivent ce template :

```
A photorealistic {CAT_DESCRIPTION_FROM_REFERENCE} wearing {SIMPLE_CLOTHING},
{ACTION_VERB} {ACTION_DETAIL}, 
{BANAL_ENVIRONMENT_DESCRIPTION}, {NATURAL_LIGHTING}.
Camera handheld iPhone medium shot, {ANGLE}, slight natural shake.
Raw smartphone footage, no color grading, no filters, {AMBIENT_LIGHT_TYPE},
home video authenticity.
Human arm/hand partially visible at frame edge.
5 seconds, 9:16 vertical.
```

**Avec `@Image reference`** (la photo du chat du user) :

```
@Image 1: reference photo of the cat (preserve fur color, eye color, breed)

Animate the cat from reference image 1 wearing {SIMPLE_CLOTHING},
{ACTION_DETAIL}, 
{BANAL_ENVIRONMENT}, {NATURAL_LIGHTING}.
Camera handheld iPhone medium shot, slight natural shake.
Preserve cat identity (fur pattern, face markings, eye color).
Raw smartphone footage, natural ambient lighting, no filters.
Human arm partially visible at frame edge for credibility.
5 seconds, 9:16 vertical portrait.
```

### Negative prompt (commun a TOUS les prompts MeowReel)

```
no full human body visible, no human face visible, 
no text overlays, no watermark, no logos, 
no distorted anatomy, no extra limbs, no extra paws, 
no blurry motion, no cartoon style, no anime style, 
no 3D render look, no uncanny valley, no floating objects, 
no glitches, no artifacts, no multiple cats, no disappearing cat,
no cinematic color grading, no studio lighting
```

Note : les bras/mains humains partiellement visibles en bord de cadre sont SOUHAITES (credibilite amateur). Seuls les visages et corps complets humains sont interdits.

---

## 3. Les 41 prompts prêts à l'emploi

### SECTION TRENDING (6 prompts, priorité 1 — ce qui marche MAINTENANT sur TikTok)

#### 01. `midnight-porch-musician` (LE trend Sora 2, 6M+ vues — version amateur)

```
Animate the cat from reference image 1 sitting upright on a suburban 
porch at night, holding a tiny golden trumpet with its front paws, 
slowly bobbing its head side to side as if playing a melody, wearing 
nothing, neutral focused expression.
Standard suburban porch with warm amber porch light overhead, concrete 
steps, a doormat, suburban houses visible across the street in darkness, 
one window flickering blue from a TV, a human in pajama pants partially 
visible standing on the right side of the frame watching the cat.
Camera static fisheye wide angle from doorbell camera height about 4 
feet up, strong fisheye lens distortion at edges making the cat's face 
slightly enlarged at center.
Doorbell security camera aesthetic, timestamp "03:47 TUE" visible in 
bottom right corner, date "APR-14-2026" in top left, grainy low 
resolution night footage, slight green infrared tint on shadows, warm 
amber porch light contrast, chromatic aberration around cat fur edges, 
motion activated recording feel.
Preserve cat fur color and face markings from reference image.
5 seconds, doorbell camera perspective, human legs partially visible.
```

#### 02. `ring-doorbell-chaos`

```
Animate the cat from reference image 1 standing on two legs reaching 
toward a doorbell camera at night, its face filling the wide angle lens, 
paws flailing slightly as if trying to press the bell.
Residential front porch setting, dim yellow porch light, wooden door 
visible behind, small potted plant to the side.
Camera static at standard doorbell height, wide angle fisheye distortion 
makes the cat's face huge and comical at center.
Low resolution security camera aesthetic, motion activated timestamp 
"02:13 WED" with date "APR-16-2026", slight green night vision tint on edges, 
subtle grain throughout, chromatic aberration around cat's fur.
Preserve cat identity from reference image.
5 seconds, no humans visible, cat appears unexpectedly.
```

#### 03. `drive-through-worker`

```
Animate the cat from reference image 1 sitting at a fast-food drive-through 
window wearing a small red visor cap, holding a paper bag in its paws, 
leaning forward to hand it out the window with a focused expression.
Fast-food restaurant interior visible, fluorescent lighting, menu board 
reflecting off window, a small headset on the cat's ear.
Camera positioned from the customer perspective (outside the window), 
static medium shot at car window height.
Realistic documentary style, slightly overexposed fluorescent lighting, 
1080p iPhone footage aesthetic, no filter, natural skin tone of the cat fur.
Preserve cat fur color and markings from reference.
5 seconds, only cat visible through window.
```

#### 04. `news-anchor-3am`

```
Animate the cat from reference image 1 sitting upright behind a wooden 
news desk wearing a tiny black blazer, front paws folded, mouth moving as 
if reading breaking news, eyes serious and focused on camera.
Professional news studio set, "BREAKING NEWS" banner behind in red, 
blue backdrop with subtle news graphics, desk has a microphone.
Camera static medium close-up, eye level, slight push-in over 5 seconds.
Realistic broadcast TV aesthetic, studio lighting warm and even, 
1080p broadcast quality, subtle film grain, color grade neutral TV-ready.
Preserve cat identity from reference, no humans.
5 seconds, single cat, professional news look.
```

#### 05. `restaurant-waiter`

```
Animate the cat from reference image 1 standing on hind legs at a 
restaurant table, wearing a small bow tie and apron, carefully placing a 
tiny plate of food down with its paws, tail flicking with concentration.
Upscale restaurant interior, dim warm mood lighting, candles on table, 
wine glasses in soft focus background, other tables visible out of focus.
Camera at customer point of view, medium shot from seated angle, very 
subtle handheld sway.
Cinematic photorealistic style, warm tungsten lighting, shallow depth of 
field, 35mm lens aesthetic, Wes Anderson color palette with soft pastels.
Preserve cat identity from reference.
5 seconds, only the cat visible.
```

#### 06. `security-cam-confused`

```
Animate the cat from reference image 1 walking across an empty kitchen 
counter at 4AM, pausing to look directly at the security camera with wide 
suspicious eyes, then slowly knocking a glass off the counter with its paw.
Modern home kitchen interior at night, dim under-cabinet lighting only, 
refrigerator hum implied, slight darkness in corners.
Camera static ceiling-mounted security camera angle, wide angle view 
looking down at 45 degrees.
Low quality security footage aesthetic, 480p grainy look, timestamp 
"04:23 SAT" in green font bottom right, slight infrared tint, motion blur 
when glass falls, chromatic aberration.
Preserve cat identity from reference.
5 seconds, no humans.
```

---

### SECTION MUSIC (8 prompts, haute virality émotionnelle)

#### 07. `jazz-trumpet`

```
Animate the cat from reference image 1 sitting upright on a wooden bar 
stool in a smoky 1950s jazz club, holding a small gold trumpet to its 
mouth with its paws, eyes half-closed in deep concentration, slight head 
tilt as if mid-note.
Dim jazz club interior, single warm spotlight from above, cigarette smoke 
drifting through the beam, dark red curtain backdrop blurred behind.
Camera static medium close-up from slightly below (low angle), subtle 
push-in over the 5 seconds.
Cinematic noir aesthetic, warm amber and deep red color grade, 16mm film 
grain, chiaroscuro lighting, single key light source, shallow depth of 
field with bokeh highlights behind.
Preserve cat fur color and face markings from reference.
5 seconds, single cat in frame, no humans.
```

#### 08. `rock-guitarist`

```
Animate the cat from reference image 1 standing on hind legs on a concert 
stage, slung with a tiny black electric guitar, strumming wildly with one 
paw while the other grips the neck, head banging rhythmically, fur tousled 
by stage wind.
Large concert venue, arena stage with speaker stacks, purple and red stage 
lights flickering, crowd silhouettes barely visible in darkness below.
Camera wide shot from audience perspective at slight low angle, handheld 
style with natural sway.
Cinematic concert aesthetic, high contrast stage lighting, lens flares 
from spotlights, slight motion blur on cat's movement, 4K concert footage 
look with deep blacks.
Preserve cat identity and fur color from reference.
5 seconds, single cat on stage, no humans visible.
```

#### 09. `club-dj`

```
Animate the cat from reference image 1 behind DJ decks in a packed 
nightclub, head nodding rhythmically, one paw on a vinyl record, the other 
on a mixer knob, tiny headphones over ears, laser lights reflecting off 
fur.
Dark nightclub interior, fog machine mist, green and purple laser beams 
cutting through smoke, blurred crowd with hands raised in background.
Camera medium shot from behind the booth facing the cat, slight handheld 
motion with the beat, subtle zoom in.
Cinematic nightclub aesthetic, high saturation colored lights (magenta, 
cyan, green), strobe-like flickers, lens flares from lasers, 1080p with 
filmic grain, shallow depth of field.
Preserve cat identity from reference.
5 seconds, single cat DJing, no humans.
```

#### 10. `classical-pianist`

```
Animate the cat from reference image 1 sitting on a black piano bench 
wearing a tiny black tailcoat with white bow tie, paws gracefully running 
along the keys of a grand piano, eyes closed in concentration, slight 
swaying with the music.
Grand concert hall interior, ornate gold decorations, dark red velvet 
curtain backdrop, single spotlight from above, empty audience seats 
visible blurred behind.
Camera medium close-up from the side showing profile, slow dolly push-in 
over 5 seconds.
Cinematic concert hall aesthetic, warm golden stage lighting, deep rich 
shadows, 35mm film look, orchestral classical film color grade, soft 
highlights on the piano's black lacquer.
Preserve cat fur color and markings from reference.
5 seconds, single cat at piano.
```

#### 11. `rap-booth`

```
Animate the cat from reference image 1 in a recording studio, paws 
gripping a professional microphone on a stand, mouth moving rapidly as if 
rapping, small gold chain around neck, backwards red cap, intense 
expression.
Professional recording booth interior, acoustic foam walls visible, warm 
red LED indicator lights on equipment, studio monitors in blurred 
background, pop filter on mic.
Camera medium close-up from slightly below the mic (low angle), subtle 
handheld feel, slight zoom in as the cat "raps".
Music video aesthetic, moody purple and red lighting, cinematic color 
grade with crushed blacks, lens flares on the mic, hip-hop music video 
look, 4K quality with subtle grain.
Preserve cat identity and fur color from reference.
5 seconds, single cat in booth, no humans.
```

#### 12. `k-pop-idol`

```
Animate the cat from reference image 1 performing a synchronized K-pop 
dance move on a bright stage, wearing a tiny colorful outfit, paws moving 
in a choreographed pose, head snap to the side in sharp movement.
Bright K-pop stage set, vibrant pink and cyan LED walls behind, 
holographic graphics pulsing, stage fog at floor level, LED floor panels 
glowing.
Camera medium shot at eye level, slight push-in with quick rhythm 
matching the beat implied, music video style framing.
K-pop music video aesthetic, ultra saturated colors (hot pink, electric 
blue, white), high key lighting, crisp 4K look, slight slow motion feel, 
Korean entertainment production value.
Preserve cat identity from reference.
5 seconds, single cat performing, no humans.
```

#### 13. `accordion-paris`

```
Animate the cat from reference image 1 sitting on a Parisian cobblestone 
street wearing a black beret, playing a small red accordion with its 
paws, head swaying side to side romantically, tail curled.
Parisian street scene at golden hour, cobblestone ground, charming 
building facades with blue shutters, small cafe tables visible, Eiffel 
Tower blurred in far distance.
Camera medium shot at cat's eye level, slow dolly pull-back revealing 
more of the Parisian setting.
French cinematic aesthetic, warm golden hour light, 35mm film grain, 
nostalgic color grade with teal shadows and warm highlights, slight 
vignette, Amélie movie color palette.
Preserve cat fur color and markings from reference.
5 seconds, single cat, no humans visible.
```

#### 14. `orchestra-conductor`

```
Animate the cat from reference image 1 standing on a wooden conductor's 
podium wearing a black tailcoat, both paws raised high holding a small 
white baton, waving it dramatically with precise movements, fur puffed 
with passion.
Grand concert hall with a full orchestra blurred in background, warm 
stage lights, ornate decorations, music stands and instruments visible 
out of focus.
Camera low angle medium shot from the orchestra's perspective, very 
subtle push-in emphasizing dramatic energy.
Cinematic classical concert aesthetic, warm golden spotlight from above, 
rich deep shadows, film grain, Amadeus movie color grade, dramatic 
lighting contrast.
Preserve cat identity from reference.
5 seconds, single cat conducting, no humans.
```

---

### SECTION SPORTS (8 prompts, énorme sur TikTok masc/mixte)

#### 15. `football-goal-celebration` ⚽ (LE prompt que tu m'as demandé)

```
Animate the cat from reference image 1 running at full speed across a 
green football pitch toward the camera, arms (paws) wide in celebration 
pose like Cristiano Ronaldo's "SIUUU", mouth open mid-roar, wearing a 
tiny red jersey, crowd erupting in blurred background.
Large football stadium at night, floodlights illuminating the pitch, 
crowd-filled stands blurred by motion, fog/smoke from flares lingering, 
pitch lines clearly visible.
Camera low angle tracking shot following the cat as it runs toward camera, 
smooth handheld feel, subtle shake emphasizing energy.
Cinematic sports broadcast aesthetic, dramatic stadium lighting, lens 
flares from floodlights, slow motion feel on the celebration, broadcast 
TV color grade, 4K sports coverage quality, slight motion blur on crowd.
Preserve cat fur color and markings from reference.
5 seconds, single cat celebrating, no humans.
```

#### 16. `basketball-dunk`

```
Animate the cat from reference image 1 mid-air leaping toward an NBA 
basketball hoop, one paw extended holding a tiny orange basketball, 
clearly about to dunk it through the rim, muscles flexed, focused 
expression.
NBA arena interior, polished wooden court with team logos, crowd blurred 
in stands, bright arena lights reflecting off the court, scoreboard 
visible in distance.
Camera low angle from under the hoop looking up, slight slow-motion 
tracking the jump.
NBA broadcast aesthetic, bright arena lighting, slight lens flare on 
lights, 4K broadcast quality, slight slow-motion feel, crisp sharp focus 
on cat, blurred crowd.
Preserve cat identity from reference.
5 seconds, single cat dunking, no humans visible.
```

#### 17. `boxing-ring-knockout`

```
Animate the cat from reference image 1 standing in a boxing ring wearing 
tiny red boxing gloves, both paws raised in victory pose, champion belt 
over shoulder, mouth open in roar of triumph, fur sweaty, heavy breathing.
Professional boxing ring with red ropes, spotlight from above, dark arena 
with crowd silhouettes in background, referee's arm blurred raising the 
cat's paw.
Camera low angle medium shot from outside the ring, slow push-in, subtle 
handheld sway.
Boxing broadcast aesthetic, dramatic spotlight lighting, lens flares, 
high contrast, 4K broadcast quality, sweat particles visible in the 
light, slight slow-motion feel.
Preserve cat identity from reference.
5 seconds, single cat as champion, no humans in frame.
```

#### 18. `surfer-wave`

```
Animate the cat from reference image 1 balanced on a small surfboard 
riding inside a large ocean wave barrel, fur wet and tousled by wind, 
paws gripping the board's edges, tail balancing, eyes focused ahead.
Pacific ocean wave in a perfect barrel, turquoise water curling overhead, 
sunlight piercing through the water creating rays, white foam at the 
base.
Camera tracking shot moving alongside the cat from side view, slight 
handheld ocean feel.
Surf documentary aesthetic, bright natural sunlight, water droplets 
visible in the air, slow motion feel on the wave, GoPro 4K quality, 
saturated ocean blues, California surf film color grade.
Preserve cat fur color and markings from reference.
5 seconds, single cat surfing, no humans.
```

#### 19. `tennis-roland-garros`

```
Animate the cat from reference image 1 standing on red clay tennis court 
at Roland Garros, both paws lifting a large gold trophy above its head, 
tiny white tennis outfit, mouth open in celebration, racket abandoned on 
ground.
Roland Garros stadium tennis court, red clay surface, crowd blurred in 
stands, sponsor logos visible blurred, warm afternoon sunlight.
Camera medium shot at slight low angle, slow push-in emphasizing triumph, 
minimal handheld sway.
Tennis broadcast aesthetic, warm sunset golden hour lighting, slight lens 
flare, broadcast TV color grade, Roland Garros iconic red clay saturation, 
4K sports quality.
Preserve cat identity from reference.
5 seconds, single cat with trophy, no humans.
```

#### 20. `f1-podium-champagne`

```
Animate the cat from reference image 1 on top step of F1 podium wearing a 
red Ferrari race suit, spraying champagne from a large bottle 
enthusiastically with both paws, gold trophy at its feet, tiny racing 
gloves on paws.
F1 podium setting, confetti falling, Monaco grand prix backdrop blurred, 
sponsors logos, other podium steps empty, crowd blurred beyond.
Camera medium shot at slight low angle, slow zoom in, handheld 
celebration feel.
F1 broadcast aesthetic, bright Mediterranean sunlight, crisp colors 
(red Ferrari, yellow champagne, gold trophy), lens flares, confetti 
particles visible, broadcast 4K quality, slight slow motion.
Preserve cat identity and fur color from reference.
5 seconds, single cat on podium, no humans.
```

#### 21. `skater-street-trick`

```
Animate the cat from reference image 1 mid-air on a skateboard performing 
a kickflip trick, all four paws gripping or around the board, ears flat, 
eyes focused, tiny beanie on head, graffiti wall behind.
Urban street setting, concrete pavement with graffiti wall, industrial 
area, warm street-level sunlight creating long shadows, spray paint 
visible on walls.
Camera low angle tracking shot from the street following the trick, 
slight handheld skater-video feel.
Skate video aesthetic, fisheye lens feel, warm sunset lighting, raw VHS 
grain, 90s skate culture color grade, shallow depth of field, slight 
motion blur on the board.
Preserve cat identity from reference.
5 seconds, single cat skating, no humans.
```

#### 22. `gymnast-olympics-gold`

```
Animate the cat from reference image 1 standing on an Olympic podium 
wearing a gold medal around neck, one paw lifted in salute as an anthem 
plays, tiny gymnastics leotard, eyes watery with pride, Olympic rings 
banner behind.
Olympic gymnastics stadium podium, Olympic rings prominently displayed, 
flag rising in background, soft indoor sports arena lighting, gold silver 
bronze medals on podium.
Camera medium shot slight low angle, very slow zoom in, minimal 
stabilized motion.
Olympic broadcast aesthetic, warm stadium lighting, dramatic color grade, 
lens flare on medal, 4K broadcast quality, emotional cinematic feel, 
slight slow motion.
Preserve cat identity from reference.
5 seconds, single cat on podium, no humans.
```

---

### SECTION DANCE (6 prompts — les plus TikTok-native)

#### 23. `griddy-gym` (version virale amateur authentique)

```
Animate the cat from reference image 1 doing the Griddy dance in a 
basic commercial gym, standing upright on hind legs wearing a plain 
gray oversized t-shirt that covers its front paws, the cat holds its 
paws up near its eyes in the classic Griddy binocular pose then sways 
side to side rhythmically with a focused neutral expression.
Standard gym interior with harsh fluorescent overhead lighting, rubber 
floor mats, weight rack with mismatched plates visible behind, a human 
arm holding a phone partially visible on the right edge of the frame, 
water bottle on the floor nearby, other gym equipment slightly blurred 
in background.
Camera handheld iPhone medium shot at eye level, slight natural shake 
and sway as if a friend is filming while trying not to laugh, vertical 
9:16 portrait orientation.
Raw smartphone footage look, no color grading, no filters, natural 
harsh gym fluorescent lighting with slight green tint, slight motion 
blur during fast dance moves, crisp autofocus on cat.
Preserve cat fur color and face markings from reference image.
5 seconds, single cat doing Griddy, human arm partially visible at 
frame edge, home video authenticity.
```

#### 24. `tiktok-dance-trend`

```
Animate the cat from reference image 1 performing a viral TikTok dance 
choreography in a trendy bedroom, standing on hind legs, paws moving in 
sync with an implied beat, head bobbing, hip swaying, front paws doing 
precise gestures.
Aesthetic bedroom interior, fairy lights string on walls, pink LED strip 
lighting, posters on walls, plants in corners, unmade bed visible 
blurred, mirror reflecting action.
Camera medium vertical shot at eye level, phone-held at slight angle, 
iPhone selfie style slight sway.
TikTok creator aesthetic, pink and purple LED mood lighting, iPhone 15 
video quality, slight film grain, vertical 9:16 composition feel, 
content creator production value.
Preserve cat identity from reference.
5 seconds, single cat dancing, no humans.
```

#### 25. `ballet-classical`

```
Animate the cat from reference image 1 performing a ballet pirouette on 
tip-toes (hind leg paws pointed), wearing a tiny white tutu, front paws 
raised gracefully overhead, spotlight from above, spinning slowly.
Grand opera house stage, red velvet curtains blurred behind, single warm 
spotlight from above, wooden stage floor, ornate decorations peripheral.
Camera medium shot at slight low angle, slow orbit around the cat 
matching the spin motion.
Ballet cinematic aesthetic, warm spotlight with surrounding darkness, 
35mm film grain, Black Swan movie color palette, dramatic chiaroscuro 
lighting, slight slow motion.
Preserve cat fur color and markings from reference.
5 seconds, single cat dancing, no humans.
```

#### 26. `disco-70s`

```
Animate the cat from reference image 1 striking a Saturday Night Fever 
pose on a lit disco floor, wearing a white three-piece suit, one paw 
pointed up toward mirror ball, one paw on hip, hips swaying rhythmically.
Classic 70s disco interior, colored squares lit floor (red, blue, 
yellow), giant disco ball hanging from ceiling sparking light across 
room, blurred crowd dancing in background.
Camera medium shot at slight low angle, slow push-in matching disco 
rhythm, subtle sway.
70s disco film aesthetic, warm tungsten lighting with colored disco 
lights, slight lens flare from disco ball, 16mm film grain, vintage 
color grade with warm oranges and pinks, Studio 54 vibes.
Preserve cat identity from reference.
5 seconds, single cat dancing, no humans.
```

#### 27. `breakdance-carton`

```
Animate the cat from reference image 1 performing a breakdance freeze on 
a cardboard mat in a street setting, balanced upside down on one paw, 
other limbs in the air, intense focused expression, wearing a tiny 
backwards cap.
Urban street setting, graffiti walls, cardboard breakdance mat on 
concrete, other breakdancers silhouettes blurred in background forming a 
circle, boombox visible.
Camera low angle wide shot, slight handheld street-video feel, slow 
push-in.
90s street breakdance documentary aesthetic, warm street-level sunset 
lighting, VHS grain, crushed blacks color grade, slight lens distortion, 
hip-hop culture production value.
Preserve cat identity from reference.
5 seconds, single cat breakdancing, no humans in focus.
```

#### 28. `salsa-couple-cuba`

```
Animate the cat from reference image 1 performing a solo salsa spin on a 
Cuban street, tiny red dress fluttering (or red shirt), front paws 
raised mid-spin, head tilted passionately, fur tousled by motion.
Havana street at golden hour, colorful colonial building facades 
(yellow, pink, blue), vintage 1950s American cars parked, cobblestone 
ground, warm sunset light.
Camera medium shot at eye level, slow orbit following the spin 
direction, slight handheld warmth.
Buena Vista Social Club aesthetic, warm golden hour lighting, nostalgic 
Cuban color grade with saturated reds and yellows, 16mm film grain, 
Wong Kar-wai feel.
Preserve cat fur color and markings from reference.
5 seconds, single cat dancing, no humans.
```

---

### SECTION CINEMATIC (9 prompts — les rôles rêvés)

#### 29. `ninja-night-tokyo`

```
Animate the cat from reference image 1 crouching stealthily on a Tokyo 
rooftop at night wearing a black ninja outfit with face mask (only eyes 
visible), front paws gripping a small katana, tail still for balance, 
neon city glow reflecting on fur.
Tokyo rooftop scene at night, skyline filled with neon signs (red, pink, 
blue kanji characters), rain-slick surface, fog at street level below, 
Tokyo Tower blurred in distance.
Camera low angle wide shot, slow push-in emphasizing stealth.
Cyberpunk cinematic aesthetic, heavy neon color lighting (cyan and 
magenta dominant), Blade Runner color grade, 35mm anamorphic lens feel, 
rain mist in air, lens flares from neon, film grain.
Preserve cat identity from reference.
5 seconds, single cat ninja, no humans.
```

#### 30. `samurai-edo-period`

```
Animate the cat from reference image 1 standing in traditional samurai 
armor on a wooden bridge, paws on the hilt of a katana at its side, 
wind blowing through its fur dramatically, focused warrior expression.
Edo period Japan setting, wooden arched bridge over a misty river, 
blooming cherry blossom trees with petals falling, traditional Japanese 
temple in distant background, morning mist.
Camera medium shot at slight low angle, slow push-in, minimal sway.
Kurosawa film aesthetic, overcast soft daylight, desaturated color grade 
with warm greens and browns, 35mm film grain, cherry blossom petals 
floating in air, traditional Japanese cinematic look.
Preserve cat fur color and markings from reference.
5 seconds, single cat samurai, no humans.
```

#### 31. `cowboy-far-west`

```
Animate the cat from reference image 1 standing in front of an old 
Western saloon at high noon, tiny cowboy hat tilted low, paws near a 
holstered revolver, tail steady, eyes squinting with intensity, 
tumbleweed rolling past.
Classic Western ghost town street, wooden saloon building with swinging 
doors, dusty dirt road, wooden sidewalks, horses blurred in background, 
tumbleweeds, high noon sun directly overhead.
Camera medium shot at slight low angle, static but very subtle 
push-in.
Sergio Leone Western aesthetic, harsh yellow desert sunlight, long 
shadows, warm orange color grade, 35mm film grain, dust particles 
visible in air, spaghetti western feel.
Preserve cat identity from reference.
5 seconds, single cat cowboy, no humans.
```

#### 32. `astronaut-space`

```
Animate the cat from reference image 1 in an astronaut suit floating 
inside the International Space Station, one paw gently pushing off a 
wall, tail helping balance in zero gravity, helmet visor reflecting 
Earth below visible through window.
ISS interior with realistic equipment, cables and wires, blue LED 
lighting, a round window showing planet Earth from space, no gravity 
floating atmosphere, NASA-style equipment.
Camera handheld medium shot with very slight rotation (zero-gravity 
feel).
NASA documentary aesthetic, cool blue and white lighting, realistic 
space mission production value, 4K quality, slight lens flare from 
window light, cinematic sci-fi color grade.
Preserve cat identity from reference.
5 seconds, single cat astronaut, no humans.
```

#### 33. `gladiator-colosseum`

```
Animate the cat from reference image 1 standing victorious in the 
Colosseum arena sand, wearing small Roman gladiator armor with red cape, 
paws raised high above head in victory roar, chest out proud, cape 
flowing in wind.
Roman Colosseum interior, massive stone walls and arches, blurred crowd 
in stone tiers, sand arena floor with footprints, dust motes in 
sunbeams, Roman standards visible.
Camera low angle wide shot, slow push-in emphasizing heroic triumph.
Gladiator movie aesthetic (Ridley Scott), warm golden sunlight beams, 
desaturated color grade with warm highlights, dramatic shadows, 35mm 
film grain, dust particles in light, Roman epic cinematic feel.
Preserve cat identity from reference.
5 seconds, single cat gladiator, no humans in focus.
```

#### 34. `viking-warrior-ship`

```
Animate the cat from reference image 1 standing at the prow of a wooden 
Viking longship, wearing a horned helmet, front paws gripping a small 
battle axe, fur blowing in ocean wind, serious warrior expression, tail 
steady.
Icelandic coast setting, Viking longship with carved dragon prow, 
stormy ocean with grey waves, fjord mountains in distant background, 
overcast dramatic sky.
Camera medium shot at low angle from water level, slight handheld ocean 
sway.
Vikings TV show aesthetic, moody overcast lighting, desaturated Nordic 
color grade (teal and brown), 35mm film grain, spray particles in air, 
epic Nordic cinematic feel.
Preserve cat identity and fur color from reference.
5 seconds, single cat viking, no humans.
```

#### 35. `pirate-caribbean-ship`

```
Animate the cat from reference image 1 at the helm of a pirate ship 
steering wheel, wearing a tricorn pirate hat and red bandana, one paw on 
wheel, one paw pointing forward, tail steady for balance, fur windswept.
Caribbean pirate ship deck, wooden wheel, rigging and sails visible, 
open ocean horizon with tropical island in distance, palm trees, pirate 
flag flapping overhead, sunset sky.
Camera medium shot at slight low angle, subtle handheld ship sway.
Pirates of the Caribbean aesthetic, warm golden sunset lighting, saturated 
tropical colors, 35mm film grain, sea spray mist, adventure film color 
grade.
Preserve cat identity from reference.
5 seconds, single cat pirate captain, no humans.
```

#### 36. `anime-hero-ghibli`

```
Animate the cat from reference image 1 standing on a grassy hill with 
wind blowing dramatically through its fur, staring determinedly at the 
horizon, front paw slightly raised, tail flowing in wind, like a 
classic anime protagonist shot.
Studio Ghibli style landscape, rolling green hills, dramatic clouds in 
blue sky, distant forest, wildflowers in foreground, warm golden hour 
sunlight, peaceful rural Japanese countryside.
Camera wide shot at slight low angle, slow dolly pull-back revealing 
more landscape.
Studio Ghibli anime-realistic aesthetic, golden hour natural lighting 
(despite photorealistic), warm saturated colors, slight cinematic film 
feel, anime-influenced composition but photorealistic rendering, 
Miyazaki color palette.
Preserve cat fur color and markings from reference.
5 seconds, single cat hero, no humans.
```

#### 37. `cat-cooking-realistic` (version amateur cuisine maison)

```
Animate the cat from reference image 1 standing upright on hind legs 
at a regular home kitchen counter next to the sink, wearing a plain 
oversized t-shirt that covers its front paws, the cat stirs a pot on 
the stove with a wooden spoon held in one paw, focused neutral 
expression looking down at the pot.
Basic home kitchen with standard white cabinets, cluttered countertop 
with spice jars and a cutting board, dish soap by the sink, fridge 
with magnets partially visible on the left, a human arm reaching in 
from the right side of the frame as if handing the cat an ingredient.
Camera handheld iPhone medium shot from across the kitchen counter, 
slight shake and autofocus hunting, vertical 9:16 portrait, filmed 
by someone standing a few feet away.
Natural kitchen lighting from overhead fluorescent and window daylight, 
no color grading, no filters, raw smartphone footage, slight 
overexposure from window light, home video authenticity.
Preserve cat fur color and face markings from reference image.
5 seconds, single cat cooking, human arm partially visible, no chef 
hat, no professional kitchen, no Netflix aesthetic.
```

---

### SECTION MOMENTS (5 prompts, cross-sell émotionnel)

#### 38. `birthday-party`

```
Animate the cat from reference image 1 sitting at a dining table with 
a huge birthday cake covered in lit candles, wearing a colorful party 
hat, paws on the table, leaning forward to blow out candles, eyes wide 
with excitement, confetti falling around.
Cozy home dining room, birthday decorations (balloons, streamers) in 
background, party guests' blurred silhouettes, warm ambient lighting, 
presents stacked nearby.
Camera medium shot at eye level, slow push-in as cat blows out candles, 
slight handheld home video feel.
Family celebration home video aesthetic, warm tungsten lighting, happy 
nostalgic color grade, slight motion blur on confetti, iPhone video 
quality, 4K but with handheld warmth.
Preserve cat identity from reference.
5 seconds, single cat, no humans in focus.
```

#### 39. `wedding-day`

```
Animate the cat from reference image 1 standing at a wedding altar 
wearing a tiny white wedding dress (or black tuxedo), front paws 
holding a small bouquet, ears perked emotionally, one tear visible, 
elegant pose.
Outdoor wedding altar, flower arch overhead with white and pink roses, 
scenic mountain background, warm golden hour lighting, wooden aisle with 
rose petals scattered, guests blurred in chairs.
Camera medium shot at slight low angle, very slow push-in, steady.
Wedding film aesthetic, warm golden hour lighting, soft romantic color 
grade, shallow depth of field bokeh, 4K wedding videographer quality, 
emotional cinematic feel.
Preserve cat identity from reference.
5 seconds, single cat at altar, no humans.
```

#### 40. `christmas-eve-santa`

```
Animate the cat from reference image 1 wearing a full Santa Claus 
costume with red hat and white beard beneath a decorated Christmas 
tree, front paws holding a wrapped present, laughing mouth open 
shaking like "Ho ho ho", fireplace glowing nearby.
Cozy living room Christmas scene, large decorated Christmas tree with 
lights and ornaments, crackling fireplace with stockings hung, 
presents wrapped under tree, warm glowing atmosphere.
Camera medium shot at eye level, slow push-in toward the cat, 
handheld warm home video feel.
Christmas movie Hallmark aesthetic, warm golden firelight, cozy 
Christmas color palette (red, green, gold), film grain, soft bokeh 
lights from tree, nostalgic holiday feel.
Preserve cat identity and fur color from reference.
5 seconds, single cat as Santa, no humans.
```

#### 41. `halloween-pumpkin`

```
Animate the cat from reference image 1 sitting among glowing jack-o-
lanterns at night wearing a tiny witch hat, eyes glowing slightly 
reflecting pumpkin candles, tail curled around a pumpkin, spooky 
mysterious pose.
Autumn porch at night, multiple carved pumpkins with candle glows 
creating orange ambient light, fall leaves scattered, fog drifting 
across ground, wooden porch steps, full moon visible above.
Camera medium shot at slight low angle, slow push-in creating spooky 
tension.
Halloween horror film aesthetic, dramatic orange candle lighting with 
deep purple shadows, fog machine atmosphere, slight film grain, 
suspenseful color grade, cinematic spooky feel.
Preserve cat identity from reference.
5 seconds, single cat witch, no humans.
```

---

### BONUS : Les 4 que tu as demandés spécifiquement

#### B1. `cat-cuisine-realistic` (version plus simple que Michelin)

```
Animate the cat from reference image 1 standing on hind legs at a home 
kitchen counter, paws chopping vegetables on a wooden cutting board with 
a small knife, wearing a tiny red apron, focused expression.
Modern home kitchen, granite countertop, colorful vegetables (tomatoes, 
peppers) ready for chopping, cooking pots on stove blurred in 
background, warm pendant lighting.
Camera medium shot at counter level, slight handheld food blogger feel.
YouTube cooking channel aesthetic, bright natural kitchen lighting, 
4K iPhone video quality, warm inviting color grade, shallow depth of 
field on the cutting.
Preserve cat identity from reference.
5 seconds, single cat cooking, no humans.
```

#### B2. `cat-cleaning-house` (chat qui range)

```
Animate the cat from reference image 1 standing on hind legs pushing a 
small vacuum cleaner across a living room floor, both paws on the 
handle, tail up for balance, serious cleaning expression, wearing a 
yellow cleaning bandana.
Modern living room interior, furniture visible (sofa, coffee table), 
natural daylight through windows, plants in corners, clean organized 
space, small pile of dust visible ahead.
Camera medium wide shot at eye level, slow tracking following the 
vacuum path.
Home vlog TikTok aesthetic, bright natural lighting, iPhone 4K video 
quality, crisp clear focus on cat, slight motion blur on vacuum, 
content creator production value.
Preserve cat identity from reference.
5 seconds, single cat cleaning, no humans.
```

#### B3. `cat-studying-desk` (bonus étudiant)

```
Animate the cat from reference image 1 sitting at a study desk wearing 
tiny round glasses, paw flipping through pages of a book, head tilted 
as if reading intensely, focused frowning expression, scattered papers 
and pens around.
Cozy student bedroom desk, warm desk lamp lighting, books stacked 
nearby, plant on desk, fairy lights blurred on wall behind, coffee 
mug visible, notebooks open.
Camera medium shot at eye level close-up, very subtle push-in.
Studytok aesthetic, warm desk lamp lighting creating pools of light, 
4K iPhone video quality, aesthetic study vlogger feel, cinematic 
shallow depth of field, warm cozy color grade.
Preserve cat identity and fur color from reference.
5 seconds, single cat studying, no humans.
```

#### B4. `cat-gaming-setup` (bonus streamer)

```
Animate the cat from reference image 1 sitting at a gaming desk wearing 
tiny gaming headphones, paws on a RGB mechanical keyboard, focused 
intense gaming expression, RGB lights reflecting in wide eyes, mouse 
clicks rapidly.
Gaming setup with multiple monitors showing games in blurred action, 
RGB keyboard glowing cyclical colors (red to purple to blue), gaming 
chair back visible, dark room with only LED ambient lighting.
Camera medium shot at slight low angle from the side, subtle push-in.
Twitch streamer aesthetic, RGB neon lighting (purple, cyan, red 
dominant), shallow depth of field, 4K streamer quality, cinematic 
gaming ambiance, slight motion blur on keyboard hits.
Preserve cat identity from reference.
5 seconds, single cat gaming, no humans.
```

---

## 4. Contraintes techniques pour le code

### Format d'appel Seedance 2.0 via Replicate

```typescript
const prediction = await replicate.run(
  "bytedance/seedance-2-lite", // Seedance 2.0 Fast, $0.05/5s @ 480p
  {
    input: {
      prompt: categoryPrompt, // depuis ce fichier
      image: userCatImageUrl, // référence photo du user
      duration: 5, // secondes
      aspect_ratio: "9:16", // vertical TikTok
      resolution: "720p", // sweet spot mobile
      negative_prompt: GLOBAL_NEGATIVE_PROMPT,
      motion_strength: "medium", // éviter trop d'agitation
      seed: undefined, // aléatoire
    }
  }
);
```

### Constantes globales

```typescript
export const GLOBAL_NEGATIVE_PROMPT = `
no humans, no people, no hands, no text overlays, no watermark, no logos,
no distorted anatomy, no extra limbs, no extra paws, no six legs,
no blurry motion, no cartoon style, no anime style, no 3D render look,
no uncanny valley, no floating objects, no glitches, no artifacts,
no multiple cats, no disappearing cat, no morphing, no melted features
`.replace(/\s+/g, ' ').trim();

export const ASPECT_RATIO = "9:16"; // vertical TikTok
export const DURATION_SECONDS = 5;
export const RESOLUTION = "720p";
export const MODEL = "bytedance/seedance-2-lite";
```

### Budget

| Item | Coût unitaire | Quantité | Total |
|---|---|---|---|
| Preview catégorie (720p 5s) | $0.05 | 12 (priorité 1) | $0.60 |
| Preview catégorie (720p 5s) | $0.05 | 29 (priorité 2) | $1.45 |
| Vidéo user commande (720p 5s) | $0.05 | par commande | $0.05 |

Coût Replicate par commande user : **$0.05** (confirmé à l'unité).

---

## 5. Checklist validation d'un prompt

Avant de commit un nouveau prompt dans ce fichier, vérifier :

- [ ] Référence `@Image 1` ou `reference image 1` présente
- [ ] UN seul mouvement caméra principal
- [ ] UN seul verbe d'action présent
- [ ] Pas de jargon photo (focal length, f-stop)
- [ ] Pas de "cute/kawaii/adorable"
- [ ] "single cat in frame, no humans" présent
- [ ] Style photorealistic explicite (cinematic, documentary, broadcast)
- [ ] Lighting décrit (warm, cool, harsh, soft)
- [ ] Color grade mentionné (teal-orange, desaturated, saturated)
- [ ] Reference culturelle ancrée (Netflix, BBC, TikTok, Ghibli)
- [ ] Durée précisée (5 seconds)
- [ ] "preserve cat identity from reference" présent

---

## 6. Workflow pour ajouter un nouveau prompt

Quand Ajwad veut ajouter une nouvelle catégorie virale :

1. **Spotter le trend** sur TikTok (genre "cat sigma face 2026")
2. **Étudier 5 vraies vidéos virales** du trend
3. **Extraire** : setting, action clé, style visuel, caméra
4. **Écrire le prompt** avec le template section 2
5. **Tester 3 fois** via Replicate pour valider consistency
6. **Commit** dans ce fichier avec numéro d'ordre
7. **Ajouter** à CATEGORIES.md et seed MongoDB
8. **Générer** le preview WebM via `pnpm generate:previews`

---

## 7. Prompts audio (Seedance 2.0 natif)

Seedance 2.0 supporte l'audio natif. Pour certaines catégories, on peut injecter une prompt audio :

**Jazz trumpet** : `"Soft jazz trumpet melody, smoky club ambiance, distant applause"`
**Football goal** : `"Crowd roar explosion, stadium chant, commentator excited"`
**Griddy gym** : `"Trap beat with 808 bass, viral rap song energy"`
**K-pop idol** : `"K-pop song hook with bright synth, crowd scream"`
**Jazz club** : `"Saxophone with upright bass, vinyl crackle, glass clinking"`
**Samurai** : `"Wind through bamboo, distant taiko drum, cherry blossoms rustling"`
**F1 podium** : `"Champagne pop, crowd cheer, national anthem playing"`

À tester si on veut vidéo+son (bump coût léger mais massive différence viralité TikTok).

---

## 8. Regle DANCE : mouvement accentue

Pour TOUTES les categories section DANCE, appliquer ces ajustements :

- **Duration** : 6 secondes (au lieu de 5 par defaut)
- **Motion** : "swaying VIGOROUSLY side to side with clear rhythm, full body commitment, head bobbing visibly, ears flapping with motion, paws moving in sharp distinct beats"
- **Fin de prompt** (avant negative) : "Exaggerated dance movement, clear choreography beats visible, high energy performance, motion is the main visual focus, multiple distinct dance poses within the 6 seconds."

---

## 9. Variations de setup (ajoutees apres validation griddy-gym-v1)

Meme action, decors differents. Format amateur authenticity identique.

### DANCE variations (4 nouvelles, total section = 10)

#### V1. `griddy-kitchen`

```
Animate the cat from reference image 1 doing the Griddy dance in a home kitchen, standing upright on hind legs wearing a plain white t-shirt that covers its front paws, the cat holds its paws up near its eyes in the classic Griddy binocular pose then sways VIGOROUSLY side to side with full body commitment, head bobbing visibly, focused neutral expression.
Family kitchen with standard white cabinets, fridge with magnets, dish soap by sink, cluttered countertop, a human hand holding a phone partially visible on the left edge of frame, cereal box on counter.
Camera handheld iPhone medium shot, slight natural shake, vertical 9:16.
Natural kitchen daylight from window, no filters, raw smartphone footage, slight overexposure from window.
Exaggerated dance movement, clear choreography beats visible, high energy performance, multiple distinct dance poses within the 6 seconds.
Preserve cat identity from reference. 6 seconds, human hand partially visible.
```

#### V2. `griddy-bedroom`

```
Animate the cat from reference image 1 doing the Griddy dance in a teenager bedroom, standing upright on hind legs wearing a plain black t-shirt that covers its front paws, the cat holds its paws up near its eyes in the Griddy binocular pose then sways VIGOROUSLY side to side, head bobbing, ears flapping with motion.
Messy bedroom with unmade bed, LED strip lights on wall showing purple glow, posters on walls, clothes on floor, gaming chair visible, human legs in sweatpants partially visible sitting on bed edge watching.
Camera handheld iPhone medium shot, slight shake, vertical 9:16.
Mixed lighting from LED strips and overhead light, raw phone camera, no filters, slight purple tint from LEDs.
Exaggerated dance movement, clear choreography beats visible, high energy, multiple distinct poses within 6 seconds.
Preserve cat identity. 6 seconds, human legs partially visible.
```

#### V3. `griddy-livingroom`

```
Animate the cat from reference image 1 doing the Griddy dance in a living room, standing upright on hind legs wearing a plain gray t-shirt, Griddy binocular pose with paws near eyes then swaying VIGOROUSLY side to side, full body commitment, head bobbing.
Standard living room with couch, TV showing sports game in background, coffee table with remotes, rug on floor, human arm reaching for phone partially visible at frame edge.
Camera handheld iPhone medium shot from across the room, vertical 9:16, slight sway.
Natural indoor ambient lighting, overhead light on, TV glow from background, raw smartphone footage, no color grading.
Exaggerated dance movement, high energy, multiple dance poses within 6 seconds.
Preserve cat identity. 6 seconds, human arm partially visible.
```

#### V4. `tiktok-dance-bathroom`

```
Animate the cat from reference image 1 performing a viral TikTok dance in front of a bathroom mirror, standing on hind legs wearing an oversized hoodie, arms doing precise hand gestures in sync with implied beat, hip swaying, head bobbing.
Standard bathroom with large mirror reflecting the cat and phone, white tile walls, towels on rack, toiletries on counter, sink visible, ring light clipped to mirror edge.
Camera held at eye level facing mirror, both cat and phone reflection visible in mirror, vertical 9:16.
Bright ring light illumination mixed with bathroom overhead light, clean white lighting, raw phone camera.
Exaggerated dance movement, clear choreography, high energy, 6 seconds.
Preserve cat identity. Human hand holding phone visible in mirror reflection.
```

### SPORTS variations (4 nouvelles, total section = 12)

#### V5. `football-park`

```
Animate the cat from reference image 1 kicking a small football in a public park, standing on hind legs wearing a plain jersey, the cat winds up and shoots the ball with one leg then throws arms up in celebration.
Public park grass field with amateur goal posts, trees in background, joggers blurred in distance, a human in sneakers partially visible standing nearby watching.
Camera handheld iPhone medium shot, slight shake, vertical 9:16.
Natural outdoor daylight, overcast sky, green grass, raw phone footage, no filters.
Preserve cat identity. 5 seconds, human legs partially visible, amateur park football.
```

#### V6. `football-livingroom`

```
Animate the cat from reference image 1 jumping off a couch celebrating a goal while watching football on TV, standing on hind legs arms raised triumphantly, wearing a football jersey, the TV shows a blurred match in background.
Standard living room, couch with cushions, TV mounted on wall showing football match, coffee table with snacks and beer bottles, human arm with remote partially visible.
Camera handheld iPhone medium shot, slight shake from excited filming, vertical 9:16.
Indoor ambient lighting, TV glow, raw smartphone footage.
Preserve cat identity. 5 seconds, human arm partially visible, celebration reaction video feel.
```

#### V7. `boxing-gym-training`

```
Animate the cat from reference image 1 punching a heavy bag in a boxing gym, standing on hind legs wearing hand wraps on front paws and a plain tank top, throwing jab-cross combinations with focused expression.
Real boxing gym with hanging heavy bags, speed bags on wall, mirror in background, boxing ring ropes partially visible, rubber floor, a human hand steadying the bag from behind partially visible.
Camera handheld iPhone medium shot, slight natural sway, vertical 9:16.
Harsh overhead fluorescent gym lighting, raw phone footage, no filters, slight sweat sheen on fur.
Preserve cat identity. 5 seconds, human hand partially visible holding bag.
```

#### V8. `basketball-street`

```
Animate the cat from reference image 1 dribbling a basketball on an outdoor street court, standing on hind legs wearing a baggy basketball jersey, the cat crossover dribbles then does a layup.
Outdoor urban basketball court with chain net hoop, cracked asphalt, graffiti on nearby wall, fence around court, a human in sneakers standing at three point line partially visible.
Camera handheld iPhone medium shot from sideline, slight shake, vertical 9:16.
Natural afternoon sunlight with hard shadows, raw phone footage, urban street basketball vibe.
Preserve cat identity. 5 seconds, human legs partially visible.
```

### MUSIC variations (3 nouvelles, total section = 11)

#### V9. `jazz-trumpet-street`

```
Animate the cat from reference image 1 playing a tiny golden trumpet on a city sidewalk as a street busker, standing upright wearing a worn flat cap, swaying gently to the rhythm with eyes half closed.
City sidewalk with a small open instrument case on ground with a few coins, pedestrian legs walking past in background blurred, brick building wall behind, a human crouching nearby filming partially visible.
Camera handheld iPhone medium shot from pedestrian perspective, vertical 9:16.
Natural daylight urban setting, no filters, raw phone footage, slight city ambient noise feel.
Preserve cat identity. 5 seconds, human partially visible, street busker authenticity.
```

#### V10. `rock-guitar-bedroom`

```
Animate the cat from reference image 1 shredding an electric guitar in a bedroom, standing on hind legs wearing a band t-shirt, headbanging while playing power chords with intense focused expression.
Teenager bedroom with posters of rock bands on walls, amp on floor with cable, messy desk, LED strip lights, human foot tapping along partially visible at bottom of frame.
Camera handheld iPhone medium shot, slight shake from headbanging energy, vertical 9:16.
Mixed lighting from overhead and colored LED strips, raw phone camera.
Preserve cat identity. 5 seconds, human foot partially visible, bedroom jam session.
```

#### V11. `rap-freestyle-street`

```
Animate the cat from reference image 1 freestyle rapping in a street cypher, standing on hind legs wearing an oversized hoodie and cap, one paw gesturing to the beat, mouth moving as if spitting bars, head nodding.
Urban street corner at dusk, small group of human legs in sneakers forming a circle around the cat (only legs visible no faces), streetlight overhead, parked cars in background.
Camera handheld iPhone close medium shot from within the cypher circle, shaky, vertical 9:16.
Dusk golden hour light mixing with streetlamp, raw phone footage, slight lens flare from streetlight.
Preserve cat identity. 5 seconds, human legs visible forming cypher circle, street freestyle energy.
```

---

## 10. Regle finale

**Si une vidéo générée te semble "AI-évidente" ou "cringe"** :

1. Enlève toute mention de "cute", "adorable", "little"
2. Ajoute plus de détails de setting réaliste (textures, lumières, environnement)
3. Ancre sur une référence culturelle précise ("Netflix doc style", "iPhone footage")
4. Réduis le motion_strength à "low"
5. Re-génère

**Si c'est toujours cringe après 3 essais** : le prompt est mauvais, réécris-le depuis zéro en regardant 5 vraies vidéos TikTok du trend.

On vise le "wait c'est vraiment mon chat ?!" pas le "oh c'est mignon de l'AI".
