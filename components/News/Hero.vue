<template>
  <section
    class="relative overflow-x-clip border-b border-border bg-gradient-to-b from-sky-100 via-sky-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
  >
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        class="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
      />
    </div>

    <div class="container-wide py-10 sm:py-14">
      <div class="flex flex-col gap-6">
        <div>
          <p
            class="text-sm font-semibold tracking-widest text-primary/80 uppercase"
          >
            News
          </p>
          <h1 class="mt-3 text-3xl sm:text-4xl font-bold text-on-surface">
            {{ title }}
          </h1>
          <p v-if="subtitle" class="mt-3 max-w-2xl text-muted">
            {{ subtitle }}
          </p>
        </div>

        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>
