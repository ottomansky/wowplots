# WoWPlots.com — Backlog

Living document for ideas, future tasks, and deferred work. Add to this as the project evolves.

---

## High Priority (do soon after current phase)

- [ ] **Replace seed/placeholder images** — swap placehold.co images with real WoW housing screenshots sourced from Discord/Reddit/Twitter (with permission)
- [ ] **Discord OAuth redirect URIs** — verify both production (`https://wowplots.com/api/auth/callback/discord`) and local (`http://localhost:3000/api/auth/callback/discord`) are set in Discord Developer Portal

## Content & SEO

- [ ] **Create a Claude Code skill for SEO content writing** — a reusable skill that:
  - Fetches current WoW housing info (patch notes, PTR changes, community discoveries)
  - Writes viral-quality articles with proper copywriting (hooks, structure, CTAs)
  - Follows SEO best practices (keyword density, heading structure, internal linking)
  - Outputs ready-to-publish MDX files with frontmatter
- [ ] **Content calendar** — plan 2-3 articles/week cadence, track keyword targets
- [ ] **Video embeds** — embed YouTube housing tutorials in articles for engagement + time-on-page
- [ ] **"Build of the Week" series** — recurring content that drives repeat visits

## Discord Server Beautification

Discord invite: https://discord.gg/mUKzQRbb

- [ ] **Roles**: Admin, Moderator, Founding Creator, Contributor, Member
- [ ] **Channel structure**:
  - #announcements (read-only)
  - #showcase (post your builds)
  - #build-help (tips & feedback)
  - #general
  - #suggestions (site feature requests)
  - #content-creators (private, for founding creators)
- [ ] **Branding**: Server icon, banner, custom emoji (WoW housing themed)
- [ ] **Bots**: 
  - Welcome bot with rules + role assignment
  - Auto-post new site articles to #announcements
  - Gallery submission bot (post screenshot → creates draft on site?)
- [ ] **Welcome flow**: Rules channel, reaction role assignment, intro prompt

## Future Features (Phase 6+)

- [ ] **Layout preview renderer** — parse WoW housing JSON → 2D/3D visual preview in browser
- [ ] **Visitor code integration** — when Blizzard ships it, deep-link from gallery to in-game visits
- [ ] **Guild showcases** — dedicated pages for guild housing projects
- [ ] **Before/after comparisons** — slider component showing build progression
- [ ] **Monthly contests** — Discord vote → featured on site with prize (game time?)
- [ ] **PWA** — mobile app experience without app store
- [ ] **i18n** — if non-English demand appears (DE, FR, KR servers)
- [ ] **Self-hosted Umami** — replace Cloudflare Analytics if more detail needed
- [ ] **Neighborhood tours** — curated "walks" through multiple builds in same neighborhood
- [ ] **Item sourcing guide** — click a decor item in a build → see where to get it (crafting, vendor, drop)

## Monetization Ideas (long-term)

- [ ] **Premium creator profiles** — verified badge, analytics on their builds, priority in search
- [ ] **Sponsored "Featured Build"** slot — tasteful, labeled, rotates weekly
- [ ] **Affiliate links** — WoW game time, Blizzard store mounts/pets, gaming peripherals
- [ ] **Print-on-demand** — popular build screenshots as posters/mousepads (with creator permission)

## Technical Debt & Polish

- [ ] **Error monitoring** — add Sentry or similar once traffic grows
- [ ] **Rate limiting** — protect API routes and waitlist from abuse
- [ ] **Image moderation** — automated NSFW check on uploads before they hit moderation queue
- [ ] **Accessibility audit** — WCAG compliance check on gallery and build pages
- [ ] **E2E tests** — Playwright test suite for critical paths (gallery browse, build detail, admin upload)
