/**
 * "Total Project Peace of Mind" cards on Why Axis, numbered 01–06 on the page. Copy supplied
 * by Axis on 2026-10-28; the team may revise it after reviewing the page. A card without a
 * `title` and `body` shows as a placeholder in preview builds and is left out of production
 * builds. An optional lucide `icon` replaces the card's number. The six cards from the old
 * website are listed in docs/CONTENT-REVIEW.md. Since 2026-11-20 each body works the owner's
 * pain, our purpose and the proof into one passage, with no "Proof:" line (owner, 2026-11-20;
 * the owner's 2026-10-28 wording is in git history and in the before-and-after sheet for Josh).
 */
export interface Pillar {
  title?: string;
  body?: string;
  icon?: string;
}

export const pillars: Pillar[] = [
  {
    title: 'One call. One accountable team.',
    body: 'When solar, storage, microgrid and electrical work are split among separate contractors, the owner ends up managing the gaps between them. Axis brings all of it together through coordinated engineering, procurement, construction and commissioning, with a single point of contact for the whole project, and our O&M and technical services keep the system running after turnover. That is how the five-site NCEMC solar and storage portfolio was built, and Axis O&M maintains it today.',
  },
  {
    title: 'A contractor that will be there at turnover.',
    body: 'A schedule is only as strong as the company behind it, and owners usually learn that when a contractor runs short partway through. Axis is part of 1910 Legacy Enterprises, building across the Southeast since 1910, and that backing supports our procurement, our bonding and the resources each project needs. The same electrical contracting heritage shapes how we handle power systems, interconnection and commissioning: as the work that decides whether a plant energizes on time.',
  },
  {
    title: 'Quality you can verify at handover.',
    body: 'Defects that slip through construction surface later as lost production and warranty disputes. On every Axis site an experienced superintendent works with the project manager to coordinate trade partners and oversee quality, from the first installation review through testing, commissioning and turnover. Nothing is handed over until it has been tested and commissioned, so you receive a complete, dependable energy system.',
  },
  {
    title: 'The right crew for your site and scale.',
    body: 'A crew sized for someone else’s project is a risk on yours: too thin for a multi-site portfolio, too heavy for a working campus. Axis pairs its own project leadership and technical team with established engineering, equipment and construction partners, and matches the effort to each project’s scope, location and complexity. Our work runs from a 1.5 MWdc campus microgrid to a 36.5 MWdc portfolio of seven sites built at the same time.',
  },
  {
    title: 'Owners on your project, not just employees.',
    body: 'On many job sites, the people doing the work have no stake in how it turns out. Axis is 100% employee-owned through the 1910 Legacy Employee Ownership Plan, so everyone on your project shares in the company’s work and in the long-term relationship that follows. Ownership ties individual responsibility to shared success, and it shows in the care we take with our customers, our colleagues and the assets we build and maintain.',
  },
  {
    title: 'Everyone home safe, and your operations keep running.',
    body: 'An incident on your site does more than stop the work: it puts people at risk and can shut down the operations around them. Axis treats safety as a responsibility from planning through completion, with careful work planning, qualified subcontractors, field oversight and close coordination around your existing operations and electrical systems. Our safety program is graded on Avetta, Veriforce and ISNetworld, and on every site our priority is the same: protect people, and do the work with discipline and care.',
  },
];

/** Closing block under the cards, with buttons to Work with Axis and Projects (2026-10-28). */
export const pillarsClose = {
  title: 'Let’s Put Our Experience to Work on Your Project.',
  body: 'Whether you are planning a new installation, integrating battery storage, or addressing an existing asset’s performance, talk with Axis about the next step.',
};

export const hasCopy = (p: Pillar): p is Pillar & { title: string; body: string } =>
  Boolean(p.title?.trim() && p.body?.trim());

/** Values — verbatim from the 2024 company overview deck. */
export const values = [
  { title: 'Professionalism', body: 'We plan and execute with pride. We set a high standard.' },
  {
    title: 'Ingenuity',
    body: 'We continually invent a way forward. We understand needs and find solutions.',
  },
  {
    title: 'Autonomy',
    body: 'We value flexibility and the freedom to make decisions. We expect confident action.',
  },
  {
    title: 'Respect',
    body: 'We value the ideas of our partners and peers. We invest in relationships and collaborate.',
  },
];

/** Josh Butler on employee ownership (2018 brochure), shown on the home page. */
export const ownershipQuote = {
  quote:
    "Axis Energy is an employee-owned company. When you work with us, you're literally working with a company of owners, where each member of our team has real ownership in the relationship and accountability to the quality and performance of your system.",
  name: 'Josh Butler',
  title: 'President, Axis Energy',
  source: '2018 Axis Energy brochure (then General Manager)',
};
