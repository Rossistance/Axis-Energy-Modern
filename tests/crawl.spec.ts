import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { sitemapPaths } from './routes';

const paths = sitemapPaths();

test('sitemap lists every route', () => {
  expect(paths.length).toBeGreaterThanOrEqual(15);
  for (const p of [
    '',
    'services/',
    'projects/',
    'why-axis/',
    'about/',
    'leadership/',
    'news/',
    'careers/',
    'contact/',
    'request-a-quote/',
    'subcontractors/',
    'team/josh-butler/',
    'project/north-carolina-utility-scale-portfolio/',
  ]) {
    expect(paths).toContain(p);
  }
});

for (const path of paths) {
  test(`${path || '/'} renders without console errors and passes axe`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (err) => errors.push(err.message));
    const response = await page.goto(path, { waitUntil: 'networkidle' });
    expect(response?.status(), `status for ${path}`).toBe(200);
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page).toHaveTitle(/Axis Energy/);
    expect(errors, `console errors on ${path}`).toEqual([]);

    // @axe-core/playwright ships types for a newer playwright-core; the runtime API is identical.
    const results = await new AxeBuilder({
      page: page as unknown as ConstructorParameters<typeof AxeBuilder>[0]['page'],
    })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    const serious = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );
    expect(
      serious.map(
        (v) => `${v.id}: ${v.help} (${v.nodes.length} nodes) e.g. ${v.nodes[0]?.target.join(' ')}`,
      ),
      `axe violations on ${path}`,
    ).toEqual([]);
  });
}

test('404 page and legacy redirects exist in the build', async ({ page }) => {
  const res = await page.goto('404/');
  expect(res?.status()).toBe(200);
  await expect(page.locator('main h1')).toContainText('couldn’t find');
  const redirect = await page.goto('team/');
  expect(redirect?.status()).toBeLessThan(400);
  await page.waitForURL(/leadership\/$/);
});
