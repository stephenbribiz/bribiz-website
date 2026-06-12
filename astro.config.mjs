// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { BLOG_ENABLED } from './src/config.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://bribiz.net',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // When the blog is hidden, keep /blog/ (a redirect stub) out of the sitemap.
      filter: (page) => BLOG_ENABLED || !page.endsWith('/blog/'),
    }),
  ],
});
