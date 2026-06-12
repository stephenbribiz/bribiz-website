import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      author: z.string().default('BriBiz'),
      image: image(),
      imageAlt: z.string().default(''),
      // Archived posts still build at their original URLs but are
      // excluded from the blog index and homepage teaser.
      archived: z.boolean().default(false),
    }),
});

export const collections = { blog };
