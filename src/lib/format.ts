const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/** "4.8 MWdc", "13.97 MWdc", "0.65 MWdc" → "654 kWdc" under 1 MW */
export function formatSize(mwdc: number): string {
  if (mwdc < 1) return `${Math.round(mwdc * 1000)} kWdc`;
  const rounded = Math.round(mwdc * 100) / 100;
  return `${rounded.toLocaleString('en-US', { maximumFractionDigits: 2 })} MWdc`;
}

export function formatStorage(mwh?: number): string | null {
  if (!mwh) return null;
  if (mwh < 1) return `${Math.round(mwh * 1000)} kWh`;
  return `${(Math.round(mwh * 100) / 100).toLocaleString('en-US')} MWh`;
}

/** Accepts "2016-02", "2021-12-22", "2024" or a Date. */
export function formatCommissioned(value: string | Date | undefined): string {
  if (!value) return '';
  if (value instanceof Date) {
    return `${MONTHS[value.getUTCMonth()].slice(0, 3)} ${value.getUTCFullYear()}`;
  }
  const m = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?/.exec(value);
  if (!m) return value;
  const [, y, mo] = m;
  if (!mo) return y;
  return `${MONTHS[Number(mo) - 1].slice(0, 3)} ${y}`;
}

export function formatDate(date: Date, opts: Intl.DateTimeFormatOptions = {}): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
    ...opts,
  });
}

export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export const STATE_NAMES: Record<string, string> = {
  AL: 'Alabama',
  AR: 'Arkansas',
  CO: 'Colorado',
  FL: 'Florida',
  GA: 'Georgia',
  KY: 'Kentucky',
  MS: 'Mississippi',
  NC: 'North Carolina',
  PA: 'Pennsylvania',
  SC: 'South Carolina',
  TN: 'Tennessee',
  TX: 'Texas',
  VA: 'Virginia',
};

export function stateName(code: string): string {
  return STATE_NAMES[code] ?? code;
}
