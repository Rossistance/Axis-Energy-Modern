# Design Concept: Aurora Grid

## Inspiration & Research
- Draws from immersive, scroll-reactive experiences seen on [Obys Agency 2024](https://obys.agency/) and the kinetic gradient language of [Stripe Sessions 2024](https://stripe.com/sessions) for high engagement.
- Navigation micro-interactions reference [Apple Vision Pro](https://www.apple.com/apple-vision-pro/) floating UI to create a weightless, tech-forward impression suitable for renewable innovation.

## Page Inventory (8 pages)
1. Home (index.html)
2. Services (services.html)
3. Projects (projects.html)
4. Why Axis (why-axis.html)
5. About (about.html)
6. News (news.html)
7. Careers (careers.html)
8. Contact (contact.html)

All existing textual content from the current site is preserved verbatim within the reorganized layouts below.

## Global Experience
- **Navigation:** Glassmorphism global header with magnetized menu hover following pointer, persistent "Let’s Connect" CTA chip. Scroll triggers transform header into compact pill.
- **Scrolling Storyline:** Each page uses horizontal snap panels inside sections, with a luminous aurora gradient that responds to cursor speed.
- **Utility Strip:** Floating vertical utility bar (contact email, phone, quick quote) hugs the right side on desktop and collapses to a bottom sheet on mobile.

## Color Palette
| Role | Hex | Notes |
| --- | --- | --- |
| Midnight Canvas | `#050714` | Background for deep contrast |
| Aurora Green | `#3BF7A6` | Primary accents, CTA glow |
| Solar Amber | `#FFB649` | Secondary highlight for KPIs |
| Soft Mist | `#F2F7FF` | Typography on dark |
| Slate Cloud | `#94A3B8` | Supporting text |

Typography: **Neue Montreal** for headings, **Space Grotesk** for body copy.

## Hero & Imagery
- **Home:** Cinemagraph of turbine field at dusk with aurora overlay. Headline "The power of partnership" animates with parallax trails.
- **Services:** Macro imagery of solar cells with soft-focus blur; each service reveals clip-path video on hover.
- **Projects:** Split-screen before/after slider featuring actual project photography with overlay stats.
- **Team/About:** Portrait grid in monochrome that colorizes on hover, echoing the aurora gradient.

## Interaction Highlights
- Scroll-driven KPI counters that light up the aurora gradient path.
- Project cards rotate in 3D as user moves cursor, showing metrics on back face.
- Careers timeline uses draggable nodes to explore culture highlights.

## Page-by-Page Structure & Content Mapping
### Home (index.html text retained)
1. **Aurora Hero:** Eyebrow "Energy • EPC • O&M", headline "The power of partnership", lead copy, dual CTA preserved.
2. **Partnership Pillars:** Existing "One solid, reliable partner" section displayed as 3D stacked cards with core messaging.
3. **Services Spotlight:** Current EPC & O&M blurbs moved into interactive flip tiles with Lottie micro-animations.
4. **Call to Collaborate:** "Let’s build what’s next" card stays intact within glowing frame.

### Services
- Current service descriptions segmented into "Plan", "Build", "Sustain" stages; each block retains original paragraphs, enriched with iconography.

### Projects
- All project descriptions (from projects.html) appear in immersive carousel with filter chips for Solar, Storage, O&M.

### Why Axis
- Value propositions reorganized into a vertical timeline with sticky contextual stats; copy preserved.

### About
- Company story anchored by interactive milestone map using existing paragraphs and bullet points.

### News
- Articles displayed as wide mosaic cards; existing headlines & snippets preserved; infinite scroll loader inspired by editorial sites.

### Careers
- Current job descriptions surfaced in accordion panels with quick apply CTA; culture statements represented as gradient blobs containing the original copy.

### Contact
- Contact form remains but styled as glass card; existing address, phone, and email displayed in floating info chips linked to map.

## Accessibility & Performance
- High contrast between Soft Mist text and Midnight Canvas meets WCAG 2.1 AA.
- Prefetch hero cinemagraphs with `loading="lazy"` fallbacks for reduced motion preference.
- Provide "Disable Aurora Motion" toggle for motion-sensitive users.

## Preview
See [`preview.html`](preview.html) for a structural mockup featuring the gradient background, glass navigation, and card layering.
