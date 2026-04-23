import { _ as __nuxt_component_0 } from "./nuxt-link-DZBS4QqW.js";
import { mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { u as useHead } from "./v3-D2Flwojj.js";
import { _ as _export_sfc } from "../server.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/ufo/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/defu/dist/defu.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/@unhead/vue/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/hookable/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/unctx/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Secrétariat | Bull ASUR" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dashboard-secretariat" }, _attrs))} data-v-dd6deae0><header class="dashboard-header" data-v-dd6deae0><h2 data-v-dd6deae0>Tableau de Bord - Secrétariat Pédagogique</h2><p class="subtitle" data-v-dd6deae0>Gestion des Étudiants, Absences et Édition des résultats.</p></header><div class="shortcut-grid" data-v-dd6deae0>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/etudiants",
        class: "shortcut-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h4 data-v-dd6deae0${_scopeId}>Gestion des Étudiants</h4><p data-v-dd6deae0${_scopeId}>Inscriptions et liste officielle.</p>`);
          } else {
            return [
              createVNode("h4", null, "Gestion des Étudiants"),
              createVNode("p", null, "Inscriptions et liste officielle.")
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
            _push2(`<h4 data-v-dd6deae0${_scopeId}>Saisie des Absences</h4><p data-v-dd6deae0${_scopeId}>Comptabilisation des heures pénalisantes par matière.</p>`);
          } else {
            return [
              createVNode("h4", null, "Saisie des Absences"),
              createVNode("p", null, "Comptabilisation des heures pénalisantes par matière.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/deliberations",
        class: "shortcut-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h4 data-v-dd6deae0${_scopeId}>Préparation du Jury</h4><p data-v-dd6deae0${_scopeId}>Résultats annuels et décisions finale.</p>`);
          } else {
            return [
              createVNode("h4", null, "Préparation du Jury"),
              createVNode("p", null, "Résultats annuels et décisions finale.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/secretariat/enseignants",
        class: "shortcut-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h4 data-v-dd6deae0${_scopeId}>Gestion des Enseignants</h4><p data-v-dd6deae0${_scopeId}>Assignation des matières et gestion du personnel.</p>`);
          } else {
            return [
              createVNode("h4", null, "Gestion des Enseignants"),
              createVNode("p", null, "Assignation des matières et gestion du personnel.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/secretariat/edition-bulletins",
        class: "shortcut-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h4 data-v-dd6deae0${_scopeId}>Édition des Bulletins</h4><p data-v-dd6deae0${_scopeId}>Gestion de la structure : semestres, UE, matières, absences.</p>`);
          } else {
            return [
              createVNode("h4", null, "Édition des Bulletins"),
              createVNode("p", null, "Gestion de la structure : semestres, UE, matières, absences.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/secretariat/modification-notes",
        class: "shortcut-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h4 data-v-dd6deae0${_scopeId}>Modification des Notes</h4><p data-v-dd6deae0${_scopeId}>Consultation et correction des notes par matière.</p>`);
          } else {
            return [
              createVNode("h4", null, "Modification des Notes"),
              createVNode("p", null, "Consultation et correction des notes par matière.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/secretariat/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dd6deae0"]]);
export {
  index as default
};
//# sourceMappingURL=index-DySAWk-Q.js.map
