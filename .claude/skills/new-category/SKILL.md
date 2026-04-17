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
