<template>
  <article class="space-y-6">
    <header class="space-y-3">
      <div class="flex flex-wrap items-center gap-2 text-xs text-muted">
        <span
          v-if="article.source_id"
          class="rounded-full border border-border px-2 py-0.5"
        >
          {{ article.source_id }}
        </span>
        <span
          v-if="article.category?.[0]"
          class="rounded-full border border-border px-2 py-0.5"
        >
          {{ article.category[0] }}
        </span>
        <span v-if="article.pubDate" class="inline-flex items-center gap-1">
          <span class="h-1 w-1 rounded-full bg-muted" aria-hidden="true" />
          {{ formatLong(article.pubDate) }}
        </span>
      </div>

      <h1
        v-if="showTitle !== false"
        class="text-2xl sm:text-3xl font-bold text-on-surface leading-tight"
      >
        {{ article.title }}
      </h1>
    </header>

    <div v-if="images.length" class="space-y-2">
      <NewsImageGallery :images="images" :alt="article.title" />
      <p v-if="images.length > 1" class="text-xs text-muted">
        Multiple images detected from the article feed.
      </p>
    </div>
    <div
      v-else
      class="aspect-[16/9] max-w-2xl overflow-hidden rounded-lg border border-border bg-muted/20"
    >
      <img
        :src="placeholderImage"
        :alt="article.title"
        class="h-full w-full object-cover"
      />
    </div>

    <div v-if="article.description" class="text-on-surface leading-relaxed">
      <p class="whitespace-pre-wrap">{{ article.description }}</p>
    </div>
    <p v-else class="text-muted">No description available.</p>
  </article>
</template>
<script setup lang="ts">
import type { NewsArticle } from '~/types'

const props = defineProps<{
  article: NewsArticle
  showTitle?: boolean
}>()

function formatLong(pubDate?: string) {
  if (!pubDate) return ''
  const d = new Date(pubDate)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function parseImageUrls(value: string | null) {
  if (!value) return []
  // Some APIs return comma-separated URLs; normalize & filter.
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((s) => /^https?:\/\//.test(s))
}

const images = computed(() => parseImageUrls(props.article.image_url))
const placeholderImage = '/img/news-placeholder.svg'
</script>
