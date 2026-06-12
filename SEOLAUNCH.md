# SEO Launch Checklist — bribiz.net

Manual steps that can't be done in code. Work top to bottom; the first block
matters most in the first week after DNS cutover.

## Immediately after the DNS cutover

### Google Search Console
1. Go to https://search.google.com/search-console → Add property → **Domain** property `bribiz.net` (covers www/non-www, http/https in one property).
2. Verify via the DNS TXT record Google gives you (add it wherever bribiz.net DNS is hosted — same place you pointed the domain at Vercel).
3. Submit the sitemap: Sitemaps → enter `https://bribiz.net/sitemap-index.xml` → Submit.
4. If the old site had a Search Console property, keep it — history carries over for the domain.

### Bing Webmaster Tools
1. https://www.bing.com/webmasters → Add site → easiest path: **Import from Google Search Console** (one click, reuses the GSC verification).
2. Confirm the sitemap (`https://bribiz.net/sitemap-index.xml`) imported; submit manually if not.

### Google Business Profile (critical for "near me" / map-pack rankings)
1. Claim or update the listing at https://business.google.com for **BriBiz Entertainment Business Management**.
2. Make the listing's name/address/phone EXACTLY match the site footer:
   `135 5th Ave S, Suite 240, Franklin, TN 37064` · `615-390-7083`.
   (If the GBP listing differs — e.g. different suite formatting — either fix GBP or tell Claude to match the footer to GBP. Consistency matters more than which format wins.)
3. Set the website URL to `https://bribiz.net/`, category to "Accounting firm" or "Business management consultant" (primary), add "Accountant"/"Financial consultant" as secondary categories.
4. Add the og-image / logo as profile photos, set hours, and write the business description (the homepage meta description is a good base).

## First two weeks — monitor the redirects

The old WordPress URLs (blog posts, /category/*, /feed, etc.) now 301/302-redirect.
To confirm Google is digesting them:

1. In Search Console → **Pages** report: watch for "Page with redirect" entries — that's expected and healthy for the old URLs.
2. Spot-check a few in the URL Inspection tool: `bribiz.net/structuring-your-band-well/` should show "Page with redirect".
3. Search `site:bribiz.net` on Google weekly — old blog URLs should gradually drop out; the 5 live pages should remain.
4. The blog post redirects are **temporary (302)** on purpose — if/when the blog relaunches, the URLs come back and Google will re-index them. See `src/config.ts` for the relaunch steps.

## When relaunching the blog
1. Flip `BLOG_ENABLED = true` in `src/config.ts`.
2. Delete the `permanent: false` block of redirects at the bottom of `vercel.json` (the `/blog/` and 11 post-slug entries).
3. Deploy, then resubmit the sitemap in Search Console (it will now include /blog/ and the posts).

## Nice-to-haves (no deadline)

- **Higher-resolution logo**: the header logo source is 215×80px, which is why Lighthouse Best Practices sits at 96 instead of 100 (it can't serve a crisp 2x version for retina screens). Export the logo from the original design files at 430×160 (or as SVG) and drop it in as `src/assets/logo.png` / `logo-white.png` replacements.
- **Web3Forms live test**: submit each form once on the production site and confirm delivery to stephen@bribiz.net + CC to brian@bribiz.net.
- **Vercel Analytics**: free toggle in the Vercel dashboard if you want traffic data (the old UA Google Analytics was dead — it was never migrated to GA4).
- **Social profiles**: the footer links to Facebook/LinkedIn/X/Instagram — make sure each profile links back to bribiz.net (consistent citations help local SEO).
- **LinkedIn company page**: the LinkedIn sameAs in the site's structured data currently points to Brian's personal profile (that's what the old site linked). If BriBiz has a company page, tell Claude to swap it in `src/layouts/BaseLayout.astro`.
- **Service pages**: a proposal for individual /services/* pages targeting niche search terms was drafted — decide whether to build them (they're the biggest remaining SEO upside).

## What's already handled in code (no action needed)

- Per-page titles/descriptions, one-H1 heading structure, canonical tags
- LocalBusiness (AccountingService) + Person + BreadcrumbList + Article JSON-LD
- robots.txt + sitemap (blog excluded while hidden)
- 301s for all old WordPress URLs (categories, tags, feeds, sample-page, case-studies, thanks, posts) and old sitemap paths
- og:image (1200×630), favicon set, web manifest
- Lighthouse 100/100/100 (Perf/SEO/A11y) on every page; hero video compressed 1.3MB → 300KB with mobile/data-saver fallback to a static poster
- Full NAP as crawlable text in the footer of every page
