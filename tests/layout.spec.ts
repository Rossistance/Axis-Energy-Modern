import { test, expect, type Locator, type Page } from '@playwright/test';
import { sitemapPaths } from './routes';

/**
 * Layout regressions the other suites cannot see: sideways scrolling, and form content
 * spilling out of its card (on desktop it slid under the sidebar and covered "Continue").
 */

const paths = sitemapPaths();

async function pageOverflow(page: Page): Promise<number> {
  return page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
}

/** Line-clamped text whose box is taller than its clamp, so part of the next line shows. */
async function clampLeaks(page: Page): Promise<string[]> {
  return page.evaluate(() =>
    Array.from(document.querySelectorAll<HTMLElement>('body *'))
      .filter((el) => {
        const c = getComputedStyle(el);
        const lines = parseInt(c.getPropertyValue('-webkit-line-clamp'), 10);
        if (!lines || el.scrollHeight <= el.clientHeight + 1) return false;
        const lineHeight =
          c.lineHeight === 'normal' ? parseFloat(c.fontSize) * 1.2 : parseFloat(c.lineHeight);
        const box = el.clientHeight - parseFloat(c.paddingTop) - parseFloat(c.paddingBottom);
        return box > lines * lineHeight + 1;
      })
      .map((el) => el.textContent?.trim().slice(0, 40) ?? ''),
  );
}

for (const width of [390, 1280]) {
  test(`no page scrolls sideways or leaks clamped text at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of paths) {
      await page.goto(path);
      expect.soft(await pageOverflow(page), `${path || '/'} is wider than the viewport`).toBe(0);
      expect
        .soft(await clampLeaks(page), `${path || '/'} shows part of a clamped line`)
        .toEqual([]);
    }
  });
}

/** Visible elements inside the form that extend past the form card's edges. */
async function escapingCard(form: Locator): Promise<string[]> {
  return form.evaluate((f) => {
    const card = f.closest('.form-card')!.getBoundingClientRect();
    return Array.from(f.querySelectorAll<HTMLElement>('*'))
      .filter((el) => {
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height || el.closest('.hp')) return false;
        return r.right > card.right + 1 || r.left < card.left - 1;
      })
      .map((el) => `${el.tagName.toLowerCase()}.${Array.from(el.classList).join('.')}`)
      .slice(0, 5);
  });
}

/** True when the element's centre is not covered by anything outside it. */
async function isUncovered(target: Locator): Promise<boolean> {
  return target.evaluate((el) => {
    const r = el.getBoundingClientRect();
    const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return !!hit && (hit === el || el.contains(hit));
  });
}

/** Fill the required fields of the visible step with valid values. */
async function fillRequired(form: Locator) {
  await form.locator('.step.is-active').evaluate((step) => {
    step.querySelectorAll<HTMLElement>('[data-field-id][data-required="true"]').forEach((wrap) => {
      const type = wrap.dataset.type;
      if (type === 'checkboxes' || type === 'radio' || type === 'checkbox') {
        wrap.querySelector<HTMLInputElement>('input')!.checked = true;
      } else if (type === 'select') {
        wrap.querySelector<HTMLSelectElement>('select')!.selectedIndex = 1;
      } else {
        const control = wrap.querySelector<HTMLInputElement | HTMLTextAreaElement>(
          'input, textarea',
        )!;
        const samples: Record<string, string> = {
          email: 'estimating@example.com',
          url: 'https://example.com',
          number: '1',
          date: '2026-01-15',
        };
        control.value = samples[type ?? ''] ?? 'Example';
      }
    });
  });
}

const forms = [
  { path: 'subcontractors/', id: 'subcontractor' },
  { path: 'request-a-quote/', id: 'rfq' },
  { path: 'contact/', id: 'contact' },
];

for (const { path, id } of forms) {
  for (const width of [390, 768, 1024, 1280]) {
    test(`${id} form stays inside its card through every step at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      const loaded = Date.now();
      const form = page.locator(`form[data-form-id="${id}"]`);
      const next = form.locator('[data-next]');
      const steps = await form.locator('[data-step]').count();

      for (let i = 0; i < steps; i++) {
        await expect(form.locator(`[data-step="${i}"]`)).toHaveClass(/is-active/);
        expect(await escapingCard(form), `step ${i + 1} content outside the card`).toEqual([]);
        expect(await pageOverflow(page), `step ${i + 1} scrolls sideways`).toBe(0);

        // Step labels that are shown must fit their segment rather than overflow into the next.
        const clipped = await form.locator('.steps__label').evaluateAll((labels) =>
          labels
            .filter((l) => getComputedStyle(l).position === 'static')
            .filter((l) => l.scrollWidth > l.clientWidth + 1)
            .map((l) => l.textContent?.trim()),
        );
        expect(clipped, 'step labels wider than their segment').toEqual([]);

        const action = i < steps - 1 ? next : form.locator('[data-submit]');
        await action.scrollIntoViewIfNeeded();
        expect(await isUncovered(action), `step ${i + 1} action button is covered`).toBe(true);
        if (i < steps - 1) {
          await fillRequired(form);
          await next.click();
        }
      }

      // On phones the review-mode "open in your email app" button used to push the page wide.
      if (width < 700) {
        await fillRequired(form);
        await page.waitForTimeout(Math.max(0, 2600 - (Date.now() - loaded))); // time-to-submit guard
        await form.locator('[data-submit]').click();
        await expect(form.locator('[data-status]')).toHaveAttribute('data-state', 'success');
        expect(await escapingCard(form), 'status message outside the card').toEqual([]);
        expect(await pageOverflow(page), 'submitted form scrolls sideways').toBe(0);
      }
    });
  }
}
