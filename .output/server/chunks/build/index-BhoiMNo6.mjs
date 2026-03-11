import { defineComponent, computed, withAsyncContext, watch, withCtx, unref, isRef, createVNode, mergeProps, ref, withKeys, withModifiers, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot, ssrRenderAttr, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { u as useRoute, b as useRouter, s as storeToRefs, a as __nuxt_component_0$1, _ as _export_sfc } from './server.mjs';
import { TransitionRoot, Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';
import { MagnifyingGlassIcon, XMarkIcon, ChevronDownIcon, CalendarDaysIcon, Squares2X2Icon, Bars3Icon } from '@heroicons/vue/24/outline';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-CTV3v-lD.mjs';
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
import 'vue-router';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "Hero",
  __ssrInlineRender: true,
  props: {
    title: {},
    subtitle: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative overflow-x-clip border-b border-border bg-gradient-to-b from-sky-100 via-sky-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" }, _attrs))}><div class="absolute inset-0 pointer-events-none"><div class="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl"></div><div class="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl"></div></div><div class="container-wide py-10 sm:py-14"><div class="flex flex-col gap-6"><div><p class="text-sm font-semibold tracking-widest text-primary/80 uppercase"> News </p><h1 class="mt-3 text-3xl sm:text-4xl font-bold text-on-surface">${ssrInterpolate(__props.title)}</h1>`);
      if (__props.subtitle) {
        _push(`<p class="mt-3 max-w-2xl text-muted">${ssrInterpolate(__props.subtitle)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></section>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/News/Hero.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "FiltersBar",
  __ssrInlineRender: true,
  props: {
    q: {},
    category: {},
    preset: {},
    from: {},
    to: {}
  },
  emits: ["update:q", "update:category", "update:preset", "update:from", "update:to", "apply"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const presets = [
      { id: "any", label: "Any time" },
      { id: "this_week", label: "This week" },
      { id: "last_3_months", label: "Last 3 Months" },
      { id: "custom", label: "Custom date" }
    ];
    const categories = [
      { id: "", label: "All categories" },
      { id: "top", label: "Top" },
      { id: "business", label: "Business" },
      { id: "technology", label: "Technology" },
      { id: "sports", label: "Sports" },
      { id: "entertainment", label: "Entertainment" },
      { id: "health", label: "Health" },
      { id: "science", label: "Science" },
      { id: "world", label: "World" }
    ];
    const searchOpen = ref(false);
    ref(null);
    const searchInputEl = ref(null);
    function parseDateOnly(value) {
      if (!value) return null;
      const parsed = /* @__PURE__ */ new Date(`${value}T00:00:00`);
      return Number.isNaN(parsed.getTime()) ? null : parsed;
    }
    const dateRange = ref({
      start: parseDateOnly(props.from),
      end: parseDateOnly(props.to)
    });
    const inlineCalendarOpen = ref(false);
    watch(
      () => props.preset,
      (val) => {
        inlineCalendarOpen.value = val === "custom";
      }
    );
    watch(
      () => [props.from, props.to],
      ([from, to]) => {
        dateRange.value = {
          start: parseDateOnly(from),
          end: parseDateOnly(to)
        };
      }
    );
    const customPresetLabel = computed(() => {
      if (props.preset !== "custom") return "Custom date";
      const format = (value) => {
        if (!value) return "";
        const d = /* @__PURE__ */ new Date(`${value}T00:00:00`);
        if (Number.isNaN(d.getTime())) return value;
        return d.toLocaleDateString(void 0, { month: "short", day: "numeric" });
      };
      const from = props.from;
      const to = props.to;
      if (from && to && from !== to) {
        return `${format(from)} \u2013 ${format(to)}`;
      }
      const single = format(from || to);
      return single || "Custom date";
    });
    const hasActiveDateFilters = computed(
      () => props.preset !== "any" || !!props.from && props.from.length > 0 || !!props.to && props.to.length > 0
    );
    function handleSearchInput(event) {
      const value = event.target.value;
      emit("update:q", value);
    }
    function handlePresetChange(value) {
      emit("update:preset", value);
      inlineCalendarOpen.value = value === "custom";
      if (value !== "custom") {
        emit("apply");
      }
    }
    function clearCategory() {
      emit("update:category", "");
      emit("apply");
    }
    function clearDateFilters() {
      dateRange.value = { start: null, end: null };
      emit("update:preset", "any");
      emit("update:from", null);
      emit("update:to", null);
      inlineCalendarOpen.value = false;
      emit("apply");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-w-0 flex flex-col gap-3 sm:gap-4" }, _attrs))}><div class="w-full"><label class="sr-only" for="q">Search</label><div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"><div class="flex min-w-0 w-full items-center gap-2 sm:w-auto sm:flex-1"><button type="button" class="inline-flex items-center justify-center transition-all border rounded-full h-9 w-9 border-border bg-surface text-muted hover:bg-muted/10 hover:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary">`);
      _push(ssrRenderComponent(unref(MagnifyingGlassIcon), { class: "w-5 h-5" }, null, _parent));
      _push(`</button>`);
      _push(ssrRenderComponent(unref(TransitionRoot), {
        appear: "",
        show: unref(searchOpen),
        enter: "transform transition-all duration-150 ease-out",
        "enter-from": "opacity-0 -translate-x-4 scale-95",
        "enter-to": "opacity-100 translate-x-0 scale-100",
        leave: "transform transition-all duration-125 ease-in",
        "leave-from": "opacity-100 translate-x-0 scale-100",
        "leave-to": "opacity-0 -translate-x-4 scale-95"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative min-w-0 flex-1 sm:max-w-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(MagnifyingGlassIcon), { class: "absolute w-4 h-4 -translate-y-1/2 pointer-events-none left-3 top-1/2 text-muted" }, null, _parent2, _scopeId));
            _push2(`<input id="q"${ssrRenderAttr("value", props.q)} type="search" placeholder="Search news\u2026" class="w-full rounded-lg border border-border bg-surface pl-8 pr-3 py-2 text-sm text-on-surface placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary transition-[box-shadow,transform,width] duration-150"${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "relative min-w-0 flex-1 sm:max-w-sm" }, [
                createVNode(unref(MagnifyingGlassIcon), { class: "absolute w-4 h-4 -translate-y-1/2 pointer-events-none left-3 top-1/2 text-muted" }),
                createVNode("input", {
                  id: "q",
                  ref_key: "searchInputEl",
                  ref: searchInputEl,
                  value: props.q,
                  type: "search",
                  placeholder: "Search news\u2026",
                  class: "w-full rounded-lg border border-border bg-surface pl-8 pr-3 py-2 text-sm text-on-surface placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary transition-[box-shadow,transform,width] duration-150",
                  onInput: handleSearchInput,
                  onKeydown: withKeys(withModifiers(($event) => emit("apply"), ["prevent"]), ["enter"])
                }, null, 40, ["value", "onKeydown"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex flex-col w-full gap-3 sm:flex-row sm:items-center sm:gap-4 sm:justify-end sm:w-auto"><div class="w-full sm:w-56">`);
      _push(ssrRenderComponent(unref(Listbox), {
        "model-value": props.category,
        "onUpdate:modelValue": (v) => {
          emit("update:category", v);
          emit("apply");
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ListboxButton), { class: "flex items-center w-full px-3 py-2 text-sm text-left transition border rounded-lg border-border bg-surface text-on-surface hover:bg-muted/10 focus:outline-none focus:ring-2 focus:ring-primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b, _c, _d;
                if (_push3) {
                  _push3(`<span class="block min-w-0 truncate pr-8"${_scopeId2}>${ssrInterpolate((_b = (_a = categories.find((c) => c.id === props.category)) == null ? void 0 : _a.label) != null ? _b : "All categories")}</span>`);
                  if (props.category) {
                    _push3(`<button type="button" class="absolute inline-flex items-center justify-center w-5 h-5 -translate-y-1/2 rounded-full right-3 top-1/2 text-muted hover:text-on-surface hover:bg-muted/10" title="Clear category"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(XMarkIcon), { class: "w-3 h-3" }, null, _parent3, _scopeId2));
                    _push3(`</button>`);
                  } else {
                    _push3(ssrRenderComponent(unref(ChevronDownIcon), {
                      class: "absolute w-5 h-5 -translate-y-1/2 right-3 top-1/2 text-muted",
                      "aria-hidden": "true"
                    }, null, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    createVNode("span", { class: "block min-w-0 truncate pr-8" }, toDisplayString((_d = (_c = categories.find((c) => c.id === props.category)) == null ? void 0 : _c.label) != null ? _d : "All categories"), 1),
                    props.category ? (openBlock(), createBlock("button", {
                      key: 0,
                      type: "button",
                      class: "absolute inline-flex items-center justify-center w-5 h-5 -translate-y-1/2 rounded-full right-3 top-1/2 text-muted hover:text-on-surface hover:bg-muted/10",
                      title: "Clear category",
                      onClick: withModifiers(clearCategory, ["stop"])
                    }, [
                      createVNode(unref(XMarkIcon), { class: "w-3 h-3" })
                    ])) : (openBlock(), createBlock(unref(ChevronDownIcon), {
                      key: 1,
                      class: "absolute w-5 h-5 -translate-y-1/2 right-3 top-1/2 text-muted",
                      "aria-hidden": "true"
                    }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TransitionRoot), {
              enter: "transition ease-out duration-150",
              "enter-from": "opacity-0 translate-y-1",
              "enter-to": "opacity-100 translate-y-0",
              leave: "transition ease-in duration-100",
              "leave-from": "opacity-100 translate-y-0",
              "leave-to": "opacity-0 translate-y-1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ListboxOptions), { class: "absolute z-50 w-full mt-2 overflow-auto border shadow-lg max-h-64 rounded-xl border-border bg-surface focus:outline-none scroll-thin" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(categories, (c) => {
                          _push4(ssrRenderComponent(unref(ListboxOption), {
                            key: c.id,
                            value: c.id
                          }, {
                            default: withCtx(({ active, selected }, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<li class="${ssrRenderClass([
                                  active ? "bg-muted/10 text-on-surface" : "text-on-surface",
                                  "px-3 py-2 text-sm cursor-pointer select-none"
                                ])}"${_scopeId4}><span class="${ssrRenderClass(
                                  selected ? "font-semibold text-primary" : "font-medium"
                                )}"${_scopeId4}>${ssrInterpolate(c.label)}</span></li>`);
                              } else {
                                return [
                                  createVNode("li", {
                                    class: [
                                      "px-3 py-2 text-sm cursor-pointer select-none",
                                      active ? "bg-muted/10 text-on-surface" : "text-on-surface"
                                    ]
                                  }, [
                                    createVNode("span", {
                                      class: selected ? "font-semibold text-primary" : "font-medium"
                                    }, toDisplayString(c.label), 3)
                                  ], 2)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(categories, (c) => {
                            return createVNode(unref(ListboxOption), {
                              key: c.id,
                              value: c.id
                            }, {
                              default: withCtx(({ active, selected }) => [
                                createVNode("li", {
                                  class: [
                                    "px-3 py-2 text-sm cursor-pointer select-none",
                                    active ? "bg-muted/10 text-on-surface" : "text-on-surface"
                                  ]
                                }, [
                                  createVNode("span", {
                                    class: selected ? "font-semibold text-primary" : "font-medium"
                                  }, toDisplayString(c.label), 3)
                                ], 2)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ListboxOptions), { class: "absolute z-50 w-full mt-2 overflow-auto border shadow-lg max-h-64 rounded-xl border-border bg-surface focus:outline-none scroll-thin" }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(categories, (c) => {
                          return createVNode(unref(ListboxOption), {
                            key: c.id,
                            value: c.id
                          }, {
                            default: withCtx(({ active, selected }) => [
                              createVNode("li", {
                                class: [
                                  "px-3 py-2 text-sm cursor-pointer select-none",
                                  active ? "bg-muted/10 text-on-surface" : "text-on-surface"
                                ]
                              }, [
                                createVNode("span", {
                                  class: selected ? "font-semibold text-primary" : "font-medium"
                                }, toDisplayString(c.label), 3)
                              ], 2)
                            ]),
                            _: 2
                          }, 1032, ["value"]);
                        }), 64))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "relative" }, [
                createVNode(unref(ListboxButton), { class: "flex items-center w-full px-3 py-2 text-sm text-left transition border rounded-lg border-border bg-surface text-on-surface hover:bg-muted/10 focus:outline-none focus:ring-2 focus:ring-primary" }, {
                  default: withCtx(() => {
                    var _a, _b;
                    return [
                      createVNode("span", { class: "block min-w-0 truncate pr-8" }, toDisplayString((_b = (_a = categories.find((c) => c.id === props.category)) == null ? void 0 : _a.label) != null ? _b : "All categories"), 1),
                      props.category ? (openBlock(), createBlock("button", {
                        key: 0,
                        type: "button",
                        class: "absolute inline-flex items-center justify-center w-5 h-5 -translate-y-1/2 rounded-full right-3 top-1/2 text-muted hover:text-on-surface hover:bg-muted/10",
                        title: "Clear category",
                        onClick: withModifiers(clearCategory, ["stop"])
                      }, [
                        createVNode(unref(XMarkIcon), { class: "w-3 h-3" })
                      ])) : (openBlock(), createBlock(unref(ChevronDownIcon), {
                        key: 1,
                        class: "absolute w-5 h-5 -translate-y-1/2 right-3 top-1/2 text-muted",
                        "aria-hidden": "true"
                      }))
                    ];
                  }),
                  _: 1
                }),
                createVNode(unref(TransitionRoot), {
                  enter: "transition ease-out duration-150",
                  "enter-from": "opacity-0 translate-y-1",
                  "enter-to": "opacity-100 translate-y-0",
                  leave: "transition ease-in duration-100",
                  "leave-from": "opacity-100 translate-y-0",
                  "leave-to": "opacity-0 translate-y-1"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(ListboxOptions), { class: "absolute z-50 w-full mt-2 overflow-auto border shadow-lg max-h-64 rounded-xl border-border bg-surface focus:outline-none scroll-thin" }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(categories, (c) => {
                          return createVNode(unref(ListboxOption), {
                            key: c.id,
                            value: c.id
                          }, {
                            default: withCtx(({ active, selected }) => [
                              createVNode("li", {
                                class: [
                                  "px-3 py-2 text-sm cursor-pointer select-none",
                                  active ? "bg-muted/10 text-on-surface" : "text-on-surface"
                                ]
                              }, [
                                createVNode("span", {
                                  class: selected ? "font-semibold text-primary" : "font-medium"
                                }, toDisplayString(c.label), 3)
                              ], 2)
                            ]),
                            _: 2
                          }, 1032, ["value"]);
                        }), 64))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="w-full sm:w-64">`);
      _push(ssrRenderComponent(unref(Listbox), {
        "model-value": props.preset,
        "onUpdate:modelValue": (v) => handlePresetChange(v)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ListboxButton), {
              class: "flex items-center w-full px-3 py-2 text-sm text-left transition border rounded-lg border-border bg-surface text-on-surface hover:bg-muted/10 focus:outline-none focus:ring-2 focus:ring-primary",
              onClick: ($event) => inlineCalendarOpen.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b, _c, _d;
                if (_push3) {
                  _push3(`<span class="inline-flex min-w-0 items-center gap-2 pr-8"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(CalendarDaysIcon), { class: "h-5 w-5 shrink-0 text-muted" }, null, _parent3, _scopeId2));
                  _push3(`<span class="block min-w-0 truncate"${_scopeId2}>${ssrInterpolate(props.preset === "custom" ? unref(customPresetLabel) : (_b = (_a = presets.find((p) => p.id === props.preset)) == null ? void 0 : _a.label) != null ? _b : "Select Date")}</span></span>`);
                  if (unref(hasActiveDateFilters)) {
                    _push3(`<button type="button" class="absolute inline-flex items-center justify-center w-5 h-5 -translate-y-1/2 rounded-full right-3 top-1/2 text-muted hover:text-on-surface hover:bg-muted/10" title="Clear date filters"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(XMarkIcon), { class: "w-3 h-3" }, null, _parent3, _scopeId2));
                    _push3(`</button>`);
                  } else {
                    _push3(ssrRenderComponent(unref(ChevronDownIcon), {
                      class: "absolute w-5 h-5 -translate-y-1/2 right-3 top-1/2 text-muted",
                      "aria-hidden": "true"
                    }, null, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    createVNode("span", { class: "inline-flex min-w-0 items-center gap-2 pr-8" }, [
                      createVNode(unref(CalendarDaysIcon), { class: "h-5 w-5 shrink-0 text-muted" }),
                      createVNode("span", { class: "block min-w-0 truncate" }, toDisplayString(props.preset === "custom" ? unref(customPresetLabel) : (_d = (_c = presets.find((p) => p.id === props.preset)) == null ? void 0 : _c.label) != null ? _d : "Select Date"), 1)
                    ]),
                    unref(hasActiveDateFilters) ? (openBlock(), createBlock("button", {
                      key: 0,
                      type: "button",
                      class: "absolute inline-flex items-center justify-center w-5 h-5 -translate-y-1/2 rounded-full right-3 top-1/2 text-muted hover:text-on-surface hover:bg-muted/10",
                      title: "Clear date filters",
                      onClick: withModifiers(clearDateFilters, ["stop"])
                    }, [
                      createVNode(unref(XMarkIcon), { class: "w-3 h-3" })
                    ])) : (openBlock(), createBlock(unref(ChevronDownIcon), {
                      key: 1,
                      class: "absolute w-5 h-5 -translate-y-1/2 right-3 top-1/2 text-muted",
                      "aria-hidden": "true"
                    }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TransitionRoot), {
              enter: "transition ease-out duration-150",
              "enter-from": "opacity-0 translate-y-1",
              "enter-to": "opacity-100 translate-y-0",
              leave: "transition ease-in duration-100",
              "leave-from": "opacity-100 translate-y-0",
              "leave-to": "opacity-0 translate-y-1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ListboxOptions), { class: "absolute z-50 w-full mt-2 overflow-auto border shadow-lg top-full max-h-72 rounded-xl border-border bg-surface focus:outline-none scroll-thin" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(presets, (p) => {
                          _push4(ssrRenderComponent(unref(ListboxOption), {
                            key: p.id,
                            value: p.id
                          }, {
                            default: withCtx(({ active, selected }, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<li class="${ssrRenderClass([
                                  active ? "bg-muted/10 text-on-surface" : "text-on-surface",
                                  "px-3 py-2 text-sm cursor-pointer select-none"
                                ])}"${_scopeId4}><span class="${ssrRenderClass(
                                  selected ? "font-semibold text-primary" : "font-medium"
                                )}"${_scopeId4}>${ssrInterpolate(p.label)}</span></li>`);
                              } else {
                                return [
                                  createVNode("li", {
                                    class: [
                                      "px-3 py-2 text-sm cursor-pointer select-none",
                                      active ? "bg-muted/10 text-on-surface" : "text-on-surface"
                                    ]
                                  }, [
                                    createVNode("span", {
                                      class: selected ? "font-semibold text-primary" : "font-medium"
                                    }, toDisplayString(p.label), 3)
                                  ], 2)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(presets, (p) => {
                            return createVNode(unref(ListboxOption), {
                              key: p.id,
                              value: p.id
                            }, {
                              default: withCtx(({ active, selected }) => [
                                createVNode("li", {
                                  class: [
                                    "px-3 py-2 text-sm cursor-pointer select-none",
                                    active ? "bg-muted/10 text-on-surface" : "text-on-surface"
                                  ]
                                }, [
                                  createVNode("span", {
                                    class: selected ? "font-semibold text-primary" : "font-medium"
                                  }, toDisplayString(p.label), 3)
                                ], 2)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ListboxOptions), { class: "absolute z-50 w-full mt-2 overflow-auto border shadow-lg top-full max-h-72 rounded-xl border-border bg-surface focus:outline-none scroll-thin" }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(presets, (p) => {
                          return createVNode(unref(ListboxOption), {
                            key: p.id,
                            value: p.id
                          }, {
                            default: withCtx(({ active, selected }) => [
                              createVNode("li", {
                                class: [
                                  "px-3 py-2 text-sm cursor-pointer select-none",
                                  active ? "bg-muted/10 text-on-surface" : "text-on-surface"
                                ]
                              }, [
                                createVNode("span", {
                                  class: selected ? "font-semibold text-primary" : "font-medium"
                                }, toDisplayString(p.label), 3)
                              ], 2)
                            ]),
                            _: 2
                          }, 1032, ["value"]);
                        }), 64))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "relative" }, [
                createVNode(unref(ListboxButton), {
                  class: "flex items-center w-full px-3 py-2 text-sm text-left transition border rounded-lg border-border bg-surface text-on-surface hover:bg-muted/10 focus:outline-none focus:ring-2 focus:ring-primary",
                  onClick: ($event) => inlineCalendarOpen.value = false
                }, {
                  default: withCtx(() => {
                    var _a, _b;
                    return [
                      createVNode("span", { class: "inline-flex min-w-0 items-center gap-2 pr-8" }, [
                        createVNode(unref(CalendarDaysIcon), { class: "h-5 w-5 shrink-0 text-muted" }),
                        createVNode("span", { class: "block min-w-0 truncate" }, toDisplayString(props.preset === "custom" ? unref(customPresetLabel) : (_b = (_a = presets.find((p) => p.id === props.preset)) == null ? void 0 : _a.label) != null ? _b : "Select Date"), 1)
                      ]),
                      unref(hasActiveDateFilters) ? (openBlock(), createBlock("button", {
                        key: 0,
                        type: "button",
                        class: "absolute inline-flex items-center justify-center w-5 h-5 -translate-y-1/2 rounded-full right-3 top-1/2 text-muted hover:text-on-surface hover:bg-muted/10",
                        title: "Clear date filters",
                        onClick: withModifiers(clearDateFilters, ["stop"])
                      }, [
                        createVNode(unref(XMarkIcon), { class: "w-3 h-3" })
                      ])) : (openBlock(), createBlock(unref(ChevronDownIcon), {
                        key: 1,
                        class: "absolute w-5 h-5 -translate-y-1/2 right-3 top-1/2 text-muted",
                        "aria-hidden": "true"
                      }))
                    ];
                  }),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(unref(TransitionRoot), {
                  enter: "transition ease-out duration-150",
                  "enter-from": "opacity-0 translate-y-1",
                  "enter-to": "opacity-100 translate-y-0",
                  leave: "transition ease-in duration-100",
                  "leave-from": "opacity-100 translate-y-0",
                  "leave-to": "opacity-0 translate-y-1"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(ListboxOptions), { class: "absolute z-50 w-full mt-2 overflow-auto border shadow-lg top-full max-h-72 rounded-xl border-border bg-surface focus:outline-none scroll-thin" }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(presets, (p) => {
                          return createVNode(unref(ListboxOption), {
                            key: p.id,
                            value: p.id
                          }, {
                            default: withCtx(({ active, selected }) => [
                              createVNode("li", {
                                class: [
                                  "px-3 py-2 text-sm cursor-pointer select-none",
                                  active ? "bg-muted/10 text-on-surface" : "text-on-surface"
                                ]
                              }, [
                                createVNode("span", {
                                  class: selected ? "font-semibold text-primary" : "font-medium"
                                }, toDisplayString(p.label), 3)
                              ], 2)
                            ]),
                            _: 2
                          }, 1032, ["value"]);
                        }), 64))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/News/FiltersBar.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const base = "inline-flex items-center justify-center rounded-2xl px-3 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary";
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ViewToggle",
  __ssrInlineRender: true,
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "inline-flex gap-1 p-1 border rounded-full border-border bg-surface/90" }, _attrs))}><button type="button" class="${ssrRenderClass([
        base,
        __props.modelValue === "grid" ? "bg-primary text-on-primary shadow-sm" : "bg-transparent text-muted hover:text-on-surface hover:bg-muted/10"
      ])}" aria-label="Grid view">`);
      _push(ssrRenderComponent(unref(Squares2X2Icon), { class: "w-5 h-5" }, null, _parent));
      _push(`</button><button type="button" class="${ssrRenderClass([
        base,
        __props.modelValue === "list" ? "bg-primary text-on-primary shadow-sm" : "bg-transparent text-muted hover:text-on-surface hover:bg-muted/10"
      ])}" aria-label="List view">`);
      _push(ssrRenderComponent(unref(Bars3Icon), { class: "w-5 h-5" }, null, _parent));
      _push(`</button></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/News/ViewToggle.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _imports_0 = publicAssetsURL("/img/no-news.svg");
const _sfc_main$4 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto flex max-w-2xl flex-col items-center rounded-3xl bg-sky-50/70 px-6 py-12 text-center dark:bg-slate-800/40 sm:px-10" }, _attrs))}><img${ssrRenderAttr("src", _imports_0)} alt="No news found" class="h-36 w-36 object-contain sm:h-40 sm:w-40" loading="lazy"><h2 class="mt-6 text-2xl font-semibold tracking-tight text-on-surface"> No news data found </h2><p class="mt-3 max-w-lg text-sm leading-6 text-muted sm:text-base"> No articles match the current filters or search query. Try clearing the filters, changing the date range, or searching with a broader keyword. </p></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/News/EmptyState.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender]]);
const placeholderImage$1 = "/img/news-placeholder.svg";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Card",
  __ssrInlineRender: true,
  props: {
    article: {}
  },
  setup(__props) {
    const props = __props;
    const a = computed(() => props.article);
    function formatPostedDate(pubDate) {
      if (!pubDate) return "";
      const d = new Date(pubDate);
      if (Number.isNaN(d.getTime())) return "";
      return d.toLocaleDateString(void 0, {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "group h-full flex flex-col rounded-xl border border-border bg-surface overflow-hidden hover:shadow-sm transition-all hover:-translate-y-[1px]" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/news/${unref(a).article_id}`,
        class: "flex h-full flex-col"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="aspect-[16/9] bg-muted/20 overflow-hidden"${_scopeId}><img${ssrRenderAttr("src", unref(a).image_url || placeholderImage$1)}${ssrRenderAttr("alt", unref(a).title)} class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" loading="lazy"${_scopeId}></div><div class="flex flex-1 flex-col p-5"${_scopeId}><div class="flex items-center justify-between gap-4"${_scopeId}><div class="flex items-center gap-2 text-xs text-muted"${_scopeId}>`);
            if (unref(a).source_id) {
              _push2(`<span class="rounded-full border border-border px-2 py-0.5"${_scopeId}>${ssrInterpolate(unref(a).source_id)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            if ((_a = unref(a).category) == null ? void 0 : _a[0]) {
              _push2(`<span class="rounded-full border border-border px-2 py-0.5"${_scopeId}>${ssrInterpolate(unref(a).category[0])}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (unref(a).pubDate) {
              _push2(`<div class="inline-flex items-center gap-1.5 text-xs text-muted"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CalendarDaysIcon), { class: "h-4 w-4 shrink-0" }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>${ssrInterpolate(formatPostedDate(unref(a).pubDate))}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><h2 class="mt-4 -mx-2 rounded-lg px-2 py-1 text-lg font-semibold leading-snug text-on-surface transition-colors duration-200 group-hover:bg-primary/5 group-hover:text-primary dark:group-hover:bg-primary/10"${_scopeId}>${ssrInterpolate(unref(a).title)}</h2>`);
            if (unref(a).description) {
              _push2(`<p class="mt-2 line-clamp-2 text-sm leading-6 text-muted"${_scopeId}>${ssrInterpolate(unref(a).description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "aspect-[16/9] bg-muted/20 overflow-hidden" }, [
                createVNode("img", {
                  src: unref(a).image_url || placeholderImage$1,
                  alt: unref(a).title,
                  class: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]",
                  loading: "lazy"
                }, null, 8, ["src", "alt"])
              ]),
              createVNode("div", { class: "flex flex-1 flex-col p-5" }, [
                createVNode("div", { class: "flex items-center justify-between gap-4" }, [
                  createVNode("div", { class: "flex items-center gap-2 text-xs text-muted" }, [
                    unref(a).source_id ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "rounded-full border border-border px-2 py-0.5"
                    }, toDisplayString(unref(a).source_id), 1)) : createCommentVNode("", true),
                    ((_b = unref(a).category) == null ? void 0 : _b[0]) ? (openBlock(), createBlock("span", {
                      key: 1,
                      class: "rounded-full border border-border px-2 py-0.5"
                    }, toDisplayString(unref(a).category[0]), 1)) : createCommentVNode("", true)
                  ]),
                  unref(a).pubDate ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "inline-flex items-center gap-1.5 text-xs text-muted"
                  }, [
                    createVNode(unref(CalendarDaysIcon), { class: "h-4 w-4 shrink-0" }),
                    createVNode("span", null, toDisplayString(formatPostedDate(unref(a).pubDate)), 1)
                  ])) : createCommentVNode("", true)
                ]),
                createVNode("h2", { class: "mt-4 -mx-2 rounded-lg px-2 py-1 text-lg font-semibold leading-snug text-on-surface transition-colors duration-200 group-hover:bg-primary/5 group-hover:text-primary dark:group-hover:bg-primary/10" }, toDisplayString(unref(a).title), 1),
                unref(a).description ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: "mt-2 line-clamp-2 text-sm leading-6 text-muted"
                }, toDisplayString(unref(a).description), 1)) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</article>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/News/Card.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const placeholderImage = "/img/news-placeholder.svg";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CardGrid",
  __ssrInlineRender: true,
  props: {
    articles: {},
    loading: { type: Boolean },
    mode: {}
  },
  setup(__props) {
    const props = __props;
    function formatPostedDate(pubDate) {
      if (!pubDate) return "";
      const d = new Date(pubDate);
      if (Number.isNaN(d.getTime())) return "";
      return d.toLocaleDateString(void 0, {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NewsEmptyState = __nuxt_component_3;
      const _component_NewsCard = _sfc_main$3;
      const _component_NuxtLink = __nuxt_component_0;
      if (!__props.loading && !__props.articles.length) {
        _push(ssrRenderComponent(_component_NewsEmptyState, _attrs, null, _parent));
      } else if (__props.mode !== "list") {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "grid grid-cols-1 gap-6 md:grid-cols-2",
          name: "fade"
        }, _attrs))}>`);
        if (__props.loading) {
          _push(`<!--[-->`);
          ssrRenderList(10, (i) => {
            _push(`<div class="overflow-hidden border rounded-xl border-border bg-surface"><div class="aspect-[16/9] bg-muted/20 animate-pulse"></div><div class="p-5 space-y-3"><div class="w-24 h-4 rounded bg-muted/20 animate-pulse"></div><div class="w-4/5 h-6 rounded bg-muted/30 animate-pulse"></div><div class="w-2/3 h-6 rounded bg-muted/20 animate-pulse"></div></div></div>`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!--[-->`);
          ssrRenderList(props.articles, (a) => {
            _push(ssrRenderComponent(_component_NewsCard, {
              key: a.article_id,
              article: a
            }, null, _parent));
          });
          _push(`<!--]-->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "space-y-0",
          name: "fade"
        }, _attrs))}>`);
        if (__props.loading) {
          _push(`<!--[-->`);
          ssrRenderList(10, (i) => {
            _push(`<div class="flex flex-col gap-4 py-6 sm:flex-row"><div class="w-full shrink-0 sm:w-64 md:w-80"><div class="aspect-[16/9] bg-muted/20 animate-pulse rounded-md"></div></div><div class="flex-1 space-y-3"><div class="w-24 h-4 rounded bg-muted/20 animate-pulse"></div><div class="w-3/4 h-6 rounded bg-muted/30 animate-pulse"></div><div class="w-1/2 h-6 rounded bg-muted/20 animate-pulse"></div></div></div>`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!--[-->`);
          ssrRenderList(__props.articles, (a) => {
            _push(`<article class="group flex flex-col gap-4 py-6 sm:flex-row">`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/news/${a.article_id}`,
              class: "flex flex-col w-full gap-4 sm:flex-row"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                var _a, _b;
                if (_push2) {
                  _push2(`<div class="aspect-[16/9] w-full shrink-0 overflow-hidden rounded-md bg-muted/20 sm:w-64 md:w-80"${_scopeId}><img${ssrRenderAttr("src", a.image_url || placeholderImage)}${ssrRenderAttr("alt", a.title)} class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" loading="lazy"${_scopeId}></div><div class="flex flex-col justify-center flex-1"${_scopeId}><div class="flex flex-wrap items-center justify-between gap-2"${_scopeId}><div class="flex flex-wrap items-center gap-2 text-xs text-muted"${_scopeId}>`);
                  if (a.source_id) {
                    _push2(`<span class="rounded-full border border-border px-2 py-0.5 uppercase tracking-tight"${_scopeId}>${ssrInterpolate(a.source_id)}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if ((_a = a.category) == null ? void 0 : _a[0]) {
                    _push2(`<span class="rounded-full border border-border px-2 py-0.5 uppercase tracking-tight"${_scopeId}>${ssrInterpolate(a.category[0])}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                  if (a.pubDate) {
                    _push2(`<div class="inline-flex items-center gap-1.5 text-xs text-muted"${_scopeId}>`);
                    _push2(ssrRenderComponent(unref(CalendarDaysIcon), { class: "h-4 w-4 shrink-0" }, null, _parent2, _scopeId));
                    _push2(`<span${_scopeId}>${ssrInterpolate(formatPostedDate(a.pubDate))}</span></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div><h2 class="mt-4 -mx-2 rounded-lg px-2 py-1 text-lg font-semibold leading-snug text-on-surface transition-colors duration-200 group-hover:bg-primary/5 group-hover:text-primary dark:group-hover:bg-primary/10"${_scopeId}>${ssrInterpolate(a.title)}</h2>`);
                  if (a.description) {
                    _push2(`<p class="mt-2 line-clamp-2 text-sm leading-6 text-muted"${_scopeId}>${ssrInterpolate(a.description)}</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "aspect-[16/9] w-full shrink-0 overflow-hidden rounded-md bg-muted/20 sm:w-64 md:w-80" }, [
                      createVNode("img", {
                        src: a.image_url || placeholderImage,
                        alt: a.title,
                        class: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]",
                        loading: "lazy"
                      }, null, 8, ["src", "alt"])
                    ]),
                    createVNode("div", { class: "flex flex-col justify-center flex-1" }, [
                      createVNode("div", { class: "flex flex-wrap items-center justify-between gap-2" }, [
                        createVNode("div", { class: "flex flex-wrap items-center gap-2 text-xs text-muted" }, [
                          a.source_id ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "rounded-full border border-border px-2 py-0.5 uppercase tracking-tight"
                          }, toDisplayString(a.source_id), 1)) : createCommentVNode("", true),
                          ((_b = a.category) == null ? void 0 : _b[0]) ? (openBlock(), createBlock("span", {
                            key: 1,
                            class: "rounded-full border border-border px-2 py-0.5 uppercase tracking-tight"
                          }, toDisplayString(a.category[0]), 1)) : createCommentVNode("", true)
                        ]),
                        a.pubDate ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "inline-flex items-center gap-1.5 text-xs text-muted"
                        }, [
                          createVNode(unref(CalendarDaysIcon), { class: "h-4 w-4 shrink-0" }),
                          createVNode("span", null, toDisplayString(formatPostedDate(a.pubDate)), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("h2", { class: "mt-4 -mx-2 rounded-lg px-2 py-1 text-lg font-semibold leading-snug text-on-surface transition-colors duration-200 group-hover:bg-primary/5 group-hover:text-primary dark:group-hover:bg-primary/10" }, toDisplayString(a.title), 1),
                      a.description ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-2 line-clamp-2 text-sm leading-6 text-muted"
                      }, toDisplayString(a.description), 1)) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</article>`);
          });
          _push(`<!--]-->`);
        }
        _push(`</div>`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/News/CardGrid.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Pagination",
  __ssrInlineRender: true,
  props: {
    currentPage: {},
    hasNext: { type: Boolean },
    nextPageCursor: {}
  },
  setup(__props) {
    const route = useRoute();
    const baseQuery = computed(() => {
      const q = { ...route.query };
      delete q.page;
      delete q.nextPage;
      return q;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<nav${ssrRenderAttrs(mergeProps({
        class: "flex items-center justify-center gap-4 pt-8 pb-4",
        "aria-label": "Pagination"
      }, _attrs))}>`);
      if (__props.currentPage > 1) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: { path: unref(route).path, query: { ...unref(baseQuery), page: __props.currentPage - 1 } },
          class: "rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-on-surface hover:bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Previous `);
            } else {
              return [
                createTextVNode(" Previous ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<span class="rounded-lg border border-border bg-muted/10 px-4 py-2 text-sm text-muted cursor-not-allowed" aria-disabled="true"> Previous </span>`);
      }
      _push(`<span class="text-sm text-muted" aria-current="page"> Page ${ssrInterpolate(__props.currentPage)}</span>`);
      if (__props.hasNext && __props.nextPageCursor) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: {
            path: unref(route).path,
            query: {
              ...unref(baseQuery),
              page: __props.currentPage + 1,
              nextPage: __props.nextPageCursor
            }
          },
          class: "rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-on-surface hover:bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Next `);
            } else {
              return [
                createTextVNode(" Next ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<span class="rounded-lg border border-border bg-muted/10 px-4 py-2 text-sm text-muted cursor-not-allowed" aria-disabled="true"> Next </span>`);
      }
      _push(`</nav>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/News/Pagination.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const router = useRouter();
    const news = useNewsStore();
    const {
      filters,
      page,
      filteredArticles,
      nextPageCursor,
      loadingList,
      errorList,
      viewMode
    } = storeToRefs(news);
    const filtersPreset = computed({
      get: () => filters.value.preset,
      set: (v) => {
        filters.value.preset = v;
      }
    });
    [__temp, __restore] = withAsyncContext(() => news.fetchListForCurrentRoute(route.query)), await __temp, __restore();
    async function applyFilters() {
      var _a, _b;
      const query = {
        page: 1,
        q: filters.value.q || void 0,
        category: filters.value.category || void 0,
        preset: filters.value.preset !== "any" ? filters.value.preset : void 0,
        from: filters.value.preset === "custom" ? (_a = filters.value.from) != null ? _a : void 0 : void 0,
        to: filters.value.preset === "custom" ? (_b = filters.value.to) != null ? _b : void 0 : void 0
      };
      await router.push({
        path: "/news",
        query
      });
      await news.fetchListForCurrentRoute(query);
    }
    watch(
      () => route.query,
      async (q) => {
        await news.fetchListForCurrentRoute(q);
      }
    );
    const pageTitle = computed(
      () => page.value > 1 ? `All news \u2013 Page ${page.value} | NuxtNews` : "All news | NuxtNews"
    );
    useHead({
      title: pageTitle,
      meta: [
        {
          name: "description",
          content: "Browse the full news archive with powerful filters, list and grid views, and server-side pagination."
        },
        {
          property: "og:title",
          content: pageTitle.value
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NewsHero = _sfc_main$7;
      const _component_NewsFiltersBar = _sfc_main$6;
      const _component_NewsViewToggle = _sfc_main$5;
      const _component_NewsEmptyState = __nuxt_component_3;
      const _component_NewsCardGrid = _sfc_main$2;
      const _component_NewsPagination = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_NewsHero, {
        title: "News & insights",
        subtitle: "Deep dive into all the latest stories. Use filters to narrow down by topic, category, or date range."
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-3 lg:space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NewsFiltersBar, {
              q: unref(filters).q,
              "onUpdate:q": ($event) => unref(filters).q = $event,
              category: unref(filters).category,
              "onUpdate:category": ($event) => unref(filters).category = $event,
              preset: unref(filtersPreset),
              "onUpdate:preset": ($event) => isRef(filtersPreset) ? filtersPreset.value = $event : null,
              from: unref(filters).from,
              "onUpdate:from": ($event) => unref(filters).from = $event,
              to: unref(filters).to,
              "onUpdate:to": ($event) => unref(filters).to = $event,
              onApply: applyFilters
            }, null, _parent2, _scopeId));
            _push2(`<div class="sm:flex sm:justify-start hidden lg:justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NewsViewToggle, {
              "model-value": unref(viewMode),
              "onUpdate:modelValue": unref(news).setViewMode
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-3 lg:space-y-4" }, [
                createVNode(_component_NewsFiltersBar, {
                  q: unref(filters).q,
                  "onUpdate:q": ($event) => unref(filters).q = $event,
                  category: unref(filters).category,
                  "onUpdate:category": ($event) => unref(filters).category = $event,
                  preset: unref(filtersPreset),
                  "onUpdate:preset": ($event) => isRef(filtersPreset) ? filtersPreset.value = $event : null,
                  from: unref(filters).from,
                  "onUpdate:from": ($event) => unref(filters).from = $event,
                  to: unref(filters).to,
                  "onUpdate:to": ($event) => unref(filters).to = $event,
                  onApply: applyFilters
                }, null, 8, ["q", "onUpdate:q", "category", "onUpdate:category", "preset", "onUpdate:preset", "from", "onUpdate:from", "to", "onUpdate:to"]),
                createVNode("div", { class: "sm:flex sm:justify-start hidden lg:justify-end" }, [
                  createVNode(_component_NewsViewToggle, {
                    "model-value": unref(viewMode),
                    "onUpdate:modelValue": unref(news).setViewMode
                  }, null, 8, ["model-value", "onUpdate:modelValue"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<section class="container-wide py-8 sm:py-12"><div class="bg-white/95 dark:bg-slate-900/95">`);
      if (unref(errorList)) {
        _push(`<div class="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-red-600 dark:text-red-400"><p class="font-medium">Could not load articles</p><p class="mt-1 text-sm">${ssrInterpolate(unref(errorList))}</p>`);
        if (unref(errorList).toLowerCase().includes("not valid") || unref(errorList).toLowerCase().includes("unauthorized")) {
          _push(`<p class="mt-3 text-sm opacity-90"> Check that <code class="rounded bg-black/10 px-1 dark:bg-white/10">NUXT_PUBLIC_NEWS_API_KEY</code> in your <code class="rounded bg-black/10 px-1 dark:bg-white/10">.env</code> matches your key at <a href="https://newsdata.io" target="_blank" rel="noopener" class="underline">newsdata.io</a>. Restart the dev server after updating <code class="rounded bg-black/10 px-1 dark:bg-white/10">.env</code>. </p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(errorList) && !unref(loadingList) && unref(filteredArticles).length === 0) {
        _push(ssrRenderComponent(_component_NewsEmptyState, null, null, _parent));
      } else if (!unref(errorList)) {
        _push(ssrRenderComponent(_component_NewsCardGrid, {
          articles: unref(filteredArticles),
          loading: unref(loadingList),
          mode: unref(viewMode)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!unref(errorList) && unref(filteredArticles).length > 0) {
        _push(ssrRenderComponent(_component_NewsPagination, {
          class: "mt-6",
          "current-page": unref(page),
          "has-next": !!unref(nextPageCursor),
          "next-page-cursor": unref(nextPageCursor)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/news/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BhoiMNo6.mjs.map
