import { defineConfig } from '@playwright/test';

const PORT = 4321;
const rawBase = process.env.SITE_BASE ?? '/Axis-Energy-Modern';
const base = rawBase === '/' || rawBase === '' ? '/' : `/${rawBase.replace(/^\/+|\/+$/g, '')}/`;

/**
 * Tests run against the production build served by `astro preview`.
 * Use relative paths in page.goto() (e.g. 'services/') so the base path is kept.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 90_000,
  expect: { timeout: 10_000 },
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: `http://localhost:${PORT}${base}`,
    viewport: { width: 1280, height: 800 },
    trace: 'retain-on-failure',
  },
  webServer: {
    command: `npx astro preview --port ${PORT}`,
    port: PORT,
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
