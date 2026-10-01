import { company } from '@data/company';

type JsonLd = Record<string, unknown>;

export function organizationSchema(siteUrl: string, logoUrl: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}#organization`,
    name: company.legalName,
    alternateName: company.name,
    url: siteUrl,
    logo: logoUrl,
    foundingDate: String(company.founded),
    parentOrganization: {
      '@type': 'Organization',
      name: company.parent.name,
      url: company.parent.url,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      postalCode: company.address.zip,
      addressCountry: 'US',
    },
    telephone: company.phone.tel,
    email: company.email,
    sameAs: [company.linkedin],
    areaServed: company.statesServed.map((s) => ({ '@type': 'State', name: s })),
  };
}

export function localBusinessSchema(siteUrl: string, logoUrl: string): JsonLd {
  return {
    ...organizationSchema(siteUrl, logoUrl),
    '@type': ['Organization', 'LocalBusiness', 'GeneralContractor'],
    image: logoUrl,
    priceRange: '$$$',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: company.address.geo.lat,
      longitude: company.address.geo.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:30',
        closes: '16:30',
      },
    ],
    faxNumber: company.fax.display,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function personSchema(opts: {
  url: string;
  name: string;
  jobTitle: string;
  email?: string;
  image?: string;
  sameAs?: string[];
  siteUrl: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${opts.url}#person`,
    url: opts.url,
    name: opts.name,
    jobTitle: opts.jobTitle,
    worksFor: { '@id': `${opts.siteUrl}#organization` },
    ...(opts.email ? { email: opts.email } : {}),
    ...(opts.image ? { image: opts.image } : {}),
    ...(opts.sameAs?.length ? { sameAs: opts.sameAs } : {}),
  };
}

export function projectSchema(opts: {
  url: string;
  name: string;
  description: string;
  location: string;
  image?: string;
  siteUrl: string;
  dateCompleted?: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    additionalType: 'https://schema.org/Project',
    url: opts.url,
    name: opts.name,
    description: opts.description,
    locationCreated: { '@type': 'Place', name: opts.location },
    creator: { '@id': `${opts.siteUrl}#organization` },
    ...(opts.image ? { image: opts.image } : {}),
    ...(opts.dateCompleted ? { dateCreated: opts.dateCompleted } : {}),
  };
}

export function webPageSchema(opts: {
  url: string;
  name: string;
  description: string;
  siteUrl: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: opts.url,
    name: opts.name,
    description: opts.description,
    isPartOf: {
      '@type': 'WebSite',
      url: opts.siteUrl,
      name: company.name,
      publisher: { '@id': `${opts.siteUrl}#organization` },
    },
  };
}
