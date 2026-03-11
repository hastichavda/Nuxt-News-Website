<template>
  <div :class="props.class" class="inline-flex items-center gap-2 select-none">
    <span
      class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-on-primary font-black"
    >
      N
    </span>
    <span class="font-semibold tracking-tight text-on-surface"> NuxtNews </span>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ class?: string }>()
</script>
