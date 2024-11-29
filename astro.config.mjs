import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { astroContent } from '@astrojs/content';

export default defineConfig({
  integrations: [tailwind(), astroContent()],
  content: {
    // Define collections for both Blogs and Projects
    collections: {
      blogs: {
        type: 'content',
        schema: {
          title: 'string',
          date: 'date',
          description: 'string',
          author: 'string',
        },
      },
      projects: {
        type: 'content',
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
