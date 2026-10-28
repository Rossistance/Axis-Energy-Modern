/**
 * "Total Project Peace of Mind" cards on Why Axis, numbered 01–06 on the page. Copy supplied
 * by Axis on 2026-10-28; the team may revise it after reviewing the page. A card without a
 * `title` and `body` shows as a placeholder in preview builds and is left out of production
 * builds. An optional lucide `icon` replaces the card's number. The six cards from the old
 * website are listed in docs/CONTENT-REVIEW.md.
 */
export interface Pillar {
  title?: string;
  body?: string;
  icon?: string;
}

export const pillars: Pillar[] = [
  {
    title: 'One Partner. Coordinated Delivery.',
    body: 'Axis brings solar, battery storage, microgrids, and electrical infrastructure together through coordinated engineering, procurement, construction, and commissioning. Customers have a single point of contact to manage project interfaces, with O&M and technical services available to support continued operation.',
  },
  {
    title: 'Established Backing. Electrical Roots.',
    body: 'As part of 1910 Legacy Enterprises, Axis combines renewable energy expertise with an established electrical contracting heritage. That foundation informs our approach to power systems, interconnection, and commissioning, while organizational backing supports procurement, bonding, and the resources needed to execute our customers’ projects.',
  },
  {
    title: 'Quality Led in the Field.',
    body: 'Experienced project managers and superintendents guide execution, coordinate trade partners, and oversee quality throughout construction. From installation reviews through testing, commissioning, and turnover, Axis focuses on the details that help deliver a complete, dependable energy system.',
  },
  {
    title: 'Resources Matched to Your Project.',
    body: 'Axis combines its project leadership and technical team with established engineering, equipment, and construction partners. We align resources with each project’s scope, location, and complexity—supporting individual installations, operating facilities, and coordinated portfolios across multiple sites.',
  },
  {
    title: 'Employee-Owned Accountability.',
    body: 'Employee ownership gives our team a personal stake in the company’s work and long-term relationships. Through the 1910 Legacy employee ownership structure, Axis connects individual responsibility with shared success—reinforcing care for our customers, our colleagues, and the assets we build and maintain.',
  },
  {
    title: 'Safety Built into Execution.',
    body: 'Safety is a responsibility we carry from planning through completion. Axis emphasizes work planning, subcontractor qualification, field oversight, and coordination around existing operations and electrical systems. Our priority is protecting people while executing work with discipline and care.',
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
