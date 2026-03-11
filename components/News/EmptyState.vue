<template>
  <div
    class="mx-auto flex max-w-2xl flex-col items-center rounded-3xl bg-sky-50/70 px-6 py-12 text-center dark:bg-slate-800/40 sm:px-10"
  >
    <img
      src="/img/no-news.svg"
      alt="No news found"
      class="h-36 w-36 object-contain sm:h-40 sm:w-40"
      loading="lazy"
    />
    <h2 class="mt-6 text-2xl font-semibold tracking-tight text-on-surface">
      No news data found
    </h2>
    <p class="mt-3 max-w-lg text-sm leading-6 text-muted sm:text-base">
      No articles match the current filters or search query. Try clearing the
      filters, changing the date range, or searching with a broader keyword.
    </p>
  </div>
</template>
