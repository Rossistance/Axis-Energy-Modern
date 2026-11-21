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
  /**
   * The risk this owner carries, then Axis's answer: shown together as one paragraph with no
   * labels (3 P's update, owner 2026-11-02; woven 2026-11-20).
   */
  pain?: string;
  answer?: string;
  answerLink?: { label: string; href: string };
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
    pain: 'Energy isn’t your core business, so the project has to fit around a working campus without disrupting production, and the savings have to actually show up.',
    answer:
      'One accountable Axis team phases the work around your operations, and Axis O&M keeps the system producing after turnover.',
  },
  {
    id: 'co-ops-utilities',
    title: 'Electric Co-ops & Utilities',
    icon: 'lucide:zap',
    summary:
      'Solar, battery storage and microgrids for electric cooperatives, municipal utilities and investor-owned utilities, from EPC delivery to long-term O&M.',
    emptyNote: 'Cooperative and utility project references are available on request.',
    pain: 'Co-ops and utilities carry peak demand costs and their members’ reliability expectations with lean engineering staffs, and medium-voltage work has to meet utility standards the first time.',
    answer:
      'Axis builds solar + storage and microgrids to those standards the way an electrical contractor would, and maintains them under one O&M agreement.',
    answerLink: {
      label: 'Add storage to existing solar',
      href: '/services/battery-storage-and-microgrids/#storage-add-on',
    },
  },
  {
    id: 'municipal-institutional',
    title: 'Municipal & Institutional',
    icon: 'lucide:landmark',
    summary:
      'Solar for school districts, water and wastewater authorities, counties and other public facilities.',
    emptyNote: 'Municipal and institutional project references are available on request.',
    pain: 'Public projects are built with public money under public scrutiny, with procurement rules, bonding requirements and no tolerance for a project that slips or under-delivers.',
    answer:
      'Axis’s bonding is backed by 1910 Legacy Enterprises, and every project closes with a documented turnover your board and auditors can review.',
  },
  {
    id: 'developers-ipps',
    title: 'Developers & IPPs',
    icon: 'lucide:briefcase',
    summary:
      'Distributed generation solar for developers and independent power producers, from single sites to multi-site portfolios.',
    emptyNote: 'Developer and IPP project references are available on request.',
    pain: 'For a developer, schedule is everything: solar that missed the July 4, 2026 construction start must be in service by December 31, 2027 to keep the federal credit, so a contractor that stalls can cost a project its economics.',
    answer:
      'Axis holds the schedule through commercial operation, and when another EPC walks away, we take the project over.',
    answerLink: { label: 'Project Rescue & EPC Takeover', href: '/services/project-rescue/' },
  },
];

export const marketPath = (id: string) => `${routes.markets}#${id}`;
