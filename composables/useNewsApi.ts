import {
  fetchNewsList as fetchNewsListService,
  fetchArticleDetail as fetchArticleDetailService,
  type FetchNewsListParams,
  type FetchArticleDetailParams,
} from '~/services/newsApi'

/**
 * Composable that provides news API calls with the app's API key from runtime config.
 * Use in pages/components; runs on both server and client for SSR.
 */
export function useNewsApi() {
  const config = useRuntimeConfig()
  const apikey = config.public.newsApiKey as string

  async function fetchNewsList(params: Omit<FetchNewsListParams, 'apikey'>) {
    return fetchNewsListService({ ...params, apikey })
  }

  async function fetchArticleDetail(params: Omit<FetchArticleDetailParams, 'apikey'>) {
    return fetchArticleDetailService({ ...params, apikey })
  }

  return {
    fetchNewsList,
    fetchArticleDetail,
  }
}
