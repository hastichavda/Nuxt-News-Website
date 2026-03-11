import { defineStore } from 'pinia'
import type { NewsArticle } from '~/types'

export type DatePreset = 'any' | 'this_week' | 'last_3_months' | 'custom'
export type NewsViewMode = 'grid' | 'list'

export interface NewsFilters {
  q: string
  category: string
  preset: DatePreset
  from: string | null // ISO date (yyyy-mm-dd)
  to: string | null // ISO date (yyyy-mm-dd)
}

function parseISODateOnly(value: unknown): string | null {
  if (typeof value !== 'string') return null
  // yyyy-mm-dd
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  return value
}

function parseString(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function parsePreset(value: unknown): DatePreset {
  if (value === 'this_week' || value === 'last_3_months' || value === 'custom') return value
  return 'any'
}

function withinRange(pubDate: string | undefined, from: Date | null, to: Date | null) {
  if (!from && !to) return true
  if (!pubDate) return false
  const d = new Date(pubDate)
  if (Number.isNaN(d.getTime())) return false
  if (from && d < from) return false
  if (to && d > to) return false
  return true
}

function computeRange(filters: NewsFilters): { from: Date | null; to: Date | null } {
  const now = new Date()

  if (filters.preset === 'this_week') {
    const day = now.getDay() // 0..6
    const diffToMonday = (day + 6) % 7
    const monday = new Date(now)
    monday.setHours(0, 0, 0, 0)
    monday.setDate(now.getDate() - diffToMonday)
    return { from: monday, to: null }
  }

  if (filters.preset === 'last_3_months') {
    const from = new Date(now)
    from.setHours(0, 0, 0, 0)
    from.setMonth(now.getMonth() - 3)
    return { from, to: null }
  }

  if (filters.preset === 'custom') {
    const from = filters.from ? new Date(`${filters.from}T00:00:00`) : null
    const to = filters.to ? new Date(`${filters.to}T23:59:59`) : null
    return {
      from: from && !Number.isNaN(from.getTime()) ? from : null,
      to: to && !Number.isNaN(to.getTime()) ? to : null,
    }
  }

  return { from: null, to: null }
}

export const useNewsStore = defineStore('news', () => {
  const { fetchNewsList, fetchArticleDetail } = useNewsApi()

  const viewCookie = useCookie<NewsViewMode>('news_view', { default: () => 'grid' })
  const viewMode = ref<NewsViewMode>(viewCookie.value)

  const filters = ref<NewsFilters>({
    q: '',
    category: '',
    preset: 'any',
    from: null,
    to: null,
  })

  const page = ref(1)
  const articles = ref<NewsArticle[]>([])
  const nextPageCursor = ref<string | null>(null)
  const totalResults = ref<number | null>(null)

  const loadingList = ref(false)
  const errorList = ref<string | null>(null)

  // Keep the cursor for each page (page 1 => null, page 2 => cursor, etc.)
  const cursorByPage = ref<Record<number, string | null>>({ 1: null })

  // Detail cache
  const articleById = ref<Record<string, NewsArticle>>({})
  const loadingDetailById = ref<Record<string, boolean>>({})
  const errorDetailById = ref<Record<string, string | null>>({})

  const filteredArticles = computed(() => {
    const { from, to } = computeRange(filters.value)
    const q = filters.value.q.trim().toLowerCase()
    const categoryFilter = filters.value.category.trim().toLowerCase()

    return articles.value.filter((a) => {
      if (!withinRange(a.pubDate, from, to)) return false

      if (q) {
        const haystack = `${a.title ?? ''} ${a.description ?? ''}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }

      if (categoryFilter) {
        const categories = (a.category ?? []).map((c) => c.toLowerCase())
        if (!categories.includes(categoryFilter)) return false
      }

      return true
    })
  })

  function syncFromRoute(query: Record<string, unknown>) {
    const p = Math.max(1, Number(query.page) || 1)
    page.value = p

    filters.value = {
      q: parseString(query.q),
      category: parseString(query.category),
      preset: parsePreset(query.preset),
      from: parseISODateOnly(query.from),
      to: parseISODateOnly(query.to),
    }

    const cursor = typeof query.nextPage === 'string' ? query.nextPage : null
    if (p > 1) cursorByPage.value[p] = cursor
  }

  async function fetchListForCurrentRoute(query: Record<string, unknown>) {
    syncFromRoute(query)

    loadingList.value = true
    errorList.value = null

    const cursor = page.value > 1 ? cursorByPage.value[page.value] ?? null : null

    const result = await fetchNewsList({
      page: page.value,
      nextPage: cursor ?? undefined,
      q: filters.value.q || undefined,
      category: filters.value.category || undefined,
      language: undefined,
      country: undefined,
    })

    loadingList.value = false

    if (result.error) {
      articles.value = []
      nextPageCursor.value = null
      totalResults.value = null
      errorList.value = result.error.message
      return
    }

    articles.value = result.articles
    nextPageCursor.value = result.nextPage
    totalResults.value = result.totalResults

    // Store cursor for next page so the UI can build a crawlable URL.
    if (result.nextPage) cursorByPage.value[page.value + 1] = result.nextPage
  }

  async function fetchDetail(id: string) {
    if (!id) return
    if (articleById.value[id]) return

    loadingDetailById.value[id] = true
    errorDetailById.value[id] = null

    const result = await fetchArticleDetail({ articleId: id })

    loadingDetailById.value[id] = false

    if (result.error) {
      errorDetailById.value[id] = result.error.message
      return
    }

    if (!result.article) {
      errorDetailById.value[id] = null
      return
    }

    articleById.value[id] = result.article
  }

  function getDetailState(id: string) {
    return {
      article: articleById.value[id] ?? null,
      loading: !!loadingDetailById.value[id],
      error: errorDetailById.value[id] ?? null,
    }
  }

  function setViewMode(mode: NewsViewMode) {
    viewMode.value = mode
    viewCookie.value = mode
  }

  function clearFilters() {
    filters.value = {
      q: '',
      category: '',
      preset: 'any',
      from: null,
      to: null,
    }
    page.value = 1
    cursorByPage.value = { 1: null }
  }

  return {
    viewMode,
    setViewMode,
    filters,
    page,
    articles,
    filteredArticles,
    nextPageCursor,
    totalResults,
    loadingList,
    errorList,
    cursorByPage,
    syncFromRoute,
    fetchListForCurrentRoute,
    fetchDetail,
    getDetailState,
    clearFilters,
  }
})

