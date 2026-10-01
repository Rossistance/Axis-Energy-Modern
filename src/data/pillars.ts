/**
 * "Total Project Peace of Mind" cards on Why Axis. Placeholders since 2026-10-01: Axis is
 * writing a new title and description for each card. Fill in `title` and `body` (and a
 * lucide `icon`) to publish a card; a card without them shows as a placeholder in preview
 * builds and is left out of production builds. The six previous cards, from the old
 * website, are listed in docs/CONTENT-REVIEW.md.
 */
export interface Pillar {
  title?: string;
  body?: string;
  icon?: string;
}

export const pillars: Pillar[] = [{}, {}, {}, {}, {}, {}];

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
