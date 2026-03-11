// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      newsApiKey: process.env.NUXT_PUBLIC_NEWS_API_KEY ?? '',
    },
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],

  typescript: {
    strict: true,
    typeCheck: true,
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
        class: 'scroll-smooth',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Modern news experience with responsive article browsing, filters, and detail pages.' },
        { name: 'theme-color', content: '#0f172a' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Nuxt News' },
        { property: 'og:title', content: 'Nuxt News – Latest stories and insights' },
        { property: 'og:description', content: 'Browse the latest news with curated filters, responsive layouts, and article detail pages.' },
        { property: 'og:url', content: 'https://example.com' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Nuxt News – Latest stories and insights' },
        { name: 'twitter:description', content: 'Browse the latest news with curated filters, responsive layouts, and article detail pages.' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },
})
