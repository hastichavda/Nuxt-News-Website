import { _ as __nuxt_component_0 } from './nuxt-link-CTV3v-lD.mjs';
import { mergeProps, defineComponent, ref, computed, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlotInner, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, u as useRoute } from './server.mjs';
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

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Logo",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [props.class, "inline-flex items-center gap-2 select-none"]
      }, _attrs))}><span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-on-primary font-black"> N </span><span class="font-semibold tracking-tight text-on-surface"> NuxtNews </span></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/App/Logo.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const isScrolled = ref(false);
    const newsLinkClass = computed(
      () => route.path.startsWith("/news") ? "bg-primary text-on-primary shadow-sm" : "text-muted hover:bg-muted/10 hover:text-on-surface"
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_AppLogo = _sfc_main$3;
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: ["sticky top-0 z-50 border-b border-border bg-surface/90 text-on-surface backdrop-blur transition-colors duration-300 dark:bg-slate-950/90", [unref(isScrolled) ? "shadow-sm" : "shadow-none"]]
      }, _attrs))}><div class="container-wide flex h-14 items-center justify-between gap-4 sm:h-16">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center no-underline hover:opacity-90"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_AppLogo, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_AppLogo)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="flex items-center text-xs font-semibold uppercase tracking-wide sm:text-sm" aria-label="Main">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/news",
        class: ["rounded-full px-4 py-2 transition-all", unref(newsLinkClass)]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` News `);
          } else {
            return [
              createTextVNode(" News ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav></div></header>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Layout/Header.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "mt-10 border-t border-border bg-surface" }, _attrs))}><div class="py-6 container-wide sm:py-8"><p class="text-sm text-center text-muted"> \xA9 ${ssrInterpolate(unref(year))} News. Starter layout. </p></div></footer>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Layout/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_LayoutHeader = _sfc_main$2;
  const _component_LayoutFooter = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col overflow-x-hidden" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_LayoutHeader, null, null, _parent));
  _push(`<main class="min-w-0 flex-1">`);
  ssrRenderSlotInner(_ctx.$slots, "default", {}, null, _push, _parent, null, true);
  _push(`</main>`);
  _push(ssrRenderComponent(_component_LayoutFooter, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-CVPBS05H.mjs.map
