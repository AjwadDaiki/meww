# MeowReel 🎬

> **Ton chat, en vedette. Pour 0,99€.**

Plateforme d'impulse buy qui transforme une photo de chat en vidéo IA virale en 90 secondes. Pensée pour TikTok, livrée par email, sans compte.

---

## Le pitch en 10 secondes

Tu uploads la photo de ton chat → tu choisis une scène (pianiste, ninja, porch musician nocturne, etc.) → tu payes 0,99€ avec Apple Pay → tu reçois une vidéo HD 5-10s prête à poster.

**Pas de compte. Pas d'abonnement. Pas de friction.**

---

## Pourquoi ça marche

- **Le trend est là** : les vidéos IA de chats cartonnent déjà (6M+ vues sur un seul post en quelques jours). On surf sur une vague, on la crée pas.
- **Le prix est magique** : 0,99€ est sous le seuil de réflexion. Charm pricing (.99) convertit +24% vs prix rond.
- **Le produit est universel** : 26+ milliards de vues sur `#cat` TikTok. Tout le monde a un chat ou un ami qui en a un.
- **Pas de concurrent direct** : les outils existants sont freemium génériques, pas focus niche + impulse.

---

## Les chiffres cibles

| Métrique | Cible V1 |
|---|---|
| Prix unitaire | 0,99€ |
| Coût génération | ~0,05€ (Seedance 2.0 Fast / Wan 2.2) |
| Stripe fee | 0,27€ |
| Marge nette | 0,67€ par vidéo |
| Temps génération | 60-90s |
| Taux conversion visiteur→payant | 8-15% (objectif V1) |
| AOV (bundle 3 vidéos) | 2,49€ |

---

## Stack

- **Frontend** : Next.js 15 (App Router), TypeScript, Tailwind, Framer Motion
- **Backend** : Next.js API routes + BullMQ worker
- **DB** : MongoDB (self-hosted VPS)
- **Cache/Queue** : Redis
- **Paiement** : Stripe Checkout (Apple Pay / Google Pay natifs)
- **IA Vidéo** : Replicate (Seedance 2.0 Fast + fallback Wan 2.2 I2V)
- **Email** : MailerLite API (livraison vidéo)
- **Storage** : VPS local + fallback S3/R2 pour vidéos
- **Hosting** : VPS perso (Docker Compose)
- **i18n** : FR / EN / ES (launch), +DE +IT +PT ensuite

---

## Le dossier

| Fichier | Contenu |
|---|---|
| `BRAND.md` | DA complète : direction artistique, typo, couleurs, ton de marque |
| `ARCHITECTURE.md` | Stack tech, infra, déploiement |
| `DATABASE.md` | Schémas MongoDB, indexes |
| `FEATURES.md` | Specs features, flows UX |
| `CATEGORIES.md` | Liste complète des scènes/styles |
| `UX-CONVERSION.md` | Psychologie appliquée : chaque détail qui fait monter la conversion |
| `PAYMENT.md` | Flow Stripe + Apple Pay + Google Pay |
| `GENERATION.md` | Pipeline Replicate, prompts, fallbacks |
| `I18N.md` | Stratégie multi-langue |
| `MARKETING.md` | TikTok, viral loop, watermark strategy |
| `LEGAL.md` | CGU / CGV / RGPD |
| `CLAUDE.md` | Instructions pour Claude Code |
| `TODO-AJWAD.md` | Ce que je fais en parallèle pendant que Claude Code taffe |

---

## Ordre de construction recommandé

1. **Landing page statique** (BRAND + FEATURES hero) — 1 soirée
2. **Upload + preview photo** — demi-journée
3. **Stripe Checkout minimal** (1 produit, 1 prix) — demi-journée
4. **MongoDB + job system + Replicate worker** — 1 journée
5. **Email delivery (MailerLite)** — 2h
6. **Toutes les catégories + preview loops** — 1 journée (en parallèle génération assets)
7. **i18n FR/EN/ES** — demi-journée
8. **Analytics + tracking** — 2h
9. **Legal pages** — 2h
10. **Tests production + launch** — soirée

**Objectif MVP live : 4-5 soirées intensives.**

---

## Nom & domaine

Nom retenu : **MeowReel**
- Alternatives envisagées : PurrClip, CatFlick, NineLives.studio, Pawstar
- Domaine prioritaire : `meowreel.com` → `meowreel.fun` → `meowreel.studio`

---

*Voilà. Le reste est dans les autres MD.*
