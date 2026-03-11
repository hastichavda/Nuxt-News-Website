<template>
  <div class="space-y-3">
    <!-- Preview area (smaller height for modal context) -->
    <div
      v-if="images.length === 1"
      class="overflow-hidden rounded-lg border border-border bg-muted/20 max-w-3xl"
    >
      <button type="button" class="block w-full text-left" @click="show(0)">
        <img
          :src="images[0]"
          :alt="alt"
          class="w-full h-56 sm:h-64 object-cover"
          loading="lazy"
        />
      </button>
    </div>

    <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-3">
      <button
        v-for="(src, i) in images"
        :key="src + i"
        type="button"
        class="overflow-hidden rounded-lg border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary transition hover:-translate-y-[1px] hover:shadow-sm"
        @click="show(i)"
      >
        <img
          :src="src"
          :alt="alt"
          class="aspect-[4/3] w-full object-cover"
          loading="lazy"
        />
      </button>
    </div>

    <TransitionRoot :show="open" as="template">
      <Dialog class="relative z-[100]" @close="open = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-200"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-150"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="ease-out duration-200"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="ease-in duration-150"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-surface shadow-xl"
              >
                <div
                  class="flex items-center justify-between border-b border-border px-4 py-3"
                >
                  <div class="text-sm font-medium text-on-surface">
                    Image {{ activeIndex + 1 }} / {{ images.length }}
                  </div>
                  <button
                    type="button"
                    class="rounded-lg p-2 text-muted hover:bg-muted/10 hover:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                    @click="open = false"
                  >
                    <span class="sr-only">Close</span>
                    <XMarkIcon class="h-5 w-5" />
                  </button>
                </div>

                <div class="bg-black/5 dark:bg-white/5">
                  <img
                    :src="images[activeIndex]"
                    :alt="alt"
                    class="w-full h-auto max-h-[80vh] object-contain"
                  />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  images: string[]
  alt: string
}>()

const open = ref(false)
const activeIndex = ref(0)

function show(i: number) {
  activeIndex.value = i
  open.value = true
}
</script>
