<template>
  <NewsEmptyState v-if="!loading && !articles.length" />

  <!-- GRID VIEW: keep card-style layout for 2-column grid -->
  <TransitionGroup
    v-else-if="mode !== 'list'"
    tag="div"
    class="grid grid-cols-1 gap-6 md:grid-cols-2"
    name="fade"
  >
    <template v-if="loading">
      <div
        v-for="i in 10"
        :key="`sg-${i}`"
        class="overflow-hidden border rounded-xl border-border bg-surface"
      >
        <div class="aspect-[16/9] bg-muted/20 animate-pulse" />
        <div class="p-5 space-y-3">
          <div class="w-24 h-4 rounded bg-muted/20 animate-pulse" />
          <div class="w-4/5 h-6 rounded bg-muted/30 animate-pulse" />
          <div class="w-2/3 h-6 rounded bg-muted/20 animate-pulse" />
        </div>
      </div>
    </template>

    <template v-else>
      <NewsCard v-for="a in props.articles" :key="a.article_id" :article="a" />
    </template>
  </TransitionGroup>

  <!-- LIST VIEW: full-width rows with only bottom divider (no outline) -->
  <TransitionGroup v-else tag="div" class="space-y-0" name="fade">
    <template v-if="loading">
      <div
        v-for="i in 10"
        :key="`sl-${i}`"
        class="flex flex-col gap-4 py-6 sm:flex-row"
      >
        <div class="w-full shrink-0 sm:w-64 md:w-80">
          <div class="aspect-[16/9] bg-muted/20 animate-pulse rounded-md" />
        </div>
        <div class="flex-1 space-y-3">
          <div class="w-24 h-4 rounded bg-muted/20 animate-pulse" />
          <div class="w-3/4 h-6 rounded bg-muted/30 animate-pulse" />
          <div class="w-1/2 h-6 rounded bg-muted/20 animate-pulse" />
        </div>
      </div>
    </template>

    <template v-else>
      <article
        v-for="a in articles"
        :key="a.article_id"
        class="group flex flex-col gap-4 py-6 sm:flex-row"
      >
        <NuxtLink
          :to="`/news/${a.article_id}`"
          class="flex flex-col w-full gap-4 sm:flex-row"
        >
          <div
            class="aspect-[16/9] w-full shrink-0 overflow-hidden rounded-md bg-muted/20 sm:w-64 md:w-80"
          >
            <img
              :src="a.image_url || placeholderImage"
              :alt="a.title"
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>

          <div class="flex flex-col justify-center flex-1">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div class="flex flex-wrap items-center gap-2 text-xs text-muted">
                <span
                  v-if="a.source_id"
                  class="rounded-full border border-border px-2 py-0.5 uppercase tracking-tight"
                >
                  {{ a.source_id }}
                </span>
                <span
                  v-if="a.category?.[0]"
                  class="rounded-full border border-border px-2 py-0.5 uppercase tracking-tight"
                >
                  {{ a.category[0] }}
                </span>
              </div>
              <div
                v-if="a.pubDate"
                class="inline-flex items-center gap-1.5 text-xs text-muted"
              >
                <CalendarDaysIcon class="h-4 w-4 shrink-0" />
                <span>{{ formatPostedDate(a.pubDate) }}</span>
              </div>
            </div>

            <h2
              class="mt-4 -mx-2 rounded-lg px-2 py-1 text-lg font-semibold leading-snug text-on-surface transition-colors duration-200 group-hover:bg-primary/5 group-hover:text-primary dark:group-hover:bg-primary/10"
            >
              {{ a.title }}
            </h2>

            <p
              v-if="a.description"
              class="mt-2 line-clamp-2 text-sm leading-6 text-muted"
            >
              {{ a.description }}
            </p>
          </div>
        </NuxtLink>
      </article>
    </template>
  </TransitionGroup>
</template>
<script setup lang="ts">
import { CalendarDaysIcon } from '@heroicons/vue/24/outline'
import type { NewsArticle } from '~/types'
import type { NewsViewMode } from '~/stores/news'
const props = defineProps<{
  articles: NewsArticle[]
  loading?: boolean
  mode?: NewsViewMode
}>()

const placeholderImage = '/img/news-placeholder.svg'

function formatPostedDate(pubDate?: string) {
  if (!pubDate) return ''
  const d = new Date(pubDate)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>
