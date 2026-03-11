import { c as useNuxtApp, d as useRuntimeConfig, e as defineStore } from "../server.mjs";
import { ref, computed } from "vue";
import { parse } from "/Users/hastichavda/projects/web/News-Website-main/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import { getRequestHeader, setCookie, getCookie, deleteCookie } from "/Users/hastichavda/projects/web/News-Website-main/node_modules/h3/dist/index.mjs";
import destr from "/Users/hastichavda/projects/web/News-Website-main/node_modules/destr/dist/index.mjs";
import { isEqual } from "/Users/hastichavda/projects/web/News-Website-main/node_modules/ohash/dist/index.mjs";
import { klona } from "/Users/hastichavda/projects/web/News-Website-main/node_modules/klona/dist/index.mjs";
function useRequestEvent(nuxtApp) {
  nuxtApp ||= useNuxtApp();
  return nuxtApp.ssrContext?.event;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => {
    const decoded = decodeURIComponent(val);
    const parsed = destr(decoded);
    if (typeof parsed === "number" && (!Number.isFinite(parsed) || String(parsed) !== decoded)) {
      return decoded;
    }
    return parsed;
  },
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  const opts = { ...CookieDefaults, ..._opts };
  opts.filter ??= (key) => key === name;
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? opts.default?.());
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual(cookie.value, cookies[name])) {
        return;
      }
      nuxtApp._cookies ||= {};
      if (name in nuxtApp._cookies) {
        if (isEqual(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
const BASE_URL = "https://newsdata.io/api/1/latest";
const PAGE_SIZE = 10;
async function parseApiError(res) {
  const text = await res.text();
  try {
    const json = JSON.parse(text);
    const msg = json.results?.message;
    if (msg) return msg;
  } catch {
  }
  return `News API error: ${res.status} ${res.statusText}. ${text.slice(0, 150)}`;
}
async function fetchNewsList(params) {
  const { apikey, page = 1, nextPage, q, category, language, country } = params;
  if (!apikey) {
    return {
      articles: [],
      nextPage: null,
      totalResults: null,
      error: new Error("News API key is not configured")
    };
  }
  try {
    const url = new URL(BASE_URL);
    url.searchParams.set("apikey", apikey);
    url.searchParams.set("size", String(PAGE_SIZE));
    if (q) url.searchParams.set("q", q);
    if (category) url.searchParams.set("category", category);
    if (language) url.searchParams.set("language", language);
    if (country) url.searchParams.set("country", country);
    if (page > 1 && nextPage) {
      url.searchParams.set("page", nextPage);
    }
    const res = await fetch(url.toString(), {
      headers: { Accept: "application/json" }
    });
    if (!res.ok) {
      const errMessage = await parseApiError(res);
      throw new Error(errMessage);
    }
    const data = await res.json();
    if (data.status !== "success" && data.status !== "Success") {
      throw new Error(`News API returned status: ${data.status}`);
    }
    const articles = Array.isArray(data.results) ? data.results : [];
    const next = data.nextPage ?? null;
    const total = data.totalResults ?? null;
    return {
      articles,
      nextPage: next,
      totalResults: total,
      error: null
    };
  } catch (err) {
    return {
      articles: [],
      nextPage: null,
      totalResults: null,
      error: err instanceof Error ? err : new Error(String(err))
    };
  }
}
async function fetchArticleDetail(params) {
  const { apikey, articleId } = params;
  if (!apikey) {
    return {
      article: null,
      error: new Error("News API key is not configured")
    };
  }
  if (!articleId) {
    return {
      article: null,
      error: new Error("Article ID is required")
    };
  }
  try {
    const url = new URL(BASE_URL);
    url.searchParams.set("apikey", apikey);
    url.searchParams.set("id", articleId);
    const res = await fetch(url.toString(), {
      headers: { Accept: "application/json" }
    });
    if (!res.ok) {
      const errMessage = await parseApiError(res);
      throw new Error(errMessage);
    }
    const data = await res.json();
    if (data.status !== "success" && data.status !== "Success") {
      throw new Error(`News API returned status: ${data.status}`);
    }
    const results = Array.isArray(data.results) ? data.results : [];
    const article = results.length > 0 ? results[0] : null;
    return {
      article,
      error: null
    };
  } catch (err) {
    return {
      article: null,
      error: err instanceof Error ? err : new Error(String(err))
    };
  }
}
function useNewsApi() {
  const config = useRuntimeConfig();
  const apikey = config.public.newsApiKey;
  async function fetchNewsList$1(params) {
    return fetchNewsList({ ...params, apikey });
  }
  async function fetchArticleDetail$1(params) {
    return fetchArticleDetail({ ...params, apikey });
  }
  return {
    fetchNewsList: fetchNewsList$1,
    fetchArticleDetail: fetchArticleDetail$1
  };
}
function parseISODateOnly(value) {
  if (typeof value !== "string") return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  return value;
}
function parseString(value) {
  return typeof value === "string" ? value : "";
}
function parsePreset(value) {
  if (value === "this_week" || value === "last_3_months" || value === "custom") return value;
  return "any";
}
function withinRange(pubDate, from, to) {
  if (!from && !to) return true;
  if (!pubDate) return false;
  const d = new Date(pubDate);
  if (Number.isNaN(d.getTime())) return false;
  if (from && d < from) return false;
  if (to && d > to) return false;
  return true;
}
function computeRange(filters) {
  const now = /* @__PURE__ */ new Date();
  if (filters.preset === "this_week") {
    const day = now.getDay();
    const diffToMonday = (day + 6) % 7;
    const monday = new Date(now);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(now.getDate() - diffToMonday);
    return { from: monday, to: null };
  }
  if (filters.preset === "last_3_months") {
    const from = new Date(now);
    from.setHours(0, 0, 0, 0);
    from.setMonth(now.getMonth() - 3);
    return { from, to: null };
  }
  if (filters.preset === "custom") {
    const from = filters.from ? /* @__PURE__ */ new Date(`${filters.from}T00:00:00`) : null;
    const to = filters.to ? /* @__PURE__ */ new Date(`${filters.to}T23:59:59`) : null;
    return {
      from: from && !Number.isNaN(from.getTime()) ? from : null,
      to: to && !Number.isNaN(to.getTime()) ? to : null
    };
  }
  return { from: null, to: null };
}
const useNewsStore = defineStore("news", () => {
  const { fetchNewsList: fetchNewsList2, fetchArticleDetail: fetchArticleDetail2 } = useNewsApi();
  const viewCookie = useCookie("news_view", { default: () => "grid" });
  const viewMode = ref(viewCookie.value);
  const filters = ref({
    q: "",
    category: "",
    preset: "any",
    from: null,
    to: null
  });
  const page = ref(1);
  const articles = ref([]);
  const nextPageCursor = ref(null);
  const totalResults = ref(null);
  const loadingList = ref(false);
  const errorList = ref(null);
  const cursorByPage = ref({ 1: null });
  const articleById = ref({});
  const loadingDetailById = ref({});
  const errorDetailById = ref({});
  const filteredArticles = computed(() => {
    const { from, to } = computeRange(filters.value);
    const q = filters.value.q.trim().toLowerCase();
    const categoryFilter = filters.value.category.trim().toLowerCase();
    return articles.value.filter((a) => {
      if (!withinRange(a.pubDate, from, to)) return false;
      if (q) {
        const haystack = `${a.title ?? ""} ${a.description ?? ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (categoryFilter) {
        const categories = (a.category ?? []).map((c) => c.toLowerCase());
        if (!categories.includes(categoryFilter)) return false;
      }
      return true;
    });
  });
  function syncFromRoute(query) {
    const p = Math.max(1, Number(query.page) || 1);
    page.value = p;
    filters.value = {
      q: parseString(query.q),
      category: parseString(query.category),
      preset: parsePreset(query.preset),
      from: parseISODateOnly(query.from),
      to: parseISODateOnly(query.to)
    };
    const cursor = typeof query.nextPage === "string" ? query.nextPage : null;
    if (p > 1) cursorByPage.value[p] = cursor;
  }
  async function fetchListForCurrentRoute(query) {
    syncFromRoute(query);
    loadingList.value = true;
    errorList.value = null;
    const cursor = page.value > 1 ? cursorByPage.value[page.value] ?? null : null;
    const result = await fetchNewsList2({
      page: page.value,
      nextPage: cursor ?? void 0,
      q: filters.value.q || void 0,
      category: filters.value.category || void 0,
      language: void 0,
      country: void 0
    });
    loadingList.value = false;
    if (result.error) {
      articles.value = [];
      nextPageCursor.value = null;
      totalResults.value = null;
      errorList.value = result.error.message;
      return;
    }
    articles.value = result.articles;
    nextPageCursor.value = result.nextPage;
    totalResults.value = result.totalResults;
    if (result.nextPage) cursorByPage.value[page.value + 1] = result.nextPage;
  }
  async function fetchDetail(id) {
    if (!id) return;
    if (articleById.value[id]) return;
    loadingDetailById.value[id] = true;
    errorDetailById.value[id] = null;
    const result = await fetchArticleDetail2({ articleId: id });
    loadingDetailById.value[id] = false;
    if (result.error) {
      errorDetailById.value[id] = result.error.message;
      return;
    }
    if (!result.article) {
      errorDetailById.value[id] = null;
      return;
    }
    articleById.value[id] = result.article;
  }
  function getDetailState(id) {
    return {
      article: articleById.value[id] ?? null,
      loading: !!loadingDetailById.value[id],
      error: errorDetailById.value[id] ?? null
    };
  }
  function setViewMode(mode) {
    viewMode.value = mode;
    viewCookie.value = mode;
  }
  function clearFilters() {
    filters.value = {
      q: "",
      category: "",
      preset: "any",
      from: null,
      to: null
    };
    page.value = 1;
    cursorByPage.value = { 1: null };
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
    clearFilters
  };
});
export {
  useNewsStore as u
};
//# sourceMappingURL=news-CgqK9_x2.js.map
