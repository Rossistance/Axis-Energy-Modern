import { servicePages, omOfferings, servicePath, offeringPath, OM_PAGE_SLUG } from './services';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const primaryNav: NavItem[] = [
  {
    label: 'Services',
    href: '/services/',
    children: [
      { label: 'Services Overview', href: '/services/' },
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
  { label: 'Projects', href: '/projects/' },
  { label: 'Why Axis', href: '/why-axis/' },
  {
    label: 'About',
    href: '/about/',
    children: [
      { label: 'About Axis', href: '/about/' },
      { label: 'Leadership', href: '/leadership/' },
    ],
  },
  { label: 'News', href: '/news/' },
  { label: 'Careers', href: '/careers/' },
  { label: 'Contact', href: '/contact/' },
];

export const headerCta: NavItem = { label: 'Request a Quote', href: '/request-a-quote/' };

export const footerColumns: { title: string; items: NavItem[] }[] = [
  {
    title: 'Company',
    items: [
      { label: 'About Axis', href: '/about/' },
      { label: 'Leadership', href: '/leadership/' },
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
    title: 'Work with us',
    items: [
      { label: 'Request a Quote', href: '/request-a-quote/' },
      { label: 'Subcontractors', href: '/subcontractors/' },
      { label: 'Careers', href: '/careers/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
];
