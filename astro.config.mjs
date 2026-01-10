import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://purelogicsolutions.aetenum.com',
  output: 'server',
  adapter: cloudflare({
    imageService: 'cloudflare'
  }),
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  integrations: [
    react(),
    sitemap()
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
