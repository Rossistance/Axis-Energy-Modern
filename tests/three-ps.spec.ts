import { test, expect } from '@playwright/test';
import { sitemapPaths } from './routes';

/**
 * The 3 P's update (pain, purpose, promise), approved by the owner on 2026-11-02 with five
 * changes: "Kept producing" replaced, no price or fixed fee on the Plant Health Assessment, no
 * 24/7 hotline (the business number and a response within 24 hours instead), safety figures from
 * 1910 Legacy's consolidated record, and the GE Florence quote as the client testimonial.
 */

const PROMISE = 'Built right. Energized on schedule. Performing for years.';

test('no page carries the concept review scaffolding or the retired wording', async ({ page }) => {
  for (const path of ['', ...sitemapPaths()]) {
    await page.goto(path);
    await expect.soft(page.locator('[data-p3], [data-p3-label], .tbc'), path).toHaveCount(0);
    const text = (await page.locator('body').textContent()) ?? '';
    for (const retired of [
      '· to confirm',
      'Strategy update concept',
      'Kept producing',
      'kept producing',
      'fixed fee',
      'fixed-fee',
      // "24/7" alone stays allowed: GE Durham's plant runs 24/7.
      '24/7 rapid',
      '24/7 response',
      '24/7 service',
      'one business day',
      // The 24 hours are a reply to the request, not a site visit (Ross, 2026-11-20).
      'Rapid response within 24 hours',
      'Rapid response, within 24 hours',
      'on site within 24',
      'on-site within 24',
      // Audit H1: ask for salary expectations, never salary history.
      'salary history',
    ]) {
      expect.soft(text.includes(retired), `${path || '/'}: "${retired}"`).toBe(false);
    }
  }
});

test("home leads with the promise, the owner's pain and two next steps", async ({ page }) => {
  await page.goto('');
  const hero = page.locator('.hero .partnership');
  await expect(hero.locator('h1')).toHaveText(PROMISE);
  await expect(hero.locator('.partnership__pain')).toContainText('the owner pays for it');
  const ctas = hero.locator('.partnership__cta a');
  await expect(ctas).toHaveText(['Start a project', 'Existing plant? Get it producing']);
  await expect(ctas.first()).toHaveAttribute(
    'href',
    /\/work-with-axis\/developer-project-owner\/$/,
  );
  await expect(ctas.last()).toHaveAttribute('href', /\/om-and-technical-services\/#plant-health$/);

  const band = page.locator('#your-risk');
  await expect(band.locator('h2')).toHaveText('Energy projects fail in the gaps. We close them.');
  await expect(band.locator('.three-ps__card h3').last()).toHaveText(PROMISE);
  await expect(band.locator('.three-ps__card').last()).toContainText(
    '24-hour response on every request',
  );
  await expect(band.locator('.three-ps__proof a')).toHaveCount(3);
});

test('Why Axis states the promise and seven commitments, with proof still to come marked as such', async ({
  page,
}) => {
  await page.goto('why-axis/');
  await expect(page.locator('main h1')).toHaveText(PROMISE);
  const items = page.locator('#promise .promise-item');
  await expect(items).toHaveCount(7);
  await expect(items.nth(5).locator('h3')).toHaveText(
    'A response to every request within 24 hours',
  );
  await expect(items.nth(5)).toContainText('Alabama');

  // Safety rates are 1910 Legacy's consolidated figures; in preview, points without a figure
  // show as "To come" (production leaves them out).
  const proof = page.locator('.proof-panel__list li');
  await expect(proof).toHaveCount(4);
  await expect(proof.nth(0)).toContainText('1910 Legacy Enterprises, consolidated');
  await expect(proof.nth(1)).toContainText('1910 Legacy Enterprises, consolidated');
  await expect(proof.first()).toHaveClass(/is-pending/);
});

test('the GE Florence quote shows on Why Axis and the Florence page, unnamed and pending approval', async ({
  page,
}) => {
  for (const path of ['why-axis/', 'project/florence-solar-array/']) {
    await page.goto(path);
    const quote = page.locator('main .testimonial');
    await expect(quote).toHaveCount(1);
    await expect(quote.locator('blockquote')).toContainText(
      '[Axis Energy’s] commitment to quality',
    );
    await expect(quote.locator('blockquote')).not.toContainText('White');
    // Attributed by title and company only (Ross, 2026-11-20).
    await expect(quote.locator('figcaption strong')).toHaveText('GE Solar');
    await expect(quote.locator('figcaption')).toContainText('Senior Project Manager');
    await expect(quote.locator('figcaption')).toHaveText(
      /^\s*GE Solar\s*Senior Project Manager\s*$/,
    );
    await expect(quote.locator('.testimonial__pending')).toHaveText('Pending approval');
  }
});

test('the Plant Health Assessment leads the O&M page, quoted per plant', async ({ page }) => {
  await page.goto('om-and-technical-services/');
  const section = page.locator('#plant-health');
  await expect(section.locator('h2')).toHaveText('Is your plant producing what it should?');
  await expect(section).toContainText('quoted after a short review');
  await expect(section).not.toContainText(/\$|price|fee/i);
  await expect(section.locator('.card')).toHaveCount(3);
  await expect(page.locator('.om-intro__response')).toContainText(
    'We respond to every service request within 24 hours.',
  );
});

test('Project Rescue & EPC Takeover is a service page, in the menu and the footer', async ({
  page,
}) => {
  await page.goto('services/project-rescue/');
  await expect(page.locator('main h1')).toHaveText('Project Rescue & EPC Takeover');
  await expect(page.locator('.crumbs li')).toHaveText([
    'Home',
    'Services',
    'Project Rescue & EPC Takeover',
  ]);
  await expect(page.locator('.rescue-callers > li')).toHaveCount(4);
  await expect(page.locator('.rescue-steps > li')).toHaveCount(5);
  expect(await page.locator('.rescue-proof .project-card').count()).toBeGreaterThanOrEqual(3);
  await expect(page.getByRole('link', { name: 'Talk to us about a takeover' })).toHaveAttribute(
    'href',
    /\/work-with-axis\/developer-project-owner\/$/,
  );
  await expect(
    page.locator('footer').getByRole('link', { name: 'Project Rescue & EPC Takeover' }),
  ).toHaveCount(1);
});

test('storage add-on, About purpose line and the new request types', async ({ page }) => {
  await page.goto('services/battery-storage-and-microgrids/');
  await expect(page.locator('#storage-add-on h2')).toHaveText(
    'Add storage to the solar you already own',
  );
  await page.goto('about/');
  await expect(page.locator('#purpose-title')).toContainText('keeps performing');
  await page.goto('work-with-axis/developer-project-owner/');
  const form = page.locator('form[data-form-id]');
  await expect(form).toContainText('Stalled project / EPC takeover');
  await expect(form).toContainText('Plant Health Assessment');
});

test('the contact band promises a reply within 24 hours and lists no phone number yet', async ({
  page,
}) => {
  await page.goto('');
  const contact = page.locator('.cta-band__contact');
  await expect(contact).toContainText('We respond to every request within 24 hours');
  await expect(contact.locator('a[href^="tel:"]')).toHaveCount(0);
});
