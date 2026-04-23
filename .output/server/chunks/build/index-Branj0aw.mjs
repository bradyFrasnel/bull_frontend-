import { _ as __nuxt_component_0 } from './nuxt-link-DZBS4QqW.mjs';
import { mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
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
    useHead({ title: "Admin Dashboard | Bull ASUR" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dashboard-admin" }, _attrs))} data-v-c0b4e115><header class="dashboard-header" data-v-c0b4e115><h2 data-v-c0b4e115>Tableau de Bord - Administration</h2><p class="subtitle" data-v-c0b4e115>Gestion globale du syst\xE8me (Utilisateurs, R\xF4les, UEs, Semestres)</p></header><div class="stats-grid" data-v-c0b4e115><div class="stat-card" data-v-c0b4e115><div class="stat-content" data-v-c0b4e115><h3 data-v-c0b4e115>24</h3><p data-v-c0b4e115>Utilisateurs Actifs</p></div></div><div class="stat-card" data-v-c0b4e115><div class="stat-content" data-v-c0b4e115><h3 data-v-c0b4e115>Semestre 5</h3><p data-v-c0b4e115>Semestre Courant</p></div></div><div class="stat-card" data-v-c0b4e115><div class="stat-content" data-v-c0b4e115><h3 data-v-c0b4e115>4</h3><p data-v-c0b4e115>Unit\xE9s d&#39;Enseignement (UE)</p></div></div><div class="stat-card" data-v-c0b4e115><div class="stat-content" data-v-c0b4e115><h3 data-v-c0b4e115>16</h3><p data-v-c0b4e115>Mati\xE8res / \xC9valuations</p></div></div></div><div class="dashboard-widgets" data-v-c0b4e115><div class="widget" data-v-c0b4e115><h3 data-v-c0b4e115>Gestion des Entit\xE9s</h3><ul class="activity-list" data-v-c0b4e115><li data-v-c0b4e115><strong data-v-c0b4e115>Utilisateurs &amp; R\xF4les</strong><span class="time" data-v-c0b4e115>Cr\xE9ation de comptes (Enseignants, Secr\xE9tariat, Admin)</span></li><li data-v-c0b4e115><strong data-v-c0b4e115>Semestres</strong><span class="time" data-v-c0b4e115>D\xE9finition (S5, S6) et activation du semestre courant</span></li><li data-v-c0b4e115><strong data-v-c0b4e115>R\xE9f\xE9rentiel UEs et Mati\xE8res</strong><span class="time" data-v-c0b4e115>Configuration des coefficients et cr\xE9dits associ\xE9s</span></li></ul>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "action-link",
        to: "/referentiels"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Acc\xE9der aux r\xE9f\xE9rentiels \u2192`);
          } else {
            return [
              createTextVNode("Acc\xE9der aux r\xE9f\xE9rentiels \u2192")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="widget" data-v-c0b4e115><h3 data-v-c0b4e115>Param\xE8tres Globaux</h3><ul class="activity-list" data-v-c0b4e115><li data-v-c0b4e115><strong data-v-c0b4e115>R\xE8gles de Compensation</strong><span class="time" data-v-c0b4e115>D\xE9finition des cr\xE9dits de rattrapage</span></li><li data-v-c0b4e115><strong data-v-c0b4e115>Grille de Mentions</strong><span class="time" data-v-c0b4e115>(Passable 10-12, Assez Bien 12-14, etc.)</span></li></ul></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c0b4e115"]]);

export { index as default };
//# sourceMappingURL=index-Branj0aw.mjs.map
