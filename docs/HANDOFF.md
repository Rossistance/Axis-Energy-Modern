# Hand-off guide

For whoever publishes the new Axis Energy site. The site is a **static build**: `npm run build` produces a `dist/` folder of HTML, CSS, JavaScript and images that any web host can serve. No WordPress, database or server-side code is required.

## 1. Requirements

- Node.js 22 (LTS) and npm 10+ to build. Nothing is needed on the web server.
- The repository: `https://github.com/Rossistance/Axis-Energy-Modern` (branch `Main-Backup`).

## 2. Build

```bash
npm ci
SITE_URL=https://www.axis-energyinc.com SITE_BASE=/ PUBLIC_SITE_MODE=production npm run build
```

`dist/` is the complete site. You can also download a ready-made root-domain build from the latest GitHub Actions run (artifact `site-dist`) without installing anything.

### Environment variables

| Variable                                             | Purpose                                                                                                                             | Launch value                                          |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `SITE_URL`                                           | Canonical origin, no trailing slash. Used for canonical tags, sitemap, Open Graph, structured data.                                 | `https://www.axis-energyinc.com`                      |
| `SITE_BASE`                                          | Path the site is served from.                                                                                                       | `/` (GitHub Pages preview uses `/Axis-Energy-Modern`) |
| `PUBLIC_SITE_MODE`                                   | `preview` shows the review ribbon, sample jobs and keeps forms in review mode; `production` hides them. Also controls `robots.txt`. | `production`                                          |
| `PUBLIC_FORM_ENDPOINT_CONTACT`                       | Endpoint the Contact form posts to.                                                                                                 | your form service URL                                 |
| `PUBLIC_FORM_ENDPOINT_RFQ`                           | Endpoint for Request a Quote.                                                                                                       | your form service URL                                 |
| `PUBLIC_FORM_ENDPOINT_SUBS`                          | Endpoint for Subcontractor prequalification.                                                                                        | your form service URL                                 |
| `JOBS_SOURCE`                                        | `static`, `greenhouse`, `lever`, `workable`, `bamboohr` or `json-url`.                                                              | depends on ATS                                        |
| `JOBS_BOARD` / `JOBS_URL`                            | Board identifier for the ATS adapter, or a JSON feed URL.                                                                           | depends on ATS                                        |
| `PUBLIC_JOBS_LINKEDIN_URL`, `PUBLIC_JOBS_INDEED_URL` | Job-board pages linked from Careers. Leave Indeed empty to hide the button.                                                         | company page URLs                                     |

On GitHub Actions these are read from **Settings → Secrets and variables → Actions → Variables** (`vars.*`).

## 3. Hosting options

Pick one. All serve the `dist/` folder.

**GitHub Pages (already configured).** Push to `Main-Backup`; the workflow builds and deploys. One-time step: repository **Settings → Pages → Build and deployment → Source: GitHub Actions**. For a custom domain: add `www.axis-energyinc.com` under Settings → Pages → Custom domain (GitHub creates the `CNAME` file), set repository variables `SITE_URL=https://www.axis-energyinc.com` and `SITE_BASE=/`, and point DNS as described below. Redirects: GitHub Pages cannot issue true 301s; the build ships meta-refresh pages for the old WordPress URLs, which is acceptable but weaker for SEO than the options below.

**Netlify.** New site from Git → build command `npm run build`, publish directory `dist`, environment variables as above. Copy `hosting/netlify/_redirects` into `public/` (so it lands in `dist/`) for real 301 redirects. Netlify Forms is _not_ used; keep the form endpoints.

**Vercel.** Import the repository; framework preset "Astro"; add the environment variables. Copy `hosting/vercel.json` to the project root for 301 redirects.

**Cloudflare Pages.** Build command `npm run build`, output `dist`; same `_redirects` file as Netlify.

**Traditional host (cPanel, Plesk, plain Apache/nginx, S3 + CloudFront).** Upload the contents of `dist/` to the document root. For Apache copy `hosting/apache/.htaccess` next to `index.html`; for nginx include `hosting/nginx/redirects.conf` in the server block. Make sure the server serves `404.html` for unknown paths and sets long cache headers on `/_astro/*` (file names are content-hashed).

## 4. Forms

The three forms post JSON (`Content-Type: application/json`, `Accept: application/json`) with the field ids as keys plus `_subject`, `_form`, `_replyto` and a `_gotcha` honeypot. This matches Formspree's AJAX API; Basin, Getform, Web3Forms and most similar services accept the same shape. Steps with Formspree as an example:

1. Create one form per intake (Contact, Request a Quote, Subcontractor prequalification) and note each endpoint URL.
2. Set `PUBLIC_FORM_ENDPOINT_CONTACT`, `_RFQ`, `_SUBS` and rebuild. Forms switch from review mode to live automatically.
3. Turn on the service's spam filtering and email notifications; the subcontractor form carries business-sensitive data (insurance limits, safety rates), so restrict who receives it and prefer a service with access controls and TLS storage.
4. File uploads are intentionally not collected; the page tells subcontractors documents will be requested by secure email after review. If uploads are wanted later, most services support them on paid plans and the field schema in `src/data/forms/subcontractor.ts` can be extended.

Without an endpoint a form shows "Review mode": submitting composes an email draft to info@axis-energyinc.com instead of pretending the message was delivered.

## 5. Jobs feed

LinkedIn and Indeed do not provide a public API for listing a company's openings, so the Careers page lists roles from the applicant-tracking system (ATS) that 1910 Legacy Talent Acquisition uses and links out to the LinkedIn/Indeed pages.

- Greenhouse: `JOBS_SOURCE=greenhouse`, `JOBS_BOARD=<board token>`
- Lever: `JOBS_SOURCE=lever`, `JOBS_BOARD=<site name>`
- Workable: `JOBS_SOURCE=workable`, `JOBS_BOARD=<subdomain>`
- BambooHR: `JOBS_SOURCE=bamboohr`, `JOBS_BOARD=<subdomain>`
- Anything else with a JSON feed (JazzHR, ADP, Paylocity, custom): `JOBS_SOURCE=json-url`, `JOBS_URL=<feed>` returning an array of `{title, url, location, type, department, posted, summary}`.
- No ATS: keep `static` and maintain `src/content/jobs/*.md` by hand.

Listings are fetched when the site builds. The GitHub Actions workflow rebuilds every six hours; on other hosts schedule a rebuild (Netlify/Vercel build hooks, or a cron that runs the build) so the feed stays current. If the feed is unreachable the build still succeeds and falls back to the static listings.

## 6. Legacy URLs

Old WordPress paths and their new homes:

| Old                                                     | New                                                          |
| ------------------------------------------------------- | ------------------------------------------------------------ |
| `/team/`                                                | `/leadership/`                                               |
| `/project/`                                             | `/projects/`                                                 |
| `/category/general/`                                    | `/news/`                                                     |
| `/project-category/general/`                            | `/projects/`                                                 |
| `/five-takeaways-from-a-nc-energy-policy-panel/`        | `/news/five-takeaways-from-a-nc-energy-policy-panel/`        |
| `/solar-could-provide-25-of-the-worlds-energy-by-2050/` | `/news/solar-could-provide-25-of-the-worlds-energy-by-2050/` |
| `/sitemap.xml`                                          | `/sitemap-index.xml`                                         |

All other pages keep their paths (`/services/`, `/projects/`, `/why-axis/`, `/about/`, `/leadership/`, `/news/`, `/careers/`, `/contact/`, `/project/<slug>/`, `/team/josh-butler/`). New pages: `/request-a-quote/`, `/subcontractors/`, the four service pages `/services/solar-epc/`, `/services/battery-storage-and-microgrids/`, `/services/electrical-infrastructure-and-commissioning/`, `/services/om-and-technical-services/`, and the O&M offering pages under `/services/om-and-technical-services/<offering>/`.

## 7. Cut-over checklist

1. Set launch environment variables (`SITE_URL`, `SITE_BASE=/`, `PUBLIC_SITE_MODE=production`, form endpoints, jobs source) and build.
2. Deploy to the chosen host and test on its temporary URL: every page, both forms in live mode, the jobs list, the 404 page, the redirects.
3. DNS: point `www.axis-energyinc.com` (CNAME) and the apex `axis-energyinc.com` (A/ALIAS or redirect to www) at the new host; enable HTTPS (Let's Encrypt is automatic on Pages, Netlify, Vercel and Cloudflare).
4. Keep the WordPress site reachable for a few days on a different hostname in case anything was missed, then retire it (and its plugins) so it is no longer a security exposure.
5. Google Search Console: verify the property, submit `https://www.axis-energyinc.com/sitemap-index.xml`, and watch the Coverage report for 404s from old links.
6. Update the LinkedIn company page and Solar Power World profile links if they point at old URLs.

## 8. After launch

- Content edits are Markdown or small TypeScript data files; see the README. Any git push to `Main-Backup` rebuilds the site.
- Keep dependencies current a few times a year: `npm outdated`, `npx @astrojs/upgrade`, then `npm test`.
- Design tokens (colours, type, spacing) live in `src/styles/tokens.css`; brand colours are the official PANTONE 288 blue (#004B8D) and PANTONE 348 green (#008752).

## 9. Known limitations and open decisions

- Decisions listed in `docs/CONTENT-REVIEW.md` (statistics basis, portfolio publication, RFQ and subcontractor fields, jobs source) are pending the Axis team review; the preview build ships them as drafts.
- Page header photos are placeholders (the preview labels them "Placeholder photo"). Before launch, set the final photo for each page in `src/data/heroes.ts` and mark it `placeholder: false`; then re-run `npm run og` so the social sharing image uses the new photography too. A production build (`PUBLIC_SITE_MODE=production`) hides the label but not the placeholder photo itself.
- Project photos are small: the three from the old site are 392 px wide and the three brochure crops about 660 px. They are shown at native size or smaller, so they look fine but not crisp on high-density screens. Replace them with originals in `src/assets/projects/` (same file names) and the build regenerates every size.
- The Leadership page has one profile (as on the live site). Additional profiles are a content decision.
- GitHub Pages cannot serve real 301 redirects or custom headers; the other hosts can.
