/**
 * Service content. Sources: live axis-energyinc.com/services (2018 copy),
 * 2018 brochure interior, 2024 company overview deck, Solar Power World profile.
 */
export interface ServiceGroup {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  icon: string;
  columns: { title: string; items: string[]; note?: string }[];
  callout?: { title: string; body: string };
}

export const serviceGroups: ServiceGroup[] = [
  {
    id: 'epc',
    eyebrow: 'Engineering, Procurement & Construction',
    title: 'EPC',
    icon: 'lucide:hard-hat',
    intro:
      'Axis brings you a full array of EPC services, one point of contact through design and construction, a strong financial position to back large projects, an outstanding culture of safety, and superior quality at a competitive price.',
    columns: [
      {
        title: 'Engineering',
        items: [
          'Civil design',
          'Structural',
          'Electrical',
          'System optimization',
          'Value engineering',
          'Industry best practices',
        ],
      },
      {
        title: 'Procurement',
        items: [
          'Established buying power to handle full system procurement for projects of all sizes',
        ],
      },
      {
        title: 'Construction',
        items: [
          'Permitting — environmental, building and electrical',
          'Site civil preparation — land clearing, tree removal, grubbing, grading and erosion control',
          'Rack construction — fixed tilt, single- and dual-axis tracking',
          'Module installation',
          'Electrical balance of system',
          'Medium-voltage point of interconnection',
          'Testing and commissioning',
        ],
      },
    ],
    callout: {
      title: 'A superintendent on every site',
      body: 'Any EPC can put personnel on a project. Axis puts an experienced superintendent at every site to ensure our high standards of performance excellence and operational efficiency are achieved.',
    },
  },
  {
    id: 'om',
    eyebrow: 'Operations & Maintenance',
    title: 'O&M',
    icon: 'lucide:wrench',
    intro:
      'We keep your PV system operating and optimized with 24/7 rapid response, scheduled preventive maintenance, and balance-of-system inspection and analysis from an expert team of technicians well versed in an assortment of PV technologies.',
    columns: [
      {
        title: '24/7 Rapid Response',
        items: ['24/7 rapid response coverage to reduce down time and increase ROI'],
      },
      {
        title: 'Scheduled Maintenance',
        items: ['Scheduled maintenance to detect, prevent or proactively correct problem issues'],
      },
      {
        title: 'Performance Optimization',
        items: [
          'Overall balance-of-system inspection and analysis',
          'String circuit performance',
          'Thermal imaging',
          'Storm damage repairs',
        ],
      },
    ],
  },
  {
    id: 'storage-electrical',
    eyebrow: 'Solar + Storage & Electrical Infrastructure',
    title: 'Storage, microgrids and electrical infrastructure',
    icon: 'lucide:battery-charging',
    intro:
      'Axis provides turnkey engineering, procurement, construction and operations & maintenance of commercial and industrial distributed energy resources — including battery energy storage, microgrids, behind-the-meter systems and the medium-voltage work that connects them.',
    columns: [
      {
        title: 'Battery energy storage',
        items: [
          'Utility-scale solar + storage sites',
          'Microgrid and demonstration projects',
          'Integration with Tesla and LG Chem battery systems on completed projects',
        ],
      },
      {
        title: 'Electrical infrastructure',
        items: [
          'Medium-voltage underground and overhead construction',
          'Medium-voltage point of interconnection',
          'VLF / Tan Delta cable testing',
        ],
      },
      {
        title: 'Distributed energy',
        items: [
          'Behind-the-meter systems for commercial and industrial facilities',
          'Carport and canopy solar',
          'Community solar',
        ],
      },
    ],
  },
  {
    id: 'added-value',
    eyebrow: 'Added value services',
    title: 'Specialty and lifecycle services',
    icon: 'lucide:sparkles',
    intro: 'Beyond new construction, our crews support owners through the full life of an asset.',
    columns: [
      {
        title: 'Added value',
        items: [
          'Medium-voltage underground and overhead construction',
          'VLF / Tan Delta testing',
          'PV system decommissioning',
        ],
      },
      {
        title: 'Rebuilds and repowering',
        items: ['Demonstration and rebuild projects', 'Storm damage assessment and repair'],
      },
    ],
  },
];

const group = (id: string) => serviceGroups.find((g) => g.id === id)!;

/** O&M and technical services offerings, each with its own placeholder page for now. */
export interface ServiceOffering {
  slug: string;
  title: string;
  summary: string;
  items: string[];
}

export const omOfferings: ServiceOffering[] = [
  {
    slug: 'preventive-maintenance',
    title: 'Preventive Maintenance',
    summary: 'Scheduled maintenance to detect, prevent or proactively correct problem issues.',
    items: [
      'Scheduled maintenance visits',
      'Routine plant inspection',
      'Vegetation management',
      'Module washing',
    ],
  },
  {
    slug: 'corrective-maintenance',
    title: 'Corrective Maintenance & 24/7 Response',
    summary: '24/7 rapid response coverage to reduce down time and increase ROI.',
    items: [
      '24/7 rapid response coverage',
      'Diagnostics and corrective repairs',
      'Warranty coordination and reporting',
    ],
  },
  {
    slug: 'performance-monitoring',
    title: 'Performance Monitoring & Optimization',
    summary: 'Balance-of-system inspection and analysis that keeps your PV system optimized.',
    items: [
      'Overall balance-of-system inspection and analysis',
      'String circuit performance',
      'Thermal imaging',
      'Performance monitoring',
    ],
  },
  {
    slug: 'repowering',
    title: 'Repowering & Rebuilds',
    summary:
      'Rebuild and repowering projects that support owners through the full life of an asset.',
    items: ['Demonstration and rebuild projects', 'Lifecycle planning'],
  },
  {
    slug: 'storm-damage',
    title: 'Storm Damage Assessment & Repair',
    summary: 'Storm damage assessment and repair to bring damaged systems back into service.',
    items: ['Storm damage assessment', 'Storm damage repairs', '24/7 rapid response coverage'],
  },
  {
    slug: 'decommissioning',
    title: 'Decommissioning',
    summary: 'PV system decommissioning at the end of a system’s service life.',
    items: ['PV system decommissioning'],
  },
];

/** The four service pages under /services/, in menu order. */
export interface ServicePage {
  slug: string;
  title: string;
  icon: string;
  /** One sentence for cards and the page description. */
  summary: string;
  /** Hero lead. */
  lead: string;
  /** Detail block: intro, three columns of capabilities, optional callout. */
  block: ServiceGroup;
}

const omGroup = group('om');

export const servicePages: ServicePage[] = [
  {
    slug: 'solar-epc',
    title: 'Solar EPC',
    icon: 'lucide:hard-hat',
    summary:
      'Engineering, procurement and construction for utility-scale, commercial and industrial solar, with one point of contact from design through commissioning.',
    lead: group('epc').intro,
    block: {
      ...group('epc'),
      eyebrow: 'What we deliver',
      title: 'Engineering, procurement and construction',
      intro:
        'Our clients enjoy great peace of mind being able to make one phone call to Axis Energy and know their renewable energy project will be executed with excellence. We take care of it all, from development and due diligence, to pre-construction and full design, through construction and commissioning.',
    },
  },
  {
    slug: 'battery-storage-and-microgrids',
    title: 'Battery Storage & Microgrids',
    icon: 'lucide:battery-charging',
    summary:
      'Battery energy storage, solar + storage portfolios and microgrids, engineered and built to work with new or existing arrays.',
    lead: 'Axis provides turnkey engineering, procurement, construction and operations & maintenance of battery energy storage, microgrids and behind-the-meter systems for commercial, industrial, cooperative and utility customers.',
    block: {
      id: 'storage',
      eyebrow: 'What we deliver',
      title: 'Battery storage and microgrids',
      icon: 'lucide:battery-charging',
      intro:
        'From five coordinated solar + storage sites to campus and utility microgrids, Axis integrates solar generation, battery storage, protection and controls into systems that perform from the first day of operation.',
      columns: [
        {
          title: 'Battery energy storage',
          items: [
            'Utility-scale solar + storage sites',
            'Tesla battery storage, controls, communications and system integration',
            'Integration with Tesla and LG Chem battery systems on completed projects',
          ],
        },
        {
          title: 'Microgrids',
          items: [
            'Utility and campus microgrids with islanding capability',
            'Solar, storage, protection and microgrid controls delivered as one system',
            'Microgrid and demonstration projects',
          ],
        },
        {
          title: 'Distributed energy',
          items: [
            'Behind-the-meter systems for commercial and industrial facilities',
            'Carport and canopy solar',
            'Community solar',
          ],
        },
      ],
    },
  },
  {
    slug: 'electrical-infrastructure-and-commissioning',
    title: 'Electrical Infrastructure & Commissioning',
    icon: 'lucide:zap',
    summary:
      'Medium-voltage underground and overhead construction, points of interconnection, cable testing and commissioning.',
    lead: 'Medium-voltage underground and overhead construction, points of interconnection and VLF / Tan Delta testing from a company with electrical roots that go back to 1910.',
    block: {
      id: 'electrical',
      eyebrow: 'What we deliver',
      title: 'Electrical infrastructure and commissioning',
      icon: 'lucide:zap',
      intro:
        'Axis grew out of the renewable division of White Electrical Construction Company, founded in 1910. That electrical depth carries every project from the medium-voltage point of interconnection to verified performance at turnover.',
      columns: [
        {
          title: 'Medium-voltage construction',
          items: [
            'Medium-voltage underground and overhead construction',
            'Medium-voltage point of interconnection',
            'Electrical balance of system',
          ],
        },
        {
          title: 'Testing and commissioning',
          items: [
            'VLF / Tan Delta cable testing',
            'Testing and commissioning',
            'Verified performance and a clean turnover to the owner and utility',
          ],
        },
        {
          title: 'Storage and microgrid integration',
          items: [
            'Battery storage and power-conversion integration',
            'Controls, protection and interconnection',
            'Communications and system integration',
          ],
        },
      ],
    },
  },
  {
    slug: 'om-and-technical-services',
    title: 'O&M & Technical Services',
    icon: 'lucide:wrench',
    summary:
      '24/7 rapid response, scheduled maintenance and performance optimization in North Carolina, South Carolina, Georgia and Virginia.',
    lead: omGroup.intro,
    block: {
      ...omGroup,
      eyebrow: 'What we deliver',
      title: 'Operations and maintenance',
      intro:
        'Our O&M and technical services teams support owners in North Carolina, South Carolina, Georgia and Virginia, from scheduled maintenance and 24/7 response to repowering, storm repairs and decommissioning.',
    },
  },
];

export const OM_PAGE_SLUG = 'om-and-technical-services';
export const servicePath = (slug: string) => `/services/${slug}/`;
export const offeringPath = (slug: string) => `/services/${OM_PAGE_SLUG}/${slug}/`;

export const process = [
  {
    title: 'Development & due diligence',
    body: 'We help you pressure-test the opportunity early: site, interconnection, constructability and budget.',
  },
  {
    title: 'Pre-construction & design',
    body: 'Full design with civil, structural and electrical engineering, value engineering and permitting.',
  },
  {
    title: 'Procurement',
    body: 'Established buying power to handle full system procurement for projects of all sizes.',
  },
  {
    title: 'Construction',
    body: 'An experienced superintendent on every site, rigorous safety practices and disciplined QA/QC.',
  },
  {
    title: 'Testing & commissioning',
    body: 'Verified performance and a clean turnover to the owner and utility.',
  },
  {
    title: 'Operate & optimize',
    body: '24/7 rapid response, scheduled maintenance and performance optimization for the life of the asset.',
  },
];

export const experienceGroups = [
  {
    title: 'Utility scale',
    detail: '1–15 MW · fixed tilt · tracking',
    example: 'Floyd Road · 6.75 MW · Gaston, NC',
  },
  {
    title: 'Commercial & industrial',
    detail: 'Rooftop · canopies · carports',
    example: 'Charleston Rooftop Solar · 2.6 MW · Charleston, SC',
  },
  {
    title: 'Specialty projects',
    detail: 'Landfills · community solar · energy storage',
    example: 'Florence Solar Array · 1.71 MW · Florence, SC',
  },
];
