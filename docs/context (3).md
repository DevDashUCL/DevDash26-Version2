# DevDash – Landing Page: Context & Structured Prompt

---

## Project Overview

**Client:** UCL Computer Science Society — organizer of DevDash, a 24-hour innovation hackathon
**Deliverable:** A full-featured, SEO-optimized, mobile-responsive event landing page
**Framework:** Next.js 14+ (App Router) with TypeScript
**Deployment Target:** Vercel (or any Node.js host)
**Design Mode:** Full black-mode dark theme; developer-native aesthetic — no fictional lore, no military/HUD framing. Think GitHub, Stripe, Linear, Vercel: clean, modern, optimistic.

> **Note on prior versions:** This project previously explored two other creative directions — a fictional "Titan war" narrative, and later a mission-command / HUD aesthetic ("Mission Brief," "The Arsenal," "War Council"). Both are retired. This document reflects the current, developer-native direction only.

---

## Brand Identity & Design Tokens

### Color Palette
```
--color-bg-primary:      #0A0A0A   /* Near-pitch black – page background */
--color-bg-surface:      #111111  /* Cards, nav, elevated surfaces */
--color-bg-elevated:     #1A1A1A  /* Hover states, input fields, accordion panels */
--color-accent-green:    #16A34A  /* Primary accent — buttons, labels, active states, grid highlights */
--color-accent-green-glow: #22D66B /* Brighter glow variant — logo pulse, particle accents, count-up flash */
--color-white:           #FFFFFF  /* Pure white – headings, icons */
--color-text-primary:    #EDEDED  /* Body text */
--color-text-secondary:  #9A9A9A  /* Muted / supporting text */
--color-border:          #2A2A2A  /* Subtle borders, dividers */
--color-green-hover:     #128A3E  /* Green hover / pressed state */
```

### Typography
```
Display / Hero:   "Inter" or "Geist" – bold weight (700–800), clean modern sans, no futuristic display face
Headings (H2–H4): "Inter" 700 weight – confident, product-style
Body / UI:        "Inter" 400–500 – readable, neutral
System / Labels:  "JetBrains Mono" or "Geist Mono" – // section labels, typing effect, DevDash Assistant terminal
Section Labels:   Mono, 500 weight, letter-spacing: 0.1em, uppercase, color: var(--color-accent-green), prefixed with "// "
```

### Spacing Scale (rem-based, Tailwind-compatible)
```
4px → 8px → 12px → 16px → 24px → 32px → 48px → 64px → 96px → 128px
```

### Border Radius
```
Cards / Inputs:  8px
Buttons:         6px
Badges:          4px
Hero / full-bleed sections: 0px
```

---

## Animation Strategy — Framer Motion + GSAP

Two libraries, two distinct jobs. Never mix them on the same element.

### Library Responsibilities

| Library | Use For | Why |
|---|---|---|
| **Framer Motion** | Component mount/unmount, scroll-triggered section reveals, hover micro-interactions, page-load stagger, accordion open/close, mobile menu overlay, typing-effect headline, DevDash Assistant open/close | Declarative React integration, layout animations, `AnimatePresence` for exit states |
| **GSAP + ScrollTrigger** | Hero background grid reaction loop, logo pulse-on-scroll, schedule timeline connector draw, animated counters (stats + prize figure), sponsor marquee | Timeline-based precision, ScrollTrigger scrub, fine easing control, infinite loops outside React's render cycle |

### Installation
```bash
npm install framer-motion gsap @gsap/react
```

---

### Framer Motion – Patterns by Component

#### 1. Shared Scroll-Reveal Wrapper (`components/animations/ScrollReveal.tsx`)
```tsx
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}
// Usage: wrap with <ScrollReveal> — uses useInView + motion.div
```

#### 2. Hero (`components/sections/Hero.tsx`)
- **Page-load stagger**: label → title → subtitle → buttons → stats enter sequentially
  ```tsx
  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }
  ```
- **Typing-effect headline**: a small hook (`hooks/useTypewriter.ts`) cycles through phrases, driving a `motion.span` that renders characters with a blinking `motion.span` cursor (`animate={{ opacity: [1, 0, 1] }}, repeat: Infinity`)
- **CTA hover**: `whileHover={{ scale: 1.03 }}` + `whileTap={{ scale: 0.97 }}`

#### 3. Navbar (`components/layout/Navbar.tsx`)
- **Background transition**: `motion.header` `animate={{ backgroundColor: scrolled ? '#111111' : 'transparent', backdropFilter: scrolled ? 'blur(12px)' : 'none' }}`
- **Mobile menu**: `AnimatePresence` + `motion.div` `initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}`

#### 4. About DevDash (`components/sections/AboutDevDash.tsx`)
- Paragraphs wrapped individually in `ScrollReveal` with incremented delay
- Bottom feature row (Innovate / Collaborate / Create Impact) staggers in as 3 short beats

#### 5. Tracks (`components/sections/Tracks.tsx`)
- Card grid `ScrollReveal` stagger; **hover**: `whileHover={{ y: -4 }}` + green border-glow via `className` transition

#### 6. Why DevDash (`components/sections/WhyDevDash.tsx`)
- Benefit list items stagger in (`ScrollReveal`, delay = index × 0.1s)

#### 7. Prizes (`components/sections/Prizes.tsx`)
- Award-category list fades in beneath the (GSAP-driven) count-up figure

#### 8. Meet the Team (`components/sections/MeetTheTeam.tsx`)
- Role cards staggered fade-in; **hover**: subtle green underline/border highlight only — no rotation, no 3D tilt

#### 9. FAQ (`components/sections/Faq.tsx`)
- `AnimatePresence` per accordion item: `initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}`

#### 10. Registration (`components/sections/Registration.tsx`)
- `ScrollReveal` on headline/body/button as a group

#### 11. Footer (`components/layout/Footer.tsx`)
- Columns `ScrollReveal` stagger fade-up on scroll entry

#### 12. DevDash Assistant (`components/ui/DevDashAssistant.tsx`)
- Launcher button `whileHover={{ scale: 1.05 }}`
- Panel open/close: `AnimatePresence` + `motion.div initial={{ opacity: 0, y: 12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }}`
- New message rows: simple `initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}`

---

### GSAP + ScrollTrigger – Patterns by Component

Register plugins once in a `lib/gsap.ts` file:
```ts
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
export { gsap, ScrollTrigger }
```

All GSAP code runs inside `useGSAP()` hook from `@gsap/react` with the section's `containerRef` as scope. Always return cleanup: `return () => ScrollTrigger.getAll().forEach(t => t.kill())`.

#### 1. Reactive Background Grid (`components/ui/ReactiveGrid.tsx`)
```ts
// Canvas or SVG grid; nearby lines brighten as the pointer moves
window.addEventListener('pointermove', (e) => {
  gsap.to(gridUniforms, { proximityX: e.clientX, proximityY: e.clientY, duration: 0.3, ease: 'power2.out' })
})
```
Most prominent behind the Hero; optionally rendered at low intensity elsewhere on the page. Disabled entirely on touch devices and under reduced motion.

#### 2. Logo Pulse on Scroll (`components/layout/Navbar.tsx`)
```ts
ScrollTrigger.create({
  trigger: document.body,
  start: 'top top',
  end: 'bottom bottom',
  onUpdate: (self) => {
    // fire a brief pulse through the logo whenever the user crosses a new section boundary
    gsap.fromTo(logoGlowRef.current, { opacity: 0.2 }, { opacity: 1, duration: 0.4, yoyo: true, repeat: 1 })
  }
})
```
Kept quick and subtle — a polish detail, not a dramatic effect.

#### 3. Animated Counters (`components/sections/Hero.tsx`, `components/sections/Prizes.tsx`)
```ts
gsap.from(statEls, {
  textContent: 0,
  duration: 1.8,
  ease: 'power2.out',
  snap: { textContent: 1 },
  stagger: 0.15,
  scrollTrigger: { trigger: statsRef.current, start: 'top 80%', once: true }
})
```

#### 4. Schedule Timeline Draw (`components/sections/Schedule.tsx`)
```ts
gsap.fromTo(railRef.current,
  { scaleX: 0 }, // or scaleY for a vertical rail
  { scaleX: 1, transformOrigin: 'left center', ease: 'none',
    scrollTrigger: { trigger: scheduleRef.current, start: 'top 70%', end: 'bottom 80%', scrub: 0.5 }
  }
)
```

#### 5. Sponsor Marquee (`components/sections/Sponsors.tsx`)
```ts
gsap.to(marqueeRef.current, {
  xPercent: -50,
  ease: 'none',
  repeat: -1,
  duration: 30,
})
marqueeRef.current.addEventListener('mouseenter', () => gsap.globalTimeline.pause())
marqueeRef.current.addEventListener('mouseleave', () => gsap.globalTimeline.resume())
```

#### 6. Data-Flow Particles (`components/ui/DataFlowParticles.tsx`)
```ts
// Lightweight canvas: thin light streaks/dots drifting in one consistent direction
gsap.to(particles, { x: '+=40', repeat: -1, ease: 'none', duration: 6, stagger: { each: 0.3, repeat: -1 } })
```
Kept low-density and low-opacity so it reads as ambient texture, not a distraction.

---

### SSR Safety Rules for Animations

1. All components using Framer Motion or GSAP must be `'use client'` components.
2. Wrap GSAP `useGSAP()` calls in a check: `if (typeof window === 'undefined') return`
3. Use `dynamic()` import with `{ ssr: false }` for the ReactiveGrid and DataFlowParticles components (canvas-based, no meaningful SSR output):
   ```ts
   const ReactiveGrid = dynamic(() => import('@/components/ui/ReactiveGrid'), { ssr: false })
   ```
4. Always respect reduced motion:
   ```ts
   // Framer Motion — global, in layout: <MotionConfig reducedMotion="user">

   // GSAP — in each useGSAP block
   const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
   if (prefersReduced) return
   ```
5. Under `prefers-reduced-motion`: disable the reactive grid, particles, and logo pulse; the typing effect falls back to static text (the first phrase only).
6. Disable the reactive grid on touch devices (no pointer-move signal) — render it static or omit it.

---

## Page Sections & Component Specifications

### 1. Navbar
- Fixed, transparent on scroll-top → solid `#111111` + `backdrop-blur` on scroll (GSAP ScrollTrigger)
- Logo: "DEVDASH" wordmark, brief green pulse on scroll (see GSAP pattern above)
- Nav links (anchor scroll): About, Tracks, Schedule, Prizes, Team, FAQ
- CTA Button: "Register Now" → green pill button, right-aligned (Framer Motion `whileHover`)
- Mobile: hamburger → full-screen slide-down menu overlay (Framer Motion `AnimatePresence`)
- Aria-label on nav, skip-to-main link for a11y

### 2. Hero
- Full-viewport height (`100dvh`), dark background with `ReactiveGrid` behind content
- Label: `[ CODE. COLLABORATE. CREATE IMPACT. ]` (mono, green)
- H1: "BUILD THE FUTURE." with a typing-effect element cycling: "SOLVE REAL PROBLEMS." / "CREATE IMPACT." / "SHIP IDEAS."
- Subtitle: "DevDash is a 24-hour innovation hackathon where the next generation of builders, developers and creators turn ideas into real-world impact."
- Buttons: "Register Now" (primary, green) + "Learn More" (ghost, anchor-scrolls to About)
- Stat bar: 24 Hours · 100+ Participants · 30+ Teams · [Prize Pool] — GSAP count-up on load/scroll
- **GSAP**: reactive grid, stat count-up, logo pulse trigger point
- **Framer Motion**: page-load stagger, typing effect, button hover/tap

### 3. About DevDash
- Label: `// ABOUT DEVDASH`
- H2: "WE DON'T JUST CODE. WE CREATE WHAT'S NEXT."
- 3-paragraph confirmed body copy (see Content section below)
- Bottom feature row: Innovate · Collaborate · Create Impact
- **Framer Motion**: paragraph `ScrollReveal` stagger, feature-row stagger

### 4. Tracks
- Label/H2: "CHOOSE YOUR CHALLENGE"
- 6-card grid: AI & Machine Learning, Sustainability, FinTech, Healthcare, Education, Open Innovation (each with a one-line description — see Content)
- Card anatomy: `#111111` bg, subtle border, icon, title, description; **active/hover**: green border-glow
- **Framer Motion**: card `ScrollReveal` stagger, `whileHover={{ y: -4 }}`

### 5. Why DevDash
- H2: "WHY BUILD AT DEVDASH?"
- Benefit list: 24 Hours, Industry Mentors, Networking, Hands-on Learning, Real Projects, Amazing Prizes
- Right-side large animated illustration using a data/energy visual motif (reframed lightning/glitch — not a literal weapon effect)
- **Framer Motion**: benefit list `ScrollReveal` stagger

### 6. Schedule
- Label: `// EVENT TIMELINE`
- H2: "THE MISSION BEGINS HERE." *(kept as-is per confirmed copy — a single dramatic headline, not a full mission-theme section)*
- 7-step flow: Registration → Opening Ceremony → Team Formation → Hacking Begins → Mentoring Sessions → Final Presentations → Awards Ceremony
- **GSAP**: timeline connector draws in as section scrolls into view
- **Framer Motion**: each step label fades in as its point on the line is reached

### 7. Prizes
- Label: `// REWARDS`
- H2: "BUILD. COMPETE. WIN."
- Large prize-pool figure (GSAP count-up)
- Categories: Champion, Runner-Up, Best Innovation, Best UI/UX, People's Choice, Sponsor Awards
- **GSAP**: count-up on scroll entry
- **Framer Motion**: category list fade-in beneath the figure

### 8. Sponsors
- H2: "POWERED BY INDUSTRY LEADERS"
- Infinite horizontal logo marquee, pauses on hover, soft green glow on hover
- **GSAP**: continuous marquee scroll with hover-pause

### 9. Meet the Team
- H2: "THE PEOPLE BEHIND DEVDASH"
- Grid of role cards: President, Vice President, Organizing Chair, Marketing Lead, Technical Lead, Logistics Lead
- **Framer Motion**: card stagger fade-in, subtle green hover (border/underline only)

### 10. FAQ
- H2: "GOT QUESTIONS?"
- Accordion: Who can participate? / How many members (per team)? / Is food provided? / Do beginners qualify? / What should I bring? / How do I register?
- **Framer Motion**: `AnimatePresence` expand/collapse

### 11. Registration (Final CTA)
- H2: "READY TO BUILD THE FUTURE?"
- Body: "Join hundreds of developers, designers and innovators for 24 hours of collaboration, learning and creation."
- CTA: "Register Now" (green button)
- **Framer Motion**: group `ScrollReveal`, standard button hover/tap

### 12. Footer
- "DEVDASH" wordmark + tagline "Code. Collaborate. Create Impact."
- "Organized by [Organizing Body — confirm name]"
- Copyright line: © 2026
- **Framer Motion**: column stagger fade-up

### 13. DevDash Assistant (Global, persistent)
- Small launcher button (bottom-right), opens a monospaced terminal-style panel
- Capabilities: answer FAQ questions (once answers are confirmed), recommend a Track based on stated interests, scroll the user to a requested section
- MVP: rule-based keyword matching against a small intents file; upgradeable to an LLM-backed backend later without changing the UI
- **Framer Motion**: launcher hover, panel open/close `AnimatePresence`, new-message fade-in

---

## Technical Architecture

### Folder Structure
```
/
├── app/
│   ├── layout.tsx              # Root layout, metadata, fonts, MotionConfig
│   ├── page.tsx                # Home page – assembles all sections + JSON-LD
│   └── globals.css             # CSS variables, Tailwind base overrides
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           # 'use client' – GSAP logo pulse + FM AnimatePresence
│   │   └── Footer.tsx           # 'use client' – FM stagger
│   ├── sections/
│   │   ├── Hero.tsx             # 'use client' – FM stagger + typing effect, GSAP counters
│   │   ├── AboutDevDash.tsx     # 'use client' – FM ScrollReveal
│   │   ├── Tracks.tsx           # 'use client' – FM stagger + hover
│   │   ├── WhyDevDash.tsx       # 'use client' – FM stagger
│   │   ├── Schedule.tsx         # 'use client' – GSAP rail draw + FM ScrollReveal
│   │   ├── Prizes.tsx           # 'use client' – GSAP count-up + FM stagger
│   │   ├── Sponsors.tsx         # 'use client' – GSAP marquee
│   │   ├── MeetTheTeam.tsx      # 'use client' – FM stagger cards
│   │   ├── Faq.tsx              # 'use client' – FM AnimatePresence accordion
│   │   └── Registration.tsx     # 'use client' – FM ScrollReveal
│   ├── ui/
│   │   ├── Button.tsx           # FM whileHover / whileTap
│   │   ├── SectionLabel.tsx     # Static, mono "// LABEL" style
│   │   ├── TrackCard.tsx        # FM ScrollReveal child + whileHover
│   │   ├── TeamCard.tsx         # FM whileHover
│   │   ├── ScheduleStep.tsx     # FM ScrollReveal child
│   │   ├── FaqAccordionItem.tsx # FM AnimatePresence
│   │   ├── ReactiveGrid.tsx     # GSAP pointer-reactive canvas/SVG grid, ssr:false
│   │   ├── DataFlowParticles.tsx# GSAP looping particle canvas, ssr:false
│   │   └── DevDashAssistant.tsx # FM AnimatePresence terminal chat widget
│   └── animations/
│       └── ScrollReveal.tsx     # FM useInView wrapper (fade-up)
│
├── lib/
│   ├── gsap.ts                  # Register GSAP plugins once
│   ├── constants.ts             # Nav links, tracks, schedule, prizes, team, FAQ data, registration URL
│   ├── assistantIntents.ts      # Keyword → response/section-scroll mapping for DevDash Assistant
│   ├── types.ts                 # TypeScript interfaces
│   └── utils.ts                 # cn() helper, formatters
│
├── hooks/
│   ├── useScrolled.ts           # Scroll position boolean
│   ├── useTypewriter.ts         # Cycles through headline phrases
│   └── useMediaQuery.ts         # Breakpoint / touch-device detection
│
├── public/
│   ├── images/                  # Optimized WebP images
│   └── icons/                   # SVG brand/social/track icons
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── .env.local
```

### Key Technical Decisions

| Concern | Decision | Reason |
|---|---|---|
| Styling | Tailwind CSS v3 + CSS variables | Utility-first + themeable tokens |
| Fonts | `next/font/google` (Inter/Geist + JetBrains Mono) | Zero layout shift, self-hosted |
| Images | `next/image` with WebP + `priority` where above the fold | Core Web Vitals (LCP) |
| Scroll animations | Framer Motion `useInView` | Declarative, React-native, easy stagger |
| Precision loops/scrub | GSAP + ScrollTrigger | Grid reaction, marquee, count-up, rail draw |
| Reactive grid & particles | Canvas or lightweight SVG, `dynamic(..., { ssr:false })` | Browser-only, no meaningful SSR output |
| Registration | External link (Google Form / Tally) via `NEXT_PUBLIC_REGISTRATION_URL` | No backend form needed for MVP |
| DevDash Assistant | Rule-based intents file for MVP | Fast to ship; swappable for an LLM backend later without UI changes |
| Tracks / Schedule / Prizes / Team / FAQ data | Structured arrays in `lib/constants.ts` | Content updates without code edits |
| SEO | `generateMetadata()`, JSON-LD (`Event` schema), semantic HTML | Google rich results |
| Accessibility | `aria-*`, keyboard nav, `MotionConfig reducedMotion="user"` | WCAG 2.1 AA |

---

## SEO Configuration

### `app/layout.tsx`
```typescript
import { MotionConfig } from 'framer-motion'

export const metadata: Metadata = {
  title: 'DevDash | 24-Hour Innovation Hackathon',
  description: 'DevDash is a 24-hour innovation hackathon where builders, developers, and creators turn ideas into real-world impact. Register today.',
  keywords: ['hackathon', 'DevDash', 'UCL Computer Science Society', 'university hackathon Sri Lanka', 'student developer event'],
  openGraph: {
    title: 'DevDash – 24-Hour Innovation Hackathon',
    description: 'Build the future. Register for DevDash.',
    url: 'https://yourdomain.com',
    siteName: 'DevDash',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://yourdomain.com' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MotionConfig reducedMotion="user">
          {children}
        </MotionConfig>
      </body>
    </html>
  )
}
```

### JSON-LD in `app/page.tsx`
```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "DevDash",
  "description": "A 24-hour innovation hackathon bringing together developers, designers, and innovators.",
  "startDate": "[Confirm — e.g. 2026-09-19T08:00:00+05:30]",
  "endDate": "[Confirm]",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "location": {
    "@type": "Place",
    "name": "[VenueName]",
    "address": { "@type": "PostalAddress", "streetAddress": "[StreetAddress]", "addressLocality": "[City]", "addressCountry": "LK" }
  },
  "organizer": { "@type": "Organization", "name": "[Confirm: UCL Computer Science Society or UCL ICT Club]" },
  "offers": { "@type": "Offer", "url": "[RegistrationURL]", "price": "0", "priceCurrency": "LKR", "availability": "https://schema.org/InStock" }
}
```

> Do not publish this schema until `startDate`, `endDate`, and `organizer.name` are confirmed — see Open Items below.

---

## Assets Required from Client

Supply in `/public/images/`:

| Filename | Usage | Dimensions |
|---|---|---|
| `og-image.jpg` | Open Graph social share | 1200×630px |
| `why-devdash-illustration.png` (or `.svg`) | Why DevDash right-side data/energy illustration | 900×1100px |
| `team-president.jpg` … `team-logistics-lead.jpg` | Meet the Team (6 role photos) | 400×400px |
| `sponsor-[name].svg` (×N) | Sponsors marquee | vector, transparent |
| `track-ai.svg`, `track-sustainability.svg`, `track-fintech.svg`, `track-healthcare.svg`, `track-education.svg`, `track-open.svg` | Track card icons | vector |
| `logo-devdash.svg` | Navbar/footer wordmark or mark | vector |
| `logo-organizer.svg` | Organizing body logo (footer) | vector |

All raster images: WebP preferred, optimised to <200KB each.

---

## Content Placeholders

```
[RegistrationURL]   → Final Google Form / registration page link
[VenueName]         → Hackathon venue name
[StreetAddress]     → Venue street address
[City]              → Colombo / Negombo / etc.
[EventStartDateTime]→ Confirmed start date/time
[EventEndDateTime]  → Confirmed end date/time
[PrizePool]         → Single confirmed prize-pool figure
[OrganizingBody]    → Confirm: "UCL Computer Science Society" or "UCL ICT Club"
[InstagramURL] / [FacebookURL] / [LinkedInURL] → Social links
```

**Confirmed content already locked in** (do not treat as placeholder): Hero label/headline/subtitle/buttons, About DevDash copy, all 6 Track names + descriptions, Why DevDash benefit list, Schedule's 7-step flow, Prizes copy + category list, Sponsors heading, Meet the Team role titles, all 6 FAQ questions (not yet answered), Registration copy, Footer tagline.

**Outstanding — confirm before launch:**
- Single prize-pool figure (Hero shows a placeholder; Prizes section states LKR 500,000 — reconcile to one number)
- Organizing body name ("UCL Computer Science Society" per this content pass vs. "UCL ICT Club" per an earlier pass)
- Meet the Team: final names to pair with each role, plus headshots
- Answers to all 6 FAQ questions
- Specific dates/times for each Schedule step (confirm if the hackathon is still September 19, 2026)
- Sponsor logo files
- Final registration link/form destination

---

## Structured Prompt for Antigravity / AI Code Generation

> **Copy and paste the block below directly into Antigravity:**

---

### ANTIGRAVITY PROMPT (copy from here)

```
You are building a production-ready, SEO-optimized, mobile-responsive landing page for DevDash, a 24-hour innovation hackathon organized by the UCL Computer Science Society.

## Stack
- Next.js 14+ with App Router and TypeScript
- Tailwind CSS v3 for styling
- next/font for Google Fonts (Inter or Geist for display/body, JetBrains Mono or Geist Mono for labels/terminal)
- next/image for all images with WebP and priority where above the fold
- Framer Motion for component-level animations (scroll reveals, stagger, hover, accordion, AnimatePresence, typing effect)
- GSAP + ScrollTrigger (@gsap/react) for scroll-driven and looping animations (reactive grid, logo pulse, counters, marquee, timeline draw)
- CSS custom properties for the full design token system

## Brand Direction — IMPORTANT
This is a real, present-day hackathon. Do NOT use fictional lore, military/mission language, or sci-fi world-building of any kind. The tone is confident, optimistic, and developer-native — closer to GitHub, Stripe, Linear, or Vercel than to any invented storyline. Personality comes from clean design and subtle, developer-flavored interactivity (grid, typing effect, terminal chat), not from narrative.

## Animation Library Split — FOLLOW THIS EXACTLY

### Framer Motion handles:
- Page-load hero content stagger (label → title → subtitle → buttons → stats, staggerChildren: 0.15)
- Typing-effect headline cycling through phrases, with a blinking cursor
- Navbar mobile menu AnimatePresence slide-in/out
- All ScrollReveal (useInView) section fade-ups: opacity 0→1, y 32→0, ease [0.22,1,0.36,1]
- Tracks card stagger + whileHover lift (y: -4) + green border-glow
- Why DevDash benefit list stagger
- Meet the Team card stagger fade-in + subtle green hover (border/underline only, no rotation/3D)
- FAQ accordion AnimatePresence height/opacity expand-collapse
- DevDash Assistant launcher hover, panel open/close AnimatePresence, message fade-in
- All Button whileHover (scale 1.03) + whileTap (scale 0.97)
- Footer columns ScrollReveal stagger
- Navbar background color animate prop driven by useScrolled hook

### GSAP + ScrollTrigger handles:
- Reactive background grid that brightens near the cursor (Hero primarily; low intensity elsewhere; disabled on touch devices)
- Brief logo pulse triggered as the user crosses section boundaries while scrolling
- Hero stat bar and Prizes figure count-up (textContent 0→target, snap, stagger, once: true)
- Schedule timeline connector draw (scaleX or scaleY, scrub: 0.5)
- Sponsors infinite marquee (xPercent loop, pause on hover)
- Data-flow particle drift (subtle, low-opacity, looping canvas)

### SSR Safety (MANDATORY):
- Every component using either library must be 'use client'
- Use dynamic(() => import(...), { ssr: false }) for ReactiveGrid and DataFlowParticles
- Register GSAP plugins once in lib/gsap.ts: gsap.registerPlugin(ScrollTrigger)
- All useGSAP() calls scoped to containerRef
- Always cleanup: ScrollTrigger.getAll().forEach(t => t.kill())
- Wrap root layout children in <MotionConfig reducedMotion="user"> for a11y
- Under prefers-reduced-motion: disable the reactive grid, particles, and logo pulse; typing effect falls back to the first static phrase
- Disable the reactive grid on touch devices

## Design System
Full dark mode, developer-native palette:
- Background: #0A0A0A (page), #111111 (nav/cards), #1A1A1A (inputs/elevated)
- Accent Green: #16A34A (primary accent — buttons, labels, active states, grid highlights), glow variant #22D66B
- Text: #EDEDED (body), #9A9A9A (muted)
- Borders: #2A2A2A

Typography:
- Section labels: mono, uppercase, letter-spacing 0.1em, color #16A34A, prefixed "// "
- H1: Inter/Geist 700–800, 80–96px desktop / 48px mobile, white
- H2: Inter 700, 40–48px desktop / 32px mobile, white
- Body: Inter 400, 16px/1.7, #9A9A9A
- Terminal/labels: JetBrains Mono or Geist Mono

## Sections to Build (in order)

1. **Navbar** – Fixed. useScrolled hook drives Framer Motion animate prop. Logo "DEVDASH" with a brief GSAP green pulse on section-boundary scroll. Nav links (anchor scroll): About, Tracks, Schedule, Prizes, Team, FAQ. "Register Now" green CTA with whileHover, links to NEXT_PUBLIC_REGISTRATION_URL. Hamburger → AnimatePresence full-screen mobile overlay.

2. **Hero** – 100dvh, dark background with a ReactiveGrid canvas reacting to pointer movement. Mono label "[ CODE. COLLABORATE. CREATE IMPACT. ]" (green). H1 "BUILD THE FUTURE." with a typing-effect sub-element cycling "SOLVE REAL PROBLEMS." / "CREATE IMPACT." / "SHIP IDEAS." Subtitle about the 24-hour hackathon. Two CTAs: "Register Now" (primary) + "Learn More" (ghost, anchor-scrolls to About). Stat bar (24 Hours / 100+ Participants / 30+ Teams / prize pool) with GSAP count-up.

3. **About DevDash** – Mono label "// ABOUT DEVDASH" + H2 "WE DON'T JUST CODE. WE CREATE WHAT'S NEXT." 3 confirmed paragraphs, each in its own Framer ScrollReveal. Bottom feature row: Innovate / Collaborate / Create Impact, staggered.

4. **Tracks** – H2 "CHOOSE YOUR CHALLENGE". 6-card grid (AI & Machine Learning, Sustainability, FinTech, Healthcare, Education, Open Innovation), each with icon, title, one-line description. Framer stagger + whileHover lift + green border-glow.

5. **Why DevDash** – H2 "WHY BUILD AT DEVDASH?" Benefit list (24 Hours, Industry Mentors, Networking, Hands-on Learning, Real Projects, Amazing Prizes) with Framer stagger. Right-side large animated illustration using a data/energy visual motif (not a literal weapon or lightning-bolt effect).

6. **Schedule** – Mono label "// EVENT TIMELINE" + H2 "THE MISSION BEGINS HERE." 7-step flow (Registration → Opening Ceremony → Team Formation → Hacking Begins → Mentoring Sessions → Final Presentations → Awards Ceremony). GSAP draws the connecting rail on scroll; each step fades in via Framer ScrollReveal.

7. **Prizes** – Mono label "// REWARDS" + H2 "BUILD. COMPETE. WIN." Large prize-pool figure with GSAP count-up. Category list below: Champion, Runner-Up, Best Innovation, Best UI/UX, People's Choice, Sponsor Awards.

8. **Sponsors** – H2 "POWERED BY INDUSTRY LEADERS". Infinite horizontal logo marquee (GSAP), pause on hover, soft green glow on hover.

9. **Meet the Team** – H2 "THE PEOPLE BEHIND DEVDASH". Grid of 6 role cards (President, Vice President, Organizing Chair, Marketing Lead, Technical Lead, Logistics Lead). Framer stagger fade-in, subtle green hover only.

10. **FAQ** – H2 "GOT QUESTIONS?" Accordion with 6 items (Who can participate? / How many members per team? / Is food provided? / Do beginners qualify? / What should I bring? / How do I register?). Framer AnimatePresence expand/collapse. Render "Answer coming soon" for any question without a confirmed answer — do not fabricate answers.

11. **Registration** – H2 "READY TO BUILD THE FUTURE?" Body about joining hundreds of developers for 24 hours. CTA "Register Now" (green). Framer ScrollReveal on the group.

12. **Footer** – "DEVDASH" wordmark + tagline "Code. Collaborate. Create Impact." Organizer credit line (use NEXT_PUBLIC_ORGANIZER_NAME env var, do not hardcode, since this is still being confirmed). Copyright line. Framer column stagger.

13. **DevDash Assistant** – Persistent bottom-right launcher opening a monospaced terminal-style chat panel. MVP: rule-based intent matching (lib/assistantIntents.ts) that can answer confirmed FAQ items, recommend a Track from stated interests, and scroll the page to a named section. Framer AnimatePresence for open/close and message entrance.

## Key Requirements
- Semantic HTML5: <header>, <main>, <section id="...">, <footer>, <nav>, <article>
- Section IDs: about, tracks, why, schedule, prizes, sponsors, team, faq, register
- generateMetadata() in app/layout.tsx with full OG + Twitter tags
- JSON-LD Event schema script in app/page.tsx — leave startDate/endDate/organizer as clearly marked placeholders in code comments until confirmed
- Mobile-first breakpoints: sm:640 md:768 lg:1024 xl:1280
- Registration CTAs link to NEXT_PUBLIC_REGISTRATION_URL env variable — no hardcoded URL, no backend form for MVP
- Reactive grid and data-flow particles must be disabled on touch devices and under prefers-reduced-motion
- Do not fabricate: FAQ answers, team member names, exact schedule times, sponsor names, or a single prize-pool figure where the source content conflicts — render clearly marked placeholder/TBA states instead
- No placeholder.com — use next/image with /images/ paths

## Folder Structure (exact)
app/ → layout.tsx, page.tsx, globals.css
components/layout/ → Navbar.tsx, Footer.tsx
components/sections/ → Hero.tsx, AboutDevDash.tsx, Tracks.tsx, WhyDevDash.tsx, Schedule.tsx, Prizes.tsx, Sponsors.tsx, MeetTheTeam.tsx, Faq.tsx, Registration.tsx
components/ui/ → Button.tsx, SectionLabel.tsx, TrackCard.tsx, TeamCard.tsx, ScheduleStep.tsx, FaqAccordionItem.tsx, ReactiveGrid.tsx, DataFlowParticles.tsx, DevDashAssistant.tsx
components/animations/ → ScrollReveal.tsx
lib/ → gsap.ts, constants.ts, assistantIntents.ts, types.ts, utils.ts
hooks/ → useScrolled.ts, useTypewriter.ts, useMediaQuery.ts
public/images/ → (client-supplied WebP assets)

## Content
Use the confirmed DevDash copy exactly as provided for Hero, About DevDash, Tracks, Why DevDash, Schedule, Prizes, Sponsors heading, Meet the Team role titles, and the 6 FAQ questions. Treat prize-pool figure, organizing body name, team member names, FAQ answers, exact schedule times, and sponsor names as unresolved placeholders and mark them clearly in code — never invent values for these.
```

---

*End of context.md*
