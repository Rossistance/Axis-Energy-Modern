import { test, expect } from '@playwright/test';

/**
 * Home page: hero headline and the footprint map directly below it, no other sections
 * (employee ownership moved to About on 2026-10-01).
 */

test('the hero headline is "The Power of Partnership"', async ({ page }) => {
  await page.goto('');
  await expect(page.locator('.hero h1')).toHaveText('The Power of Partnership');
});

test('the footprint map follows the hero and the teaser sections are gone', async ({ page }) => {
  await page.goto('');
  const sections = page.locator('main > section');
  await expect(sections).toHaveCount(2);
  await expect(sections.nth(0)).toHaveClass(/hero/);
  await expect(sections.nth(1)).toHaveClass(/footprint/);
  await expect(page.locator('#employee-owned')).toHaveCount(0);
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
  // NC, SC, GA, VA and, since the Wilmer O&M contract (owner, 2026-11-10), Alabama.
  await expect(page.locator('.footprint__states .is-om')).toHaveCount(5);
  await expect(page.locator('.footprint__states .is-outside')).toHaveCount(2);
  await expect(page.locator('.footprint__states .is-project')).toHaveCount(44);
  await expect(page.locator('.footprint__legend')).toContainText('Virginia and Alabama');
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
  // Towns from the owner's project list (2026-11-10) plus the project entries, one pin per town.
  expect(await map.locator('.footprint__pins use').count()).toBeGreaterThanOrEqual(50);
  await expect(page.locator('#footprint-map-desc')).toContainText(/Round pins mark \d+ towns/);
  await expect(map.locator('a, button, [tabindex]')).toHaveCount(0);
  await expect(page.locator('.footprint__legend li')).toHaveCount(5);
});

test('active O&M sites have their own pin, described in words as well as colour', async ({
  page,
}) => {
  // Owner, 2026-11-10: "adding pins with a different color head for the active O&M site addresses".
  await page.goto('');
  const om = page.locator('.footprint__pins use.is-om');
  expect(await om.count()).toBeGreaterThanOrEqual(15);
  const desc = (await page.locator('#footprint-map-desc').textContent()) ?? '';
  expect(desc).toMatch(new RegExp(`mark ${await om.count()} towns where Axis maintains a plant`));
  await expect(page.locator('.footprint__legend')).toContainText('Active O&M contracts');
});
