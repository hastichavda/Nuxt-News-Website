<template>
  <section
    class="flex min-h-[calc(100vh-7rem)] overflow-hidden items-center bg-gradient-to-b from-sky-100 via-sky-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
  >
    <div class="container-wide py-16 sm:py-24">
      <div
        class="rounded-3xl border border-border/70 bg-white/85 p-8 text-center shadow-sm backdrop-blur dark:bg-slate-900/85 sm:p-12"
      >
        <p
          class="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80"
        >
          News Platform
        </p>
        <h1
          class="mt-4 text-3xl font-bold tracking-tight text-on-surface sm:text-4xl lg:text-5xl"
        >
          Read the latest news in one focused place.
        </h1>
        <p class="mx-auto mt-4 max-w-2xl text-sm text-muted sm:text-base">
          Explore the latest stories, browse detailed articles, and jump
          straight into the news section.
        </p>
        <div class="mt-8">
          <NuxtLink
            to="/news"
            class="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-on-primary transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface"
          >
            Go to News
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
useHead({
  title: 'Home | NuxtNews',
  meta: [
    {
      name: 'description',
      content:
        'A simple landing page for NuxtNews with a direct path into the news section.',
    },
  ],
})
</script>
