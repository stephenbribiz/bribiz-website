# bribiz.net

Static rebuild of the BriBiz Entertainment Business Management website. Built
with [Astro](https://astro.build), deployed on Vercel.

## Commands

```bash
npm install        # install dependencies
npm run dev        # dev server at localhost:4321
npm run build      # production build to dist/
npm run preview    # serve the production build locally
```

## Structure

- `src/pages/` — one file per page; URLs match the original WordPress slugs
  (`/whatwedo/`, `/who-we-are/`, `/book-a-consultation/`, `/contact/`, `/blog/`).
  Blog posts live at the site root via `[slug].astro` (e.g.
  `/structuring-your-band-well/`) to preserve old links.
- `src/content/blog/` — blog posts as markdown. **To add a post:** copy an
  existing `.md` file, update the frontmatter (`title`, `description`,
  `pubDate`, `author`, `image`), drop the featured image in `src/assets/blog/`,
  and write the body in markdown. The filename becomes the URL slug.
  Set `archived: true` to keep a post reachable at its URL but hidden from the
  blog index and homepage.
- `src/components/` — shared UI (header/footer, video hero, forms, etc.)
- `public/video/hero-bg.mp4` — homepage background video

## Homepage newsletter-slot variant

The old "Music & Money Newsletter" section was replaced. `src/pages/index.astro`
has a `NEWSLETTER_VARIANT` constant: `'A'` = full-width latest-posts row,
`'B'` = blog + consultation CTA two-column layout.

## Forms

Both forms (contact + consultation) submit through [Web3Forms](https://web3forms.com)
with a honeypot spam trap. The access key comes from the `PUBLIC_WEB3FORMS_KEY`
environment variable (see `.env.example`; set it in the Vercel dashboard for
production). The key is tied to the receiving inbox in the Web3Forms dashboard;
the second recipient is CC'd via the `ccemail` hidden field in
`src/components/Web3Form.astro`.

## Deploying (Vercel)

1. Import the GitHub repo in Vercel — the **Astro** framework preset is
   auto-detected (build `astro build`, output `dist/`).
2. Add the `PUBLIC_WEB3FORMS_KEY` environment variable.
3. Deploy, then point the bribiz.net DNS at Vercel when ready to cut over.
