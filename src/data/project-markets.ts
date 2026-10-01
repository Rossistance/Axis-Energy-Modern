/**
 * Markets on the Projects page, in page order. Each market is a section of /projects/
 * (the Projects → Markets menu jumps to it); a project joins a section through the
 * `market` field in its Markdown front matter.
 *
 * Summaries are drafted from the 2024 company deck's market segments and the published
 * project pages; see docs/CONTENT-REVIEW.md before changing them.
 */
export const MARKET_IDS = [
  'commercial-industrial',
  'co-ops-utilities',
  'investor-owned',
  'municipal-institutional',
  'developers-ipps',
] as const;

export type MarketId = (typeof MARKET_IDS)[number];

export interface ProjectMarket {
  id: MarketId;
  title: string;
  icon: string;
  summary: string;
  /** Shown when no published project is assigned to the market yet. */
  emptyNote: string;
  /** Sub-markets, shown inside the parent section (Investor-Owned under Co-ops & Utilities). */
  children?: ProjectMarket[];
}

/** Id of the Markets section that holds the market sections. */
export const MARKETS_ANCHOR = 'markets';

export const projectMarkets: ProjectMarket[] = [
  {
    id: 'commercial-industrial',
    title: 'Commercial & Industrial Owners',
    icon: 'lucide:factory',
    summary:
      'On-site solar, carports, battery storage and microgrids for manufacturers, campuses and commercial facilities, phased around operations that keep running.',
    emptyNote: 'Commercial and industrial project references are available on request.',
  },
  {
    id: 'co-ops-utilities',
    title: 'Electric Co-ops & Utilities',
    icon: 'lucide:zap',
    summary:
      'Solar, battery storage and microgrids for electric cooperatives and utilities, from EPC delivery to long-term O&M.',
    emptyNote: 'Cooperative and utility project references are available on request.',
    children: [
      {
        id: 'investor-owned',
        title: 'Investor-Owned',
        icon: 'lucide:building-2',
        summary:
          'Utility-owned solar built with investor-owned utilities and their project partners, including arrays on their customers’ facilities.',
        emptyNote: 'Investor-owned utility project references are available on request.',
      },
    ],
  },
  {
    id: 'municipal-institutional',
    title: 'Municipal & Institutional',
    icon: 'lucide:landmark',
    summary:
      'Solar for school districts, water and wastewater authorities, counties and other public facilities.',
    emptyNote: 'Municipal and institutional project references are available on request.',
  },
  {
    id: 'developers-ipps',
    title: 'Developers & IPPs',
    icon: 'lucide:briefcase',
    summary:
      'Utility-scale and distributed solar for developers and independent power producers, from single sites to multi-site portfolios.',
    emptyNote: 'Developer and IPP project references are available on request.',
  },
];

export const marketPath = (id: string) => `/projects/#${id}`;
