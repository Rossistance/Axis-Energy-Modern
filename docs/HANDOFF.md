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
| `PUBLIC_FORM_ENDPOINT_RFQ`                           | Endpoint for the Developer/Project Owner project request.                                                                           | your form service URL                                 |
| `PUBLIC_FORM_ENDPOINT_SUBS`                          | Endpoint for Subcontractor prequalification.                                                                                        | your form service URL                                 |
| `JOBS_SOURCE`                                        | `static`, `greenhouse`, `lever`, `workable`, `bamboohr` or `json-url`.                                                              | depends on ATS                                        |
| `JOBS_BOARD` / `JOBS_URL`                            | Board identifier for the ATS adapter, or a JSON feed URL.                                                                           | depends on ATS                                        |
| `PUBLIC_JOBS_LINKEDIN_URL`, `PUBLIC_JOBS_INDEED_URL` | Job-board pages linked from Careers. Leave Indeed empty to hide the button.                                                         | company page URLs                                     |
| `NEWS_SOURCE`                                        | `static` (posts kept in `src/content/posts/`), `linkedin` or `json-url`. See section 6.                                             | `linkedin`                                            |
| `LINKEDIN_ORGANIZATION_ID`                           | The Axis Energy page's numeric id.                                                                                                  | from the page admin URL                               |
| `LINKEDIN_ACCESS_TOKEN`                              | **Secret.** Token with `r_organization_social` and `w_organization_social`; lasts 60 days.                                          | see section 6                                         |
| `LINKEDIN_REFRESH_TOKEN`, `LINKEDIN_CLIENT_SECRET`   | **Secrets.** With `LINKEDIN_CLIENT_ID`, let the build renew the access token itself.                                                | if LinkedIn issues one                                |
| `LINKEDIN_API_VERSION`, `LINKEDIN_INCLUDE_RESHARES`  | LinkedIn-Version header (default `202609`; update yearly) and `true` to include reposts (off by default).                           | defaults                                              |
| `NEWS_URL`, `NEWS_LIMIT`                             | JSON feed for `json-url`; number of posts shown (default 9).                                                                        | as needed                                             |

On GitHub Actions these are read from **Settings → Secrets and variables → Actions**: tokens and the client secret under **Secrets** (`secrets.*`), everything else under **Variables** (`vars.*`).

## 3. Hosting options

Pick one. All serve the `dist/` folder.

**GitHub Pages (already configured).** Push to `Main-Backup`; the workflow builds and deploys. One-time step: repository **Settings → Pages → Build and deployment → Source: GitHub Actions**. For a custom domain: add `www.axis-energyinc.com` under Settings → Pages → Custom domain (GitHub creates the `CNAME` file), set repository variables `SITE_URL=https://www.axis-energyinc.com` and `SITE_BASE=/`, and point DNS as described below. Redirects: GitHub Pages cannot issue true 301s; the build ships meta-refresh pages for the old WordPress URLs, which is acceptable but weaker for SEO than the options below.

**Netlify.** New site from Git → build command `npm run build`, publish directory `dist`, environment variables as above. Copy `hosting/netlify/_redirects` into `public/` (so it lands in `dist/`) for real 301 redirects. Netlify Forms is _not_ used; keep the form endpoints.

**Vercel.** Import the repository; framework preset "Astro"; add the environment variables. Copy `hosting/vercel.json` to the project root for 301 redirects.

**Cloudflare Pages.** Build command `npm run build`, output `dist`; same `_redirects` file as Netlify.

**Traditional host (cPanel, Plesk, plain Apache/nginx, S3 + CloudFront).** Upload the contents of `dist/` to the document root. For Apache copy `hosting/apache/.htaccess` next to `index.html`; for nginx include `hosting/nginx/redirects.conf` in the server block. Make sure the server serves `404.html` for unknown paths and sets long cache headers on `/_astro/*` (file names are content-hashed).

## 4. Forms

The three forms post JSON (`Content-Type: application/json`, `Accept: application/json`) with the field ids as keys plus `_subject`, `_form`, `_replyto` and a `_gotcha` honeypot. This matches Formspree's AJAX API; Basin, Getform, Web3Forms and most similar services accept the same shape. Steps with Formspree as an example:

1. Create one form per intake (Contact, Developer/Project Owner project request, Subcontractor prequalification) and note each endpoint URL.
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

## 6. LinkedIn news feed

The News page shows the latest posts from the Axis Energy LinkedIn page: each card has the post's photo, its headline or opening lines and the date, and opens the post on LinkedIn. It uses LinkedIn's official API only; scraping LinkedIn is against its terms.

**What appears.** Posts the Axis Energy page published itself, public and in the main feed, newest first (up to `NEWS_LIMIT`, default 9). Posts by other people or companies that tag or mention Axis are never returned (the API is asked only for posts _authored by_ the page). Reposts are left out unless `LINKEDIN_INCLUDE_RESHARES=true`; ads-only ("dark") posts and drafts are always left out. The photo is the post's image, the first image of a multi-image post, an article's thumbnail or a video's thumbnail; it is downloaded when the site builds and served from the site, because LinkedIn's image links expire.

**Setup (once, by a LinkedIn page admin of Axis Energy):**

1. At [linkedin.com/developers/apps](https://www.linkedin.com/developers/apps) create an app for the Axis Energy company page and have the page verify it.
2. Request the **Community Management API** product for the app. LinkedIn reviews these requests; the use case is displaying the company's own posts on its own website.
3. Signed in as a page admin (Super admin or Content admin), authorize the app with the scopes `r_organization_social` (read the page's posts) and `w_organization_social` (LinkedIn requires it to read the posts' images), and copy the access token.
4. Find the page's numeric id: it is the number in the page admin address, `linkedin.com/company/<id>/admin/`.
5. In the repository settings set the secret `LINKEDIN_ACCESS_TOKEN` and the variables `NEWS_SOURCE=linkedin` and `LINKEDIN_ORGANIZATION_ID`, then re-run the workflow. The News page shows the posts on the next build, and the workflow rebuilds every six hours so new posts appear on their own.

**Keeping it running.** Access tokens last 60 days. If LinkedIn issues the app a refresh token (one year), store it as the secret `LINKEDIN_REFRESH_TOKEN` together with the variable `LINKEDIN_CLIENT_ID` and the secret `LINKEDIN_CLIENT_SECRET`; the build then renews the access token itself and only needs re-authorizing once a year. Otherwise replace `LINKEDIN_ACCESS_TOKEN` every 60 days. LinkedIn retires API versions after about a year: update `LINKEDIN_API_VERSION` (YYYYMM, default `202609`) to a current version when that happens. If LinkedIn cannot be read (expired token, retired version, outage), the build still succeeds and the page falls back to the posts in `src/content/posts/`; preview builds say so on the page, and the build log shows the reason.

**Without the API.** Keep `NEWS_SOURCE=static` and add a file per post to `src/content/posts/` (the post's LinkedIn URL, date, summary and photo), or point `NEWS_SOURCE=json-url` and `NEWS_URL` at any JSON feed of `{ url, date, title, summary, image, imageAlt }` items, such as one exported by a social-media aggregator or an automation tool.

## 7. Legacy URLs

Old WordPress paths and pages that moved, with their new homes:

| Old                                                                                                                                           | New                                        |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `/team/`, `/leadership/`                                                                                                                      | `/about/leadership/`                       |
| `/project/`                                                                                                                                   | `/projects/`                               |
| `/category/general/`                                                                                                                          | `/news/`                                   |
| `/project-category/general/`                                                                                                                  | `/projects/`                               |
| `/five-takeaways-from-a-nc-energy-policy-panel/`, `/solar-could-provide-25-of-the-worlds-energy-by-2050/` (and their `/news/…` preview paths) | `/news/` (the 2018 articles were retired)  |
| `/request-a-quote/` (preview only)                                                                                                            | `/work-with-axis/developer-project-owner/` |
| `/subcontractors/` (preview only)                                                                                                             | `/work-with-axis/subcontractor/`           |
| `/sitemap.xml`                                                                                                                                | `/sitemap-index.xml`                       |

All other pages keep their paths (`/services/`, `/projects/`, `/why-axis/`, `/about/`, `/news/`, `/careers/`, `/contact/`, `/project/<slug>/`, `/team/josh-butler/`). New pages: `/markets/`; `/projects/<service>/` for each of the four services (the Projects page focused on that service); `/about/leadership/`; `/work-with-axis/` with its two options, `/work-with-axis/developer-project-owner/` and `/work-with-axis/subcontractor/`; the four service pages `/services/solar-epc/`, `/services/battery-storage-and-microgrids/`, `/services/electrical-infrastructure-and-commissioning/`, `/services/om-and-technical-services/`; and the O&M offering pages under `/services/om-and-technical-services/<offering>/`.

## 8. Cut-over checklist

1. Set launch environment variables (`SITE_URL`, `SITE_BASE=/`, `PUBLIC_SITE_MODE=production`, form endpoints, jobs source, LinkedIn news feed) and build.
2. Deploy to the chosen host and test on its temporary URL: every page, the three forms in live mode, the jobs list, the News posts, the 404 page, the redirects.
3. DNS: point `www.axis-energyinc.com` (CNAME) and the apex `axis-energyinc.com` (A/ALIAS or redirect to www) at the new host; enable HTTPS (Let's Encrypt is automatic on Pages, Netlify, Vercel and Cloudflare).
4. Keep the WordPress site reachable for a few days on a different hostname in case anything was missed, then retire it (and its plugins) so it is no longer a security exposure.
5. Google Search Console: verify the property, submit `https://www.axis-energyinc.com/sitemap-index.xml`, and watch the Coverage report for 404s from old links.
6. Update the LinkedIn company page and Solar Power World profile links if they point at old URLs.

## 9. After launch

- Content edits are Markdown or small TypeScript data files; see the README. Any git push to `Main-Backup` rebuilds the site.
- Keep dependencies current a few times a year: `npm outdated`, `npx @astrojs/upgrade`, then `npm test`.
- Design tokens (colours, type, spacing) live in `src/styles/tokens.css`; brand colours are the official PANTONE 288 blue (#004B8D) and PANTONE 348 green (#008752).

## 10. Known limitations and open decisions

- Decisions listed in `docs/CONTENT-REVIEW.md` (statistics basis, portfolio publication, RFQ and subcontractor fields, jobs source) are pending the Axis team review; the preview build ships them as drafts.
- Page header photos are placeholders (the preview labels them "Placeholder photo"). Before launch, set the final photo for each page in `src/data/heroes.ts` and mark it `placeholder: false`; then re-run `npm run og` so the social sharing image uses the new photography too. A production build (`PUBLIC_SITE_MODE=production`) hides the label but not the placeholder photo itself.
- Project photos are small: the three from the old site are 392 px wide and the three brochure crops about 660 px. They are shown at native size or smaller, so they look fine but not crisp on high-density screens. Replace them with originals in `src/assets/projects/` (same file names) and the build regenerates every size.
- The Leadership page has one profile (as on the live site). Additional profiles are a content decision.
- GitHub Pages cannot serve real 301 redirects or custom headers; the other hosts can.
