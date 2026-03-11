<template>
  <div>
    <section
      v-if="detail.article"
      class="relative overflow-hidden border-b border-border bg-gradient-to-b from-sky-100 via-sky-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      <div class="absolute inset-0 pointer-events-none">
        <div
          class="absolute rounded-full -top-32 -right-32 h-72 w-72 bg-primary/10 blur-3xl"
        />
        <div
          class="absolute rounded-full -bottom-40 -left-40 h-96 w-96 bg-primary/10 blur-3xl"
        />
      </div>

      <div class="relative z-10 py-8 container-wide sm:py-10">
        <h1
          class="max-w-3xl text-2xl font-bold leading-snug sm:text-3xl md:text-4xl text-on-surface"
        >
          {{ detail.article.title }}
        </h1>
      </div>
    </section>

    <section class="py-8 container-wide sm:py-12">
      <div class="bg-white/95 dark:bg-slate-900/95">
        <div class="max-w-4xl mx-auto">
          <div class="mb-6">
            <NuxtLink
              to="/news"
              class="inline-flex items-center gap-2 rounded text-muted hover:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <span aria-hidden="true">←</span>
              Back to news
            </NuxtLink>
          </div>

          <div v-if="detail.loading" class="space-y-6">
            <div class="w-3/4 h-8 rounded bg-muted/30 animate-pulse" />
            <div class="rounded-lg aspect-video bg-muted/20 animate-pulse" />
            <div class="space-y-2">
              <div class="w-full h-4 rounded bg-muted/20 animate-pulse" />
              <div class="w-full h-4 rounded bg-muted/20 animate-pulse" />
              <div class="w-2/3 h-4 rounded bg-muted/20 animate-pulse" />
            </div>
          </div>

          <div
            v-else-if="detail.error"
            class="p-4 text-red-600 border rounded-lg border-red-500/50 bg-red-500/10 dark:text-red-400"
          >
            <p class="font-medium">Could not load article</p>
            <p class="mt-1 text-sm">{{ detail.error }}</p>
            <NuxtLink
              to="/news"
              class="inline-block mt-4 text-sm font-medium underline"
            >
              Return to news list
            </NuxtLink>
          </div>

          <NewsArticleDetail
            v-else-if="detail.article"
            :article="detail.article"
            :show-title="false"
          />

          <div v-else class="text-muted">
            <p>Article not found.</p>
            <NuxtLink
              to="/news"
              class="inline-block mt-4 text-sm font-medium text-primary hover:underline"
            >
              Return to news list
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const id = computed(() => String(route.params.id || ''))
const news = useNewsStore()

await news.fetchDetail(id.value)
const detail = computed(() => news.getDetailState(id.value))

const articleTitle = computed(() =>
  detail.value.article
    ? `${detail.value.article.title} | NuxtNews`
    : 'Article | NuxtNews',
)

useHead({
  title: articleTitle,
  meta: [
    {
      name: 'description',
      content:
        detail.value.article?.description?.slice(0, 160) ??
        'Read this news article.',
    },
    {
      property: 'og:title',
      content: articleTitle.value,
    },
  ],
})
</script>
