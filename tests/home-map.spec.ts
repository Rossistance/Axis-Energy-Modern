import { test, expect } from '@playwright/test';

/**
 * Home page: hero line, footprint map directly below the hero, employee ownership below the
 * map (moved from Why Axis, 2026-10-01), no teaser sections.
 */

test('hero line reads "Solar, battery storage and microgrids built for performance."', async ({
  page,
}) => {
  await page.goto('');
  await expect(page.locator('.hero .lead')).toHaveText(
    'Solar, battery storage and microgrids built for performance.',
  );
});

test('the footprint map follows the hero and the teaser sections are gone', async ({ page }) => {
  await page.goto('');
  const sections = page.locator('main > section');
  await expect(sections).toHaveCount(3);
  await expect(sections.nth(0)).toHaveClass(/hero/);
  await expect(sections.nth(1)).toHaveClass(/footprint/);
  await expect(sections.nth(2)).toHaveAttribute('id', 'employee-owned');
  for (const id of [
    'services-title',
    'work-title',
    'why-title',
    'news-title',
    'recognition-title',
  ]) {
    await expect(page.locator(`#${id}`)).toHaveCount(0);
  }
});

test('map shades the O&M states, the lower 48 and leaves Alaska and Hawaii neutral', async ({
  page,
}) => {
  await page.goto('');
  const states = page.locator('.footprint__states path');
  await expect(states).toHaveCount(51);
  await expect(page.locator('.footprint__states .is-om')).toHaveCount(4);
  await expect(page.locator('.footprint__states .is-outside')).toHaveCount(2);
  await expect(page.locator('.footprint__states .is-project')).toHaveCount(45);
  const fills = await page.evaluate(() =>
    ['is-om', 'is-project', 'is-outside'].map(
      (c) => getComputedStyle(document.querySelector(`.footprint__states .${c}`)!).fill,
    ),
  );
  expect(new Set(fills).size).toBe(3);
});

test('headquarters pin and project pins are shown, and nothing on the map is clickable', async ({
  page,
}) => {
  await page.goto('');
  const map = page.locator('.footprint__map');
  await expect(map).toHaveAttribute('role', 'img');
  await expect(map.locator('.footprint__label-name')).toHaveText('Holly Springs, NC');
  expect(await map.locator('.footprint__pins use').count()).toBeGreaterThanOrEqual(20);
  await expect(map.locator('a, button, [tabindex]')).toHaveCount(0);
  await expect(page.locator('.footprint__legend li')).toHaveCount(4);
});

test('the employee-owned section sits under the map with Josh Butler’s quote', async ({ page }) => {
  await page.goto('');
  const owners = page.locator('#employee-owned');
  await expect(owners.locator('h2')).toHaveText('A company of owners');
  await expect(owners.locator('blockquote')).toContainText('a company of owners');
  await expect(owners.locator('figcaption')).toContainText('Josh Butler, President, Axis Energy');
  await expect(owners.locator('.owners__card')).toContainText('100% employee-owned');
  await expect(owners.locator('.owners__card')).toContainText('1910 Legacy Enterprises');
});
