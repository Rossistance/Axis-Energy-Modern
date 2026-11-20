import { test, expect } from '@playwright/test';
import { sitemapPaths } from './routes';

/**
 * The number the old website listed is Josh Butler's cell, so no page publishes a phone
 * number other than the fax (owner, 2026-10-01). Email, address, hours and fax stay. A
 * business line goes in `company.ts` once Ross confirms which number it is (2026-11-20);
 * allow it here then. The number itself is kept out of the repository (audit B5, 2026-11-02).
 */
const PHONE = /\(?\b\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}\b/g;
const FAX_DIGITS = '9192852581';

test('no page lists a phone number other than the fax, or any phone link', async ({ page }) => {
  for (const path of ['', ...sitemapPaths(), '404/']) {
    await page.goto(path);
    const html = await page.content();
    const text = await page.locator('body').innerText();
    const numbers = (text.match(PHONE) ?? []).filter((n) => n.replace(/\D/g, '') !== FAX_DIGITS);
    expect.soft(numbers, `${path || '/'}`).toEqual([]);
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
