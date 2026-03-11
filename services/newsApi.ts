import type { NewsArticle, NewsListResponse, NewsDetailResponse } from '~/types'

const BASE_URL = 'https://newsdata.io/api/1/latest'
const PAGE_SIZE = 10

/** Parse error body from NewsData.io to show a clear message (e.g. invalid API key). */
async function parseApiError(res: Response): Promise<string> {
  const text = await res.text()
  try {
    const json = JSON.parse(text) as { results?: { message?: string; code?: string } }
    const msg = json.results?.message
    if (msg) return msg
  } catch {
    // ignore
  }
  return `News API error: ${res.status} ${res.statusText}. ${text.slice(0, 150)}`
}

export interface FetchNewsListParams {
  apikey: string
  page?: number
  nextPage?: string | null
  q?: string
  category?: string
  language?: string
  country?: string
}

export interface FetchNewsListResult {
  articles: NewsArticle[]
  nextPage: string | null
  totalResults: number | null
  error: Error | null
}

export interface FetchArticleDetailParams {
  apikey: string
  articleId: string
}

export interface FetchArticleDetailResult {
  article: NewsArticle | null
  error: Error | null
}

/**
 * Fetches a page of latest news articles.
 * For page 1, no cursor is used. For page 2+, pass the nextPage cursor from the previous response.
 */
export async function fetchNewsList(params: FetchNewsListParams): Promise<FetchNewsListResult> {
  const { apikey, page = 1, nextPage, q, category, language, country } = params

  if (!apikey) {
    return {
      articles: [],
      nextPage: null,
      totalResults: null,
      error: new Error('News API key is not configured'),
    }
  }

  try {
    const url = new URL(BASE_URL)
    url.searchParams.set('apikey', apikey)
    url.searchParams.set('size', String(PAGE_SIZE))

    if (q) url.searchParams.set('q', q)
    if (category) url.searchParams.set('category', category)
    if (language) url.searchParams.set('language', language)
    if (country) url.searchParams.set('country', country)

    if (page > 1 && nextPage) {
      url.searchParams.set('page', nextPage)
    }

    const res = await fetch(url.toString(), {
      headers: { Accept: 'application/json' },
    })

    if (!res.ok) {
      const errMessage = await parseApiError(res)
      throw new Error(errMessage)
    }

    const data = (await res.json()) as NewsListResponse

    if (data.status !== 'success' && data.status !== 'Success') {
      throw new Error(`News API returned status: ${data.status}`)
    }

    const articles = Array.isArray(data.results) ? data.results : []
    const next = data.nextPage ?? null
    const total = data.totalResults ?? null

    return {
      articles,
      nextPage: next,
      totalResults: total,
      error: null,
    }
  } catch (err) {
    return {
      articles: [],
      nextPage: null,
      totalResults: null,
      error: err instanceof Error ? err : new Error(String(err)),
    }
  }
}

/**
 * Fetches a single article by ID.
 */
export async function fetchArticleDetail(params: FetchArticleDetailParams): Promise<FetchArticleDetailResult> {
  const { apikey, articleId } = params

  if (!apikey) {
    return {
      article: null,
      error: new Error('News API key is not configured'),
    }
  }

  if (!articleId) {
    return {
      article: null,
      error: new Error('Article ID is required'),
    }
  }

  try {
    const url = new URL(BASE_URL)
    url.searchParams.set('apikey', apikey)
    url.searchParams.set('id', articleId)

    const res = await fetch(url.toString(), {
      headers: { Accept: 'application/json' },
    })

    if (!res.ok) {
      const errMessage = await parseApiError(res)
      throw new Error(errMessage)
    }

    const data = (await res.json()) as NewsDetailResponse

    if (data.status !== 'success' && data.status !== 'Success') {
      throw new Error(`News API returned status: ${data.status}`)
    }

    const results = Array.isArray(data.results) ? data.results : []
    const article = results.length > 0 ? results[0] : null

    return {
      article,
      error: null,
    }
  } catch (err) {
    return {
      article: null,
      error: err instanceof Error ? err : new Error(String(err)),
    }
  }
}

export { PAGE_SIZE }
