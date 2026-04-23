import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { u as useApi } from './useApi-C5ZVQEPH.mjs';
import { u as useHead } from './v3-D2Flwojj.mjs';
import { _ as _export_sfc } from './server.mjs';
import './cookie-BQ1yN6Gj.mjs';
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
    useHead({ title: "D\xE9lib\xE9rations | LP ASUR" });
    useApi();
    ref(true);
    const resultats = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-deliberation" }, _attrs))} data-v-ab42d023><header class="page-header" data-v-ab42d023><div class="header-content" data-v-ab42d023><h2 data-v-ab42d023>D\xE9lib\xE9rations du Jury (S5)</h2><p data-v-ab42d023>Ann\xE9e universitaire 2025-2026 - Liste r\xE9capitulative des r\xE9sultats</p></div><div class="header-actions" data-v-ab42d023><button class="btn btn-secondary" data-v-ab42d023><span class="icon" data-v-ab42d023>\u{1F4CA}</span> Exporter Excel </button><button class="btn btn-primary" data-v-ab42d023><span class="icon" data-v-ab42d023>\u2714\uFE0F</span> Valider les d\xE9cisions </button></div></header><div class="grid-container" data-v-ab42d023><table class="grid-delib" data-v-ab42d023><thead data-v-ab42d023><tr data-v-ab42d023><th data-v-ab42d023>\xC9tudiant</th><th class="center" data-v-ab42d023>Moy S5</th><th class="center" data-v-ab42d023>UE5-1</th><th class="center" data-v-ab42d023>UE5-2</th><th class="center" data-v-ab42d023>Cr\xE9dits</th><th class="center" data-v-ab42d023>D\xE9cision S5</th></tr></thead><tbody data-v-ab42d023><!--[-->`);
      ssrRenderList(resultats.value, (res) => {
        _push(`<tr class="${ssrRenderClass({ "is-failed": res.decision === "Ajourn\xE9" })}" data-v-ab42d023><td class="font-bold" data-v-ab42d023>${ssrInterpolate(res.nom)} ${ssrInterpolate(res.prenom)}</td><td class="center font-bold value" data-v-ab42d023>${ssrInterpolate(res.moyS5)}</td><td class="center" data-v-ab42d023>${ssrInterpolate(res.ue1)}</td><td class="center" data-v-ab42d023>${ssrInterpolate(res.ue2)}</td><td class="center badge-container" data-v-ab42d023><span class="${ssrRenderClass(["badge-sm", res.credits === 30 ? "badge-success" : "badge-warning"])}" data-v-ab42d023>${ssrInterpolate(res.credits)} / 30 </span></td><td class="center" data-v-ab42d023><span class="${ssrRenderClass(["decision-badge", res.decision === "Valid\xE9" ? "valid" : "invalid"])}" data-v-ab42d023>${ssrInterpolate(res.decision)}</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/deliberations/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ab42d023"]]);

export { index as default };
//# sourceMappingURL=index-DxSQTmHC.mjs.map
