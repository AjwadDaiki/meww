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
- Never include `Generated with Claude Code`.
