<template>
  <footer class="mt-10 border-t border-border bg-surface">
    <div class="py-6 container-wide sm:py-8">
      <p class="text-sm text-center text-muted">
        © {{ year }} News. Starter layout.
      </p>
    </div>
  </footer>
</template>
<script setup lang="ts">
const year = new Date().getFullYear()
</script>
