<template>
  <div
    class="inline-flex gap-1 p-1 border rounded-full border-border bg-surface/90"
  >
    <button
      type="button"
      :class="[
        base,
        modelValue === 'grid'
          ? 'bg-primary text-on-primary shadow-sm'
          : 'bg-transparent text-muted hover:text-on-surface hover:bg-muted/10',
      ]"
      aria-label="Grid view"
      @click="emit('update:modelValue', 'grid')"
    >
      <Squares2X2Icon class="w-5 h-5" />
    </button>
    <button
      type="button"
      :class="[
        base,
        modelValue === 'list'
          ? 'bg-primary text-on-primary shadow-sm'
          : 'bg-transparent text-muted hover:text-on-surface hover:bg-muted/10',
      ]"
      aria-label="List view"
      @click="emit('update:modelValue', 'list')"
    >
      <Bars3Icon class="w-5 h-5" />
    </button>
  </div>
</template>
<script setup lang="ts">
import type { NewsViewMode } from '~/stores/news'
import { Squares2X2Icon, Bars3Icon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  modelValue: NewsViewMode
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: NewsViewMode): void
}>()

const base =
  'inline-flex items-center justify-center rounded-2xl px-3 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary'
</script>
