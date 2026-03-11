<template>
  <div class="flex min-h-screen flex-col overflow-x-hidden">
    <LayoutHeader />
    <main class="min-w-0 flex-1">
      <Transition name="page-fade" mode="out-in">
        <slot />
      </Transition>
    </main>
    <LayoutFooter />
  </div>
</template>
