<template>
  <div class="min-w-0 flex flex-col gap-3 sm:gap-4">
    <!-- Single row: search on the left, filters on the right -->
    <div class="w-full" ref="searchContainer">
      <label class="sr-only" for="q">Search</label>
      <div
        class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
      >
        <div class="flex min-w-0 w-full items-center gap-2 sm:w-auto sm:flex-1">
          <button
            type="button"
            class="inline-flex items-center justify-center transition-all border rounded-full h-9 w-9 border-border bg-surface text-muted hover:bg-muted/10 hover:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            @click="searchOpen ? closeSearch() : openSearch()"
          >
            <MagnifyingGlassIcon class="w-5 h-5" />
          </button>

          <TransitionRoot
            appear
            :show="searchOpen"
            enter="transform transition-all duration-150 ease-out"
            enter-from="opacity-0 -translate-x-4 scale-95"
            enter-to="opacity-100 translate-x-0 scale-100"
            leave="transform transition-all duration-125 ease-in"
            leave-from="opacity-100 translate-x-0 scale-100"
            leave-to="opacity-0 -translate-x-4 scale-95"
          >
            <div class="relative min-w-0 flex-1 sm:max-w-sm">
              <MagnifyingGlassIcon
                class="absolute w-4 h-4 -translate-y-1/2 pointer-events-none left-3 top-1/2 text-muted"
              />
              <input
                id="q"
                ref="searchInputEl"
                :value="props.q"
                type="search"
                placeholder="Search news…"
                class="w-full rounded-lg border border-border bg-surface pl-8 pr-3 py-2 text-sm text-on-surface placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary transition-[box-shadow,transform,width] duration-150"
                @input="handleSearchInput"
                @keydown.enter.prevent="emit('apply')"
              />
            </div>
          </TransitionRoot>
        </div>

        <!-- Right side: category + preset + apply -->
        <div
          class="flex flex-col w-full gap-3 sm:flex-row sm:items-center sm:gap-4 sm:justify-end sm:w-auto"
        >
          <!-- Category filter with inline clear icon -->
          <div class="w-full sm:w-56">
            <Listbox
              :model-value="props.category"
              @update:model-value="
                (v: string) => {
                  emit('update:category', v)
                  emit('apply')
                }
              "
            >
              <div class="relative">
                <ListboxButton
                  class="flex items-center w-full px-3 py-2 text-sm text-left transition border rounded-lg border-border bg-surface text-on-surface hover:bg-muted/10 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <span class="block min-w-0 truncate pr-8">
                    {{
                      categories.find((c) => c.id === props.category)?.label ??
                      'All categories'
                    }}
                  </span>
                  <button
                    v-if="props.category"
                    type="button"
                    class="absolute inline-flex items-center justify-center w-5 h-5 -translate-y-1/2 rounded-full right-3 top-1/2 text-muted hover:text-on-surface hover:bg-muted/10"
                    title="Clear category"
                    @click.stop="clearCategory"
                  >
                    <XMarkIcon class="w-3 h-3" />
                  </button>
                  <ChevronDownIcon
                    v-else
                    class="absolute w-5 h-5 -translate-y-1/2 right-3 top-1/2 text-muted"
                    aria-hidden="true"
                  />
                </ListboxButton>

                <TransitionRoot
                  enter="transition ease-out duration-150"
                  enter-from="opacity-0 translate-y-1"
                  enter-to="opacity-100 translate-y-0"
                  leave="transition ease-in duration-100"
                  leave-from="opacity-100 translate-y-0"
                  leave-to="opacity-0 translate-y-1"
                >
                  <ListboxOptions
                    class="absolute z-50 w-full mt-2 overflow-auto border shadow-lg max-h-64 rounded-xl border-border bg-surface focus:outline-none scroll-thin"
                  >
                    <ListboxOption
                      v-for="c in categories"
                      :key="c.id"
                      :value="c.id"
                      v-slot="{ active, selected }"
                    >
                      <li
                        class="px-3 py-2 text-sm cursor-pointer select-none"
                        :class="
                          active
                            ? 'bg-muted/10 text-on-surface'
                            : 'text-on-surface'
                        "
                      >
                        <span
                          :class="
                            selected
                              ? 'font-semibold text-primary'
                              : 'font-medium'
                          "
                        >
                          {{ c.label }}
                        </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </TransitionRoot>
              </div>
            </Listbox>
          </div>

          <!-- Date preset filter with inline clear icon -->
          <div class="w-full sm:w-64">
            <Listbox
              :model-value="props.preset"
              @update:model-value="(v: DatePreset) => handlePresetChange(v)"
            >
              <div class="relative">
                <ListboxButton
                  class="flex items-center w-full px-3 py-2 text-sm text-left transition border rounded-lg border-border bg-surface text-on-surface hover:bg-muted/10 focus:outline-none focus:ring-2 focus:ring-primary"
                  @click="inlineCalendarOpen = false"
                >
                  <span class="inline-flex min-w-0 items-center gap-2 pr-8">
                    <CalendarDaysIcon class="h-5 w-5 shrink-0 text-muted" />
                    <span class="block min-w-0 truncate">
                      {{
                        props.preset === 'custom'
                          ? customPresetLabel
                          : (presets.find((p) => p.id === props.preset)
                              ?.label ?? 'Select Date')
                      }}
                    </span>
                  </span>
                  <button
                    v-if="hasActiveDateFilters"
                    type="button"
                    class="absolute inline-flex items-center justify-center w-5 h-5 -translate-y-1/2 rounded-full right-3 top-1/2 text-muted hover:text-on-surface hover:bg-muted/10"
                    title="Clear date filters"
                    @click.stop="clearDateFilters"
                  >
                    <XMarkIcon class="w-3 h-3" />
                  </button>
                  <ChevronDownIcon
                    v-else
                    class="absolute w-5 h-5 -translate-y-1/2 right-3 top-1/2 text-muted"
                    aria-hidden="true"
                  />
                </ListboxButton>

                <TransitionRoot
                  enter="transition ease-out duration-150"
                  enter-from="opacity-0 translate-y-1"
                  enter-to="opacity-100 translate-y-0"
                  leave="transition ease-in duration-100"
                  leave-from="opacity-100 translate-y-0"
                  leave-to="opacity-0 translate-y-1"
                >
                  <ListboxOptions
                    class="absolute z-50 w-full mt-2 overflow-auto border shadow-lg top-full max-h-72 rounded-xl border-border bg-surface focus:outline-none scroll-thin"
                  >
                    <ListboxOption
                      v-for="p in presets"
                      :key="p.id"
                      :value="p.id"
                      v-slot="{ active, selected }"
                    >
                      <li
                        class="px-3 py-2 text-sm cursor-pointer select-none"
                        :class="
                          active
                            ? 'bg-muted/10 text-on-surface'
                            : 'text-on-surface'
                        "
                      >
                        <span
                          :class="
                            selected
                              ? 'font-semibold text-primary'
                              : 'font-medium'
                          "
                        >
                          {{ p.label }}
                        </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </TransitionRoot>
              </div>
            </Listbox>
          </div>
        </div>
      </div>
    </div>

    <ClientOnly>
      <div
        v-if="inlineCalendarOpen && props.preset === 'custom'"
        class="relative mt-1 w-full min-w-0"
      >
        <div
          class="mt-1 w-full min-w-0 sm:absolute sm:right-0 sm:z-40 sm:w-auto"
        >
          <div
            class="w-full max-w-full overflow-hidden rounded-xl border border-border bg-surface shadow-lg sm:w-auto sm:max-w-[calc(100vw-2rem)]"
          >
            <VDatePicker
              v-model="dateRange"
              is-range
              :columns="1"
              color="blue"
              class="w-full max-w-full [&_.vc-container]:w-full [&_.vc-container]:max-w-full [&_.vc-container]:min-w-0"
              @dayclick="
                (_payload: unknown, event?: Event) => {
                  ;(event?.target as HTMLElement | undefined)?.blur()
                }
              "
              @update:model-value="handleDateRangeChange"
            />
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
import type { DatePreset } from '~/stores/news'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  TransitionRoot,
} from '@headlessui/vue'
import {
  ChevronDownIcon,
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps<{
  q: string
  category: string
  preset: DatePreset
  from: string | null
  to: string | null
}>()

const emit = defineEmits<{
  (e: 'update:q', value: string): void
  (e: 'update:category', value: string): void
  (e: 'update:preset', value: DatePreset): void
  (e: 'update:from', value: string | null): void
  (e: 'update:to', value: string | null): void
  (e: 'apply'): void
}>()

const presets: Array<{ id: DatePreset; label: string }> = [
  { id: 'any', label: 'Any time' },
  { id: 'this_week', label: 'This week' },
  { id: 'last_3_months', label: 'Last 3 Months' },
  { id: 'custom', label: 'Custom date' },
]

const categories: Array<{ id: string; label: string }> = [
  { id: '', label: 'All categories' },
  { id: 'top', label: 'Top' },
  { id: 'business', label: 'Business' },
  { id: 'technology', label: 'Technology' },
  { id: 'sports', label: 'Sports' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'health', label: 'Health' },
  { id: 'science', label: 'Science' },
  { id: 'world', label: 'World' },
]

const searchOpen = ref(false)
const searchContainer = ref<HTMLElement | null>(null)
const searchInputEl = ref<HTMLInputElement | null>(null)

type CalendarRange = { start: Date | null; end: Date | null }

function parseDateOnly(value: string | null): Date | null {
  if (!value) return null
  const parsed = new Date(`${value}T00:00:00`)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

function formatDateOnly(value: Date | null): string | null {
  if (!value || Number.isNaN(value.getTime())) return null
  const year = value.getFullYear()
  const month = String(value.getMonth() + 1).padStart(2, '0')
  const day = String(value.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const dateRange = ref<CalendarRange>({
  start: parseDateOnly(props.from),
  end: parseDateOnly(props.to),
})
const inlineCalendarOpen = ref(false)
watch(
  () => props.preset,
  (val) => {
    inlineCalendarOpen.value = val === 'custom'
  },
)
watch(
  () => [props.from, props.to] as const,
  ([from, to]) => {
    dateRange.value = {
      start: parseDateOnly(from),
      end: parseDateOnly(to),
    }
  },
)

const customPresetLabel = computed(() => {
  if (props.preset !== 'custom') return 'Custom date'

  const format = (value: string | null) => {
    if (!value) return ''
    const d = new Date(`${value}T00:00:00`)
    if (Number.isNaN(d.getTime())) return value
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  }

  const from = props.from
  const to = props.to

  if (from && to && from !== to) {
    return `${format(from)} – ${format(to)}`
  }

  const single = format(from || to)
  return single || 'Custom date'
})

const hasActiveDateFilters = computed(
  () =>
    props.preset !== 'any' ||
    (!!props.from && props.from.length > 0) ||
    (!!props.to && props.to.length > 0),
)

function openSearch() {
  if (!searchOpen.value) {
    searchOpen.value = true
    nextTick(() => {
      searchInputEl.value?.focus()
    })
  }
}

function closeSearch() {
  searchOpen.value = false
}

function handleSearchInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:q', value)
}

function handlePresetChange(value: DatePreset) {
  emit('update:preset', value)
  inlineCalendarOpen.value = value === 'custom'
  if (value !== 'custom') {
    // For non-custom presets, apply immediately
    emit('apply')
  }
}

function applyRangeToFilters() {
  const start = dateRange.value.start
  const end = dateRange.value.end
  emit('update:from', formatDateOnly(start))
  emit('update:to', formatDateOnly(end))
}

function handleDateRangeChange(value: CalendarRange) {
  dateRange.value = value

  if (!value.start) {
    emit('update:from', null)
    emit('update:to', null)
    return
  }

  // Keep the picker open until both ends of the range are selected.
  if (!value.end) {
    emit('update:from', formatDateOnly(value.start))
    emit('update:to', null)
    return
  }

  applyRangeToFilters()
  inlineCalendarOpen.value = false
  emit('apply')
}

function clearCategory() {
  emit('update:category', '')
  emit('apply')
}

function clearDateFilters() {
  dateRange.value = { start: null, end: null }
  emit('update:preset', 'any')
  emit('update:from', null)
  emit('update:to', null)
  inlineCalendarOpen.value = false
  emit('apply')
}

function handleDocumentClick(event: MouseEvent) {
  const target = event.target as Node | null
  if (!target || !searchOpen.value) return
  if (searchContainer.value && !searchContainer.value.contains(target)) {
    closeSearch()
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>
