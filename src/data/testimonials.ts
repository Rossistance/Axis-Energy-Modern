/**
 * Client testimonials. Each carries `approved`: production builds show only approved ones;
 * preview builds show the rest marked "Pending approval".
 */
export interface Testimonial {
  /** The words shown, with any edit to the original in square brackets. */
  quote: string;
  name: string;
  title: string;
  company: string;
  /** Project page the quote is about (its slug), where it is shown too. */
  project?: string;
  approved: boolean;
  /** Where the words come from. Not shown. */
  source: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'This site has consistently been one of the top performing sites in our portfolio for the past couple of years. We appreciate [Axis Energy’s] commitment to quality and performance.',
    name: 'Derrik Filippo',
    title: 'Senior Project Manager',
    company: 'GE Solar',
    project: 'florence-solar-array',
    approved: false,
    source:
      'Email from Derrik Filippo (GE Solar) to Josh Butler, 10 May 2019, subject "Florence", forwarded by the owner on 2026-11-02 to use as a testimonial "reframed to remove the reference to White and just leave it as Axis". The original reads "White’s (now Axis)"; the edit is shown in brackets. Opening sentence of the email, not quoted: the preventative maintenance inspection at Florence had just been completed with no corrective items. Pending: Ross to confirm the attribution and the edit, and whether GE needs to approve it.',
  },
];

const preview = (import.meta.env.PUBLIC_SITE_MODE ?? 'preview') !== 'production';
/** Testimonials this build may show. */
export const visibleTestimonials = testimonials.filter((t) => t.approved || preview);
