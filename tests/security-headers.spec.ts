import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';
import { sitemapPaths } from './routes';

/**
 * Audit M2: the security headers for the launch host live in hosting/ (one file per host type).
 * GitHub Pages cannot send headers, so this test serves every page with the policy attached and
 * fails on anything it would block: an inline handler, a third-party script, font or image.
 */

const netlify = readFileSync('hosting/netlify/_headers', 'utf8');
const header = (name: string) =>
  netlify.match(new RegExp(`^\\s+${name}: (.+)$`, 'm'))?.[1]?.trim() ?? '';
const NAMES = [
  'Content-Security-Policy',
  'Strict-Transport-Security',
  'X-Content-Type-Options',
  'X-Frame-Options',
  'Referrer-Policy',
  'Permissions-Policy',
];
const CSP = header('Content-Security-Policy');

test('every host template sends the same security headers', () => {
  const templates = {
    'hosting/vercel.json': readFileSync('hosting/vercel.json', 'utf8'),
    'hosting/apache/.htaccess': readFileSync('hosting/apache/.htaccess', 'utf8'),
    'hosting/nginx/security-headers.conf': readFileSync(
      'hosting/nginx/security-headers.conf',
      'utf8',
    ),
  };
  expect(CSP).toContain("frame-ancestors 'none'");
  expect(CSP).toContain("object-src 'none'");
  for (const name of NAMES) {
    const value = header(name);
    expect(value, `${name} in hosting/netlify/_headers`).not.toBe('');
    for (const [file, text] of Object.entries(templates)) {
      expect.soft(text, `${name} in ${file}`).toContain(name);
      expect.soft(text, `${name} value in ${file}`).toContain(value);
    }
  }
});

test('no page breaks under the content security policy', async ({ page }) => {
  test.setTimeout(240_000);
  const violations: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error' && /Content Security Policy/i.test(msg.text())) {
      violations.push(`${page.url()}: ${msg.text().slice(0, 200)}`);
    }
  });
  await page.route('**/*', async (route) => {
    const response = await route.fetch();
    const headers = response.headers();
    if (route.request().resourceType() === 'document') headers['content-security-policy'] = CSP;
    await route.fulfill({ response, headers });
  });
  for (const path of ['', ...sitemapPaths()]) {
    await page.goto(path);
    await page.waitForLoadState('load');
  }
  // The forms' scripts run under the policy too: a validation pass on the project request form.
  await page.goto('work-with-axis/developer-project-owner/');
  const form = page.locator('form[data-form-id]');
  await form.locator('[data-next]').click();
  await expect(form.locator('[data-summary]')).toBeVisible();
  expect(violations).toEqual([]);
});
