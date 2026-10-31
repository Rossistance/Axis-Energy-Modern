import { routes } from './routes';

/**
 * Markets, in page order. Each market is a section of the Markets page (/markets/); the
 * Markets menu and the home page diagram jump to it. A project joins a section through the
 * `market` field in its Markdown front matter.
 *
 * Summaries are drafted from the 2024 company deck's market segments and the published
 * project pages; see docs/CONTENT-REVIEW.md before changing them.
 *
 * Investor-owned utilities are part of Electric Co-ops & Utilities, not a market of their own
 * (owner, 2026-10-28).
 */
export const MARKET_IDS = [
  'commercial-industrial',
  'co-ops-utilities',
  'municipal-institutional',
  'developers-ipps',
] as const;

export type MarketId = (typeof MARKET_IDS)[number];

/** Market sections that were merged into another; old links to them are forwarded. */
export const RETIRED_MARKETS: Record<string, MarketId> = {
  'investor-owned': 'co-ops-utilities',
};

/**
 * Profiles shown per market on the Markets page, in portfolio order (owner, 2026-10-28:
 * "3 profiles for each Market"). Every published project is on the Projects page.
 */
export const MARKET_PROFILE_LIMIT = 3;

export interface ProjectMarket {
  id: MarketId;
  title: string;
  /** Shorter name for the home page diagram, when it differs from the title. */
  shortTitle?: string;
  icon: string;
  summary: string;
  /** Shown when no published project is assigned to the market yet. */
  emptyNote: string;
}

export const projectMarkets: ProjectMarket[] = [
  {
    id: 'commercial-industrial',
    title: 'Commercial & Industrial Owners',
    shortTitle: 'Commercial & Industrial',
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
      'Solar, battery storage and microgrids for electric cooperatives, municipal utilities and investor-owned utilities, from EPC delivery to long-term O&M.',
    emptyNote: 'Cooperative and utility project references are available on request.',
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

export const marketPath = (id: string) => `${routes.markets}#${id}`;
