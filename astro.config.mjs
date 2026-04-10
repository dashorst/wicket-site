import { defineConfig } from 'astro/config';
import tailwindcss from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://wicket.apache.org',
  integrations: [tailwindcss()],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-dark',
      },
    },
  },
  build: {
    format: 'file',
  },
});
