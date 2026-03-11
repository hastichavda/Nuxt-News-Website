/** Single article from NewsData.io API */
export interface NewsArticle {
  article_id: string
  title: string
  link?: string
  description: string | null
  image_url: string | null
  pubDate?: string
  creator?: string | null
  source_id?: string | null
  source_url?: string | null
  country?: string[]
  category?: string[]
}

/** List response from NewsData.io latest endpoint */
export interface NewsListResponse {
  status: string
  totalResults?: number
  results: NewsArticle[]
  nextPage?: string | null
}

/** Detail response: same as list but typically one result */
export interface NewsDetailResponse {
  status: string
  totalResults?: number
  results: NewsArticle[]
}
