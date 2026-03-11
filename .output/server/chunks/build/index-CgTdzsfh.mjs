import { _ as __nuxt_component_0 } from './nuxt-link-CTV3v-lD.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Home | NuxtNews",
      meta: [
        {
          name: "description",
          content: "A simple landing page for NuxtNews with a direct path into the news section."
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "flex min-h-[calc(100vh-7rem)] overflow-hidden items-center bg-gradient-to-b from-sky-100 via-sky-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" }, _attrs))}><div class="container-wide py-16 sm:py-24"><div class="rounded-3xl border border-border/70 bg-white/85 p-8 text-center shadow-sm backdrop-blur dark:bg-slate-900/85 sm:p-12"><p class="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80"> News Platform </p><h1 class="mt-4 text-3xl font-bold tracking-tight text-on-surface sm:text-4xl lg:text-5xl"> Read the latest news in one focused place. </h1><p class="mx-auto mt-4 max-w-2xl text-sm text-muted sm:text-base"> Explore the latest stories, browse detailed articles, and jump straight into the news section. </p><div class="mt-8">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/news",
        class: "inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-on-primary transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Go to News `);
          } else {
            return [
              createTextVNode(" Go to News ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CgTdzsfh.mjs.map
