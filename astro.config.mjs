import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';

export default defineConfig({
  site: 'https://warthunderhack.org',
  trailingSlash: 'always',
  redirects: {
    '/cheats/': '/products/warthunder-hack/',
    '/cheats/lite/': '/products/warthunder-hack/',
    '/cheats/pro/': '/products/warthunder-hack/',
    '/cheats/elite/': '/products/warthunder-hack/elite/',
    '/cheats/compare/': '/blog/warthunder-lite-vs-pro/',
    '/products/dota-2-cheats/': '/products/warthunder-hack/',
    '/products/dota-2-cheats/elite/': '/products/warthunder-hack/elite/',
    '/products/dota-2-cheats/utilities/': '/products/warthunder-hack/utilities/',
    '/products/fortnite-cheats/': '/products/warthunder-hack/',
    '/products/fortnite-cheats/elite/': '/products/warthunder-hack/elite/',
    '/products/fortnite-cheats/utilities/': '/products/warthunder-hack/utilities/',
    '/go/fortnite/': '/go/warthunder/',
    '/contact/': '/support/',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/go/'),
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      modulePreload: { polyfill: false },
    },
  },
  build: {
    inlineStylesheets: 'always',
  },
});
