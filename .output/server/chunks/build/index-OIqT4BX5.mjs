import { _ as __nuxt_component_0 } from './nuxt-link-DZBS4QqW.mjs';
import { mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useHead } from './v3-D2Flwojj.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../_/nitro.mjs';
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

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Dashboard Enseignant | Bull ASUR" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dashboard-enseignant" }, _attrs))} data-v-d292cbed><header class="dashboard-header" data-v-d292cbed><h2 data-v-d292cbed>Espace Enseignant</h2><p class="subtitle" data-v-d292cbed>Bienvenue ! G\xE9rez les \xE9valuations de vos mati\xE8res.</p></header><div class="stats-grid" data-v-d292cbed><div class="stat-card" data-v-d292cbed><div class="stat-icon modules" data-v-d292cbed>\u{1F4DA}</div><div class="stat-content" data-v-d292cbed><h3 data-v-d292cbed>2</h3><p data-v-d292cbed>Mati\xE8res assign\xE9es</p></div></div><div class="stat-card" data-v-d292cbed><div class="stat-icon grades" data-v-d292cbed>\u2705</div><div class="stat-content" data-v-d292cbed><h3 data-v-d292cbed>48</h3><p data-v-d292cbed>Notes \xE0 saisir</p></div></div><div class="stat-card" data-v-d292cbed><div class="stat-icon alert" data-v-d292cbed>\u26A0\uFE0F</div><div class="stat-content" data-v-d292cbed><h3 data-v-d292cbed>S5</h3><p data-v-d292cbed>Semestre en cours</p></div></div></div><div class="actions-panel" data-v-d292cbed><h3 data-v-d292cbed>Acc\xE8s rapides</h3><div class="shortcut-grid" data-v-d292cbed>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/saisie",
        class: "shortcut-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="icon" data-v-d292cbed${_scopeId}>\u{1F4DD}</span><h4 data-v-d292cbed${_scopeId}>Saisie des notes</h4><p data-v-d292cbed${_scopeId}>Anglais technique (UE5-1)</p>`);
          } else {
            return [
              createVNode("span", { class: "icon" }, "\u{1F4DD}"),
              createVNode("h4", null, "Saisie des notes"),
              createVNode("p", null, "Anglais technique (UE5-1)")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/saisie",
        class: "shortcut-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="icon" data-v-d292cbed${_scopeId}>\u{1F4DD}</span><h4 data-v-d292cbed${_scopeId}>Saisie des notes</h4><p data-v-d292cbed${_scopeId}>Management d&#39;\xE9quipe (UE5-1)</p>`);
          } else {
            return [
              createVNode("span", { class: "icon" }, "\u{1F4DD}"),
              createVNode("h4", null, "Saisie des notes"),
              createVNode("p", null, "Management d'\xE9quipe (UE5-1)")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/enseignant/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d292cbed"]]);

export { index as default };
//# sourceMappingURL=index-OIqT4BX5.mjs.map
