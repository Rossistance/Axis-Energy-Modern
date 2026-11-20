/**
 * Headline figures. Only `confirmed: true` entries render.
 * Sources: the owner's Solar Projects Historical Analysis (2026-11-10): 81 completed projects,
 * 2010 to October 2026, 196.7 MW across 12 states (NC, AR, SC, TN, VA, GA, TX, MS, CA, KY, PA,
 * CO), and 28 sites under an active O&M contract; refreshed on Ross's go-ahead, 2026-11-20.
 * Like the deck's "150 MW+" before them, the totals count the project team's experience,
 * including the White Electrical renewable division, so the copy says "our team". Battery
 * storage still comes from the 2024 company overview deck (Dec 2024).
 */
export interface Stat {
  value: string;
  label: string;
  source: string;
  confirmed: boolean;
  numeric?: number;
  suffix?: string;
}

export const stats: Stat[] = [
  {
    value: '195 MW+',
    numeric: 195,
    suffix: ' MW+',
    label: 'Solar constructed by our team',
    source: 'Solar Projects Historical Analysis (owner, 2026-11-10)',
    confirmed: true,
  },
  {
    value: '30 MWh',
    numeric: 30,
    suffix: ' MWh',
    label: 'Battery energy storage installed',
    source: '2024 company overview deck',
    confirmed: true,
  },
  {
    value: '81',
    numeric: 81,
    label: 'Projects completed by our team',
    source: 'Solar Projects Historical Analysis (owner, 2026-11-10)',
    confirmed: true,
  },
  {
    value: '12',
    numeric: 12,
    label: 'States',
    source: 'Solar Projects Historical Analysis (owner, 2026-11-10)',
    confirmed: true,
  },
  {
    value: '28',
    numeric: 28,
    label: 'Sites under O&M contract',
    source: 'Solar Projects Historical Analysis, O&M sheet (owner, 2026-11-10)',
    confirmed: true,
  },
];

/** Solar Power World Top Solar Contractors rankings (public supplier profile). */
export const rankings = [
  { year: 2026, rank: 121, category: 'Commercial & Industrial · EPC', kw: 19360 },
  { year: 2025, rank: 125, category: 'Commercial & Industrial · EPC', kw: 18647 },
  { year: 2023, rank: 221, category: 'Commercial & Industrial · EPC', kw: 4740 },
  { year: 2022, rank: 95, category: 'Commercial & Industrial · EPC · Storage', kw: 25512 },
  { year: 2021, rank: 96, category: 'Utility · EPC · Storage', kw: 21647 },
];

export const recognitionYears = rankings.map((r) => r.year).sort();

export const heritage = [
  {
    year: '1910',
    title: 'White Electrical Construction Company founded',
    body: 'Knowles D. White and Ralph Walker found one of the oldest electrical contractors in the Southeast in Rome, Georgia, helping textile mills move from water and steam to electricity.',
  },
  {
    year: '2010s',
    title: 'Renewable Division',
    body: 'White Electrical builds a renewable-energy practice as solar takes hold across the Southeast, delivering rooftop and ground-mount systems for manufacturers in Charleston (2011) and Durham (2015).',
  },
  {
    year: '2017',
    title: 'Axis Energy incorporated',
    body: '1910 Legacy Enterprises is established as the family’s holding company and Axis Energy is created in Georgia to operate in the renewable market, headquartered in Holly Springs, NC. The company is 100% employee-owned through the 1910 Legacy ESOP.',
  },
  {
    year: '2021',
    title: 'Top Solar Contractor',
    body: 'Axis earns its first Solar Power World Top Solar Contractors listing (#96), the first of five to date.',
  },
  {
    year: '2024',
    title: 'Solar + storage across nine states',
    body: 'Our team has constructed 150 MW+ of solar and 30 MWh of battery storage across 28 projects, with work in the Carolinas, Arkansas, Mississippi, Tennessee, Kentucky, Virginia and Pennsylvania.',
  },
  {
    year: '2026',
    title: 'Still building',
    body: 'Ranked #121 nationally by Solar Power World; expanding into Colorado and Texas.',
  },
];
