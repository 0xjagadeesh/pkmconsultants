# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) and AI agents when working with code in this repository.

---

## 1. Project Overview

**PKM Consultants** — High-end website and content management platform for a premier MEPF (Mechanical, Electrical, Plumbing, and Fire Protection) Engineering and Architectural Consultancy based in Chennai, India.

- **Frontend (`apps/web`)**: Next.js 16 (App Router, React 19, React Compiler, Turbopack, Tailwind CSS v4, GSAP & ScrollTrigger).
- **CMS (`apps/studio`)**: Sanity Studio v5 (Vite, `@sanity/icons`, styled-components).
- **Packages (`packages/`)**:
  - `@workspace/ui`: Shared UI primitives, design tokens, and styles.
  - `@workspace/sanity`: Sanity client, typed GROQ queries, live preview, and image loaders.
  - `@workspace/env`: Zod-validated environment variables (`@t3-oss/env-nextjs`).
  - `@workspace/logger`: Structured context logger.
  - `typescript-config`: Centralized TypeScript configs.

---

## 2. Commands & Workflow

All commands must be executed using **pnpm** (pnpm 10+):

```bash
# Development
pnpm dev              # Start both apps (Web on localhost:3000, Studio on localhost:3333)
pnpm dev:web          # Next.js only (with Turbopack)
pnpm dev:studio       # Sanity Studio only

# Build
pnpm build            # Build all packages via Turborepo
pnpm build:web        # Build Next.js web application
pnpm build:studio     # Build Sanity Studio

# Lint & Format (Biome / Ultracite — NOT ESLint / Prettier)
pnpm lint             # Lint all workspaces
pnpm format           # Auto-format all files
pnpm format:check     # Check formatting without writing
pnpm check-types      # TypeScript type checking across monorepo

# Sanity Type Generation (Run from apps/studio after schema updates)
pnpm type             # Extract schema & regenerate TypeScript types
pnpm extract          # Schema extraction only
```

---

## 3. Design System & Visual Identity

The design language reflects **precision engineering, architectural minimalism, and dynamic motion**. It avoids standard template styles in favor of sharp technical gridlines, high-contrast typography, and smooth GSAP-driven micro-interactions.

### 3.1 Color Palette

| Token | Hex Value | Role & Usage |
|---|---|---|
| **Primary / Brand** | `#261CC1` | Signature royal cobalt blue. Used for primary CTAs, active highlights, key metrics, and hero accents. |
| **Brand Dark** | `#1a1396` | Deepened brand blue for hover states and pressed interactions. |
| **Background** | `#f7fbff` / `#f0f8ff` | Alice blue / clean off-white tinted surface. Default canvas across all main sections. |
| **Secondary / Tint** | `#dedcff` | Soft lavender blue. Used for pills, badges, subtle card fills, and secondary buttons. |
| **Border / Divider** | `#c4c2e8` / `#1212121a` | Crisp technical gridlines (1px to 1.2px borders with subtle alpha transparency). |
| **Foreground / Text** | `#1e1926` / `#121212` | Deep purple-black charcoal for razor-sharp readability on light backgrounds. |
| **Muted Text** | `#555555` / `#5b5a8a` | Balanced secondary narrative text and technical captions. |
| **Dark Inversions** | `#0d0c11` / `#1e1926` | Deep obsidian surfaces for high-impact contrast zones (Prefooter, Mobile Menu). |
| **Button Surface** | `#f7fbff` | Crisp light button face with dynamic fast-animating hover borders. |

### 3.2 Typography Hierarchy

Custom local fonts are served via `/fonts/` and integrated into Tailwind v4:

- **Metropolis** (`--font-metropolis`, default `--font-sans`): Primary body, section headlines, and architectural labels.
- **Mosvita** (`--font-mosvita`): Modern geometric grotesque used for buttons, navigation links, and kicker badges.
- **Lumierepolis** (`--font-lumierepolis`): Monospaced-inspired uppercase engineering eyebrows and subheadings.
- **Pillar / Piller** (`--font-pillar`): Ultra-bold monumental font used for oversized watermark layers (e.g. Footer watermark).
- **Suisse** (`--font-suisse`): Neutral, refined typography for structured lists, footer navigation, and metadata.

### 3.3 Core Design Rules

1. **Sharp Architectural Corners**: Elements, cards, and buttons use zero or minimal border-radius (`rounded-none` or `rounded-sm`), emphasizing technical structural drafting blueprints.
2. **Technical Gridlines**: Divide sections with continuous 1px or 1.2px border dividers (`divide-x`, `divide-y`, `border-[#261CC1]/80`, `border-[#121212]/15`, `border-white/15`).
3. **High-Performance Hover & Fast Border Transitions**:
   - Button borders on hover animate with rapid transitions (`0.2s` - `0.3s`, `cubic-bezier(0.16, 1, 0.3, 1)`).
   - Character-split upward roll or slide effects on interactive link labels.
4. **GSAP & ScrollTrigger Choreography**: Smooth continuous parallax, mask-reveal headings, and scroll-pinned stacking cards.

---

## 4. Homepage Structure (`apps/web/src/app/page.tsx`)

The home page is an editorial showcase of PKM Consultants' capabilities, organized into continuous architectural sections:

1. **Hero Section (`Hero`)**:
   - Split CSS Grid layout with fixed crosshair divider lines (`top: 400px`, `left: 35% / 480px`).
   - Top-left quadrant: Staggered `SplitWordReveal` ("MEPF" / "Design Firm").
   - Top-right quadrant: Interactive `CursorTracker` coordinate physics sandbox.
   - Bottom-left quadrant: Architectural mission statement in `SplitWordReveal`.
   - Bottom-right quadrant: Solid brand background (`#261CC1`) with blueprint grid overlay, monumental headline, and `AnimatedCTAButton`.
2. **Building Lifelines (`BuildingParallax`)**:
   - High-impact GSAP parallax sequence showcasing structural construction engineering.
3. **Scroll Reveal Split (`ScrollRevealSplit`)**:
   - Two-column dual-aspect photo reveal triggered by vertical scroll progress.
4. **MEPF Exploded View (`MepfExplode`)**:
   - Interactive 3D layer exploded diagram demonstrating coordinated Mechanical, Electrical, Plumbing, and Fire systems.
5. **Solutions Stack (`SolutionsStack`)**:
   - Sticky card stack with `25vh` dwell spacing covering the 5 core disciplines:
     - 01 HVAC Design & Engineering
     - 02 Plumbing & Public Health Engineering (PHE)
     - 03 Electrical Design: HT & LT Power Systems
     - 04 Fire Protection & Life Safety
     - 05 Extra Low Voltage (ELV) & Building Automation
6. **Image Parallax Section (`ImageParallaxSection`)**:
   - Full-bleed architectural metal structure banner with smooth parallax depth.
7. **Value Pillars (`ValuePillars`)**:
   - 2-column layout with left-hand `MaskRevealText` and right-hand 3-panel interactive system guarantees accordion (Speed & Turnaround, Budget Precision, Code Compliance & Certification).
8. **Matrix Showcase Sections (`MatrixSection`)**:
   - Editorial split cards featuring sticky text on one side and `ImageClipReveal` crosshair interaction on the other:
     - Section 1: "A consistent design process on every project" (Image left).
     - Section 2: "Proven Project Experience" (Image right).
9. **Prefooter Architectural Callout (`Prefooter`)**:
   - Obsidian dark background (`#0d0c11`) with copper background parallax image.
   - Dual-row grid layout: Top cell displays project narrative; Bottom cell displays oversized display headline and `ButtonZoomIn` ("Contact").
10. **Global Footer (`Footer`)**:
    - Monumental background watermark layer (`PKM Consultants` rendered with `--font-pillar`).
    - Brand identity, contact info, and 4-column directory navigation.

---

## 5. Key Interactive Components (`apps/web/src/components/`)

- **`ButtonZoomIn` (`buttonzoomin.tsx`)**:
  - Dual-compartment architectural button with 1px border matching outline and interior divider.
  - Right compartment holds brand-accented (`#261CC1`) sliding arrow.
  - GSAP roll-up text animation on hover with responsive fast border transition.
- **`AnimatedCTAButton` (`animated-cta-button.tsx`)**:
  - High-visibility action button with clean slide transition and icon tracking.
- **`SplitWordReveal` (`split-word-reveal.tsx`)**:
  - Word-level staggered entrance with interactive mouseover color shift.
- **`MaskRevealText` (`mask-reveal-text.tsx`)**:
  - Curtain wipe reveal effect for prominent editorial headlines.
- **`CursorTracker` (`cursor-tracker.tsx`)**:
  - Real-time interactive coordinate tracking sandbox with dynamic SVG line mapping.
- **`ImageClipReveal` (`image-clip-reveal.tsx`)**:
  - Architectural crosshair tracking with polygon clipping for imagery.
- **`Navbar` (`navbar.tsx`)**:
  - Glass-morphic / sticky header with character-staggered animated nav links and fullscreen modal overlay menu.

---

## 6. Architecture & Code Conventions

### 6.1 Data Flow: Sanity to Next.js
- **Schemas**: Defined in `apps/studio/schemaTypes/`. Run `pnpm type` in `apps/studio` after changing any schema.
- **Queries**: GROQ queries live in `packages/sanity/src/query.ts` using `defineQuery`.
- **Fetching**: Use `sanityFetch` from `@workspace/sanity/live` for automatic live revalidation.
- **Images**: Use `SanityImage` from `@/components/elements/sanity-image` for responsive CDN delivery and LQIP blur.

### 6.2 Code Style & Guidelines
- **File Naming**: Strict `kebab-case` for all files (`value-pillars.tsx`, `solutions-stack.tsx`, `buttonzoomin.tsx`).
- **Formatting**: Biome (`pnpm format`). Double quotes, semicolons, trailing commas (ES5), 2-space indentation.
- **No Console**: Use `@workspace/logger` instead of native `console.log`.
- **Layouts**: Prefer CSS Grid over Flexbox for complex architectural layouts.
- **Types**: Derive all UI data types directly from Sanity generated types in `packages/sanity/src/sanity.types.ts` via narrow helpers (`Extract`, `NonNullable`).
