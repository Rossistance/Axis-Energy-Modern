/**
 * Paths that many pages link to, kept in one place so a page can move without hunting
 * for links. Old paths that moved are redirected in astro.config.mjs and hosting/.
 */
export const routes = {
  projects: '/projects/',
  /** Markets we serve (was a section of the Projects page until 2026-10-01). */
  markets: '/markets/',
  workWithAxis: '/work-with-axis/',
  /** Project request form for developers and project owners (was /request-a-quote/). */
  projectRequest: '/work-with-axis/developer-project-owner/',
  /** The same form, opened on the case-studies request. */
  caseStudies: '/work-with-axis/developer-project-owner/?topic=case-studies',
  /** Subcontractor prequalification (was /subcontractors/). */
  subcontractor: '/work-with-axis/subcontractor/',
  /** Leadership (was /leadership/). */
  leadership: '/about/leadership/',
  news: '/news/',
  contact: '/contact/',
} as const;
