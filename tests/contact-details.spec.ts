import { test, expect } from '@playwright/test';
import { sitemapPaths } from './routes';

/**
 * The number the old website listed (919.346.8333) is Josh Butler's cell, so no page
 * publishes it (owner, 2026-10-01). Email, address, hours and fax stay.
 */

test('no page lists Josh Butler’s cell or any phone link', async ({ page }) => {
  for (const path of ['', ...sitemapPaths(), '404/']) {
    await page.goto(path);
    const html = await page.content();
    expect.soft(html, `${path || '/'}`).not.toMatch(/346[\s.\-)]*8333/);
    expect.soft(html, `${path || '/'}`).not.toContain('tel:');
    expect.soft(html, `${path || '/'}`).not.toMatch(/"telephone"/);
  }
});

test('Contact still offers email, address, hours and the form', async ({ page }) => {
  await page.goto('contact/');
  const main = page.locator('main');
  await expect(main.locator('a[href^="mailto:"]').first()).toBeVisible();
  await expect(main).toContainText('100 Newspaper Way');
  await expect(main).toContainText('7:30 am');
  await expect(main.locator('form[data-form-id="contact"]')).toHaveCount(1);
});

test('Josh Butler’s profile offers email and LinkedIn but no phone', async ({ page }) => {
  await page.goto('team/josh-butler/');
  await expect(page.locator('.profile-contact .cluster a')).toHaveText(['Email', 'LinkedIn']);
});
