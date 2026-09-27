import { getCollection } from 'astro:content';
import * as adapters from './adapters';
import type { Job, JobsResult } from './types';

export type { Job, JobsResult };

function env(name: string): string | undefined {
  const v = (import.meta.env as Record<string, string | undefined>)[name] ?? process.env[name];
  return v && v.trim() ? v.trim() : undefined;
}

async function staticJobs(includeSamples: boolean): Promise<Job[]> {
  const entries = await getCollection('jobs', ({ data }) => includeSamples || !data.sample);
  return entries
    .map((e) => ({
      id: e.id,
      title: e.data.title,
      location: e.data.location,
      type: e.data.type,
      department: e.data.department,
      posted: e.data.posted.toISOString(),
      applyUrl: e.data.applyUrl,
      applyEmail: e.data.applyEmail,
      summary: e.data.summary,
      sample: e.data.sample,
      source: 'static',
    }))
    .sort((a, b) => (b.posted ?? '').localeCompare(a.posted ?? ''));
}

/**
 * Resolve job listings at build time from the configured source.
 *   JOBS_SOURCE = static | greenhouse | lever | workable | bamboohr | json-url
 *   JOBS_BOARD  = board token / site / subdomain for the ATS adapters
 *   JOBS_URL    = feed URL for json-url
 * Remote failures never break the build: the static collection is used and a
 * warning is returned so the page can say so in preview mode.
 */
export async function getJobs(): Promise<JobsResult> {
  const source = (env('JOBS_SOURCE') ?? 'static').toLowerCase();
  const preview = (env('PUBLIC_SITE_MODE') ?? 'preview') !== 'production';
  if (source === 'static') {
    return { jobs: await staticJobs(preview), source };
  }
  const board = env('JOBS_BOARD');
  const url = env('JOBS_URL');
  try {
    let jobs: Job[] = [];
    switch (source) {
      case 'greenhouse':
        if (!board) throw new Error('JOBS_BOARD is required for greenhouse');
        jobs = await adapters.greenhouse(board);
        break;
      case 'lever':
        if (!board) throw new Error('JOBS_BOARD is required for lever');
        jobs = await adapters.lever(board);
        break;
      case 'workable':
        if (!board) throw new Error('JOBS_BOARD is required for workable');
        jobs = await adapters.workable(board);
        break;
      case 'bamboohr':
        if (!board) throw new Error('JOBS_BOARD is required for bamboohr');
        jobs = await adapters.bamboohr(board);
        break;
      case 'json-url':
        if (!url) throw new Error('JOBS_URL is required for json-url');
        jobs = await adapters.jsonUrl(url);
        break;
      default:
        throw new Error(`Unknown JOBS_SOURCE "${source}"`);
    }
    return { jobs, source };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(`[jobs] ${source} feed failed (${message}); falling back to static listings.`);
    return { jobs: await staticJobs(preview), source: 'static', warning: message };
  }
}
