# MeowReel · UX & Psychologie de conversion

> Chaque décision UX ici est sourcée dans la psychologie du consommateur impulse buy. C'est pas de la déco, c'est de la science appliquée.

---

## Les 5 principes fondateurs

### 1. Charm pricing : 0,99€ > 1,00€

Les prix finissant en .99 battent les prix ronds de **+24% en conversion** dans les études directes. Passer de 4,99$ à 5,00$ = -4,5% de ventes. Le cerveau lit "zéro-virgule-quelque-chose", pas "un euro".

**Application :**
- Single : **0,99€** (pas 1€)
- Retry : 0,49€
- Remove watermark : +0,50€
- Trio : 2,49€
- Ten : 6,99€

### 2. La dopamine est AVANT la transaction

L'anticipation d'un achat active le circuit de récompense dans le cerveau — la dopamine est libérée AVANT que la carte soit débitée. L'implication : il faut montrer le résultat potentiel AVANT le paiement.

**Application :**
- Preview gratuit (image fixe du chat dans le style choisi)
- Vidéos d'exemples en autoplay loop sur chaque catégorie (ils voient déjà "le résultat")
- Hero video = un vrai chat dans un vrai résultat

### 3. Friction tue l'impulse

40-80% des purchases e-commerce sont non-planifiés. Plus la fenêtre "désir → transaction" est courte, plus le taux converti. Chaque étape perd entre 15-40% des users.

**Application :**
- Pas de création de compte
- Apple Pay / Google Pay : 1 tap
- Max 3 écrans entre "j'arrive" et "j'ai payé" (landing → catégorie → checkout)
- Pas de formulaire d'inscription à la newsletter avant achat
- Email collecté au moment du paiement Stripe, pas avant

### 4. Mobile domine tout

79% des achats impulse se font sur smartphone. 68% de la Gen Z préfère mobile. Notre cible scrolle TikTok et tombe sur nos pubs ; ils sont 100% mobile au moment de l'achat.

**Application :**
- Design mobile-first absolu
- Tap targets ≥ 44px
- CTA principal toujours dans le thumb-zone (tiers inférieur de l'écran)
- Images optimisées, vidéos préchargées
- Apple Pay prioritaire sur Google Pay en visual weight (iOS domine impulse)

### 5. Social proof visible

Les humains achètent ce que les autres humains achètent. Preuve sociale visible = conversion up.

**Application :**
- Ticker live discret "327 chats ont eu leur screen test aujourd'hui"
- Catégorie "Trending" mise en avant
- Possibly: un "wall of fame" opt-in avec les créations partagées (V2)

---

## Le flow optimal (le détail qui tue)

### Écran 1 — Landing

**Règle d'or :** 1 action claire au-dessus du pli. Upload photo. C'est tout.

**Ce qui est visible :**
- Hero vidéo viral (5-7s loop, muted, autoplay, inline muted attribute critical)
- Headline court + prix sub
- CTA upload (dropzone + bouton caméra mobile)

**Ce qui est sous le pli (scroll) :**
- Catégories (pour ceux qui veulent voir avant d'uploader)
- Social proof / ticker live
- 3 étapes "comment ça marche"
- FAQ
- Footer

**Tracking events :**
- Time-to-upload moyen (target < 30s)
- Scroll depth (target 30%+ go below fold)

### Écran 2 — Catégorie

**Après upload, on montre :**
- Miniature photo uploadée en haut (confirm)
- Sections catégories en scroll horizontal mobile / grille desktop
- Sur hover/tap, un aperçu vidéo de 3s tourne
- CTA "Voir un aperçu" (gratuit 1x) pour confirmer qu'on peut produire avec LEUR photo

**Une fois sélectionnée :**
- Badge doré "SCENE N° [order_num] — [category]"
- Bundle selector avec trio mis en avant
- Bouton principal gigantesque "ACTION · 0,99€" en style clap de cinéma

### Écran 3 — Stripe Checkout

Hosted Stripe. Apple Pay en primary si iOS détecté, Google Pay si Android. CB en fallback.

### Écran 4 — Producing (loading)

Voir `FEATURES.md`. Points psychologiques :
- Timer visible (perception du progrès)
- Messages qui changent (perception du travail fait)
- Mini-entertainment (regarder d'autres chats pendant que ça produit)

### Écran 5 — Final Cut (livraison)

Dopamine hit. Vidéo autoplay. 3 secondes de pause. Puis :
- Cross-sell visible
- "Tu viens de payer 0,99€. La même scène avec un autre style ? 0,99€."
- L'écran est aussi optimisé parce qu'on est DANS leur peak dopamine

---

## Cross-sell post-livraison

**Le moment le plus important pour le LTV.**

Après achat, la photo du chat reste en session (30 min). Sur la page final-cut, on affiche 4 autres catégories avec la photo du user déjà appliquée en preview. 1 tap = nouvelle commande.

**Metrics cibles :**
- Cross-sell CTR : 25-40% (benchmark e-com)
- Cross-sell conversion : 15-25% des clickeurs
- AOV final visé : ~2,5€ (plusieurs vidéos par session)

**Framing psycho :**
- "Ton chat vient de **tuer** le rôle de `[precédente catégorie]`."
- "Et si on l'essayait en **`[nouvelle catégorie]` ?"
- Image du chat dans la nouvelle scène (preview) = dopamine relaunch

---

## Bundle psychology

### Affichage

```
  SOLO           TRIO ★           CASTING CALL
  0,99€          2,49€            6,99€
  1 scène        3 scènes         10 scènes
  
                 (★ populaire)
  
  0,99€/film     0,83€/film       0,70€/film
```

### Tricks

1. **L'anchor haut** : Casting Call à 6,99€ fait paraître le Trio raisonnable
2. **Le decoy** : le Solo existe pour que le Trio semble "le meilleur deal" — classic decoy effect
3. **Badge "populaire"** : nudge comportemental, pas de mensonge si on le met sur la vraie top-selling option après quelques semaines
4. **Prix par unité visible** : rationalise la dépense (ils "économisent" en achetant plus)

### AOV impact attendu

- Si 30% des users prennent le trio au lieu du single : AOV passe de 0,99€ à 1,44€ moyen
- Si 10% prennent le ten : encore + vers 1,78€
- Marge nette / commande : de 0,66€ → ~1,20€ (potentiel 2x)

---

## Option "retirer watermark" (+0,50€)

Psycho : pricing par upgrade plutôt que inclus. Le watermark est subtil, la plupart n'y touche pas. Mais ceux qui veulent poster sans aucune trace paient. Marge 100% dessus.

**Impact secondaire :** le watermark SUR les vidéos sans upgrade = acquisition organique. On compense largement le perdu sur ceux qui paient l'upgrade.

---

## Option "deuxième prise" (0,49€)

L'IA rate parfois. Au lieu de refund (on perd 100%), on offre de regénérer à prix cassé. Ils récupèrent quelque chose qu'ils aiment, on fait encore +0,49€ de CA sur une tentative qui aurait pu être un churn.

**Copywriting :**
> *Coupez.*
> Pas emballé par cette prise ? On refait.
> Deuxième take — 0,49€.

---

## Timing et urgence (sans dark patterns)

### Ce qu'on fait

- **Email livraison avec lien valide 48h** (vrai motif : coût storage) → urgence légitime
- **Catégorie "Trending" qui change chaque semaine** → viens souvent pour pas rater
- **Preview gratuit limité à 3 par session** → on pousse à acheter sans forcer

### Ce qu'on fait PAS

- Pas de timer factice "Offre expire dans 5:00"
- Pas de "X personnes regardent cette offre" fake
- Pas de stock fictif
- Pas de dark pattern de double-consentement

---

## Loading states (les 90 secondes critiques)

L'utilisateur a payé. Maintenant il attend. C'est le point de friction le plus dangereux — s'il s'ennuie, il ferme la page et perd confiance.

### Ce qu'on met

1. **Timer visuel cinéma** (00:00 → 01:30 barre qui remplit)
2. **Messages qui tournent** (toutes les 12s) avec vocabulaire cinéma
3. **Mini reel d'exemples** qui tourne pendant le chargement
4. **Réassurance email** : "Ferme cette page si tu veux, on t'envoie le lien"

### Messages rotation (exemple FR)

```
00:00 - "Le réalisateur prépare l'éclairage..."
00:12 - "Maquillage en cours sur le talent..."
00:24 - "Le chef op' cadre la scène..."
00:36 - "Silence plateau..."
00:48 - "Moteur..."
01:00 - "Action."
01:12 - "Le monteur peaufine la coupe..."
01:24 - "Presque prêt pour la projection..."
```

---

## Performance perçue

**Règle :** la vitesse perçue compte plus que la vitesse réelle.

- **LCP < 2s** sur mobile (hero vidéo optimisée, preload)
- **FID < 100ms** (pas de gros JS bloquant)
- **CLS < 0.1** (pas de layout shift)
- **Skeleton screens** plutôt que spinners vides
- **Preloading** des frames suivants quand on détecte une intention

**Tool :** Vercel Speed Insights ou `web-vitals` library, tracké dans MongoDB.

---

## Copy psychology

### Règles

1. **Mots courts, phrases courtes** (8 mots / phrase max dans les CTAs)
2. **Action verbs** : "Produire", "Tourner", "Récupérer" — pas "Obtenir", "Générer" (trop neutres)
3. **Possessifs** : "Ton chat", pas "Un chat" — renforce l'appartenance
4. **Specifics** : "0,99€", pas "quelques centimes"
5. **Urgency implicite** : "90 secondes" plutôt que "Rapide"
6. **Pronoms inclusifs en FR** : on évite le "vous" formel (pas du mode cinéma)

### Exemples CTA

❌ "Générer ma vidéo"
✅ "Action."

❌ "Soumettre la photo"
✅ "Soumettre au casting"

❌ "Obtenir ma vidéo"
✅ "Récupérer le montage"

❌ "Erreur survenue"
✅ "Coupez. On refait une prise."

---

## Anti-patterns à éviter absolument

| ❌ Ce qu'on NE FAIT PAS | Pourquoi |
|---|---|
| Login obligatoire avant achat | -60% de conversion sur e-com moyenne |
| Pop-up newsletter avant d'avoir vu le produit | Tue la confiance immédiatement |
| Prix caché, frais ajoutés au checkout | Trust destroyer |
| Timer factice | Légalement gris, moralement nul |
| Auto-checkbox sur upsells | Pratique interdite en UE |
| Dark mode automatique forcé | Tu peux choisir mais respecte pref système |
| Autoplay avec son | Mute obligatoire, Safari et Chrome blockent de toute façon |
| Pop-in "avant de partir !" exit intent | Aggressif, tuerait la vibe premium |

---

## Tests à lancer une fois en prod

Après 500 ventes, on a les données pour A/B test sérieux.

**Priorité 1 (high impact) :**
1. Prix : 0,99€ vs 1,49€ (sweet spot revenue)
2. Hero video : nuit/instruments vs autre scène virale
3. Bundle trio avec ou sans badge "populaire"

**Priorité 2 :**
4. Apple Pay en premier vs Stripe générique
5. Preview gratuit 1 vs 3 par session
6. Cross-sell : 4 catégories affichées vs 6

**Priorité 3 :**
7. Copy CTA : "Action" vs "Tourner la scène"
8. Loading messages vs version statique

---

## Ticker live "social proof"

Petit élément discret quelque part sur la landing.

```
• 327 chats ont eu leur screen test aujourd'hui
• Dernière production il y a 2 minutes
```

**Technique :** endpoint `/api/stats` qui retourne count des ordres du jour, mis à jour toutes les 30s côté client.

**Rule :** jamais de fake numbers. Si on a 3 ventes aujourd'hui, on affiche 3. La crédibilité > le vanity.

---

## Checklist conversion avant launch

- [ ] Prix affiché en .99 partout
- [ ] CTA principal visible au-dessus du pli mobile
- [ ] Apple Pay + Google Pay dispo
- [ ] Pas d'obligation de compte
- [ ] Email de livraison testé sur iOS Mail + Gmail
- [ ] Preview gratuit fonctionnel
- [ ] Cross-sell affiché après livraison
- [ ] Loading > 15s = message apparent
- [ ] Bundle trio mis en avant visuellement
- [ ] Tracking events configurés dans Plausible
- [ ] Mobile testé sur iPhone SE (le plus petit écran cible)
- [ ] Hero video autoplay fonctionne (muted attribute)
- [ ] Copy cinéma cohérent partout
