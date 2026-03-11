import { _ as __nuxt_component_0 } from './nuxt-link-CTV3v-lD.mjs';
import { defineComponent, computed, withAsyncContext, unref, withCtx, createVNode, createTextVNode, mergeProps, ref, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { TransitionRoot, Dialog, TransitionChild, DialogPanel } from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { u as useRoute } from './server.mjs';
import { u as useNewsStore } from './news-CgqK9_x2.mjs';
import { u as useHead } from './v3-CGCe6pwf.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ImageGallery",
  __ssrInlineRender: true,
  props: {
    images: {},
    alt: {}
  },
  setup(__props) {
    const open = ref(false);
    const activeIndex = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-3" }, _attrs))}>`);
      if (__props.images.length === 1) {
        _push(`<div class="overflow-hidden rounded-lg border border-border bg-muted/20 max-w-3xl"><button type="button" class="block w-full text-left"><img${ssrRenderAttr("src", __props.images[0])}${ssrRenderAttr("alt", __props.alt)} class="w-full h-56 sm:h-64 object-cover" loading="lazy"></button></div>`);
      } else {
        _push(`<div class="grid grid-cols-2 md:grid-cols-3 gap-3"><!--[-->`);
        ssrRenderList(__props.images, (src, i) => {
          _push(`<button type="button" class="overflow-hidden rounded-lg border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary transition hover:-translate-y-[1px] hover:shadow-sm"><img${ssrRenderAttr("src", src)}${ssrRenderAttr("alt", __props.alt)} class="aspect-[4/3] w-full object-cover" loading="lazy"></button>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(ssrRenderComponent(unref(TransitionRoot), {
        show: unref(open),
        as: "template"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Dialog), {
              class: "relative z-[100]",
              onClose: ($event) => open.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TransitionChild), {
                    as: "template",
                    enter: "ease-out duration-200",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "ease-in duration-150",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="fixed inset-0 bg-black/60 backdrop-blur-sm"${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "fixed inset-0 bg-black/60 backdrop-blur-sm" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="fixed inset-0 overflow-y-auto"${_scopeId2}><div class="flex min-h-full items-center justify-center p-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(TransitionChild), {
                    as: "template",
                    enter: "ease-out duration-200",
                    "enter-from": "opacity-0 scale-95",
                    "enter-to": "opacity-100 scale-100",
                    leave: "ease-in duration-150",
                    "leave-from": "opacity-100 scale-100",
                    "leave-to": "opacity-0 scale-95"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DialogPanel), { class: "w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-surface shadow-xl" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="flex items-center justify-between border-b border-border px-4 py-3"${_scopeId4}><div class="text-sm font-medium text-on-surface"${_scopeId4}> Image ${ssrInterpolate(unref(activeIndex) + 1)} / ${ssrInterpolate(__props.images.length)}</div><button type="button" class="rounded-lg p-2 text-muted hover:bg-muted/10 hover:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"${_scopeId4}><span class="sr-only"${_scopeId4}>Close</span>`);
                              _push5(ssrRenderComponent(unref(XMarkIcon), { class: "h-5 w-5" }, null, _parent5, _scopeId4));
                              _push5(`</button></div><div class="bg-black/5 dark:bg-white/5"${_scopeId4}><img${ssrRenderAttr("src", __props.images[unref(activeIndex)])}${ssrRenderAttr("alt", __props.alt)} class="w-full h-auto max-h-[80vh] object-contain"${_scopeId4}></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "flex items-center justify-between border-b border-border px-4 py-3" }, [
                                  createVNode("div", { class: "text-sm font-medium text-on-surface" }, " Image " + toDisplayString(unref(activeIndex) + 1) + " / " + toDisplayString(__props.images.length), 1),
                                  createVNode("button", {
                                    type: "button",
                                    class: "rounded-lg p-2 text-muted hover:bg-muted/10 hover:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary",
                                    onClick: ($event) => open.value = false
                                  }, [
                                    createVNode("span", { class: "sr-only" }, "Close"),
                                    createVNode(unref(XMarkIcon), { class: "h-5 w-5" })
                                  ], 8, ["onClick"])
                                ]),
                                createVNode("div", { class: "bg-black/5 dark:bg-white/5" }, [
                                  createVNode("img", {
                                    src: __props.images[unref(activeIndex)],
                                    alt: __props.alt,
                                    class: "w-full h-auto max-h-[80vh] object-contain"
                                  }, null, 8, ["src", "alt"])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DialogPanel), { class: "w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-surface shadow-xl" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center justify-between border-b border-border px-4 py-3" }, [
                                createVNode("div", { class: "text-sm font-medium text-on-surface" }, " Image " + toDisplayString(unref(activeIndex) + 1) + " / " + toDisplayString(__props.images.length), 1),
                                createVNode("button", {
                                  type: "button",
                                  class: "rounded-lg p-2 text-muted hover:bg-muted/10 hover:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary",
                                  onClick: ($event) => open.value = false
                                }, [
                                  createVNode("span", { class: "sr-only" }, "Close"),
                                  createVNode(unref(XMarkIcon), { class: "h-5 w-5" })
                                ], 8, ["onClick"])
                              ]),
                              createVNode("div", { class: "bg-black/5 dark:bg-white/5" }, [
                                createVNode("img", {
                                  src: __props.images[unref(activeIndex)],
                                  alt: __props.alt,
                                  class: "w-full h-auto max-h-[80vh] object-contain"
                                }, null, 8, ["src", "alt"])
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode(unref(TransitionChild), {
                      as: "template",
                      enter: "ease-out duration-200",
                      "enter-from": "opacity-0",
                      "enter-to": "opacity-100",
                      leave: "ease-in duration-150",
                      "leave-from": "opacity-100",
                      "leave-to": "opacity-0"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "fixed inset-0 bg-black/60 backdrop-blur-sm" })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "fixed inset-0 overflow-y-auto" }, [
                      createVNode("div", { class: "flex min-h-full items-center justify-center p-4" }, [
                        createVNode(unref(TransitionChild), {
                          as: "template",
                          enter: "ease-out duration-200",
                          "enter-from": "opacity-0 scale-95",
                          "enter-to": "opacity-100 scale-100",
                          leave: "ease-in duration-150",
                          "leave-from": "opacity-100 scale-100",
                          "leave-to": "opacity-0 scale-95"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(DialogPanel), { class: "w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-surface shadow-xl" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-center justify-between border-b border-border px-4 py-3" }, [
                                  createVNode("div", { class: "text-sm font-medium text-on-surface" }, " Image " + toDisplayString(unref(activeIndex) + 1) + " / " + toDisplayString(__props.images.length), 1),
                                  createVNode("button", {
                                    type: "button",
                                    class: "rounded-lg p-2 text-muted hover:bg-muted/10 hover:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary",
                                    onClick: ($event) => open.value = false
                                  }, [
                                    createVNode("span", { class: "sr-only" }, "Close"),
                                    createVNode(unref(XMarkIcon), { class: "h-5 w-5" })
                                  ], 8, ["onClick"])
                                ]),
                                createVNode("div", { class: "bg-black/5 dark:bg-white/5" }, [
                                  createVNode("img", {
                                    src: __props.images[unref(activeIndex)],
                                    alt: __props.alt,
                                    class: "w-full h-auto max-h-[80vh] object-contain"
                                  }, null, 8, ["src", "alt"])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Dialog), {
                class: "relative z-[100]",
                onClose: ($event) => open.value = false
              }, {
                default: withCtx(() => [
                  createVNode(unref(TransitionChild), {
                    as: "template",
                    enter: "ease-out duration-200",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "ease-in duration-150",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "fixed inset-0 bg-black/60 backdrop-blur-sm" })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "fixed inset-0 overflow-y-auto" }, [
                    createVNode("div", { class: "flex min-h-full items-center justify-center p-4" }, [
                      createVNode(unref(TransitionChild), {
                        as: "template",
                        enter: "ease-out duration-200",
                        "enter-from": "opacity-0 scale-95",
                        "enter-to": "opacity-100 scale-100",
                        leave: "ease-in duration-150",
                        "leave-from": "opacity-100 scale-100",
                        "leave-to": "opacity-0 scale-95"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(DialogPanel), { class: "w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-surface shadow-xl" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center justify-between border-b border-border px-4 py-3" }, [
                                createVNode("div", { class: "text-sm font-medium text-on-surface" }, " Image " + toDisplayString(unref(activeIndex) + 1) + " / " + toDisplayString(__props.images.length), 1),
                                createVNode("button", {
                                  type: "button",
                                  class: "rounded-lg p-2 text-muted hover:bg-muted/10 hover:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary",
                                  onClick: ($event) => open.value = false
                                }, [
                                  createVNode("span", { class: "sr-only" }, "Close"),
                                  createVNode(unref(XMarkIcon), { class: "h-5 w-5" })
                                ], 8, ["onClick"])
                              ]),
                              createVNode("div", { class: "bg-black/5 dark:bg-white/5" }, [
                                createVNode("img", {
                                  src: __props.images[unref(activeIndex)],
                                  alt: __props.alt,
                                  class: "w-full h-auto max-h-[80vh] object-contain"
                                }, null, 8, ["src", "alt"])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["onClose"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/News/ImageGallery.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const placeholderImage = "/img/news-placeholder.svg";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ArticleDetail",
  __ssrInlineRender: true,
  props: {
    article: {},
    showTitle: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    function formatLong(pubDate) {
      if (!pubDate) return "";
      const d = new Date(pubDate);
      if (Number.isNaN(d.getTime())) return "";
      return d.toLocaleString(void 0, {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }
    function parseImageUrls(value) {
      if (!value) return [];
      return value.split(",").map((s) => s.trim()).filter(Boolean).filter((s) => /^https?:\/\//.test(s));
    }
    const images = computed(() => parseImageUrls(props.article.image_url));
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NewsImageGallery = _sfc_main$2;
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><header class="space-y-3"><div class="flex flex-wrap items-center gap-2 text-xs text-muted">`);
      if (__props.article.source_id) {
        _push(`<span class="rounded-full border border-border px-2 py-0.5">${ssrInterpolate(__props.article.source_id)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if ((_a = __props.article.category) == null ? void 0 : _a[0]) {
        _push(`<span class="rounded-full border border-border px-2 py-0.5">${ssrInterpolate(__props.article.category[0])}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.article.pubDate) {
        _push(`<span class="inline-flex items-center gap-1"><span class="h-1 w-1 rounded-full bg-muted" aria-hidden="true"></span> ${ssrInterpolate(formatLong(__props.article.pubDate))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.showTitle !== false) {
        _push(`<h1 class="text-2xl sm:text-3xl font-bold text-on-surface leading-tight">${ssrInterpolate(__props.article.title)}</h1>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
      if (unref(images).length) {
        _push(`<div class="space-y-2">`);
        _push(ssrRenderComponent(_component_NewsImageGallery, {
          images: unref(images),
          alt: __props.article.title
        }, null, _parent));
        if (unref(images).length > 1) {
          _push(`<p class="text-xs text-muted"> Multiple images detected from the article feed. </p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="aspect-[16/9] max-w-2xl overflow-hidden rounded-lg border border-border bg-muted/20"><img${ssrRenderAttr("src", placeholderImage)}${ssrRenderAttr("alt", __props.article.title)} class="h-full w-full object-cover"></div>`);
      }
      if (__props.article.description) {
        _push(`<div class="text-on-surface leading-relaxed"><p class="whitespace-pre-wrap">${ssrInterpolate(__props.article.description)}</p></div>`);
      } else {
        _push(`<p class="text-muted">No description available.</p>`);
      }
      _push(`</article>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/News/ArticleDetail.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b, _c;
    let __temp, __restore;
    const route = useRoute();
    const id = computed(() => String(route.params.id || ""));
    const news = useNewsStore();
    [__temp, __restore] = withAsyncContext(() => news.fetchDetail(id.value)), await __temp, __restore();
    const detail = computed(() => news.getDetailState(id.value));
    const articleTitle = computed(
      () => detail.value.article ? `${detail.value.article.title} | NuxtNews` : "Article | NuxtNews"
    );
    useHead({
      title: articleTitle,
      meta: [
        {
          name: "description",
          content: (_c = (_b = (_a = detail.value.article) == null ? void 0 : _a.description) == null ? void 0 : _b.slice(0, 160)) != null ? _c : "Read this news article."
        },
        {
          property: "og:title",
          content: articleTitle.value
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NewsArticleDetail = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(detail).article) {
        _push(`<section class="relative overflow-hidden border-b border-border bg-gradient-to-b from-sky-100 via-sky-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"><div class="absolute inset-0 pointer-events-none"><div class="absolute rounded-full -top-32 -right-32 h-72 w-72 bg-primary/10 blur-3xl"></div><div class="absolute rounded-full -bottom-40 -left-40 h-96 w-96 bg-primary/10 blur-3xl"></div></div><div class="relative z-10 py-8 container-wide sm:py-10"><h1 class="max-w-3xl text-2xl font-bold leading-snug sm:text-3xl md:text-4xl text-on-surface">${ssrInterpolate(unref(detail).article.title)}</h1></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="py-8 container-wide sm:py-12"><div class="bg-white/95 dark:bg-slate-900/95"><div class="max-w-4xl mx-auto"><div class="mb-6">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/news",
        class: "inline-flex items-center gap-2 rounded text-muted hover:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span aria-hidden="true"${_scopeId}>\u2190</span> Back to news `);
          } else {
            return [
              createVNode("span", { "aria-hidden": "true" }, "\u2190"),
              createTextVNode(" Back to news ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(detail).loading) {
        _push(`<div class="space-y-6"><div class="w-3/4 h-8 rounded bg-muted/30 animate-pulse"></div><div class="rounded-lg aspect-video bg-muted/20 animate-pulse"></div><div class="space-y-2"><div class="w-full h-4 rounded bg-muted/20 animate-pulse"></div><div class="w-full h-4 rounded bg-muted/20 animate-pulse"></div><div class="w-2/3 h-4 rounded bg-muted/20 animate-pulse"></div></div></div>`);
      } else if (unref(detail).error) {
        _push(`<div class="p-4 text-red-600 border rounded-lg border-red-500/50 bg-red-500/10 dark:text-red-400"><p class="font-medium">Could not load article</p><p class="mt-1 text-sm">${ssrInterpolate(unref(detail).error)}</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/news",
          class: "inline-block mt-4 text-sm font-medium underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Return to news list `);
            } else {
              return [
                createTextVNode(" Return to news list ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (unref(detail).article) {
        _push(ssrRenderComponent(_component_NewsArticleDetail, {
          article: unref(detail).article,
          "show-title": false
        }, null, _parent));
      } else {
        _push(`<div class="text-muted"><p>Article not found.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/news",
          class: "inline-block mt-4 text-sm font-medium text-primary hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Return to news list `);
            } else {
              return [
                createTextVNode(" Return to news list ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/news/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-Cxb1gQpn.mjs.map
