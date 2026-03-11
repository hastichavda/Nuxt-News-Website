export function baseURL() {
  // Used by Nuxt's server bundle as the base URL for $fetch.
  // Keep it deterministic for SSR.
  return process.env.NUXT_APP_BASE_URL || '/'
}

