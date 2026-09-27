/** Single source of truth for company facts used across the site. Sources noted per field. */
export const company = {
  name: 'Axis Energy',
  legalName: 'Axis Energy Inc.',
  tagline: 'Renewable Solutions | Reliable Partners', // 2024 company overview deck
  description:
    'Axis Energy is an employee-owned renewable energy contractor delivering integrated solar, battery storage, electrical infrastructure and operations & maintenance solutions for commercial, industrial, municipal and utility-scale customers.',
  founded: 2017, // incorporated in Georgia, 2017 (deck)
  parent: {
    name: '1910 Legacy Enterprises',
    url: 'https://www.1910legacy.com',
  },
  sister: {
    name: 'White Electrical Construction Company',
    url: 'https://www.1910legacy.com',
  },
  address: {
    street: '100 Newspaper Way, Suite 105',
    city: 'Holly Springs',
    state: 'NC',
    zip: '27540',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=100+Newspaper+Way+Suite+105+Holly+Springs+NC+27540',
    geo: { lat: 35.6513, lng: -78.8336 }, // Holly Springs, NC (town centre; refine with exact pin)
  },
  phone: { display: '919.346.8333', tel: '+19193468333' },
  fax: { display: '919.285.2581' },
  email: 'info@axis-energyinc.com',
  careersEmail: 'careers@axis-energyinc.com',
  hours: '7:30 am – 4:30 pm, Monday to Friday', // live site lists 7:30 am – 4:30 pm
  primaryContact: { name: 'Josh Butler', title: 'President' },
  linkedin: 'https://www.linkedin.com/company/axis-energy-inc',
  statesServed: ['NC', 'SC', 'GA', 'VA', 'TN', 'KY', 'MS', 'AR', 'PA', 'CO', 'TX'], // deck + SPW submissions
  recognition: 'Solar Power World Top Solar Contractor 2021–2026',
} as const;

export type Company = typeof company;
