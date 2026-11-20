import { test, expect } from '@playwright/test';

/**
 * Project pages (2026-10-01): a compact title band instead of the project's photo, then the
 * key figures and the narrative first, with the photo beside them at a moderate size.
 */

const pages = [
  'project/walnut-grove-microgrid/',
  'project/floyd-road/',
  'project/charleston-rooftop-solar/',
] as const;

for (const path of pages) {
  test(`${path} opens on the title, key figures and narrative, not the photo`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(path);
    const head = page.locator('main > .project-head');
    await expect(head.locator('h1')).toBeVisible();
    await expect(head.locator('img, picture')).toHaveCount(0);
    expect((await head.boundingBox())!.height).toBeLessThanOrEqual(240);
    await expect(head.locator('.project-head__meta')).toContainText(/, [A-Z]{2}|Various/);

    // Figures and the narrative show in the first screen, before any photo.
    const figures = page.locator('.figures');
    await expect(figures.locator('dt').first()).toHaveText('Solar');
    await expect(figures).toBeInViewport();
    await expect(page.locator('.overview__story p').first()).toBeInViewport();
    const figuresTop = (await figures.boundingBox())!.y;
    const photo = page.locator('.overview__media .photo-frame').first();
    const photoBox = (await photo.boundingBox())!;
    expect(photoBox.width).toBeLessThanOrEqual(500);
    expect(photoBox.y).toBeGreaterThanOrEqual(figuresTop - 1);
  });
}

test('the key facts carry size, storage, completion and role where known', async ({ page }) => {
  await page.goto('project/walnut-grove-microgrid/');
  await expect(page.locator('.figures dt')).toHaveText([
    'Solar',
    'Storage',
    'Commissioned',
    'Axis role',
  ]);
  await expect(page.locator('.figures dd').first()).toHaveText('2.75 MWdc');
  await expect(page.locator('.scope li')).toHaveCount(5);
  await expect(page.locator('.project-head__meta a')).toHaveAttribute(
    'href',
    /\/markets\/#co-ops-utilities$/,
  );
  await expect(page.locator('.delivery__item h3')).toHaveText([
    'Challenge',
    'Axis approach',
    'Impact',
  ]);
});

test('on phones the figures come before the photo', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('project/walnut-grove-microgrid/');
  await expect(page.locator('.figures')).toBeInViewport();
  const figures = (await page.locator('.figures').boundingBox())!;
  const photo = (await page.locator('.overview__media .photo-frame').first().boundingBox())!;
  expect(photo.y).toBeGreaterThan(figures.y + figures.height);
});

test('related projects are compact cards, same market or type first', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('project/walnut-grove-microgrid/');
  const cards = page.locator('.related__grid .project-card');
  await expect(cards).toHaveCount(4);
  // The other Electric Co-ops & Utilities project leads.
  await expect(cards.first().locator('.project-card__title')).toHaveText(
    'NCEMC Solar and Storage Portfolio',
  );
  for (const card of await cards.all()) {
    expect((await card.boundingBox())!.height).toBeLessThanOrEqual(300);
  }
});

test('GE Aviation Durham is told from its 2026-11-02 abstract, as heritage EPC work', async ({
  page,
}) => {
  await page.goto('project/durham-manufacturing-solar/');
  const main = page.locator('main');
  await expect(page.locator('.figures')).toContainText('EPC');
  await expect(main).toContainText('drilled piers');
  await expect(main).toContainText('White Electrical');
  // Audit M6 (2026-11-02): no "Axis Energy began work" in 2014 and no "MWDC".
  await expect(main).not.toContainText('Axis Energy began work');
  await expect(main).not.toContainText('MWDC');
  await expect(main).not.toContainText(/construction management/i);
});

test('the new C&I profiles show their delivery story without a photo yet', async ({ page }) => {
  for (const path of ['project/reading-dual-array-solar/', 'project/gainesville-solar-canopy/']) {
    await page.goto(path);
    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.locator('.delivery__item h3').first()).toHaveText('Challenge');
    await expect(page.locator('main')).toContainText('How Axis controlled execution');
  }
});
