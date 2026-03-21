# WoWPlots

**The Pinterest of WoW Housing** — a community gallery for World of Warcraft player housing builds.

Browse stunning builds, get decoration ideas, share your own creations, and connect with fellow builders.

**Live at [wowplots.com](https://wowplots.com)**

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Runtime | Cloudflare Workers via [@opennextjs/cloudflare](https://opennext.js.org/cloudflare) |
| Database | Cloudflare D1 (SQLite) + [Drizzle ORM](https://orm.drizzle.team) |
| Storage | Cloudflare R2 (images) |
| Auth | Discord OAuth via [arctic](https://arctic.js.org) |
| Email | [Resend](https://resend.com) |
| CSS | Tailwind CSS v4 |
| Testing | [Playwright](https://playwright.dev) |
| Package Manager | pnpm |

## Prerequisites

- Node.js 20+
- pnpm (`npm install -g pnpm`)
- Cloudflare account with Workers, D1, and R2 enabled
- Discord Developer Application (for OAuth)

## Local Development

```bash
# Clone and install
git clone https://github.com/ottomansky/wowplots.git
cd wowplots
pnpm install

# Configure environment
cp .env.example .dev.vars
# Edit .dev.vars with your credentials (see Environment Variables below)

# Set up local D1 database
pnpm db:migrate        # Apply Drizzle migrations to local D1
pnpm db:seed           # Seed 25 sample builds

# Start dev server
pnpm dev               # Next.js + Turbopack on http://localhost:3000
```

## Environment Variables

Create `.dev.vars` for local development. In production, set via `wrangler secret put`.

| Variable | Description | Where to get it |
|----------|-------------|-----------------|
| `DISCORD_CLIENT_ID` | Discord OAuth app client ID | [Discord Developer Portal](https://discord.com/developers/applications) |
| `DISCORD_CLIENT_SECRET` | Discord OAuth app client secret | Same as above |
| `RESEND_API_KEY` | Transactional email API key | [resend.com](https://resend.com) |
| `SESSION_SECRET` | 32-byte hex for signing session cookies | `openssl rand -hex 32` |
| `ADMIN_DISCORD_IDS` | Comma-separated Discord user IDs for admin access | Your Discord user ID |
| `ENVIRONMENT` | `development` or `production` | Set accordingly |

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start local dev server with Turbopack |
| `pnpm build` | Production Next.js build |
| `pnpm typecheck` | TypeScript strict check |
| `pnpm lint` | ESLint |
| `pnpm test:e2e` | Playwright test suite |
| `pnpm db:generate` | Generate Drizzle migration files |
| `pnpm db:migrate` | Apply migrations to local D1 |
| `pnpm db:migrate:prod` | Apply migrations to production D1 |
| `pnpm db:seed` | Seed local D1 with sample data |
| `pnpm db:seed:prod` | Seed production D1 |
| `pnpm cf:deploy` | Build with OpenNext + deploy to Workers |

## Database

Schema defined in `src/db/schema.ts` using Drizzle ORM:

- `users` — Discord OAuth users
- `builds` — Housing build entries with metadata
- `build_images` — Screenshots per build (R2 keys)
- `tags` / `build_tags` — Categorization system
- `likes` / `bookmarks` — User interactions
- `comments` — Build comments
- `waitlist` — Email signups
- `builds_fts` — FTS5 full-text search index

Migrations in `drizzle/`, applied via `wrangler d1 execute`.

## Deployment

CI/CD via GitHub Actions (`.github/workflows/deploy.yml`):

1. Push to `main` → install → typecheck → lint → OpenNext build → deploy
2. Requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` GitHub secrets

Manual deploy: `pnpm cf:deploy`

## Project Structure

```
src/
├── app/                    # Next.js App Router pages + API routes
│   ├── api/                # REST API (auth, builds, comments, waitlist)
│   ├── gallery/            # Gallery browse + build detail pages
│   ├── blog/               # Article index + [slug] pages
│   ├── biomes/             # Biome category pages
│   ├── styles/             # Style category pages
│   ├── sizes/              # Size category pages
│   ├── admin/              # Admin panel (auth-gated)
│   ├── submit/             # Build submission form
│   ├── my-builds/          # User's submissions
│   ├── bookmarks/          # Saved builds
│   └── creators/           # Creator profiles
├── components/             # React components
│   ├── layout/             # Header, Footer
│   ├── gallery/            # BuildCard, ImageGallery, Filters, etc.
│   ├── blog/               # ArticleBody, TOC, RelatedArticles
│   └── auth/               # UserMenu
├── content/articles/       # MDX blog articles
├── db/                     # Drizzle schema + database helper
├── lib/                    # Utilities, auth, queries, constants
└── types/                  # Global type definitions
```

## License

Fan project. World of Warcraft is a trademark of Blizzard Entertainment, Inc.
