<template>
  <nav
    class="flex items-center justify-center gap-4 pt-8 pb-4"
    aria-label="Pagination"
  >
    <NuxtLink
      v-if="currentPage > 1"
      :to="{ path: route.path, query: { ...baseQuery, page: currentPage - 1 } }"
      class="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-on-surface hover:bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      Previous
    </NuxtLink>
    <span
      v-else
      class="rounded-lg border border-border bg-muted/10 px-4 py-2 text-sm text-muted cursor-not-allowed"
      aria-disabled="true"
    >
      Previous
    </span>

    <span class="text-sm text-muted" aria-current="page">
      Page {{ currentPage }}
    </span>

    <NuxtLink
      v-if="hasNext && nextPageCursor"
      :to="{
        path: route.path,
        query: {
          ...baseQuery,
          page: currentPage + 1,
          nextPage: nextPageCursor,
        },
      }"
      class="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-on-surface hover:bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      Next
    </NuxtLink>
    <span
      v-else
      class="rounded-lg border border-border bg-muted/10 px-4 py-2 text-sm text-muted cursor-not-allowed"
      aria-disabled="true"
    >
      Next
    </span>
  </nav>
</template>
<script setup lang="ts">
const route = useRoute()

defineProps<{
  currentPage: number
  hasNext: boolean
  nextPageCursor: string | null
}>()

const baseQuery = computed(() => {
  const q = { ...route.query }
  delete (q as any).page
  delete (q as any).nextPage
  return q
})
</script>
