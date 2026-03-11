# NuxtNews

NuxtNews is a Nuxt 3 news application backed by the NewsData.io API. The current product includes a minimal landing page, a filterable news archive, and a server-rendered article detail route.

## Production Demo Link
https://nuxt-news-website.netlify.app/news

## Current Scope

- `/`:
  Minimal landing page with a single CTA to `/news`.
- `/news`:
  Main news archive with SSR data fetch, search, category filter, date preset/custom range filter, pagination, and grid/list view toggle.
- `/news/[id]`:
  Article detail page with hero heading, image gallery, metadata, and description.

## Core Features

- Nuxt 3 + Vue 3 + TypeScript with strict type checking.
- Pinia-based news store for filters, pagination, view mode, and detail caching.
- Responsive grid and list rendering for articles.
- `v-calendar` powered custom date range filtering.
- Fallback article image via `public/img/news-placeholder.svg`.
- SEO-ready SSR route data fetching for list and detail pages.
- Production build verified with `npm test` and `npm run build`.

## Tech Stack

- `nuxt`
- `vue`
- `typescript`
- `pinia`
- `@nuxtjs/tailwindcss`
- `@headlessui/vue`
- `@heroicons/vue`
- `v-calendar`
- `vitest`

## Project Structure

```text
pages/
  index.vue          -> landing page
  news/index.vue     -> archive page
  news/[id].vue      -> article detail

components/
  App/Logo.vue
  Layout/Header.vue
  Layout/Footer.vue
  News/*

stores/news.ts       -> filters, pagination, detail cache, view mode
services/newsApi.ts  -> NewsData.io API integration
composables/useNewsApi.ts
types/index.ts
assets/css/main.css
tests/services/newsApi.test.ts
```

## Data Flow

1. Route query is parsed in `stores/news.ts`.
2. `useNewsStore()` normalizes filters and pagination state.
3. `useNewsApi()` injects `NUXT_PUBLIC_NEWS_API_KEY` from runtime config.
4. `services/newsApi.ts` performs typed list/detail requests.
5. Pages render SSR-ready data and local loading/error states.

## UI Notes

- Shared content width uses `container-wide` in `assets/css/main.css` with `max-w-4xl`.
- Hero sections are full-width; body content is container aligned.
- Header is simplified to the current product navigation model.
- News cards support:
  published date icon,
  consistent 16:9 image framing,
  default placeholder image,
  truncated description,
  subtle title hover background.

## Environment Setup

Create `.env` from `.env.example` and set:

```bash
NUXT_PUBLIC_NEWS_API_KEY=your_newsdata_io_api_key
```

`NUXT_PUBLIC_NEWS_API_KEY` is required for list and detail data fetches.

## Local Development

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Preview production locally:

```bash
npm run build
npm run preview
```

## Available Scripts

```bash
npm run dev
npm run build
npm run generate
npm run preview
npm test
npm run test:watch
```

## Testing

Unit tests currently cover the API service layer:

- list fetch success/error handling
- detail fetch behavior
- invalid input scenarios

Run:

```bash
npm test
```

## Production Verification

Recommended final checks before deployment:

```bash
npm test
npm run build
```

The project has been verified to build successfully with Nuxt production output in `.output/`.

## Netlify Deployment

Use the following on Netlify:

- Build command: `npm run build`
- Environment variable: `NUXT_PUBLIC_NEWS_API_KEY`

Nuxt/Nitro will generate the deployable production output during the build.

## Developer Notes

- Keep API access inside `services/newsApi.ts` and `composables/useNewsApi.ts`.
- Keep shared query/filter logic inside `stores/news.ts`.
- Extend `types/index.ts` first when adding new article fields.
- Reuse existing `components/News/*` building blocks for new listing/detail UI changes.

## Current Quality Status

- Unused legacy homepage/theme code removed.
- Current routes and UI documented in this README.
- No dedicated lint script is configured.
- Production build and unit tests pass in the current codebase.
