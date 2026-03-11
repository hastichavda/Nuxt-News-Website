import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchNewsList, fetchArticleDetail } from '~/services/newsApi'

describe('newsApi', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  describe('fetchNewsList', () => {
    it('returns error when apikey is missing', async () => {
      const result = await fetchNewsList({ apikey: '' })
      expect(result.error).not.toBeNull()
      expect(result.error?.message).toContain('not configured')
      expect(result.articles).toEqual([])
    })

    it('returns articles and nextPage on success', async () => {
      const mockResults = [
        { article_id: '1', title: 'Test', description: null, image_url: null },
      ]
      ;(globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            status: 'success',
            results: mockResults,
            nextPage: 'cursor123',
            totalResults: 100,
          }),
      })

      const result = await fetchNewsList({ apikey: 'key', page: 1 })
      expect(result.error).toBeNull()
      expect(result.articles).toHaveLength(1)
      expect(result.articles[0].title).toBe('Test')
      expect(result.nextPage).toBe('cursor123')
      expect(result.totalResults).toBe(100)
    })

    it('returns error when API response is not ok', async () => {
      ;(globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        text: () => Promise.resolve('Invalid key'),
      })

      const result = await fetchNewsList({ apikey: 'bad' })
      expect(result.error).not.toBeNull()
      expect(result.articles).toEqual([])
    })
  })

  describe('fetchArticleDetail', () => {
    it('returns error when apikey is missing', async () => {
      const result = await fetchArticleDetail({ apikey: '', articleId: 'x' })
      expect(result.error).not.toBeNull()
      expect(result.article).toBeNull()
    })

    it('returns error when articleId is empty', async () => {
      const result = await fetchArticleDetail({ apikey: 'key', articleId: '' })
      expect(result.error).not.toBeNull()
      expect(result.article).toBeNull()
    })

    it('returns article on success', async () => {
      const mockArticle = {
        article_id: 'abc',
        title: 'Detail',
        description: 'Desc',
        image_url: 'https://example.com/img.jpg',
      }
      ;(globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            status: 'success',
            results: [mockArticle],
          }),
      })

      const result = await fetchArticleDetail({ apikey: 'key', articleId: 'abc' })
      expect(result.error).toBeNull()
      expect(result.article).not.toBeNull()
      expect(result.article?.title).toBe('Detail')
      expect(result.article?.article_id).toBe('abc')
    })

    it('returns null article when results are empty', async () => {
      ;(globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            status: 'success',
            results: [],
          }),
      })

      const result = await fetchArticleDetail({ apikey: 'key', articleId: 'missing' })
      expect(result.error).toBeNull()
      expect(result.article).toBeNull()
    })
  })
})
