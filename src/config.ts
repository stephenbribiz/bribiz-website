/**
 * Site feature flags.
 *
 * BLOG_ENABLED — master switch for the blog. When false: the Blog nav/footer
 * links are hidden, /blog/ redirects to the homepage, and no post pages are
 * generated. The posts themselves stay in src/content/blog untouched, so
 * relaunching the blog is a one-line change: flip this back to true.
 */
export const BLOG_ENABLED = false;
