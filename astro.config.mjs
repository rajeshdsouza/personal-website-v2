import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { astroContent } from '@astrojs/content';

export default defineConfig({
  integrations: [tailwind(), astroContent()],
  content: {
    // Define a new content collection for blogs
    collections: {
      blogs: {
        type: 'content', // Indicates that it's a content collection
        schema: {
          title: 'string',
          date: 'date',
          description: 'string',
          author: 'string',
        },
      },
    },
  },
});
