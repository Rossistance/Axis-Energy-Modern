# Design Concept: Solar Atlas

## Inspiration & Research
- Inspired by editorial storytelling from [The New York Times Climate Forward](https://www.nytimes.com/section/climate) and immersive scrollytelling experiences such as [Apple Clean Energy](https://www.apple.com/environment/).
- Interaction patterns borrow from [Airbnb 2024 redesign](https://www.airbnb.com/) for intuitive filter trays and map-based discovery.

## Page Inventory (8 pages)
Home, Services, Projects, Why Axis, About, News, Careers, Contact — all original copy is surfaced in new modules detailed below.

## Global Experience
- **Split Navigation:** Left rail houses primary nav with contextual icons; right rail displays live project metrics.
- **Atlas Map Canvas:** Sticky background renders animated topographic lines with geolocated project markers, updating as user scrolls.
- **Narrative Breadcrumbs:** Each page features breadcrumb chips summarizing location within the story (e.g., "Plan → Engineering").

## Color Palette
| Role | Hex | Notes |
| --- | --- | --- |
| Chalk White | `#FDFCF7` | Primary background |
| Deep Charcoal | `#1F2933` | Primary text |
| Terracotta | `#C86B4A` | Accent for CTAs |
| Verdant | `#5B8C5A` | Secondary accent |
| Skyline | `#8CAEC3` | Map overlays & dividers |

Typography: **P22 Mackinac** for serif headlines, **Inter** for body copy.

## Hero & Imagery
- **Home Hero:** Full-bleed aerial photo of solar farm with subtle grain overlay; hero text sits in card with drop shadow reminiscent of travel journal.
- **Services:** Watercolor icons illustrating EPC/O&M phases.
- **Projects:** Interactive globe (three.js) with project hotspots; fallback static map.
- **Culture:** Documentary-style photography tinted with Verdant.

## Interaction Highlights
- Scroll-driven atlas map that pins each project when relevant copy enters viewport.
- Services timeline uses horizontal swipe with sticky captions referencing the existing textual content.
- Careers page features interactive "Day in the life" slider replicating job description copy in digestible cards.

## Page-by-Page Structure & Content Mapping
### Home
1. **Hero Card:** Reuses "The power of partnership" copy within a floating info card pinned to the atlas background. CTA buttons maintain original text.
2. **Partnership Narrative:** Current "One solid, reliable partner" paragraph becomes annotated pull-quotes aligned to the map.
3. **Service Overview:** EPC/O&M blurbs styled as travel-stamp cards that flip to reveal bullet points derived from existing copy.
4. **Engagement CTA:** "Let’s build what’s next" copy placed within Terracotta CTA banner anchored above the fold.

### Services
- Original service descriptions reorganized into "Discover", "Deliver", "Sustain" tabs; each tab surfaces the existing paragraphs with infographics.

### Projects
- Projects page copy mapped onto interactive cards anchored to coordinates; includes filter chips for project type while preserving original descriptions.

### Why Axis
- Value prop statements appear as vertical story cards overlaying the map, each card locking to the viewport while the background map rotates.

### About
- Company history timeline uses scroll-triggered line drawing with existing copy in callout boxes.

### News
- Article list arranged as magazine spread; existing headlines/snippets preserved with large imagery and pinned reading time.

### Careers
- Job descriptions remain unchanged but are displayed in multi-column masonry with pinned summary column.

### Contact
- Contact info forms part of a perforated "tear-off" style card for quick reference; original address/phone/email retained; map anchored behind.

## Accessibility & Performance
- Light background with 4.5:1 contrast for text; large 18px base type.
- All atlas animations degrade gracefully to static imagery when `prefers-reduced-motion` is detected.
- Navigation icons labeled with accessible names.

## Preview
See [`preview.html`](preview.html) for an illustrative wireframe featuring the atlas background and journaling cards.
