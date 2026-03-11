<template>
  <article
    class="group h-full flex flex-col rounded-xl border border-border bg-surface overflow-hidden hover:shadow-sm transition-all hover:-translate-y-[1px]"
  >
    <NuxtLink :to="`/news/${a.article_id}`" class="flex h-full flex-col">
      <div class="aspect-[16/9] bg-muted/20 overflow-hidden">
        <img
          :src="a.image_url || placeholderImage"
          :alt="a.title"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>

      <div class="flex flex-1 flex-col p-5">
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-2 text-xs text-muted">
            <span
              v-if="a.source_id"
              class="rounded-full border border-border px-2 py-0.5"
            >
              {{ a.source_id }}
            </span>
            <span
              v-if="a.category?.[0]"
              class="rounded-full border border-border px-2 py-0.5"
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
<script setup lang="ts">
import { CalendarDaysIcon } from '@heroicons/vue/24/outline'
import type { NewsArticle } from '~/types'

const props = defineProps<{
  article: NewsArticle
}>()

const a = computed(() => props.article)
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
