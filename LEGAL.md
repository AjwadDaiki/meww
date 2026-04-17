# MeowReel · Légal (CGV, CGU, RGPD)

> Ce document est un **guide technique** pour implémenter les pages légales. Il ne remplace pas une revue par un vrai avocat avant un lancement à grande échelle (surtout dès que le CA dépasse 10k€/mois).

---

## Structure des pages légales

Chaque langue a ses pages. Routes :

```
/[locale]/legal/cgv          → Conditions Générales de Vente
/[locale]/legal/cgu          → Conditions Générales d'Utilisation
/[locale]/legal/privacy      → Politique de confidentialité (RGPD)
/[locale]/legal/mentions     → Mentions légales
/[locale]/legal/cookies      → Politique de cookies
```

Footer link vers ces pages depuis TOUTES les pages du site. Lien "CGV" également visible avant validation paiement Stripe.

---

## CGV (Conditions Générales de Vente) — points critiques

### 1. Identité du vendeur

```
Le site MeowReel est exploité par HiddenLab,
[Forme juridique : EURL/SASU à préciser],
inscrite au RCS de [Nice] sous le numéro [SIRET],
dont le siège social est situé [adresse complète],
TVA intracommunautaire : [FR XX XXX XXX XXX].

Directeur de la publication : Ajwad [Nom]
Email support : support@meowreel.com
```

### 2. Droit de rétractation — LE POINT CRITIQUE

**Règle EU (directive 2011/83/UE, transposée en FR dans le Code de la consommation) :**
Un consommateur a 14 jours pour se rétracter d'un achat en ligne...

**...SAUF** pour les contenus numériques "fournis sur un support immatériel, dont l'exécution a commencé avec l'accord préalable exprès du consommateur ET son renoncement exprès à son droit de rétractation" (art. L221-28 13° du Code de la consommation FR, art. 16 m) de la directive).

**Donc on doit :**

1. **Afficher une case à cocher obligatoire** avant le paiement :
   > ☐ *J'accepte que la production de ma vidéo commence immédiatement après paiement et je renonce expressément à mon droit de rétractation de 14 jours.*

2. **Conserver la preuve** de cette acceptation dans l'ordre (champ `order.consentRenounceRight: true`, timestamp).

3. **Le bouton de paiement est grisé** tant que la case n'est pas cochée.

**Si tu ne fais pas ça** → n'importe quel client peut demander un refund dans les 14 jours, même après consommation de la vidéo. Risque = taux de refund massif possible.

### 3. Prix et paiement

```
Les prix sont indiqués en euros toutes taxes comprises (TTC).
TVA française 20% incluse si le client est domicilié en France.
Pour les clients UE hors France : TVA appliquée selon règles OSS
(One Stop Shop) si CA intra-UE > 10 000€/an.

Paiements acceptés :
- Carte bancaire (Visa, Mastercard, American Express)
- Apple Pay
- Google Pay

Le paiement est sécurisé par Stripe Payments Europe.
MeowReel n'a jamais accès à vos données bancaires.
```

### 4. Livraison

```
La vidéo est livrée par email dans un délai moyen de 90 secondes
après paiement, et au maximum 10 minutes.

En cas de défaillance technique, MeowReel s'engage à livrer
la vidéo dans un délai de 48h ou à rembourser intégralement le client.

Le lien de téléchargement contenu dans l'email reste actif 48h.
Passé ce délai, contactez support@meowreel.com pour réactivation.
```

### 5. Responsabilité et usage

```
Les vidéos générées par MeowReel sont destinées à un usage personnel
ou commercial par leur acheteur.

L'acheteur s'engage à ne pas utiliser les vidéos générées :
- À des fins illégales ou diffamatoires
- Pour représenter des personnes identifiables sans leur accord
- Pour promouvoir la violence, la haine, ou du contenu adulte
- En violation de droits de propriété intellectuelle tiers

La photo uploadée doit être la propriété de l'acheteur ou uploadée
avec l'accord du propriétaire.
```

### 6. Propriété intellectuelle

```
Les vidéos générées par MeowReel deviennent la propriété exclusive
de l'acheteur dès paiement. Il en a tous les droits d'usage :
commercial, privé, partage sur les réseaux, revente.

La photo originale uploadée reste la propriété de l'uploader.
MeowReel s'engage à supprimer les photos originales dans un délai
maximum de 30 jours après génération.
```

### 7. Garanties

```
Garantie de conformité (art. L217-4 et suivants Code conso) :
- Si la vidéo générée ne correspond manifestement pas à la scène
  commandée (bug technique), l'acheteur peut demander une regénération
  gratuite sous 7 jours via support@meowreel.com.
- Cette garantie ne couvre pas les préférences subjectives
  ("je préférais un autre angle", "mon chat aurait dû sourire").
```

### 8. Réclamations et médiation

```
En cas de litige, le client peut saisir gratuitement le médiateur
de la consommation :
[Nom médiateur : à choisir, ex : CM2C ou MEDICYS]
[Adresse + email]

Plateforme européenne de règlement en ligne des litiges :
https://ec.europa.eu/consumers/odr

Droit applicable : droit français.
Tribunal compétent : tribunaux de [Nice].
```

---

## CGU (Conditions Générales d'Utilisation)

Moins critique que CGV mais obligatoire.

### Points principaux

1. **Accès au service** : gratuit hors achats, sans obligation de compte
2. **Contenu interdit à uploader** :
   - Photos de personnes humaines identifiables sans consentement
   - Photos de mineurs
   - Contenu violent, sexuel, haineux
   - Contenu protégé par copyright non détenu par l'uploader
3. **Droit de refus de service** : MeowReel peut refuser de générer une vidéo si le contenu viole les CGU. Dans ce cas → remboursement intégral.
4. **Hébergement et conservation** :
   - Photos originales : supprimées sous 30 jours
   - Vidéos générées : conservées 90 jours (accès download)
5. **Modification des CGU** : annonce 15 jours avant.

---

## RGPD (Politique de confidentialité)

### Données collectées

| Donnée | Finalité | Durée | Base légale |
|---|---|---|---|
| Email | Livraison vidéo + support | Jusqu'à désinscription | Exécution contrat |
| Photo de chat | Génération vidéo | 30 jours max | Exécution contrat |
| IP (hashed) | Anti-fraud + analytics | 90 jours | Intérêt légitime |
| User agent | Optimisation UX | 90 jours | Intérêt légitime |
| Données Stripe (customer_id) | Traçabilité paiement | 10 ans (obligation comptable) | Obligation légale |
| Email marketing (opt-in) | Newsletter | Jusqu'à désinscription | Consentement |

### Sous-traitants (à lister explicitement)

- **Stripe Payments Europe** (Irlande) : traitement paiement
- **Replicate Inc.** (USA) : génération vidéo (⚠ transfert USA, mentionner les clauses contractuelles types SCC)
- **Cloudflare R2** (UE) : stockage vidéos
- **MailerLite** (Irlande) : envoi emails
- **OVH / Hetzner** (UE) : hébergement serveur

### Droits des utilisateurs

Toute personne peut exercer ses droits par email à `privacy@meowreel.com` :

- Droit d'accès (copie des données)
- Droit de rectification
- Droit à l'effacement ("droit à l'oubli")
- Droit de limitation du traitement
- Droit à la portabilité
- Droit d'opposition
- Droit de réclamation auprès de la CNIL (www.cnil.fr)

**Délai de réponse légal : 1 mois** (extensible à 3 mois si complexité).

### DPO (Délégué à la protection des données)

Non obligatoire pour les petites structures qui ne traitent pas de données sensibles à grande échelle. On peut l'indiquer ainsi :

```
MeowReel n'a pas désigné de DPO, le traitement de données personnelles
étant limité en volume et en sensibilité.
Pour toute question : privacy@meowreel.com
```

Si le CA explose → désigner un DPO externe.

---

## Cookies & tracking

### Philosophy MeowReel

**Minimal tracking.** On utilise Plausible (self-hosted ou cloud) qui est RGPD-compliant par design, sans cookies.

### Cookies techniques utilisés

| Cookie | Finalité | Durée |
|---|---|---|
| `NEXT_LOCALE` | Préférence langue | 1 an |
| `mr_session` | Panier temporaire (photo uploadée, catégorie) | 2h |
| `mr_consent` | Mémorisation choix cookies | 6 mois |

### Cookies tiers

- **Stripe** : cookies de paiement (uniquement sur la page checkout, explicitement annoncés)

### Pas de :
- ❌ Google Analytics
- ❌ Facebook Pixel (sauf si pub payante plus tard → à ajouter)
- ❌ Hotjar / Clarity

### Bannière cookies

Vu qu'on n'utilise que des cookies techniques essentiels (locale, session, consent), **on n'est pas obligé d'avoir une bannière de consentement intrusive** selon la CNIL.

**Mais** : on affiche un petit bandeau discret la première visite :

```
🍪 On utilise des cookies techniques nécessaires au service (langue,
session). Pas de tracking publicitaire. [OK, merci] [En savoir plus]
```

Si on ajoute Facebook Pixel ou autre tracking non-essentiel → là on doit mettre une vraie bannière avec Accepter/Refuser équivalents (CNIL strict).

---

## Mentions légales

Page simple, obligatoire en FR.

```
Éditeur du site : HiddenLab
[Forme juridique, SIRET, capital social, RCS]
[Adresse siège social]
Directeur de la publication : Ajwad [Nom]
Email : contact@meowreel.com

Hébergement : [OVH / Hetzner — adresse de l'hébergeur]

Prestataire paiement : Stripe Payments Europe Limited
[adresse dublin]

Propriété intellectuelle :
L'ensemble du site MeowReel (code, design, textes, logos) est la
propriété exclusive de HiddenLab. Toute reproduction interdite sans
autorisation écrite préalable.

Conformité :
- RGPD (UE 2016/679)
- Loi Informatique et Libertés (modifiée 2018)
- Directive 2011/83/UE (consommation)
```

---

## TVA et facturation

### Seuils

- **France** : TVA 20% si client particulier FR
- **UE hors FR** : régime OSS (One Stop Shop) si CA intra-UE > 10 000€/an
  - Avant seuil : TVA FR 20% partout
  - Après seuil : TVA du pays du client (varie)
- **Hors UE** : pas de TVA, mais le client paye ses propres taxes à l'import (rarement applicable pour produits numériques)

### Stripe Tax

Stripe propose Stripe Tax automatique (payant, ~0,5% additionnel).
**Recommendation** : ne pas activer tout de suite. Gérer manuellement TVA en fin d'année avec le comptable. Activer Stripe Tax dès qu'on dépasse 10k€/mois CA UE.

### Facture

Stripe envoie automatiquement un receipt à chaque paiement. Pour les pros qui demandent une facture TVA complète :
- Lien "Demander une facture" dans les emails
- Form simple : SIRET, adresse facturation
- On génère la facture manuellement V1, puis via un outil type Pennylane / QuickBooks plus tard

---

## Dépôt de marque

**Recommandation forte** : déposer `MeowReel` à l'INPI dès que possible.

- Coût : ~210€ pour 3 classes à l'INPI (France)
- Classes : 38 (télécommunications), 41 (divertissement), 42 (services informatiques)
- Ensuite extension EU (EUIPO) ~850€ pour protéger à l'échelle UE
- Protection 10 ans renouvelables

---

## Checklist légale avant launch

- [ ] CGV rédigées avec clause renonciation 14j rétractation
- [ ] Case à cocher "je renonce à mon droit de rétractation" avant paiement (OBLIGATOIRE)
- [ ] CGU rédigées
- [ ] Politique de confidentialité RGPD complète
- [ ] Mentions légales (HiddenLab + SIRET + hébergeur)
- [ ] Bannière cookies discrète (pas de tracking = pas obligatoire)
- [ ] Pages traduites en FR, EN, ES
- [ ] Lien footer vers toutes les pages légales
- [ ] Lien CGV visible avant checkout Stripe
- [ ] Email privacy@meowreel.com et support@meowreel.com créés
- [ ] Traçabilité consentement renonciation rétractation (log DB)
- [ ] Politique de suppression photo 30j implémentée (cron job)
- [ ] Marque MeowReel déposée INPI
- [ ] Assurance RC pro envisagée (optionnel mais recommandé)

---

## Risques légaux spécifiques à surveiller

### IA générative + droits d'auteur

Zone grise. Les outputs IA n'ont pas de protection copyright claire aux US (Thaler vs Perlmutter 2023), et en UE le débat est ouvert (Stability AI, LAION).

**Position MeowReel** : on assume que les vidéos générées sont "libres de droits" pour l'acheteur (vu qu'il a donné la photo source + le prompt), mais on ne garantit pas une protection copyright absolue à l'acheteur.

### Contenus générés problématiques

Si un utilisateur uploade la photo de quelqu'un d'autre sans son accord et publie la vidéo → risque diffamation. **CGU claires + process de takedown** :

```
Procédure takedown :
1. Signalement à support@meowreel.com
2. Si légitime : suppression de la vidéo + tokens révoqués sous 48h
3. Compte de l'uploader (IP) bloqué si récidive
```

### Collaboration avec autorités

En cas de réquisition judiciaire : fournir les infos disponibles (email, IP, logs d'achat). À documenter en interne (procédure réquisition).
