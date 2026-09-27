/**
 * Headline figures. Only `confirmed: true` entries render.
 * Sources: 2024 company overview deck (Dec 2024); Solar Power World public profile (2026).
 * The deck's "150 MW+" counts the project team's collective experience; SPW's
 * 99,040 kW counts installations reported since founding. Owner to choose the basis.
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
    value: '150 MW+',
    numeric: 150,
    suffix: ' MW+',
    label: 'Solar constructed',
    source: '2024 company overview deck',
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
    value: '28',
    numeric: 28,
    label: 'Projects constructed',
    source: '2024 company overview deck',
    confirmed: true,
  },
  {
    value: '9',
    numeric: 9,
    label: 'States',
    source: '2024 company overview deck',
    confirmed: true,
  },
  {
    value: '5',
    numeric: 5,
    label: 'Sites under O&M contract',
    source: '2024 company overview deck',
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
    body: 'White Electrical builds a renewable-energy practice as solar takes hold across the Southeast, delivering projects such as Boeing Charleston (2011) and GE Durham (2015).',
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
    body: '150 MW+ of solar and 30 MWh of battery storage constructed across 28 projects, with work in the Carolinas, Arkansas, Mississippi, Tennessee, Kentucky, Virginia and Pennsylvania.',
  },
  {
    year: '2026',
    title: 'Still building',
    body: 'Ranked #121 nationally by Solar Power World; expanding into Colorado and Texas.',
  },
];
