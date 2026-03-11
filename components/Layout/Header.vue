<template>
  <header
    class="sticky top-0 z-50 border-b border-border bg-surface/90 text-on-surface backdrop-blur transition-colors duration-300 dark:bg-slate-950/90"
    :class="[isScrolled ? 'shadow-sm' : 'shadow-none']"
  >
    <div
      class="container-wide flex h-14 items-center justify-between gap-4 sm:h-16"
    >
      <NuxtLink to="/" class="flex items-center no-underline hover:opacity-90">
        <AppLogo />
      </NuxtLink>

      <nav
        class="flex items-center text-xs font-semibold uppercase tracking-wide sm:text-sm"
        aria-label="Main"
      >
        <NuxtLink
          to="/news"
          class="rounded-full px-4 py-2 transition-all"
          :class="newsLinkClass"
        >
          News
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
<script setup lang="ts">
const route = useRoute()
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

const newsLinkClass = computed(() =>
  route.path.startsWith('/news')
    ? 'bg-primary text-on-primary shadow-sm'
    : 'text-muted hover:bg-muted/10 hover:text-on-surface',
)

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
