# Design Concept: Horizon Flux

## Inspiration & Research
- References high-energy motion systems from [Tesla Cybertruck](https://www.tesla.com/cybertruck) and [Nike Cirrus](https://www.nike.com) campaign pages for angular layouts and kinetic typography.
- Interaction cues drawn from [Pitch 2024 website](https://pitch.com/) for modular storytelling and inline video loops.

## Page Inventory (8 pages)
Home, Services, Projects, Why Axis, About, News, Careers, Contact — existing textual content integrated into the modules outlined below.

## Global Experience
- **Diagonal Grid:** Layout built on 12° skew; cards snap along angled tracks creating futuristic energy.
- **Command Bar Navigation:** Top-edge command bar with typeahead; pressing `/` opens overlay search across all eight pages.
- **Context Pods:** On scroll, pods emerge summarizing KPIs and reusing existing bullet copy.

## Color Palette
| Role | Hex | Notes |
| --- | --- | --- |
| Horizon Navy | `#0A1328` | Primary background |
| Pulse Cyan | `#18E6FF` | Accent glow |
| Ember Coral | `#FF5C5C` | Secondary accent |
| Alloy Silver | `#D1D6E0` | Typographic contrast |
| Carbon Slate | `#52607A` | Supporting text |

Typography: **Monument Extended** for headlines, **Manrope** for supporting copy.

## Hero & Imagery
- **Home Hero:** Angular split layout with looping drone footage angled within masked trapezoid; copy "The power of partnership" is animated with kinetic letters sliding in along the diagonal.
- **Services:** Each service has motion-driven vector patterns (Particle.js) illustrating flow of energy.
- **Projects:** Video thumbnails clipped into hexagonal prisms; clicking expands to immersive case study with metric overlays.
- **Team/About:** Cinematic portraits with RGB shift on hover.

## Interaction Highlights
- Cursor reveals dynamic grid lines; as users drag, modules tilt along Z-axis.
- CTA buttons emit ripple effect that follows 12° axis.
- News timeline auto-scrolls with sticky categories anchored left.

## Page-by-Page Structure & Content Mapping
### Home
1. **Flux Hero:** Retains eyebrow, headline, lead, and CTAs from current hero; arranged diagonally with Pulse Cyan gradient.
2. **Reliability Module:** Existing "One solid, reliable partner" copy set in angled slab with animated check icons.
3. **Services Rail:** EPC & O&M blurbs housed in sliding rail; each tile expands on hover to display original sentences.
4. **Collaboration CTA:** "Let’s build what’s next" copy inside neon-outlined trapezoid anchored to viewport corner.

### Services
- Current paragraphs reorganized into "Blueprint", "Build", "Operate" diagonal panels with supporting schematics.

### Projects
- Original project descriptions appear in scroll-jacked case studies with sticky metric column; includes video loops.

### Why Axis
- Value pillars present as vertical kinetic typography; each scroll step reveals the existing text while background pulses.

### About
- Timeline uses diagonal connectors; each milestone features the original about copy inside animated cards.

### News
- Articles laid out in diagonal masonry grid with accent color-coded categories; copy unchanged.

### Careers
- Job listings inside neon-outlined accordions; culture statements use marquee text along diagonals.

### Contact
- Form sits within angled glass card; existing contact details run along animated ticker at bottom.

## Accessibility & Performance
- Ensure text on dark backgrounds meets contrast by using Alloy Silver for body copy.
- Provide toggle to reduce motion—disables tilt animations and uses static gradients.
- Optimize video loops via H.265 and provide static poster images.

## Preview
See [`preview.html`](preview.html) showcasing the diagonal grid, command bar, and CTA styling.
