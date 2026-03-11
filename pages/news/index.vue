<template>
  <div>
    <NewsHero
      title="News &amp; insights"
      subtitle="Deep dive into all the latest stories. Use filters to narrow down by topic, category, or date range."
    >
      <div class="space-y-3 lg:space-y-4">
        <NewsFiltersBar
          v-model:q="filters.q"
          v-model:category="filters.category"
          v-model:preset="filtersPreset"
          v-model:from="filters.from"
          v-model:to="filters.to"
          @apply="applyFilters"
        />
        <div class="sm:flex sm:justify-start hidden lg:justify-end">
          <NewsViewToggle
            :model-value="viewMode"
            @update:model-value="news.setViewMode"
          />
        </div>
      </div>
    </NewsHero>

    <section class="container-wide py-8 sm:py-12">
      <div class="bg-white/95 dark:bg-slate-900/95">
        <div
          v-if="errorList"
          class="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-red-600 dark:text-red-400"
        >
          <p class="font-medium">Could not load articles</p>
          <p class="mt-1 text-sm">{{ errorList }}</p>
          <p
            v-if="
              errorList.toLowerCase().includes('not valid') ||
              errorList.toLowerCase().includes('unauthorized')
            "
            class="mt-3 text-sm opacity-90"
          >
            Check that
            <code class="rounded bg-black/10 px-1 dark:bg-white/10"
              >NUXT_PUBLIC_NEWS_API_KEY</code
            >
            in your
            <code class="rounded bg-black/10 px-1 dark:bg-white/10">.env</code>
            matches your key at
            <a
              href="https://newsdata.io"
              target="_blank"
              rel="noopener"
              class="underline"
              >newsdata.io</a
            >. Restart the dev server after updating
            <code class="rounded bg-black/10 px-1 dark:bg-white/10">.env</code>.
          </p>
        </div>

        <NewsEmptyState
          v-if="!errorList && !loadingList && filteredArticles.length === 0"
        />

        <NewsCardGrid
          v-else-if="!errorList"
          :articles="filteredArticles"
          :loading="loadingList"
          :mode="viewMode"
        />

        <NewsPagination
          v-if="!errorList && filteredArticles.length > 0"
          class="mt-6"
          :current-page="page"
          :has-next="!!nextPageCursor"
          :next-page-cursor="nextPageCursor"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { DatePreset } from '~/stores/news'

const route = useRoute()
const router = useRouter()
const news = useNewsStore()

const {
  filters,
  page,
  filteredArticles,
  nextPageCursor,
  loadingList,
  errorList,
  viewMode,
} = storeToRefs(news)

const filtersPreset = computed({
  get: () => filters.value.preset as DatePreset,
  set: (v: DatePreset) => {
    filters.value.preset = v
  },
})

// Fetch list for current /news route (SSR-friendly)
await news.fetchListForCurrentRoute(route.query as Record<string, unknown>)

// Clear filters on page reload/refresh
if (process.client) {
  onMounted(async () => {
    const hasQueryParams = Object.keys(route.query).length > 0

    if (hasQueryParams) {
      news.clearFilters()
      await router.replace('/news?page=1')
    }
  })
}

async function applyFilters() {
  const query = {
    page: 1,
    q: filters.value.q || undefined,
    category: filters.value.category || undefined,
    preset: filters.value.preset !== 'any' ? filters.value.preset : undefined,
    from:
      filters.value.preset === 'custom'
        ? (filters.value.from ?? undefined)
        : undefined,
    to:
      filters.value.preset === 'custom'
        ? (filters.value.to ?? undefined)
        : undefined,
  }

  await router.push({
    path: '/news',
    query,
  })

  await news.fetchListForCurrentRoute(query as Record<string, unknown>)
}

watch(
  () => route.query,
  async (q) => {
    await news.fetchListForCurrentRoute(q as Record<string, unknown>)
  },
)

const pageTitle = computed(() =>
  page.value > 1
    ? `All news – Page ${page.value} | NuxtNews`
    : 'All news | NuxtNews',
)

useHead({
  title: pageTitle,
  meta: [
    {
      name: 'description',
      content:
        'Browse the full news archive with powerful filters, list and grid views, and server-side pagination.',
    },
    {
      property: 'og:title',
      content: pageTitle.value,
    },
  ],
})
</script>
