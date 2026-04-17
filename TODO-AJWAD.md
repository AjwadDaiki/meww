# TODO-AJWAD · Ce que tu fais pendant que Claude Code code

> Claude Code va te pondre le code. Mais il y a 10 trucs qu'il peut pas faire à ta place. Voilà la liste, par ordre de priorité.

---

## 🔥 PRIORITÉ 1 — À faire dans les 48h (bloquant le launch)

### 1. Acheter les domaines

- [ ] **meowreel.com** (à checker dispo, si libre → prends direct)
- [ ] **meowreel.fun** (fallback si .com pris)
- [ ] **meowreel.studio** (renforce la DA cinéma)
- [ ] Configure DNS → ton VPS (A record + AAAA si IPv6)
- [ ] SSL via Cloudflare ou Let's Encrypt (gratuit)

Registrar recommandé : Namecheap ou OVH (si tu veux rester 100% FR).

### 2. Réserver les handles sociaux (ASAP — squat risk)

- [ ] **@meowreelstudio** sur TikTok
- [ ] **@meowreelstudio** sur Instagram
- [ ] **@meowreelstudio** sur YouTube (Shorts)
- [ ] **@meowreel** sur X/Twitter (secondary)
- [ ] Créer les bios avec la même tagline : *"MeowReel Studios · Your cat's first screen test. Est. 2026."*
- [ ] Même PFP partout (wordmark MeowReel noir/or)

### 3. Comptes services tech

- [ ] **Stripe** (Business account, pas personal) — activation prend 1-5 jours
  - Connecter compte bancaire HiddenLab
  - Valider identité (pièce d'identité + justificatif domicile)
  - Activer Apple Pay domain (validation domaine via fichier `.well-known/...`)
- [ ] **Replicate** account + payment method
  - Ajouter 20€ de crédit pour démarrer
- [ ] **Cloudflare** account + créer bucket R2 `meowreel-videos`
- [ ] **MailerLite** account + vérifier domaine (SPF / DKIM / DMARC DNS records)
- [ ] **Plausible** (cloud ou self-host décision)

### 4. VPS setup

- [ ] Vérifier VPS dispo (OVH/Hetzner, min 4 GB RAM / 2 vCPU / 80 GB SSD)
- [ ] Installer Docker + Docker Compose
- [ ] Configurer firewall (UFW : 22, 80, 443 only)
- [ ] Setup SSH key-only auth (pas de password)
- [ ] Configurer fail2ban pour éviter brute force
- [ ] Setup Nginx comme reverse proxy (ou Caddy, plus simple)

---

## 🎥 PRIORITÉ 2 — Contenu (à faire en parallèle du dev)

### 5. Banque de vidéos hero (pour launch TikTok)

Tu as ~2 semaines pendant que Claude Code code. Utilise ce temps pour **tourner 15-20 vidéos de ton propre chat** en utilisant Replicate direct (ou SoraVideo / Dreamina en trial) pour build la banque de contenu pre-launch.

Besoin :
- [ ] **5-10 photos de ton chat** sous différents angles (face, profile, full body, action)
- [ ] Générer pour chaque : 3-5 variations dans différentes catégories
- [ ] Éditer : hook au début + CTA à la fin + sound tiktok viral
- [ ] Archiver dans un Google Drive `MeowReel - Content Bank`

Timeline vidéos à tourner :
- [ ] 5 vidéos "porch musician" (LE trend)
- [ ] 3-5 vidéos cinéma (ninja, samurai, cowboy)
- [ ] 3-5 vidéos musique (pianiste, DJ, rockstar)
- [ ] 2-3 vidéos absurd (CEO zoom, chef Michelin)

### 6. Press kit

- [ ] Créer un Notion ou PDF propre avec :
  - Logo MeowReel (HD + SVG)
  - 5 screenshots du site (quand il sera prêt)
  - 5 vidéos exemples
  - Pitch en 50 mots / 150 mots / 300 mots
  - Bio courte HiddenLab
  - Contact presse (Ajwad + email)
- [ ] Host sur meowreel.com/press

### 7. Product Hunt listing (draft)

- [ ] Rédiger le listing en anglais :
  - Tagline 60 chars max
  - Description 260 chars max
  - First comment (critique : le pitch en long)
  - Gallery : 3-5 visuels
- [ ] Scheduler pour lundi ou mardi (meilleurs jours PH)
- [ ] Contacter 10-15 potes "hunters" pour upvote dès minuit PST

---

## 📋 PRIORITÉ 3 — Légal & admin

### 8. HiddenLab à jour

- [ ] Vérifier que HiddenLab peut facturer (SIRET actif, statut OK)
- [ ] Sinon : décider forme juridique pour MeowReel
  - EURL (bon compromis solo)
  - SASU (plus flexible, gestion associés)
  - Activité en micro-entreprise si CA prévu < 77 700€/an

### 9. Dépôt marque MeowReel

- [ ] Recherche antériorité INPI (vérifier que personne a pas déjà déposé)
- [ ] Dépôt en ligne INPI (~210€ pour 3 classes)
- [ ] Classes à choisir : **38** (télécoms), **41** (divertissement), **42** (services informatiques)
- [ ] **Attendre validation** (3-6 mois) pour être "owner" officiel
- [ ] Extension EU (EUIPO) à envisager si traction confirmée

### 10. CGV rédaction (FR prioritaire)

- [ ] Reprendre le template LEGAL.md
- [ ] Faire relire par un avocat (services comme Qiiro, Captain Contrat ~200-400€)
- [ ] Ou utiliser Avocat.fr / LegalPlace pour un template validé (~150€)
- [ ] **Critique** : la clause de renonciation au droit de rétractation
- [ ] Traduction EN et ES (Deepl Pro + relecture native)

### 11. Comptabilité

- [ ] Setup un compte Pennylane ou Dougs (en ligne, +/- 40€/mois)
- [ ] Ou si petit : Excel + comptable externe 1x/trimestre
- [ ] Garder TOUS les reçus (Stripe, Replicate, Cloudflare, OVH, MailerLite, etc.)

---

## 📣 PRIORITÉ 4 — Marketing prep

### 12. Liste de 30 micro-créateurs cat à contacter

- [ ] Chercher sur TikTok les comptes avec :
  - 10k-100k followers
  - Niche : chats
  - Engagement > 5%
  - Location : FR, US, UK, ES (pour nos 3 langues launch)
- [ ] Noter dans un Airtable / Google Sheet :
  - @handle
  - Follower count
  - Email / DM contact
  - Langue principale
  - Taux d'engagement moyen
- [ ] Template DM prêt :
  > "Hey [name], j'ai créé un truc pour transformer une photo de chat en mini-film IA (pianiste, ninja, etc.). Je t'offre 10 vidéos gratuites pour que tu testes avec [nom du chat]. Si ça te plaît, tu partages. Aucune obligation. Intéressée ?"

### 13. Scripts TikTok prêts à tourner (toi)

Préparer 5 scripts alignés avec les hooks qui marchent (cf. MARKETING.md) :

- [ ] Script "I paid 1€ for this" (review format)
- [ ] Script "My cat applied to..."
- [ ] Script "POV: your cat has a secret talent"
- [ ] Script "Wait till you see..."
- [ ] Script saisonnier (si proche de Halloween/Noël)

---

## 🎨 PRIORITÉ 5 — Assets design

### 14. Logo & assets brand

Tu es plus créatif que Claude Code pour la DA. Finaliser toi-même :

- [ ] Wordmark final "MeowReel" (Fraunces italic cream + roman gold)
- [ ] Version compacte "MEOWREEL · STUDIOS" monospace (pour email footer, legal, etc.)
- [ ] Favicon (SVG + .ico fallback)
- [ ] OG image 1200×630 pour partage (meme DA que le site)
- [ ] Logos pour dark + light backgrounds
- [ ] Apple touch icon 180×180

Outils : Figma (si nouveau, inspiration A24 / Criterion / Mubi).

### 15. Previews des catégories (loops MP4 muets)

Pour chaque catégorie (~40 au launch), besoin d'un preview de 3-5s qui tourne en hover/autoplay.

Options :
- **Option A** (recommandée) : générer toi-même via Replicate à partir de photos de ton chat (ou photos stock cats), coût ~2-5€ pour toutes les catégories
- **Option B** : créer à partir de stock footage + effets
- **Option C** : laisser Claude Code générer programmatiquement au moment du dev (plus lent mais faisable)

Format :
- MP4 H.264
- 480×480 ou 720×720 (carré pour flexibilité)
- 3-5s loop seamless
- Muets
- < 500 KB chacun (optim avec ffmpeg)

### 16. Watermark spec final

- [ ] Définir exactement la font du watermark
- [ ] Définir opacity / padding / corner
- [ ] Produire 2 versions : dark bg (text light) et light bg (text dark) selon dominant color de la vidéo
- [ ] Donner specs précises à Claude Code (ffmpeg drawtext command)

---

## 📊 PRIORITÉ 6 — Analytics & learnings

### 17. Setup tracking

- [ ] Plausible Dashboard (public, ajoute-toi)
- [ ] Goals custom dans Plausible :
  - Upload started
  - Category selected
  - Checkout initiated
  - Payment completed
  - Video delivered
  - Cross-sell clicked
- [ ] Sentry account pour erreurs prod (free tier OK démarrage)
- [ ] Better Stack pour uptime monitoring (free tier)

### 18. Dashboard personnel

- [ ] Setup une page Notion / Airtable "MeowReel Metrics Daily"
- [ ] Colonnes : Date, Visitors, Uploads, Checkouts, Paid Orders, Revenue, CAC, Top Category
- [ ] Remplir 1x par jour après launch (10 min/jour)

---

## 🎯 PRIORITÉ 7 — À penser mais pas bloquant

### 19. V2 roadmap à spécifier

Garder sous le coude pour plus tard :
- [ ] Tier Premium 2,99€ (Seedance 2.0 Pro 10s 1080p)
- [ ] Custom prompt mode (+2€)
- [ ] Subscription "Casting Director" (creators)
- [ ] Landing par catégorie complètes (SEO-optimized)
- [ ] Blog SEO (10 articles longs)
- [ ] Ajout DE / IT / PT / JA

### 20. Relations presse

- [ ] Lister journalistes AI + cat-tech niche :
  - TechCrunch (Kyle Wiggers, Natasha Lomas)
  - The Verge (AI section)
  - Mashable
  - Le Monde (pour FR spécifique)
  - Les Numériques
  - Numerama
- [ ] Email pitch propre (FR + EN) à garder sous le coude

---

## 📅 Calendrier type (2 semaines avant launch)

### Semaine -2 (préparation)

- Lundi : achat domaines + handles sociaux + comptes services
- Mardi : setup VPS + SSL + DNS config
- Mercredi : tourner 5 vidéos hero
- Jeudi : écrire les 3 premiers scripts TikTok
- Vendredi : démarches INPI + rédaction CGV draft
- Samedi-Dimanche : chiller (critique, pas brûler le capital)

### Semaine -1 (intensification)

- Lundi : Press kit + OG images finalisés
- Mardi : Liste 30 créateurs contactés
- Mercredi : Generate all category previews
- Jeudi : Review CGV finale + traductions
- Vendredi : Test bout-en-bout avec Claude Code sur preview env
- Samedi : Product Hunt listing final + 3 hunters ready
- Dimanche : Dernières vérifs + repos

### Launch day (J0)

- 00:01 UTC : Product Hunt live
- 06:00 : Premier post TikTok + Insta + X
- 08:00 : Email 30 créateurs
- 10:00 : Post Reddit (r/cats timing optimal)
- 12:00 : Show HN post
- 14:00 : Deuxième post TikTok
- 18:00 : Recap du jour (premiers ventes, feedback)
- 22:00 : Éteindre le phone, dormir 8h

### J+1 à J+7

- Maintenir 2 posts TikTok / jour
- Répondre à TOUS les commentaires < 2h
- Monitorer erreurs Sentry
- Déployer fixes urgents au fur et à mesure
- Collecter témoignages users pour social proof

---

## ❌ Ce que tu NE dois PAS faire

- ❌ Perdre du temps à coder (c'est le job de Claude Code, tu pilotes)
- ❌ Over-polish le design avant d'avoir des users
- ❌ Attendre que tout soit parfait pour lancer
- ❌ Promouvoir sans avoir testé end-to-end le funnel paiement
- ❌ Lancer un vendredi soir (pas de visibilité weekend sur HN/PH)
- ❌ Accepter que Claude Code prenne des décisions produit sans te demander

---

## ⚡ Si tu as 1h de libre → par où commencer ?

En ordre de ROI :

1. Vérifier dispo `meowreel.com` — si libre, achète ![2 min, potentiellement bloquant]
2. Réserver @meowreelstudio sur TikTok et Insta [10 min]
3. Créer compte Stripe Business [30 min]
4. Setup Cloudflare R2 + MailerLite accounts [20 min]

Voilà. Tu as bouclé l'infra de base en 1h.

---

## Contact / escalation

Si tu bloques sur un truc technique pendant que Claude Code code :
- Reposer la question dans la conversation Claude (c'est moi qui planifie, Claude Code qui exécute)
- Si vraiment bloquant : revoir la partie concernée dans les docs MD correspondants

Si tu bloques sur un truc légal :
- Avocat en ligne (type Qiiro, LegalPlace) pour questions spécifiques ~80€/h
- Ta CCI locale à Nice a un service gratuit de conseil entreprise

Si tu bloques sur un truc fiscal/compta :
- Expert-comptable (HiddenLab en a un ?) ~50-100€/h
- En dernier : forum LegalStart / Captain Contrat

---

Bon. Go.
