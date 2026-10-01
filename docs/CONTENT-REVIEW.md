# Content review — for the Axis team session

Use this page-by-page walk-through in the brainstorm. Each section lists what the preview shows, where the copy came from, and the **decisions needed**. Preview: https://rossistance.github.io/Axis-Energy-Modern/

Source tags: **[live]** current axis-energyinc.com · **[brochure]** 2018 brochure · **[deck]** 2024 company overview · **[SPW]** Solar Power World · **[new]** new copy · **[draft]** proposed, needs your input.

## Global

- **Navigation** [owner, 2026-10-01]: Services (dropdown: four service pages; O&M offerings expand beneath O&M & Technical Services on hover) · Markets (dropdown: the four markets, with Investor-Owned beneath Electric Co-ops & Utilities; each link jumps to its section of the Markets page) · Projects · Why Axis · About us (dropdown: Leadership) · News · Careers · Contact, plus a **Work with Axis** button that opens on hover to **Subcontractor** and **Developer/Project Owner**, in that order [owner, 2026-10-01]; clicking the button itself opens a Work with Axis page with the same two options. "Request a Quote" no longer appears anywhere: the contact band and home page buttons read "Work with Axis", and the buttons on project, contact and O&M pages read "Start a project request" or "Request service". Footer: a Work with Axis column (Subcontractor, Developer/Project Owner, Careers, Contact), and a Services column with each service page, Markets and Projects. Between 1100 and 1279 px wide the menu items sit slightly closer together so all eight fit on one line beside the Work with Axis button; below 1100 px the menu button opens the full menu.
- **Page headers** (2026-09-30 review): every page and subpage uses the same compact header as Services, so content shows without scrolling. On desktop every header is the same height (290 px at 1280 px wide, from 309 px for Services before); on phones they run 240–300 px. Each header holds breadcrumbs, a title and one short lead. Longer copy, buttons and facts that used to sit in some headers moved into the page: the second half of the About and Careers intros, the long service-page intros (now under each service's heading), the News follow link (now beside the posts heading), the profile contact buttons (a Contact card beside the bio), and the project summary (the project facts stay in the header as chips). On Careers, Open positions now comes first.
- **Header photos [placeholder]:** the hero illustrations are gone. Every inner page except the project pages shows a project photo behind its header, labeled "Placeholder photo" in the preview, until Axis chooses the full-size hero photography. For now three 2026 abstract photos rotate across the pages. Project pages open on a plain title band instead (see Projects). The social sharing image is rebuilt from a project photo too. **Decision:** choose a hero photo per page (2400 px wide or more, landscape, room on the left for the title); the list of pages is in `src/data/heroes.ts`.
- **CTA band on every page** [live wording]: "Let's talk about your next successful renewable energy project." with email, address and hours.
- **No phone number** [owner, 2026-10-01]: the number the old website listed, 919.346.8333, is Josh Butler's cell, so it was removed from every page: the contact band, Contact (the Call card), the footer, the phone menu, Josh's profile, the Work with Axis pages, News, form error messages and the search-engine data. Email, address, hours and fax remain.
- **Tagline** in footer: "Renewable Solutions | Reliable Partners" [deck].
- **Recognition line:** "Solar Power World Top Solar Contractor 2021–2026" [SPW].
- Decisions: list a main office phone line (none is shown now)? · Keep the fax number? · Response-time promise "within one business day" [new] — OK?

## Home

Changed after the 2026-09-30 team review: the page is now the hero and the footprint map, then (since 2026-10-01) the employee-ownership section, followed by the contact band. The teaser sections (stats strip, partnership statement with the spotlight card, services overview, featured projects, Why Axis teaser, recognition and testimonial, latest news) were removed; their content still lives on Services, Projects, Why Axis, About and News.

1. Hero [owner's diagram, 2026-10-01]: in place of the earlier headline, lead and buttons, the left side reads top to bottom: **The Power of Partnership** [live] · **Solar | Battery Storage | Microgrids** (each links to its service page; Battery Storage and Microgrids both open Battery Storage & Microgrids) · **Performance built** · **for** · four small market cards: **Commercial & Industrial · Electric Co-ops & Utilities · Municipal & Institutional · Developers & IPPs**, each opening its section of the Markets page. Curved branches fan out from a single point under "for" to a chevron above each card; on narrow screens (phones, and desktop windows under about 1,100 px) the cards sit two by two: the curves feed the top pair and a short arrow joins each top card to the card below it [owner, 2026-10-01]. The branches draw in when the page opens (not for visitors who ask for reduced motion). Cards reduced and branches curved after the 2026-10-01 review. The project photo carousel advances on its own every six seconds, each photo slowly panning and zooming, and pauses only while the pointer is over it; the arrows, dots and a swipe change the photo without stopping it. There is no visible pause button [owner, 2026-10-01]: a Pause button appears only for keyboard users who tab to it, because accessibility rules require a way to stop moving content, and visitors who prefer reduced motion get no rotation and no pan or zoom. The three highlight bubbles (Projects, About, Why Axis) and the trust strip are unchanged. **Decision:** the boxes use the market names already on the Markets page so each matches the section it opens; the example read "Electrical Co-Ops", "Municipal & Institution" and "Developers & IPP". Say if you want that exact wording instead. Also confirm the 150 MW+ basis (see Why Axis stats).
2. Footprint map "Projects nationwide. O&M close to home." [owner, 2026-09-30]: headquarters pin in Holly Springs; North Carolina, South Carolina, Georgia and Virginia in green as the O&M and technical services footprint; every other state in the lower 48 in blue as the project footprint; Alaska and Hawaii in grey; a white push pin at every town with a completed project (no names, links or details; unpublished projects included as unlabelled pins). **Decisions:** confirm the two footprints and the wording; confirm unpublished projects may appear as unlabelled pins.
3. A company of owners [moved from Why Axis, owner 2026-10-01]: Josh Butler's employee-ownership quote [brochure] beside the "100% employee-owned through the 1910 Legacy Enterprises Employee Stock Ownership Plan" card [deck], under the map.

## Services

Restructured after the 2026-09-30 team review and adjusted the same evening. Clicking Services in the menu opens a single page of four cards, one per service page. The dropdown lists the four services in one column, O&M & Technical Services last, beneath Electrical Infrastructure & Commissioning; hovering it (or its arrow button, for keyboard and touch) expands its six offering pages beneath it.

- **Services page** (`/services/`): header [live] and four cards that each open a service page. The markets, how-we-work, safety and subcontractor sections that used to sit here were removed from this page: how we work and the experience groups moved to Solar EPC, safety remains on Why Axis, and the subcontractor link remains on Careers and in the footer.
- **Every service page** [owner, 2026-10-01]: the "In the field" related-projects section is gone. A **See projects** button closes the What we deliver section and opens the Projects page focused on that service (`/projects/<service>/`): the service's projects first, under a bar naming the service with links back to it and to all projects, then every other project grouped by type as on the Projects page. Which projects count for each service: Solar EPC, solar without storage; Battery Storage & Microgrids, projects with storage or a microgrid; Electrical Infrastructure & Commissioning, projects whose published scope includes interconnection, medium-voltage or commissioning work; O&M & Technical Services, projects with an O&M role. **Decision:** confirm these groupings (they are set in `src/lib/projects.ts`).
- **Solar EPC:** EPC intro and engineering / procurement / construction lists [live + brochure], superintendent callout [live], experience groups with brochure examples, how we work (6 steps) [new, edit freely].
- **Battery Storage & Microgrids:** storage, microgrid and distributed-energy lists from the SPW profile, deck and the 2026 project abstracts. **Confirm wording** and any manufacturer partnerships to name (Tesla, LG Chem appear today).
- **Electrical Infrastructure & Commissioning:** medium-voltage construction, testing and commissioning, storage and microgrid integration [live + abstracts], with the 1910 White Electrical heritage. **Confirm wording.**
- **O&M & Technical Services:** O&M intro and lists [live]; service area North Carolina, South Carolina, Georgia and Virginia [owner, 2026-09-30]; six offering pages.
- **O&M offerings, placeholder pages** (marked "Placeholder page" in the preview): Preventive Maintenance, Corrective Maintenance & 24/7 Response, Performance Monitoring & Optimization, Repowering & Rebuilds, Storm Damage Assessment & Repair, Decommissioning. Each shows a one-line summary and a short list drawn from the live site, the O&M memo and the project abstracts. **Decisions:** which offerings to keep or add, and the full copy, photos and examples for each.
- O&M "scope chips" (vegetation management, module washing, monitoring, inspections, corrective maintenance) come from an internal memo: **confirm these are offered today**.
- Experience groups on Solar EPC [brochure, relabeled by the owner 2026-10-01]: **Community and Distributed Generation** (was "Utility scale"; 1–15 MW · fixed tilt · tracking; example Floyd Road) · Commercial & industrial (example Charleston Rooftop Solar) · Specialty projects (landfills · community solar · energy storage; example Florence Solar Array), under the heading "Community, commercial and specialty solar" (was "Utility-scale, commercial and specialty solar"). Client names withheld. **Decisions:** do the 1–15 MW range and the Floyd Road example still fit the new label? Specialty projects also lists community solar; keep it there or drop it now that the first group covers community generation? "Utility-scale" still appears elsewhere: the Solar EPC summary (its card on Services and under More from Axis, and its search description), the description of the Floyd Road photo on Solar EPC, the "Utility-scale solar + storage sites" line on Battery Storage & Microgrids, the Utility-scale solar group and type labels on Projects, the company description in every page's footer, the Developers & IPPs summary on Markets and a project type on the project request form. Change those too? The six market segments from the deck left the site with About's "Where we work" section (2026-10-01); the Markets page carries the four markets.

## Projects

Changed after the 2026-09-30 review: the filters and the project list table are gone, and the map moved to the home page. On 2026-10-01 the markets moved to their own page (below), and each service page gained a focused view of this page (see Services).

- Header "Excellence in Execution" with the first sentence of the live intro [live].
- **Projects by type** (condensed 2026-10-01): published projects grouped under a heading per type, with each heading showing the group's project count, capacity and storage. Small groups share a row, so the eight projects fit on two rows on a desktop: Utility-scale solar (Cooperative Solar and Storage Portfolio, North Carolina Utility-Scale Portfolio, Floyd Road) beside Rooftop solar (Charleston), then Microgrids (Walnut Grove, Wendell) beside Commercial & industrial solar (Durham, Florence).
- **Project cards** (condensed 2026-10-01): a smaller photo, the title, the location and one line of key figures (size, storage, year); the summary moved to the project page. On phones each card is a compact row with the photo beside the text.
- **Project pages** (reorganized 2026-10-01): a compact title band (type, title, location and market link) without the project photo, then an overview that opens on the key figures (solar size, storage, completion, Axis role), the narrative, the details (type, mount, modules, storage system) and Axis's scope, with the photo and any second photo beside them at a moderate size. Challenge, approach, impact and owner benefits follow in compact rows, then four related projects (same market and type first) and previous/next links.
- Published now: North Carolina Utility-Scale Portfolio, Charleston Rooftop Solar, Durham Manufacturing Solar [live] and Floyd Road (6.75 MW, Gaston NC), Florence Solar Array (1.71 MW, Florence SC) [brochure]. **Client and partner names are withheld at the owner's request (2026-09-28):** the live-site case studies have new neutral titles and URLs, their narratives name no client or partner, and their Partners lists are removed. Their old website URLs are not redirected, so nothing ties the old client-named addresses to the new pages. The pre-2017 projects carry the note that they were delivered by the White Electrical renewable division. **Decision:** confirm Floyd Road and the Florence array may stay published and supply their completion years; their photos are brochure crops. Get written permission before restoring any client name.
- Published and featured first (added 2026-09-28 from the owner's updated project abstracts): Cooperative Solar and Storage Portfolio (5 NC sites, 11.7 MWdc, 22.6 MWh Tesla storage, EPC and continuous O&M), Walnut Grove Microgrid (2.751 MWdc bifacial, 5.014 MWh, islanded operation, 2023) and Wendell Campus Microgrid (1.519 MWdc solar carport, 3.916 MWh Tesla, 2024). **Client names are withheld at the owner's request** — keep them off these pages until permission is granted in writing. They lead the home page project grid and the Projects page; the Walnut Grove photo also illustrates the storage section on Services. **Decision:** completion year for the cooperative portfolio (the five 2020 NC Tesla-storage entries below appear to be its sites).
- Photography: every photo on the site shows a named Axis project: the three images from the old website, brochure crops of Floyd Road and the Florence array, and the three abstract photos (cropped to remove the client names printed on the abstract artwork). No stock or illustrative photos are used. **Decision:** supply the original high-resolution files, and photos for any project you publish from the hidden list.
- **Built in but hidden (32 projects from the Solar Power World submissions):** Old Plank Road, Priest, Gamble, Yadkinville, Stuttgart SD, Centerpoint SD, Camden Recycle Center / Detention Center / Highway 7 / Medical Center, Old Cedar, Ludie Brown, Hall, Spencer Meadow, Lowe Country (Tesla storage; these five appear to be the cooperative portfolio's sites, so keep them hidden), Boehringer Ingelheim carports, Central Arkansas Water, White County SD, Fountain Lake SD, Ozark Mountain RPWA, Hertford (13.97 MW), Bolivar, Hattiesburg Expansion, Clarksville I & II, Franklin, Amgen FlexBatch, North Little Rock Wastewater, Enersys, Greenville Utilities community solar, Williams Keenesburg (11.97 MW). **Decision per project:** may the client name appear? Which deserve a full case study with photos? Brownwood I & II (TX) appear on the deck map but have no data.
- The states map moved to the home page as the footprint map (2026-09-30).
- Durham Manufacturing Solar: the live page's "2000 kilowatt-hours per year" looks like a typo (likely MWh). **Confirm the figure**; the preview says "enough to power approximately 100 average-sized homes".

## Markets

Its own page since 2026-10-01 [owner] (`/markets/`, header "Markets we serve"); it was the lower half of the Projects page. The Markets menu and the home page diagram open each section directly, and old links to a market on the Projects page forward here.

- **Sections:** Commercial & Industrial Owners · Electric Co-ops & Utilities, with **Investor-Owned** as a subsection · Municipal & Institutional · Developers & IPPs [owner, 2026-09-30]. Each shows a one-line description [draft, from the deck's market segments and the project pages] and its published projects; a market with none yet offers references on request.
- **Market assignments [draft, from each project's owner type]:** C&I Owners: Wendell Campus Microgrid (manufacturing campus), Durham Manufacturing Solar (manufacturing plant), Florence Solar Array (built for the facility's company, per the brochure). Co-ops & Utilities: Cooperative Solar and Storage Portfolio (cooperative territories), Walnut Grove Microgrid (utility owner, type not recorded). Investor-Owned: Charleston Rooftop Solar (the original case study names an investor-owned utility as a partner). Developers & IPPs: North Carolina Utility-Scale Portfolio (built for a project developer). Municipal & Institutional: none published yet; the eleven Arkansas school, water and county projects in the hidden list belong here once published. Floyd Road has no recorded owner type and is not in a market. **Decisions:** confirm each assignment; is Walnut Grove's owner a co-op, a municipal utility or investor-owned? Which owner type is Floyd Road's? Approve the four market descriptions.
- "Request case studies" closes the page (opens the project request form with the case-studies topic).

## Why Axis

Reworked on 2026-10-01 [owner]. The page is now:

- **Total project peace of mind [placeholder]:** six numbered, blank cards. Axis is writing a new title and description for each; they go in `src/data/pillars.ts` (`title`, `body` and an optional icon), one entry per card. The preview shows the blank cards; a production build leaves out any card without copy, and the whole section if none has any, and warns in the build log. The six previous cards [live] were Total Solution · Strong Financial Position · Superior Quality · Bench Strength · Skin in the Game · Outstanding Safety; their full wording is in the git history (`src/data/pillars.ts` before 2026-10-01). **Decision:** the six new titles and descriptions.
- **By the numbers:** the five stat cards with their count-up (150 MW+ · 30 MWh · 28 projects · 9 states · 5 O&M sites) [deck] and the line "Recognized nationally by Solar Power World as a Top Solar Contractor every year we have submitted since 2021." [SPW]. The year-by-year rankings list was removed. **Decision:** the 150 MW+ basis (see `docs/FACTS.md`).
- **Outstanding safety:** the safety statement and superintendent line [live], then a **safety partners graphic** in place of the TJ Murphy testimonial: the Avetta, Veriforce and ISNetworld logos over an Axis project photo (the Walnut Grove microgrid site) blended into the brand navy, headed "Our safety program is graded by the industry's contractor platforms", with the line "Owners use Avetta, Veriforce and ISNetworld to verify a contractor's safety record, insurance and training before work begins." [new]. Each logo is that company's own version for dark backgrounds, taken from its website on 2026-10-01 and shown at full strength; only the photo is toned down. **Decisions:** confirm Axis's current standing with all three platforms and the "graded by" wording; check each platform's logo usage terms (ask the account contacts).
- Removed: the O&M excellence section and the testimonial. The employee-ownership section moved to the home page.

## About

Trimmed on 2026-10-01 [owner]: the mission and vision (with the four values), "Our culture", "Where we work" (photos and market segments) and the leadership teaser are gone. The page is now:

- Header: the first sentence of the live intro [live]. (Its second sentence, "Partnership is the very reason we are here in this business…", introduced the culture section and left with it.)
- History [live] + timeline (1910 → renewable division → 2017 Axis → 2021 first ranking → 2024 → 2026) [deck/SPW].
- Family of companies (1910 Legacy Enterprises, White Electrical).
- Decisions: confirm timeline milestones; add a company photo or team photo? The values still appear as a strip on Careers; keep them there?

## Leadership and profile

- Leadership is its own page under About (`/about/leadership/`, the only item in the About dropdown) [owner, 2026-10-01]; the old `/leadership/` address redirects there.
- One profile, Josh Butler, President [live bio verbatim]. Contact buttons: email and LinkedIn (the phone button left with his cell number, 2026-10-01).
- **Decision:** expand the page? The December 2024 org chart in the deck lists a General Manager, Preconstruction Manager, Director of Projects, Quality Manager, Construction Manager, O&M Technician and two Project Managers. Adding people needs their consent, current titles and headshots. Also: a new headshot for Josh (the current one is 500 px from 2017).

## News

Rebuilt on 2026-10-01 [owner]: the Top Solar Contractor rankings column and the two 2018 articles are gone (their old addresses lead to News), and so is the RSS feed.

- **LinkedIn feed [draft]:** News shows the latest posts from the Axis Energy LinkedIn page: each card has the post's photo, its headline or opening lines and the date, and opens the post on LinkedIn. Only posts Axis publishes itself appear; posts that tag Axis and reposts are left out. Until the feed is connected the preview shows three cards marked "Sample" and a note; a production build shows a "Follow Axis on LinkedIn" panel instead.
- **To connect it** (docs/HANDOFF.md, "LinkedIn news feed"): a page admin creates a LinkedIn developer app for the Axis Energy page, requests the Community Management API, and authorizes it; the token goes into the repository secrets. Tokens last 60 days unless LinkedIn also issues a refresh token.
- **Decisions:** who at Axis is a page admin and can set up the LinkedIn app? Include reposts (off by default)? How many posts to show (9)?
- The home page bubble "Top Solar Contractor 2021–2026" now opens Why Axis [owner, 2026-10-01].

## Careers

- Intro [live verbatim], split: the first sentence in the header, the second introducing Open positions, which now comes first on the page. "Important things to note", EEO and recruiter policy [live verbatim]. Why-Axis cards (ownership, safety, growth) [new]. Values row [deck].
- **Jobs feed [draft]:** shows three _sample_ roles in the preview. LinkedIn and Indeed have no public feed; real listings come from your ATS (Greenhouse, Lever, Workable, BambooHR or any JSON feed). **Decisions:** which system does 1910 Legacy Talent Acquisition use? What are the LinkedIn jobs and Indeed company page URLs? Should the résumé email stay careers@axis-energyinc.com?

## Work with Axis: Subcontractor [draft]

The prequalification form (`/work-with-axis/subcontractor/`; the old `/subcontractors/` address redirects).

Six steps + review: Company · Primary contact · Capabilities (trades, states, crew size, self-perform %, union status, MW completed) · Licensing & insurance (licences, GL, umbrella, auto, workers' comp, bonding) · Safety (EMR 3 yrs, TRIR, DART, fatalities, written program, drug testing, OSHA 10/30 %, NFPA 70E) · Experience & references + certification checkbox.

Documents are **requested by secure email after review** (COI, W-9, safety program, EMR letter, OSHA 300A logs, licences, references) rather than uploaded through the form.

**Decisions:** does this match the vetting process the team runs today? Minimum thresholds (EMR ≤ 1.0?) to state up front? Should documents be uploaded in-form (needs a paid form plan)? Who owns the intake?

## Work with Axis: Developer/Project Owner [draft]

The project request form, formerly Request a Quote (`/work-with-axis/developer-project-owner/`; the old address redirects).

Three steps + review:

1. About you — name*, company*, role, email*, phone, organization type*.
2. Your project — project type* (10 options), city*, state*, system size, storage size, site status, services needed*.
3. Timeline & details — target start, budget range (optional), documents you can share, description*, how you heard about Axis.

**Decisions:** fields to add/remove (e.g., utility territory, interconnection queue position, NDA needed); who receives submissions; which form service to use; response-time promise.

## Contact

- Cards (visit, email, hours) [live]; the Call card left with the phone number (2026-10-01); the form mirrors the live fields (Name*, Email*, Phone, Subject*, Message*). Google Maps link instead of an embed.
- Decision: add an embedded map?

## Not yet on the site (ideas parked for the meeting)

- Client/owner logo strip ("Trusted by") — needs permission per client.
- Safety statistics (EMR, TRIR) — publish only if you are comfortable.
- Downloadable capabilities statement PDF.
- Newsletter sign-up.
