import {
  servicePages,
  omOfferings,
  servicePath,
  offeringPath,
  OM_PATH,
  OM_PROJECTS_ID,
} from './services';
import { projectMarkets, marketPath, type ProjectMarket } from './project-markets';
import { routes } from './routes';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

/** Markets are sections of the Markets page, so these links jump within that page. */
const marketItem = (m: ProjectMarket): NavItem => ({ label: m.title, href: marketPath(m.id) });

export const primaryNav: NavItem[] = [
  {
    label: 'Services',
    href: '/services/',
    // O&M & Technical Services stays listed here as a plain link to its own page.
    children: servicePages.map((page) => ({ label: page.title, href: servicePath(page.slug) })),
  },
  {
    label: 'Markets',
    href: routes.markets,
    children: projectMarkets.map(marketItem),
  },
  { label: 'Projects', href: routes.projects },
  // A stand-alone page after Projects; its menu jumps to the page's sections (owner, 2026-10-28).
  {
    label: 'O&M',
    href: OM_PATH,
    children: [
      ...omOfferings.map((o) => ({ label: o.title, href: offeringPath(o.slug) })),
      { label: 'O&M project experience', href: `${OM_PATH}#${OM_PROJECTS_ID}` },
    ],
  },
  { label: 'Why Axis', href: '/why-axis/' },
  {
    label: 'About us',
    href: '/about/',
    children: [{ label: 'Leadership', href: routes.leadership }],
  },
  { label: 'News', href: '/news/' },
  { label: 'Careers', href: '/careers/' },
  { label: 'Contact', href: '/contact/' },
];

/** The header's call to action: opens on hover (or its toggle) to the two ways to work with Axis. */
export const workWithAxis = {
  label: 'Work with Axis',
  href: routes.workWithAxis,
  children: [
    { label: 'Subcontractor', href: routes.subcontractor },
    { label: 'Developer/Project Owner', href: routes.projectRequest },
  ],
} satisfies NavItem;

export const footerColumns: { title: string; items: NavItem[] }[] = [
  {
    title: 'Company',
    items: [
      { label: 'About us', href: '/about/' },
      { label: 'Leadership', href: routes.leadership },
      { label: 'Why Axis', href: '/why-axis/' },
      { label: 'News', href: '/news/' },
    ],
  },
  {
    title: 'Services',
    items: [
      ...servicePages.map((page) => ({ label: page.title, href: servicePath(page.slug) })),
      { label: 'Markets', href: routes.markets },
      { label: 'Projects', href: routes.projects },
    ],
  },
  {
    title: workWithAxis.label,
    items: [
      ...workWithAxis.children,
      { label: 'Careers', href: '/careers/' },
      { label: 'Contact', href: routes.contact },
    ],
  },
];
