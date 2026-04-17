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
- [ ] Fonts are Caveat, Special Elite, Cormorant Garamond (or JetBrains Mono for monospace)
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
- [ ] No em-dash in copy
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

If all checks pass: "On brand. Ship it."
