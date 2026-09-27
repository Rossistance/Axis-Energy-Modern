import { test, expect } from '@playwright/test';

test.describe('Request a Quote (multi-step, review mode)', () => {
  test('validates each step, saves a draft, reviews and offers an email draft on submit', async ({
    page,
  }) => {
    await page.goto('request-a-quote/');
    const form = page.locator('form[data-form-id="rfq"]');
    await expect(form).toHaveAttribute('data-mode', 'review');

    // Step 1: empty submit shows an error summary that receives focus
    await form.locator('[data-next]').click();
    const summary = form.locator('[data-summary]');
    await expect(summary).toBeVisible();
    await expect(summary).toBeFocused();
    await expect(form.locator('.field.is-invalid')).not.toHaveCount(0);

    await form.locator('#rfq-name').fill('Test Person');
    await form.locator('#rfq-company').fill('Example Co');
    await form.locator('#rfq-email').fill('not-an-email');
    await form.locator('#rfq-orgType').selectOption({ index: 1 });
    await form.locator('[data-next]').click();
    await expect(form.locator('[data-field-id="email"].is-invalid')).toBeVisible();
    await form.locator('#rfq-email').fill('test@example.com');
    await form.locator('[data-next]').click();
    await expect(form.locator('[data-step="1"]')).toHaveClass(/is-active/);

    // Draft persisted in localStorage (saved when the step advanced)
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem('axis-rfq-draft')))
      .toContain('test@example.com');

    // Reload restores the draft
    await page.reload();
    await expect(page.locator('#rfq-company')).toHaveValue('Example Co');
    await expect(page.locator('[data-draft-note]')).toBeVisible();

    // Continue through the remaining steps
    const f = page.locator('form[data-form-id="rfq"]');
    await f.locator('[data-next]').click();
    await f.locator('input[name="projectType"]').first().check();
    await f.locator('#rfq-city').fill('Raleigh');
    await f.locator('#rfq-state').selectOption('NC');
    await f.locator('input[name="services"]').nth(3).check();
    await f.locator('[data-next]').click();
    await f.locator('#rfq-description').fill('A 5 MW ground-mount project with storage.');
    await f.locator('[data-next]').click();

    // Review step lists the answers
    await expect(f.locator('[data-review] .review__group')).toHaveCount(3);
    await expect(f.locator('[data-review]')).toContainText('Example Co');
    await expect(f.locator('.review__mode')).toBeVisible();

    // Submit in review mode composes an email link and never claims delivery
    await f.locator('[data-submit]').click();
    const status = f.locator('[data-status]');
    await expect(status).toHaveAttribute('data-state', 'success');
    await expect(status).toContainText('nothing was sent');
    const mailto = await status.locator('a.btn').getAttribute('href');
    expect(mailto?.startsWith('mailto:info@axis-energyinc.com')).toBe(true);
    expect(decodeURIComponent(mailto ?? '')).toContain('Example Co');
  });

  test('case-studies deep link prefills the description', async ({ page }) => {
    await page.goto('request-a-quote/?topic=case-studies');
    await expect(page.locator('#rfq-description')).toHaveValue(/case studies/);
  });
});

test.describe('Contact form (single step)', () => {
  test('mirrors the live site fields and validates required ones', async ({ page }) => {
    await page.goto('contact/');
    const form = page.locator('form[data-form-id="contact"]');
    for (const id of ['name', 'email', 'phone', 'subject', 'message']) {
      await expect(form.locator(`[name="${id}"]`)).toHaveCount(1);
    }
    await form.locator('[data-submit]').click();
    await expect(form.locator('[data-summary]')).toBeVisible();
    await expect(form.locator('[data-field-id="name"].is-invalid')).toBeVisible();
    await expect(form.locator('[data-field-id="phone"].is-invalid')).toHaveCount(0);
  });
});

test.describe('Subcontractor prequalification', () => {
  test('has seven steps including review and required safety answers', async ({ page }) => {
    await page.goto('subcontractors/');
    const form = page.locator('form[data-form-id="subcontractor"]');
    await expect(form.locator('[data-steps] li')).toHaveCount(7);
    await expect(form.locator('[data-field-id="emr1"][data-required="true"]')).toHaveCount(1);
    await expect(form.locator('[data-field-id="certify"]')).toHaveCount(1);
  });
});

test('projects filters narrow the grid and sync the URL', async ({ page }) => {
  await page.goto('projects/');
  const cards = page.locator('.project-card');
  const total = await cards.count();
  expect(total).toBeGreaterThan(0);
  await page.locator('#f-state').selectOption('SC');
  await expect(page.locator('[data-filters-count]')).toContainText('1 project');
  await expect(page).toHaveURL(/state=SC/);
  await page.locator('[data-filters-reset]').first().click();
  await expect(page.locator('[data-filters-count]')).toContainText(`${total} projects`);
});
