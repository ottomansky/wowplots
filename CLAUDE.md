@AGENTS.md

# WoWPlots

WoW housing community gallery — "The Pinterest of WoW Housing."

## Stack

- Next.js 16 + App Router on Cloudflare Workers via @opennextjs/cloudflare
- D1 (SQLite) + Drizzle ORM for database
- R2 for image storage, Cloudflare Images for CDN transforms
- Tailwind v4 + custom WoW-themed design tokens
- Discord OAuth via arctic for auth
- Resend for transactional email
- pnpm as package manager

## Commands

- `pnpm dev` — local dev server (Turbopack)
- `pnpm build` — production build
- `pnpm typecheck` — TypeScript check
- `pnpm db:generate` — generate Drizzle migrations
- `pnpm db:migrate` — apply migrations locally
- `pnpm db:migrate:prod` — apply migrations to production D1
- `pnpm cf:deploy` — build + deploy to Cloudflare Workers

## Project Structure

- `src/app/` — Next.js App Router pages and API routes
- `src/components/` — React components (layout/, ui/, gallery/, blog/)
- `src/lib/` — Utilities, constants, article loader
- `src/db/` — Drizzle schema and database helper
- `src/content/articles/` — MDX blog articles with frontmatter
- `drizzle/` — Generated SQL migrations
- `wrangler.jsonc` — Cloudflare Workers config

## Conventions

- WoW-themed color palette: gold (#f8b700), dark backgrounds, fantasy aesthetic
- Articles use simple frontmatter parsed at build time (not @next/mdx runtime)
- All pages server-rendered or statically generated; client components only when needed
- Zod v4 for validation (import from "zod/v4")
