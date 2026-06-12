/**
 * Site feature flags.
 *
 * BLOG_ENABLED — master switch for the blog. When false: the Blog nav/footer
 * links are hidden, /blog/ redirects to the homepage, no post pages are
 * generated, and /blog/ is excluded from the sitemap. The posts themselves
 * stay in src/content/blog untouched.
 *
 * To relaunch the blog:
 *   1. Flip this to true.
 *   2. Remove the temporary (permanent: false) /blog/ and post-slug redirects
 *      at the bottom of vercel.json — they would otherwise mask the restored
 *      pages, since Vercel redirects run before the filesystem.
 */
export const BLOG_ENABLED = false;
