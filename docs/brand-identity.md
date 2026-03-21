# WoWPlots Brand Identity

## Design Direction

**"Arcane Luxury"** — A refined, editorial dark theme. Not gritty or gamey, but sophisticated. Think: a high-end art gallery lit by warm candlelight. Rich navy-blacks with a singular warm gold accent that feels luminous. Every detail intentional.

## Logo

The WoWPlots mark is an abstract archway/portal shape — a golden doorway suggesting entry into a home. The nested arches create depth, while the grid lines at the base hint at housing plots. Works at all sizes from 16px favicon to full display.

- **Mark**: Archway with nested inner arch and base grid
- **Wordmark**: "Wow" (full opacity) + "Plots" (60% opacity) in bold, tight tracking
- **Usage**: Mark alone for small contexts (favicon, badges), full logo in nav and hero

## Color System

### Primary Accent — Gold
The singular warm accent. Every interactive element, highlight, and CTA uses gold. It should feel slightly luminous against the dark backgrounds.

| Token | Hex | Usage |
|-------|-----|-------|
| `--wow-gold` | `#d4a017` | Primary accent, CTAs, links |
| `--wow-gold-light` | `#e8b923` | Hover states |
| `--wow-gold-dark` | `#a67c12` | Pressed states, borders |
| `--wow-gold-muted` | `#8b6914` | Subtle accents |

### Backgrounds — Rich Navy-Blacks
Never flat black. Always with a blue undertone for depth.

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#090b10` | Page background |
| `--bg-secondary` | `#0f1118` | Section alternate |
| `--bg-tertiary` | `#161a24` | Hover backgrounds |
| `--bg-card` | `#12151e` | Card surfaces |
| `--bg-card-hover` | `#191d29` | Card hover |
| `--bg-elevated` | `#1c2030` | Modals, dropdowns |

### Borders
Subtle, cool-toned. The accent border uses gold at 25% opacity for hover states.

| Token | Hex | Usage |
|-------|-----|-------|
| `--border` | `#1e2233` | Default borders |
| `--border-light` | `#2a3045` | Emphasized borders |
| `--border-accent` | gold @ 25% | Hover/focus borders |

### Text
Warm off-white for readability on dark backgrounds.

| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#e4e2dd` | Headings, body text |
| `--text-secondary` | `#8a8794` | Descriptions, meta |
| `--text-muted` | `#555261` | Timestamps, hints |

### Biome Accent Colors
Each biome has a unique color for badges and category markers.

| Biome | Color | Hex |
|-------|-------|-----|
| Enchanted Grove | Purple | `#7c3aed` |
| Sunlit Meadow | Yellow | `#eab308` |
| Twilight Thicket | Indigo | `#6366f1` |
| Crystal Cavern | Cyan | `#06b6d4` |
| Volcanic Ridge | Red | `#dc2626` |
| Coastal Bluff | Sky Blue | `#0ea5e9` |

### Status Colors

| Status | Hex | Usage |
|--------|-----|-------|
| Success | `#22c55e` | Confirmations |
| Error | `#ef4444` | Errors, warnings |
| Warning | `#f59e0b` | Caution states |
| Info | `#3b82f6` | Informational |

## Typography

**Font Stack**: Geist Sans (body) — clean, technical, excellent at small sizes. Used for everything.

### Type Scale

| Level | Size | Weight | Tracking | Line Height |
|-------|------|--------|----------|-------------|
| Display | clamp(2.5rem, 6vw, 4.5rem) | 700 | -0.03em | 1.08 |
| H1 | 2.25rem (36px) | 700 | -0.02em | 1.1 |
| H2 | 1.875rem (30px) | 700 | -0.015em | 1.15 |
| H3 | 1.25rem (20px) | 600 | -0.01em | 1.3 |
| Body | 0.9375rem (15px) | 400 | 0 | 1.6 |
| Small | 0.8125rem (13px) | 400 | 0 | 1.5 |
| Caption | 0.6875rem (11px) | 600 | 0.03em | 1.4 |

### Typography Rules
- Headings use tight tracking (-0.02em to -0.03em) for visual density
- Body text uses relaxed line height (1.6) for readability
- Captions/badges use slight letter-spacing (0.03em) for legibility at small sizes
- Gold accent in headings: one key phrase per heading, never more

## Component Design Language

### Cards
- Border radius: 16px
- Border: 1px solid `--border`
- Background: `--bg-card`
- Padding: 24px (content area)
- Hover: translateY(-2px), border-color shifts to `--border-accent`, subtle box shadow
- Transition: 300ms cubic-bezier(0.16, 1, 0.3, 1)

### Buttons
- Border radius: 10px
- Font: 14px, 600 weight
- **Primary**: Gold bg, dark text. Hover: lighter gold + glow shadow
- **Secondary**: Transparent, border. Hover: gold border + text
- **Ghost**: Transparent, muted text. Hover: gold tint background
- Padding: 10px 24px (default), 8px 16px (ghost/small)

### Badges
- Border radius: 6px
- Font: 11px, 600 weight, 0.03em tracking
- **Gold badge**: gold bg at 12%, gold text, gold border at 20%
- **Muted badge**: tertiary bg, secondary text, default border
- Padding: 3px 8px

### Inputs
- Border radius: 10px
- Border: 1px solid `--border`
- Background: `--bg-card`
- Padding: 10px 16px
- Font: 13px
- Focus: gold-dark border + 3px gold ring at 10%
- Select dropdowns: custom chevron, right-padded

### Spacing Scale
4, 8, 12, 16, 24, 32, 48, 64, 96px

Standard section padding: 96px vertical (py-24)
Standard content max-width: 1280px (max-w-5xl for content, max-w-7xl for gallery)

## Atmospheric Effects

- **Noise overlay**: 1.5% opacity fractal noise on sections for texture
- **Gold glow**: Subtle radial gradient behind hero heading
- **Glow pulse**: 6s ease-in-out infinite animation on ambient light effects
- **Card hover shadow**: Multi-layer shadow with gold accent outline
- **Scroll-triggered fade-in**: Elements enter from 10-20px below with 0.5s ease

## Don'ts
- Never use pure black (#000) backgrounds
- Never use more than one accent color at a time
- Never use thin/light font weights for headings
- Never add borders to images within cards (the card IS the frame)
- Never use harsh white (#fff) for text — always warm off-white
