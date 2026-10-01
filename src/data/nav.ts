import { servicePages, omOfferings, servicePath, offeringPath, OM_PAGE_SLUG } from './services';
import { projectMarkets, marketPath, MARKETS_ANCHOR, type ProjectMarket } from './project-markets';
import { routes } from './routes';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

/** Markets are sections of the Projects page, so these links jump within that page. */
const marketItem = (m: ProjectMarket): NavItem => ({
  label: m.title,
  href: marketPath(m.id),
  children: m.children?.map(marketItem),
});

export const primaryNav: NavItem[] = [
  {
    label: 'Services',
    href: '/services/',
    children: [
      ...servicePages.map((page) => ({
        label: page.title,
        href: servicePath(page.slug),
        children:
          page.slug === OM_PAGE_SLUG
            ? omOfferings.map((o) => ({ label: o.title, href: offeringPath(o.slug) }))
            : undefined,
      })),
    ],
  },
  {
    label: 'Projects',
    href: '/projects/',
    children: [
      {
        label: 'Markets',
        href: marketPath(MARKETS_ANCHOR),
        children: projectMarkets.map(marketItem),
      },
    ],
  },
  { label: 'Why Axis', href: '/why-axis/' },
  {
    label: 'About',
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
    { label: 'Developer/Project Owner', href: routes.projectRequest },
    { label: 'Subcontractor', href: routes.subcontractor },
  ],
} satisfies NavItem;

export const footerColumns: { title: string; items: NavItem[] }[] = [
  {
    title: 'Company',
    items: [
      { label: 'About Axis', href: '/about/' },
      { label: 'Leadership', href: routes.leadership },
      { label: 'Why Axis', href: '/why-axis/' },
      { label: 'News', href: '/news/' },
    ],
  },
  {
    title: 'Services',
    items: [
      ...servicePages.map((page) => ({ label: page.title, href: servicePath(page.slug) })),
      { label: 'Projects', href: '/projects/' },
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
