---
name: deploy
description: Deploy MeowReel to production VPS. DO NOT invoke automatically, only when explicitly requested by Ajwad.
disable-model-invocation: true
---

# deploy

Deploy MeowReel to production VPS (Hetzner).

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
5. Health check: `curl -I https://meowreel.com` expecting 200
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
