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

/** Six market segments from the 2024 deck plus the brochure's three experience groups. */
export const markets = [
  {
    title: 'Municipal & government',
    icon: 'lucide:landmark',
    body: 'Schools, water authorities, counties and federal facilities.',
  },
  {
    title: 'Microgrids',
    icon: 'lucide:network',
    body: 'Resilient solar + storage systems with islanding capability.',
  },
  {
    title: 'Behind the meter',
    icon: 'lucide:building-2',
    body: 'On-site generation that lowers commercial and industrial energy costs.',
  },
  {
    title: 'Private development',
    icon: 'lucide:briefcase',
    body: 'Utility-scale and distributed projects for developers and IPPs.',
  },
  {
    title: 'Solar + storage',
    icon: 'lucide:battery-charging',
    body: 'Battery energy storage paired with new or existing arrays.',
  },
  {
    title: 'Carport & canopy',
    icon: 'lucide:car',
    body: 'Elevated structures that turn parking into production.',
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
    example: 'Boeing Manufacturing · 2.6 MW · Charleston, SC',
  },
  {
    title: 'Specialty projects',
    detail: 'Landfills · community solar · energy storage',
    example: 'GE Florence · 1.71 MW · Florence, SC',
  },
];
