export type FieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'url'
  | 'number'
  | 'date'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'checkboxes';

export interface FieldOption {
  value: string;
  label: string;
}

export interface Field {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  help?: string;
  placeholder?: string;
  options?: FieldOption[];
  /** Span the full form width. */
  full?: boolean;
  autocomplete?: string;
  min?: number;
  max?: number;
  step?: number;
  maxlength?: number;
  rows?: number;
}

export interface Step {
  id: string;
  title: string;
  intro?: string;
  fields: Field[];
}

export interface FormSpec {
  id: 'contact' | 'rfq' | 'subcontractor';
  name: string;
  /** Subject line used for the endpoint payload and the mailto fallback. */
  subject: string;
  steps: Step[];
  submitLabel: string;
  successTitle: string;
  successBody: string;
  /** Text shown above the review step. */
  reviewIntro: string;
  /** Persist drafts in localStorage under this key. */
  draftKey: string;
}

export const opts = (...labels: string[]): FieldOption[] =>
  labels.map((label) => ({ value: label, label }));

export const US_STATES: FieldOption[] = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'DC',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
].map((s) => ({ value: s, label: s }));
