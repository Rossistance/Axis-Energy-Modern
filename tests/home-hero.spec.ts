import { test, expect, type Page } from '@playwright/test';

/** Home page hero: project photo carousel and the three highlight links. */

const carousel = (page: Page) => page.locator('[data-carousel]');
const activeSlide = (page: Page) => page.locator('[data-carousel] [data-slide].is-active');

test('highlight bubbles link to Projects, About and Why Axis', async ({ page }) => {
  await page.goto('');
  const chips = page.locator('.hero__chips a');
  await expect(chips).toHaveCount(3);
  await expect(chips.nth(0)).toContainText('150 MW');
  await expect(chips.nth(0)).toHaveAttribute('href', /\/projects\/$/);
  await expect(chips.nth(1)).toContainText('employee-owned');
  await expect(chips.nth(1)).toHaveAttribute('href', /\/about\/$/);
  await expect(chips.nth(2)).toContainText('Top Solar Contractor');
  await expect(chips.nth(2)).toHaveAttribute('href', /\/why-axis\/#by-the-numbers$/);
});

test('the Top Solar Contractor bubble opens Why Axis at the recognition', async ({ page }) => {
  await page.goto('');
  await page.locator('.hero__chips a', { hasText: 'Top Solar Contractor' }).click();
  await expect(page).toHaveURL(/\/why-axis\/#by-the-numbers$/);
  const heading = page.locator('#numbers-title');
  await expect(heading).toBeInViewport();
  // The sticky header must not cover the section heading.
  const headerBottom = await page
    .locator('.site-header')
    .evaluate((el) => el.getBoundingClientRect().bottom);
  const headingTop = await heading.evaluate((el) => el.getBoundingClientRect().top);
  expect(headingTop).toBeGreaterThanOrEqual(headerBottom);
});

for (const width of [390, 1280]) {
  test(`bubbles are visible and clickable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('');
    const chips = page.locator('.hero__chips a');
    for (let i = 0; i < 3; i++) await expect(chips.nth(i)).toBeVisible();
    // Playwright refuses to click an element covered by another, so this also proves
    // the bubbles sit above the photos on desktop.
    await chips.nth(1).click();
    await expect(page).toHaveURL(/\/about\/$/);
  });
}

test('carousel shows project photos with captions linking to each project', async ({ page }) => {
  await page.goto('');
  const slides = carousel(page).locator('[data-slide]');
  const count = await slides.count();
  expect(count).toBeGreaterThanOrEqual(2);
  await expect(activeSlide(page)).toHaveCount(1);
  await expect(activeSlide(page).locator('img')).toHaveAttribute('alt', /\S/);
  await expect(activeSlide(page).locator('a')).toHaveAttribute('href', /\/project\/[a-z0-9-]+\/$/);
  await expect(carousel(page).locator('[data-controls]')).toBeVisible();
});

test('previous, next and dot buttons change the photo and stop the slideshow', async ({ page }) => {
  await page.goto('');
  const count = await carousel(page).locator('[data-slide]').count();
  await expect(activeSlide(page)).toHaveAttribute('aria-label', /^1 of /);

  await carousel(page).locator('[data-next]').click();
  await expect(activeSlide(page)).toHaveAttribute('aria-label', /^2 of /);
  await expect(carousel(page).locator('[data-slide]').first()).toHaveAttribute('inert', '');
  await expect(carousel(page)).toHaveAttribute('data-state', 'stopped');
  await expect(carousel(page).locator('[data-toggle]')).toHaveAttribute(
    'aria-label',
    'Play slideshow',
  );

  await carousel(page).locator('[data-prev]').click();
  await expect(activeSlide(page)).toHaveAttribute('aria-label', /^1 of /);

  await carousel(page).locator('[data-dot]').last().click();
  await expect(activeSlide(page)).toHaveAttribute('aria-label', new RegExp(`^${count} of `));
  await expect(carousel(page).locator('[data-dot]').last()).toHaveAttribute('aria-current', 'true');
});

test('slideshow advances on its own, and the pause button stops it', async ({ page }) => {
  await page.clock.install();
  await page.goto('');
  await expect(carousel(page)).toHaveAttribute('data-state', 'playing');

  await page.clock.runFor(6500);
  await expect(activeSlide(page)).toHaveAttribute('aria-label', /^2 of /);

  const toggle = carousel(page).locator('[data-toggle]');
  await toggle.click();
  await expect(carousel(page)).toHaveAttribute('data-state', 'stopped');
  await expect(toggle).toHaveAttribute('aria-label', 'Play slideshow');
  await page.clock.runFor(13000);
  await expect(activeSlide(page)).toHaveAttribute('aria-label', /^2 of /);

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-label', 'Pause slideshow');
  await page.mouse.move(0, 0); // hovering pauses; moving away resumes
  await expect(carousel(page)).toHaveAttribute('data-state', 'playing');
  await page.clock.runFor(6500);
  await expect(activeSlide(page)).not.toHaveAttribute('aria-label', /^2 of /);
});

test('keyboard focus inside the carousel stops the slideshow', async ({ page }) => {
  await page.goto('');
  await expect(carousel(page)).toHaveAttribute('data-state', 'playing');
  await activeSlide(page).locator('a').focus();
  await expect(carousel(page)).toHaveAttribute('data-state', 'stopped');
});

test.describe('with reduced motion', () => {
  test('the slideshow does not rotate on its own', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.clock.install();
    await page.goto('');
    await expect(carousel(page)).toHaveAttribute('data-state', 'stopped');
    await page.clock.runFor(13000);
    await expect(activeSlide(page)).toHaveAttribute('aria-label', /^1 of /);
  });
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('the first photo shows on its own and the controls stay hidden', async ({ page }) => {
    await page.goto('');
    const slides = page.locator('[data-carousel] [data-slide]');
    await expect(slides.first()).toBeVisible();
    await expect(slides.nth(1)).toBeHidden();
    await expect(page.locator('[data-carousel] [data-controls]')).toBeHidden();
    await expect(page.locator('.hero__chips a')).toHaveCount(3);
  });
});
