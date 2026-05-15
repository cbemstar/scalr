<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

### Project overview
Single Next.js 16 (App Router) marketing site for **Scalr** (`scalr.co.nz`). No database, no Docker, no monorepo — just `npm install` and `npm run dev`.

### Key commands
| Task | Command |
|------|---------|
| Dev server | `npm run dev` (port 3000) |
| Lint | `npx eslint .` |
| Build | `npm run build` |
| Production preview | `npm run start` (after build) |

### Environment
- Copy `.env.example` → `.env.local` for local dev. All external integrations (Airtable, Turnstile, PostHog) degrade gracefully when keys are unset — the site renders and navigates fully without them.
- The only route that requires live credentials is `POST /api/inquiry` (Airtable). Everything else is static/client-rendered.

### Gotchas
- Next.js 16 has breaking changes vs training data — always read `node_modules/next/dist/docs/` before writing new Next.js code.
- ESLint produces warnings (unused vars, `<img>` vs `<Image>`) but zero errors on a clean checkout; treat new errors as regressions.
- `npm run build` uses Turbopack by default in this version.
