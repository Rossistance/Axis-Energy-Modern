export interface Job {
  id: string;
  title: string;
  location: string;
  type?: string;
  department?: string;
  /** ISO date string */
  posted?: string;
  applyUrl?: string;
  applyEmail?: string;
  summary?: string;
  sample: boolean;
  source: string;
}

export interface JobsResult {
  jobs: Job[];
  source: string;
  /** Set when a remote source failed and the static collection was used instead. */
  warning?: string;
}
