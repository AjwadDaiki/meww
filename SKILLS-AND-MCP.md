# MeowReel · MCPs & Skills

> Tout ce que Claude Code doit installer avant de coder sérieusement.
> MCP = serveurs externes connectés. Skills = playbooks `.md` dans `.claude/skills/`.

---

## MCPs à installer

### Tier 1 — Obligatoires (install session 1)

#### 1. Context7 · documentation fraîche pour ton stack

**Pourquoi c'est critique** : Claude Code hallucine la syntaxe de Next.js 15, Tailwind 4, Mongoose, Stripe, Replicate. Context7 pull la doc officielle version-specific live. Sans ça, tu passeras la moitié de ton temps à corriger des APIs dépréciées.

```bash
claude mcp add context7 --scope project -- npx -y @upstash/context7-mcp
```

Obtenir une API key gratuite sur [context7.com](https://context7.com).

**Usage type dans Claude Code** :
> *"Use context7 for the latest Next.js 15 App Router streaming patterns before implementing the producing page."*

---

#### 2. MongoDB MCP officiel · lecture live de ta DB

**Pourquoi** : quand tu débugges une commande en prod, au lieu d'ouvrir Compass et copier-coller le JSON, Claude Code query directement `orders.find({status:'failed'})`. Aussi ultra utile pour vérifier que les schémas Mongoose matchent bien les docs stockés.

```bash
claude mcp add mongodb --scope local -- npx -y @mongodb-js/mcp-server \
  --connectionString "mongodb://localhost:27017/meowreel" \
  --readOnly
```

**Critique** : toujours `--readOnly` pour ta DB de dev, et **jamais jamais jamais** un accès direct à la DB de prod depuis Claude Code. Pour la prod, utilise un dump périodique dans une DB shadow read-only.

**Usage type** :
> *"Query mongodb: show me the 5 most recent orders with status='failed' and tell me what's the common error pattern."*

---

#### 3. Stripe MCP officiel · tester et debug paiements

**Pourquoi** : test mode Stripe a plein de states (pending, expired, requires_action, chargeback). Claude peut trigger ces events en test, vérifier que tes webhooks répondent correctement, lister les sessions récentes. Énorme gain de temps en debug.

```bash
claude mcp add --transport http stripe --scope project https://mcp.stripe.com
```

Auth via browser OAuth, pas de clé à passer.

**Usage type** :
> *"Trigger a test checkout.session.completed event for amount 99 EUR and verify our webhook handler at /api/webhooks/stripe persists the order correctly."*

---

#### 4. Playwright MCP · tester le flow dans un vrai browser

**Pourquoi** : tu veux pas découvrir en prod que le bouton Apple Pay s'affiche mal sur Safari. Playwright MCP permet à Claude de naviguer, cliquer, screenshot, et vérifier le flow complet. Critique pour les tests E2E.

```bash
claude mcp add playwright --scope project -- npx -y @playwright/mcp --headless
```

Pas d'API key. Headless mode pour la CI, remove `--headless` si tu veux voir ce qui se passe.

**Usage type** :
> *"Navigate to localhost:3000/fr, upload the test photo from fixtures, select jazz-trumpet, complete checkout with Stripe test card, and screenshot the producing page after 5s."*

---

#### 5. Next.js DevTools MCP · connexion au dev server Vercel

**Pourquoi** : officiel Vercel, connecte Claude Code à ton `next dev` runtime. Il voit les erreurs en live, peut query les routes qui bug, a accès à la doc Next.js 15 à jour.

```bash
claude mcp add next-devtools --scope project -- npx -y next-devtools-mcp@latest
```

Pas d'API key. Tourne tant que ton dev server est up.

**Usage type** :
> *"Next Devtools, what errors are in my Next.js application right now?"*

---

### Tier 2 — Recommandés (install session 2-3)

#### 6. GitHub MCP · gestion repo + PRs + issues

```bash
claude mcp add --transport http github --scope user https://api.githubcopilot.com/mcp/
```

Auth OAuth. `--scope user` parce que tu vas l'utiliser sur tous tes projets.

---

#### 7. Sequential Thinking MCP · structuration de problèmes complexes

**Pourquoi** : pour les bugs qui demandent de raisonner en plusieurs étapes (genre "pourquoi ce webhook Stripe est pas idempotent en condition de race"), force Claude à structurer sa pensée. Réduit les fausses pistes.

```bash
claude mcp add sequential-thinking --scope user -- npx -y @modelcontextprotocol/server-sequential-thinking
```

---

### Tier 3 — Optionnels (si besoin)

| MCP | Install | Quand l'ajouter |
|---|---|---|
| **Iconify MCP** | `claude mcp add iconify --scope project -- npx -y @iconify/mcp` | Si on doit chercher des icônes (normalement on en fait pas, cf DESIGN.md) |
| **Firecrawl MCP** | `claude mcp add firecrawl --scope local -- npx -y firecrawl-mcp` | Si on doit scraper des sites concurrents ou refs |
| **Figma MCP** | `claude mcp add figma --scope user -- npx -y figma-developer-mcp` | Si on design sur Figma et on veut design-to-code |

---

### Pas besoin pour nous

- **Supabase MCP** (on utilise Mongo, pas Supabase)
- **PostgreSQL MCP** (idem)
- **Vercel MCP** (on self-host sur VPS, pas Vercel)

---

### Fichier `.mcp.json` final (à committer à la racine)

Ce fichier est shareable avec toute ton équipe (même si t'es solo, autant faire propre) :

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "next-devtools": {
      "command": "npx",
      "args": ["-y", "next-devtools-mcp@latest"]
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp", "--headless"]
    },
    "stripe": {
      "type": "http",
      "url": "https://mcp.stripe.com"
    }
  }
}
```

**Les secrets** (API keys, connection strings) vont dans ton `~/.claude.json` en scope local, **pas** dans `.mcp.json`.

---

## Skills à installer

### Concept skills en 2 phrases

Un skill = un dossier dans `.claude/skills/<skill-name>/` avec un `SKILL.md` qui contient un frontmatter YAML (name + description) + des instructions markdown. Claude lit le frontmatter de tous les skills au démarrage (~100 tokens chacun), puis charge le contenu complet seulement quand ça matche. Tu peux en avoir des dizaines, ça coûte rien.

### Tier 1 — Community skills à installer (session 1)

#### 1. **Superpowers** (obra/superpowers)

22k+ stars GitHub. Library de 20+ skills battle-tested qui structurent le workflow : brainstorm → spec → plan → execute → review → merge. **Le plus utile** pour notre contexte.

```bash
# Clone dans .claude/plugins/
cd meowreel
mkdir -p .claude/plugins
git clone https://github.com/obra/superpowers.git .claude/plugins/superpowers
```

Skills inclus les plus utiles pour nous :
- `tdd-workflow` — écrit un test qui fail, puis le code qui le passe
- `code-review` — review critique avant merge
- `debug-systematic` — approche structurée pour débugger
- `brainstorm-to-plan` — transforme une idée en plan d'action
- `collaboration-patterns` — patterns pour paired avec Claude

---

#### 2. **webapp-testing** (awesome-claude-skills)

Skill Playwright-based pour tester les UIs locales. Tu peux dire *"teste le flow upload → checkout en headed mode"* et il le fait.

```bash
# Dans ton repo à la racine
mkdir -p .claude/skills
curl -o .claude/skills/webapp-testing/SKILL.md \
  https://raw.githubusercontent.com/travisvn/awesome-claude-skills/main/skills/webapp-testing/SKILL.md
```

---

#### 3. **skill-creator** (official Anthropic)

Pour créer de nouveaux skills en Q&A interactif. À installer via le plugin marketplace Claude Code.

```
Dans Claude Code, tape : /plugin install skill-creator
```

Ou clone manuellement depuis [claude.com/plugins/skill-creator](https://claude.com/plugins/skill-creator).

---

#### 4. **mcp-builder** (awesome-claude-skills)

Si on veut créer nos propres MCP servers (par ex un MCP MeowReel qui expose les orders en cours, le CA du jour, etc. pour debug).

```bash
curl -o .claude/skills/mcp-builder/SKILL.md \
  https://raw.githubusercontent.com/travisvn/awesome-claude-skills/main/skills/mcp-builder/SKILL.md
```

---

### Tier 2 — Skills CUSTOM à créer pour MeowReel

Ces skills sont spécifiques à notre projet. Claude Code doit les créer au cours des sessions. Je les liste ici, **Claude Code : tu crées chacun de ces fichiers à la racine du repo dans `.claude/skills/<name>/SKILL.md`**.

#### Custom skill 1 · `/commit` — commit formaté conventional

Chemin : `.claude/skills/commit/SKILL.md`

```markdown
---
name: commit
description: Create a conventional commit message following MeowReel's commit style, automatically detecting the scope from changed files.
---

# commit

Create a git commit with conventional commit format as defined in CLAUDE.md.

## Workflow

1. Run `git status` and `git diff --cached` to see staged changes.
2. If nothing is staged, run `git diff` to see all changes and ask:
   "Stage everything (y/n) or pick files?"
3. Determine the type from changes:
   - New feature code → `feat`
   - Bug fix → `fix`
   - Refactor no behavior change → `refactor`
   - Config/deps/tooling → `chore`
   - Docs only → `docs`
   - Styling/formatting → `style`
   - Tests → `test`
   - Perf → `perf`
4. Determine the scope from files changed:
   - `apps/web/app/api/webhooks/stripe/*` → `payment`
   - `apps/web/app/api/upload/*` → `upload`
   - `apps/web/lib/db/*` → `db`
   - `apps/web/components/*` → `ui`
   - `packages/worker/*` → `worker`
   - `apps/web/messages/*` → `i18n`
   - `apps/web/app/[locale]/*` → `landing` or specific page name
5. Draft a commit message: `type(scope): short description under 72 chars`
6. If multi-paragraph explanation needed, add body separated by blank line.
7. Show the message to the user.
8. On confirm, run `git commit -m "..."`.

## Rules

- Subject under 72 chars.
- Imperative mood ("add", not "added" or "adds").
- Lowercase after the colon.
- No period at end of subject.
- Never include `Co-authored-by` or emoji.
- Never include `🤖 Generated with Claude Code`.
```

---

#### Custom skill 2 · `/new-category` — ajouter une scène vidéo

Chemin : `.claude/skills/new-category/SKILL.md`

```markdown
---
name: new-category
description: Add a new video category to MeowReel. Creates the MongoDB seed entry, i18n translations, updates navigation, and preps placeholder assets.
---

# new-category

Add a new scene category to MeowReel.

## Inputs needed

Ask the user:
1. Category slug (kebab-case, ex: "tokyo-yakuza")
2. Section (trending, music, dance, cinematic, moments, sport, absurd, aesthetic)
3. Names in FR, EN, ES
4. Tagline in FR, EN, ES (5-8 words)
5. Base prompt for Replicate (English)
6. Negative prompt
7. Audio prompt (optional, only if Seedance 2.0)
8. Model (seedance-2.0-fast default)
9. Tags for SEO (3-5 tags)

## Actions

1. Add entry to `scripts/seed-data/categories.ts`.
2. Run `pnpm seed:categories` to upsert into MongoDB.
3. Add translation keys in:
   - `messages/fr.json` under `categories.scenes.<slug>`
   - `messages/en.json` same
   - `messages/es.json` same
4. Create preview video placeholder at `public/previews/<slug>.webm` (empty file
   with note to regenerate via Replicate). Log a TODO for Ajwad.
5. Add the slug to the sitemap generation (should be automatic from DB but verify).
6. Commit with `/commit` : `feat(categories): add <slug> scene`.

## Validation

Before finishing:
- [ ] Verify the entry exists in MongoDB via MCP query
- [ ] Verify i18n translations are present in all 3 JSON files
- [ ] Verify a landing page is accessible at `/fr/scene/<slug>` (via Playwright MCP)
- [ ] Remind Ajwad to generate real preview video on Replicate
```

---

#### Custom skill 3 · `/test-stripe` — simulation webhook Stripe

Chemin : `.claude/skills/test-stripe/SKILL.md`

```markdown
---
name: test-stripe
description: Simulate Stripe webhook events locally to test payment flow and webhook handler. Uses Stripe CLI.
---

# test-stripe

Test the Stripe webhook handler without real payments.

## Prerequisites

- Stripe CLI installed (`brew install stripe/stripe-cli/stripe`)
- Logged in (`stripe login`)
- Local dev server running on port 3000

## Workflow

1. If stripe listen is not running, start it:
   `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
2. In a second terminal, trigger the event:
   - `checkout.session.completed` for testing payment
   - `checkout.session.expired` for testing expiry
   - `charge.refunded` for testing refund flow
3. Verify in MongoDB (via mongodb MCP) that the order status transitioned correctly.
4. Verify a BullMQ job was enqueued (check Redis via redis-cli or a query).
5. Report what happened to the user.

## Example

`/test-stripe checkout.session.completed with amount 99 EUR and category midnight-porch-musician`

→ triggers the event via Stripe CLI, polls MongoDB to confirm order.status='paid',
  checks Redis queue for generate-video job, reports back.
```

---

#### Custom skill 4 · `/brand-check` — vérif DESIGN.md compliance

Chemin : `.claude/skills/brand-check/SKILL.md`

```markdown
---
name: brand-check
description: Audit a component or page against MeowReel's DESIGN.md rules. Flags violations of palette, typography, tactile aesthetic, forbidden patterns.
---

# brand-check

Verify a component or page follows DESIGN.md.

## Usage

`/brand-check apps/web/components/ui/MrPolaroid.tsx`
`/brand-check apps/web/app/[locale]/page.tsx`

## Checks

Read the file and verify:

### Palette compliance
- [ ] Only uses CSS variables from DESIGN.md (mr-wood-*, mr-paper, mr-ink, etc.)
- [ ] No hex colors hardcoded outside of the tailwind.config.ts definition
- [ ] No gradients (`linear-gradient`, `bg-gradient-*`)

### Typography compliance
- [ ] Fonts are Caveat, Special Elite, Editorial New / Cormorant (or JetBrains Mono for monospace)
- [ ] No Inter / Satoshi / Space Grotesk as the dominant font
- [ ] Handwritten font used for annotations / post-its / navigation labels

### Tactile / no-SaaS checks
- [ ] No rounded-full or rounded-2xl on primary surfaces (objects have their own shape)
- [ ] No shadow-2xl SaaS style (use custom drop-shadow with blur 6-10px, low opacity)
- [ ] Background uses a texture image (wood, cork, paper) not flat color
- [ ] Rotational variation present on polaroids / postits / stamps (not all 0deg)

### Forbidden patterns
- [ ] No Heroicons, Lucide, Feather, Material icons imported
- [ ] No emoji in JSX (check for \u{1F300}-\u{1F9FF} range in strings)
- [ ] No em-dash in copy ("—")
- [ ] No dark mode toggle or `prefers-color-scheme` logic

### i18n compliance
- [ ] All user-facing strings pass through `useTranslations()` or `getTranslations()`
- [ ] No hardcoded French or English in JSX

### Animation compliance
- [ ] Animations use Motion or CSS, not inline setInterval/setTimeout with style mutation
- [ ] Easing curves are from DESIGN.md (ease-out custom bezier)

## Output

For each violation, print:
- File path + line number
- Rule violated
- Suggested fix

If all checks pass: "✓ On brand. Ship it."
```

---

#### Custom skill 5 · `/deploy` — déploiement prod VPS

Chemin : `.claude/skills/deploy/SKILL.md`

```markdown
---
name: deploy
description: Deploy MeowReel to production VPS. DO NOT invoke automatically, only when explicitly requested by Ajwad.
disable-model-invocation: true
---

# deploy

Deploy MeowReel to production VPS.

## Preconditions

- [ ] On `main` branch
- [ ] Working directory clean
- [ ] All tests pass (`pnpm test`)
- [ ] Build works locally (`pnpm build`)
- [ ] Latest `.env.production` is in sync with the VPS

## Steps

1. Confirm with user: "Deploy to production? Current HEAD: $(git rev-parse --short HEAD)"
2. Tag the release: `git tag v$(date +%Y.%m.%d-%H%M%S)` and `git push --tags`
3. SSH to VPS: `ssh root@meowreel.com` (assumes SSH alias in ~/.ssh/config)
4. On VPS:
   - `cd /opt/meowreel`
   - `git pull`
   - `docker compose -f docker-compose.prod.yml build`
   - `docker compose -f docker-compose.prod.yml up -d`
   - `docker compose -f docker-compose.prod.yml logs -f web --tail 50` (watch for 30s)
5. Health check: `curl -I https://meowreel.com` → expect 200
6. Verify worker is processing jobs: check /admin/stats or query Redis
7. Report deployment status + git tag to user

## Rollback

If health check fails:
- `git reset --hard HEAD^`
- `git push --force-with-lease origin main`
- `ssh root@meowreel.com "cd /opt/meowreel && git pull && docker compose -f docker-compose.prod.yml up -d --build"`
- Page Ajwad

## NEVER DO

- Deploy on Friday after 16h
- Skip health check
- Deploy with uncommitted changes
- Deploy without tagging the release
```

**Important** : ce skill a `disable-model-invocation: true` dans le frontmatter. Ça veut dire que Claude Code ne peut **jamais** décider de déployer tout seul ; seulement toi en tapant `/deploy`.

---

#### Custom skill 6 · `/generate-test-video` — tester pipeline Replicate local

Chemin : `.claude/skills/generate-test-video/SKILL.md`

```markdown
---
name: generate-test-video
description: Trigger a test video generation via Replicate without going through Stripe. Useful for debugging the worker pipeline.
---

# generate-test-video

Trigger a test generation end-to-end without payment.

## Usage

`/generate-test-video with photo tests/fixtures/cat.jpg and category midnight-porch-musician`

## Workflow

1. Create a mock Order in MongoDB with status='paid' (bypass Stripe):
   - photoUrl = upload the test photo to R2 first
   - scene.categorySlug = from user input
   - stripe.customerEmail = "dev@meowreel.local"
2. Enqueue the BullMQ job `generate-video` with the order ID
3. Poll the order every 3s (max 5 min)
4. When status = 'done':
   - Show the output videoUrl
   - Download the video locally to tests/outputs/
   - Play it if FFPLAY is available, otherwise print the path
5. Measure total time and report: "Generation took Xs. Model: <model>. Size: <bytes>."

## Cleanup

After the test:
- Keep the output in /tmp for debugging
- Don't send a real email (check NODE_ENV !== 'production' before MailerLite call)
```

---

### Tier 3 — Skills à considérer plus tard

| Skill | Description | Quand l'ajouter |
|---|---|---|
| `/ajwad-report` | Résumé du CA / commandes du jour | Après launch, daily check |
| `/new-language` | Ajouter une langue i18n (DE, IT, PT) | Quand on pivote vers nouveau marché |
| `/prompt-studio` | Tester différents prompts Replicate sur la même photo | Quand on optimise les catégories |
| `/refund` | Process refund manuel via Stripe + DB update + email | Si gros volume de support |

---

## Structure finale `.claude/`

```
.claude/
├── plugins/
│   └── superpowers/              # cloné depuis obra/superpowers
│       └── (20+ skills inclus)
├── skills/
│   ├── commit/
│   │   └── SKILL.md
│   ├── new-category/
│   │   └── SKILL.md
│   ├── test-stripe/
│   │   └── SKILL.md
│   ├── brand-check/
│   │   └── SKILL.md
│   ├── deploy/
│   │   └── SKILL.md
│   ├── generate-test-video/
│   │   └── SKILL.md
│   ├── webapp-testing/           # téléchargé
│   │   └── SKILL.md
│   └── mcp-builder/              # téléchargé
│       └── SKILL.md
└── (settings.json optionnel)
```

Et à la racine du repo :
```
.mcp.json                         # config MCP shareable
```

---

## Workflow d'installation (résumé)

Dans cet ordre :

```bash
# 1. MCPs
claude mcp add context7 --scope project -- npx -y @upstash/context7-mcp
claude mcp add --transport http stripe --scope project https://mcp.stripe.com
claude mcp add mongodb --scope local -- npx -y @mongodb-js/mcp-server \
  --connectionString "mongodb://localhost:27017/meowreel" --readOnly
claude mcp add playwright --scope project -- npx -y @playwright/mcp --headless
claude mcp add next-devtools --scope project -- npx -y next-devtools-mcp@latest

# 2. Skills community
mkdir -p .claude/plugins .claude/skills
git clone https://github.com/obra/superpowers.git .claude/plugins/superpowers

# 3. Skills custom (Claude Code les crée au fur et à mesure selon ce doc)

# 4. Vérification
claude mcp list
# Should show: context7, stripe, mongodb, playwright, next-devtools

# 5. Restart Claude Code pour que tout soit pris en compte
```

---

## Sécurité — lire avant d'installer

- **Jamais** d'MCP qui write sur une DB prod sans read-only flag.
- **Auditer** le source d'un MCP community avant de le run (il va tourner avec tes credentials).
- **Scope restreint** : un MCP n'a besoin que du minimum (read-only, namespace limité, token avec scope réduit).
- **`.mcp.json` shareable** (git) mais **jamais de secrets dedans**. Secrets → `~/.claude.json` local scope uniquement.
- **Revoir les PRs** même celles générées avec skills : le code est généré automatiquement mais c'est toi qui est responsable de ce qui est mergé.

---

## Debugging MCP

Si un MCP répond pas :

```bash
claude mcp list             # tous les MCPs registered
claude mcp get context7     # détail d'un MCP
claude mcp remove context7  # retirer (si cassé, réinstaller)
```

Logs Claude Code : `~/.claude/logs/` (sur macOS / Linux).

Si un skill trigger pas :
1. Vérifier le frontmatter YAML (indentation correcte, name + description présents)
2. Dans Claude Code, taper : *"What skills are available?"*
3. Invoquer explicitement : `/skill-name`
4. Si toujours pas, le skill est peut-être mal scopé → checker que le fichier est dans `.claude/skills/<name>/SKILL.md` (pas `.claude/skills/<name>.md`)
