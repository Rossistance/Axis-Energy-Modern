# Content review — for the Axis team session

Use this page-by-page walk-through in the brainstorm. Each section lists what the preview shows, where the copy came from, and the **decisions needed**. Preview: https://rossistance.github.io/Axis-Energy-Modern/

Source tags: **[live]** current axis-energyinc.com · **[brochure]** 2018 brochure · **[deck]** 2024 company overview · **[SPW]** Solar Power World · **[new]** new copy · **[draft]** proposed, needs your input.

## Global

- **Navigation:** Services (dropdown: four service pages; O&M offerings expand beneath O&M & Technical Services on hover) · Projects (dropdown: Markets, which expands to the four markets and jumps to them on the Projects page) · Why Axis · About (About, Leadership) · News · Careers · Contact, plus a **Request a Quote** button. Footer adds Subcontractors and links each service page.
- **Page headers** (2026-09-30 review): every page and subpage uses the same compact header as Services, so content shows without scrolling. On desktop every header is the same height (290 px at 1280 px wide, from 309 px for Services before); on phones they run 240–300 px, a little more for a long news title. Each header holds breadcrumbs, a title and one short lead. Longer copy, buttons and facts that used to sit in some headers moved into the page: the second half of the About and Careers intros, the long service-page intros (now under each service's heading), the News follow links (sidebar), the profile contact buttons (a Contact card beside the bio), and the project summary (the project facts stay in the header as chips). On Careers, Open positions now comes first.
- **Header photos [placeholder]:** the hero illustrations are gone. Every inner page shows a project photo behind its header, labeled "Placeholder photo" in the preview, until Axis chooses the full-size hero photography. For now three 2026 abstract photos rotate across the pages; a project page uses its own photo. The social sharing image is rebuilt from a project photo too. **Decision:** choose a hero photo per page (2400 px wide or more, landscape, room on the left for the title); the list of pages is in `src/data/heroes.ts`.
- **CTA band on every page** [live wording]: "Let's talk about your next successful renewable energy project." with phone (Josh Butler), email, address, hours.
- **Tagline** in footer: "Renewable Solutions | Reliable Partners" [deck].
- **Recognition line:** "Solar Power World Top Solar Contractor 2021–2026" [SPW].
- Decisions: keep Josh Butler as the named phone contact? · Keep the fax number? · Response-time promise "within one business day" [new] — OK?

## Home

Changed after the 2026-09-30 team review: the page is now the hero and the footprint map, followed by the contact band. The teaser sections (stats strip, partnership statement with the spotlight card, services overview, featured projects, Why Axis teaser, recognition and testimonial, latest news) were removed; their content still lives on Services, Projects, Why Axis, About and News.

1. Hero: "The Power of Partnership" [live] / "Solar, battery storage and microgrids built for performance." [owner, 2026-09-30]; buttons Request a quote · See our work; a carousel of real project photos, each captioned with the project name and linking to its page; three highlight bubbles that link to Projects (150 MW+ solar constructed), About (100% employee-owned) and News (Top Solar Contractor 2021–2026); trust strip (employee-owned, 1910 Legacy, Top Solar Contractor, Holly Springs), hidden on phones because the bubbles carry the same facts. The carousel shows the photos sharp enough for its size, today the three 2026 abstract photos; the others join automatically when their originals are supplied. **Decision:** the 150 MW+ basis (see Why Axis stats).
2. Footprint map "Projects nationwide. O&M close to home." [owner, 2026-09-30]: headquarters pin in Holly Springs; North Carolina, South Carolina, Georgia and Virginia in green as the O&M and technical services footprint; every other state in the lower 48 in blue as the project footprint; Alaska and Hawaii in grey; a white push pin at every town with a completed project (no names, links or details; unpublished projects included as unlabelled pins). **Decisions:** confirm the two footprints and the wording; confirm unpublished projects may appear as unlabelled pins.

## Services

Restructured after the 2026-09-30 team review and adjusted the same evening. Clicking Services in the menu opens a single page of four cards, one per service page. The dropdown lists the four services in one column, O&M & Technical Services last, beneath Electrical Infrastructure & Commissioning; hovering it (or its arrow button, for keyboard and touch) expands its six offering pages beneath it.

- **Services page** (`/services/`): header [live] and four cards that each open a service page. The markets, how-we-work, safety and subcontractor sections that used to sit here were removed from this page: markets remain on About, how we work and the experience groups moved to Solar EPC, safety remains on Why Axis, and the subcontractor link remains on Careers and in the footer.
- **Solar EPC:** EPC intro and engineering / procurement / construction lists [live + brochure], superintendent callout [live], experience groups with brochure examples, how we work (6 steps) [new, edit freely], related projects.
- **Battery Storage & Microgrids:** storage, microgrid and distributed-energy lists from the SPW profile, deck and the 2026 project abstracts; related projects are the three storage and microgrid projects. **Confirm wording** and any manufacturer partnerships to name (Tesla, LG Chem appear today).
- **Electrical Infrastructure & Commissioning:** medium-voltage construction, testing and commissioning, storage and microgrid integration [live + abstracts], with the 1910 White Electrical heritage. **Confirm wording.**
- **O&M & Technical Services:** O&M intro and lists [live]; service area North Carolina, South Carolina, Georgia and Virginia [owner, 2026-09-30]; six offering pages.
- **O&M offerings, placeholder pages** (marked "Placeholder page" in the preview): Preventive Maintenance, Corrective Maintenance & 24/7 Response, Performance Monitoring & Optimization, Repowering & Rebuilds, Storm Damage Assessment & Repair, Decommissioning. Each shows a one-line summary and a short list drawn from the live site, the O&M memo and the project abstracts. **Decisions:** which offerings to keep or add, and the full copy, photos and examples for each.
- O&M "scope chips" (vegetation management, module washing, monitoring, inspections, corrective maintenance) come from an internal memo: **confirm these are offered today**.
- Markets: six segments [deck] + three experience groups with brochure examples (Floyd Road, Charleston Rooftop Solar, Florence Solar Array; client names withheld). **Confirm** these examples may be shown.

## Projects

Changed after the 2026-09-30 review: the filters and the project list table are gone, and the map moved to the home page.

- Header "Excellence in Execution" with the first sentence of the live intro [live].
- **Projects by type:** published projects grouped under a heading per type, in project order: Utility-scale solar (Cooperative Solar and Storage Portfolio, North Carolina Utility-Scale Portfolio, Floyd Road), Microgrids (Walnut Grove, Wendell), Commercial & industrial solar (Durham, Florence) and Rooftop solar (Charleston). Each heading shows the group's project count, capacity and storage.
- **Markets** (Projects → Markets in the menu jumps here; each market also has its own link): Commercial & Industrial Owners · Electric Co-ops & Utilities, with **Investor-Owned** as a subsection · Municipal & Institutional · Developers & IPPs [owner, 2026-09-30]. Each shows a one-line description [draft, from the deck's market segments and the project pages] and its published projects; a market with none yet offers references on request.
- **Market assignments [draft, from each project's owner type]:** C&I Owners: Wendell Campus Microgrid (manufacturing campus), Durham Manufacturing Solar (manufacturing plant), Florence Solar Array (built for the facility's company, per the brochure). Co-ops & Utilities: Cooperative Solar and Storage Portfolio (cooperative territories), Walnut Grove Microgrid (utility owner, type not recorded). Investor-Owned: Charleston Rooftop Solar (the original case study names an investor-owned utility as a partner). Developers & IPPs: North Carolina Utility-Scale Portfolio (built for a project developer). Municipal & Institutional: none published yet; the eleven Arkansas school, water and county projects in the hidden list belong here once published. Floyd Road has no recorded owner type and is not in a market. **Decisions:** confirm each assignment; is Walnut Grove's owner a co-op, a municipal utility or investor-owned? Which owner type is Floyd Road's? Approve the four market descriptions.
- "Request case studies" sits beside the Markets heading (opens the quote form with the case-studies topic).
- Published now: North Carolina Utility-Scale Portfolio, Charleston Rooftop Solar, Durham Manufacturing Solar [live] and Floyd Road (6.75 MW, Gaston NC), Florence Solar Array (1.71 MW, Florence SC) [brochure]. **Client and partner names are withheld at the owner's request (2026-09-28):** the live-site case studies have new neutral titles and URLs, their narratives name no client or partner, and their Partners lists are removed. Their old website URLs are not redirected, so nothing ties the old client-named addresses to the new pages. The pre-2017 projects carry the note that they were delivered by the White Electrical renewable division. **Decision:** confirm Floyd Road and the Florence array may stay published and supply their completion years; their photos are brochure crops. Get written permission before restoring any client name.
- Published and featured first (added 2026-09-28 from the owner's updated project abstracts): Cooperative Solar and Storage Portfolio (5 NC sites, 11.7 MWdc, 22.6 MWh Tesla storage, EPC and continuous O&M), Walnut Grove Microgrid (2.751 MWdc bifacial, 5.014 MWh, islanded operation, 2023) and Wendell Campus Microgrid (1.519 MWdc solar carport, 3.916 MWh Tesla, 2024). **Client names are withheld at the owner's request** — keep them off these pages until permission is granted in writing. They lead the home page project grid and the Projects page; the Walnut Grove photo also illustrates the storage section on Services. **Decision:** completion year for the cooperative portfolio (the five 2020 NC Tesla-storage entries below appear to be its sites).
- Photography: every photo on the site shows a named Axis project: the three images from the old website, brochure crops of Floyd Road and the Florence array, and the three abstract photos (cropped to remove the client names printed on the abstract artwork). No stock or illustrative photos are used. **Decision:** supply the original high-resolution files, and photos for any project you publish from the hidden list.
- **Built in but hidden (32 projects from the Solar Power World submissions):** Old Plank Road, Priest, Gamble, Yadkinville, Stuttgart SD, Centerpoint SD, Camden Recycle Center / Detention Center / Highway 7 / Medical Center, Old Cedar, Ludie Brown, Hall, Spencer Meadow, Lowe Country (Tesla storage; these five appear to be the cooperative portfolio's sites, so keep them hidden), Boehringer Ingelheim carports, Central Arkansas Water, White County SD, Fountain Lake SD, Ozark Mountain RPWA, Hertford (13.97 MW), Bolivar, Hattiesburg Expansion, Clarksville I & II, Franklin, Amgen FlexBatch, North Little Rock Wastewater, Enersys, Greenville Utilities community solar, Williams Keenesburg (11.97 MW). **Decision per project:** may the client name appear? Which deserve a full case study with photos? Brownwood I & II (TX) appear on the deck map but have no data.
- The states map moved to the home page as the footprint map (2026-09-30).
- Durham Manufacturing Solar: the live page's "2000 kilowatt-hours per year" looks like a typo (likely MWh). **Confirm the figure**; the preview says "enough to power approximately 100 average-sized homes".

## Why Axis

- Six pillars [live, verbatim]; Josh Butler ownership quote [brochure]; stats + Solar Power World rankings table; O&M excellence block [live]; safety statement [live]; testimonial.
- Decisions: any pillar wording to refresh (e.g., "throughout the Southeast" now understates the footprint)?

## About

- Header: the first sentence of the live intro [live]; its second sentence now introduces the culture section. History [live] + timeline (1910 → renewable division → 2017 Axis → 2021 first ranking → 2024 → 2026) [deck/SPW]. Values [deck]. Culture: partnership with customers / employees / vendors [live]. Markets, photos, leadership teaser, family of companies (1910 Legacy, White Electrical).
- Decisions: confirm timeline milestones; add a company photo or team photo?

## Leadership and profile

- One profile, Josh Butler, President [live bio verbatim]. Contact buttons (email, LinkedIn, phone).
- **Decision:** expand the page? The December 2024 org chart in the deck lists a General Manager, Preconstruction Manager, Director of Projects, Quality Manager, Construction Manager, O&M Technician and two Project Managers. Adding people needs their consent, current titles and headshots. Also: a new headshot for Josh (the current one is 500 px from 2017).

## News

- Both 2018 articles republished in full with their source links [live]. The author's personal email paragraph at the end of the policy-panel article was dropped. RSS feed added.
- Decisions: keep 2018 articles? New posts (project announcements, Top Solar Contractor news, safety milestones)?

## Careers

- Intro [live verbatim], split: the first sentence in the header, the second introducing Open positions, which now comes first on the page. "Important things to note", EEO and recruiter policy [live verbatim]. Why-Axis cards (ownership, safety, growth) [new]. Values row [deck].
- **Jobs feed [draft]:** shows three _sample_ roles in the preview. LinkedIn and Indeed have no public feed; real listings come from your ATS (Greenhouse, Lever, Workable, BambooHR or any JSON feed). **Decisions:** which system does 1910 Legacy Talent Acquisition use? What are the LinkedIn jobs and Indeed company page URLs? Should the résumé email stay careers@axis-energyinc.com?

## Request a Quote [draft]

Three steps + review:

1. About you — name*, company*, role, email*, phone, organization type*.
2. Your project — project type* (10 options), city*, state*, system size, storage size, site status, services needed*.
3. Timeline & details — target start, budget range (optional), documents you can share, description*, how you heard about Axis.

**Decisions:** fields to add/remove (e.g., utility territory, interconnection queue position, NDA needed); who receives submissions; which form service to use; response-time promise.

## Subcontractor prequalification [draft]

Six steps + review: Company · Primary contact · Capabilities (trades, states, crew size, self-perform %, union status, MW completed) · Licensing & insurance (licences, GL, umbrella, auto, workers' comp, bonding) · Safety (EMR 3 yrs, TRIR, DART, fatalities, written program, drug testing, OSHA 10/30 %, NFPA 70E) · Experience & references + certification checkbox.

Documents are **requested by secure email after review** (COI, W-9, safety program, EMR letter, OSHA 300A logs, licences, references) rather than uploaded through the form.

**Decisions:** does this match the vetting process the team runs today? Minimum thresholds (EMR ≤ 1.0?) to state up front? Should documents be uploaded in-form (needs a paid form plan)? Who owns the intake?

## Contact

- Cards (visit, call, email, hours) [live]; the form mirrors the live fields (Name*, Email*, Phone, Subject*, Message*). Google Maps link instead of an embed.
- Decision: add an embedded map?

## Not yet on the site (ideas parked for the meeting)

- Client/owner logo strip ("Trusted by") — needs permission per client.
- Safety statistics (EMR, TRIR) — publish only if you are comfortable.
- Downloadable capabilities statement PDF.
- Newsletter sign-up.
