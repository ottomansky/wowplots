# WoWPlots.com — Backlog

## High Priority
- [ ] Replace seed/placeholder gallery images with real WoW housing screenshots
- [ ] Verify Discord OAuth redirect URIs (prod + local) in Developer Portal
- [ ] Test full Discord OAuth flow end-to-end on production
- [ ] Set up Resend domain verification for transactional email
- [ ] Add email notifications: build approved, first 10 likes milestone

## Content & SEO
- [ ] Create a Claude Code skill for SEO content writing
- [ ] Content calendar: 2-3 articles/week
- [ ] "Build of the Week" recurring series
- [ ] Video embeds in articles for engagement
- [ ] Dynamic sitemap API route for gallery build URLs (static sitemap can't access D1)
- [ ] OG image generation per build (use build primary screenshot as og:image)

## Community
- [ ] Creator directory page (/creators) — grid of creators sorted by build count
- [ ] Founding Creator badge logic (first 50 users to publish)
- [ ] Email notification when build is approved
- [ ] Comment moderation tools (report button, admin review queue)
- [ ] User-suggested tags in submit form
- [ ] Edit published builds (title, description, tags)
- [ ] Soft delete for builds (user can "archive" their own)

## Discord Server Beautification
Discord: https://discord.gg/mUKzQRbb
- [ ] Roles: Admin, Moderator, Founding Creator, Contributor, Member
- [ ] Channels: #announcements, #showcase, #build-help, #general, #suggestions, #content-creators
- [ ] Branding: server icon (use logo mark), banner, custom emoji
- [ ] Bots: welcome bot, article auto-poster, gallery submission bot
- [ ] Welcome flow with rules + reaction roles

## Future Features
- [ ] Layout preview renderer (parse JSON → 2D/3D visual)
- [ ] Visitor code integration (when Blizzard ships)
- [ ] Guild showcases + neighborhood tours
- [ ] Before/after comparison slider
- [ ] Monthly contests (Discord vote → featured on site)
- [ ] PWA for mobile
- [ ] i18n if non-English demand appears
- [ ] Self-hosted Umami analytics (replace Cloudflare Web Analytics)
- [ ] R2 direct upload with presigned URLs (currently URL-based)
- [ ] Image processing pipeline (client-side resize before upload)
- [ ] Co-decorating / co-ownership features when Blizzard ships them

## Technical Debt
- [ ] Error monitoring (Sentry or similar)
- [ ] Rate limiting on mutating API routes (like, comment, submit, auth)
- [ ] Image moderation on uploads (Cloudflare Images AI or manual queue)
- [ ] Content Security Policy headers
- [ ] Mobile hamburger menu for header nav
- [ ] Accessibility: axe-core audit, fix all critical/serious violations
- [ ] Performance: lazy load below-fold images, optimize JS bundle
- [ ] FTS5 content sync: currently manual, should auto-sync on build create/update
- [ ] Database backup strategy for D1

## Phase 5: Monetization (when traffic justifies)
- [ ] Ezoic ad integration (requires ~2K sessions)
- [ ] Ko-fi + Patreon links
- [ ] Ad-free tier for supporters
- [ ] Sponsored featured builds
- [ ] Core Web Vitals audit for ad network requirements
