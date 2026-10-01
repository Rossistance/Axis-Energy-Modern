import { test, expect } from '@playwright/test';
import { sitemapPaths } from './routes';

/**
 * "Request a Quote" became "Work with Axis" (2026-10-01): a header menu with two options,
 * Developer/Project Owner and Subcontractor, and an overview page with one card each.
 */

const options = [
  ['Developer/Project Owner', /\/work-with-axis\/developer-project-owner\/$/],
  ['Subcontractor', /\/work-with-axis\/subcontractor\/$/],
] as const;

test('header "Work with Axis" opens on hover to the two options', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('');
  const cta = page.locator('.header-cta');
  await expect(cta.locator('.header-cta__link')).toHaveText('Work with Axis');
  await expect(cta.locator('.header-cta__link')).toHaveAttribute('href', /\/work-with-axis\/$/);
  const menu = page.locator('#submenu-work-with-axis');
  await expect(menu).toBeHidden();
  await cta.hover();
  await expect(menu).toBeVisible();
  const links = menu.locator('a');
  await expect(links).toHaveText(options.map(([label]) => label));
  for (const [i, [, href]] of options.entries()) {
    await expect(links.nth(i)).toHaveAttribute('href', href);
  }
});

test('the Work with Axis menu opens from the keyboard and closes on Escape', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('');
  const toggle = page.locator('[aria-controls="submenu-work-with-axis"]');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#submenu-work-with-axis a').first()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
});

test('the Work with Axis page offers the two options', async ({ page }) => {
  await page.goto('work-with-axis/');
  await expect(page.locator('h1')).toHaveText('Work with Axis');
  const cards = page.locator('a.option-card');
  await expect(cards).toHaveCount(2);
  for (const [i, [label, href]] of options.entries()) {
    await expect(cards.nth(i).locator('h3')).toHaveText(label);
    await expect(cards.nth(i)).toHaveAttribute('href', href);
  }
});

test('each option page sits under Work with Axis with its form', async ({ page }) => {
  for (const [path, title, form] of [
    ['work-with-axis/developer-project-owner/', 'Developer/Project Owner', 'rfq'],
    ['work-with-axis/subcontractor/', 'Subcontractor', 'subcontractor'],
  ]) {
    await page.goto(path);
    await expect(page.locator('h1')).toHaveText(title);
    await expect(page.locator('.crumbs li')).toHaveText(['Home', 'Work with Axis', title]);
    await expect(page.locator(`form[data-form-id="${form}"]`)).toHaveCount(1);
  }
});

test('the phone menu lists the two options under Work with Axis', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('');
  await page.locator('[data-drawer-open]').click();
  const cta = page.locator('#site-drawer .drawer__cta');
  await expect(cta.locator('.drawer__cta-title')).toHaveText('Work with Axis');
  await expect(cta.locator('a.btn')).toHaveText(options.map(([label]) => label));
});

test('no page says "Request a Quote" any more', async ({ page }) => {
  for (const path of ['', ...sitemapPaths(), '404/']) {
    await page.goto(path);
    const text = await page.locator('body').textContent();
    expect.soft(text ?? '', `${path || '/'}`).not.toMatch(/request a quote/i);
  }
});

test('the old Request a Quote and Subcontractors addresses redirect', async ({ page }) => {
  await page.goto('request-a-quote/');
  await page.waitForURL(/\/work-with-axis\/developer-project-owner\/$/);
  await page.goto('subcontractors/');
  await page.waitForURL(/\/work-with-axis\/subcontractor\/$/);
});
