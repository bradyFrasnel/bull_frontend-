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
    useHead({ title: "Secr\xE9tariat | Bull ASUR" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dashboard-secretariat" }, _attrs))} data-v-dd6deae0><header class="dashboard-header" data-v-dd6deae0><h2 data-v-dd6deae0>Tableau de Bord - Secr\xE9tariat P\xE9dagogique</h2><p class="subtitle" data-v-dd6deae0>Gestion des \xC9tudiants, Absences et \xC9dition des r\xE9sultats.</p></header><div class="shortcut-grid" data-v-dd6deae0>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/etudiants",
        class: "shortcut-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h4 data-v-dd6deae0${_scopeId}>Gestion des \xC9tudiants</h4><p data-v-dd6deae0${_scopeId}>Inscriptions et liste officielle.</p>`);
          } else {
            return [
              createVNode("h4", null, "Gestion des \xC9tudiants"),
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
            _push2(`<h4 data-v-dd6deae0${_scopeId}>Saisie des Absences</h4><p data-v-dd6deae0${_scopeId}>Comptabilisation des heures p\xE9nalisantes par mati\xE8re.</p>`);
          } else {
            return [
              createVNode("h4", null, "Saisie des Absences"),
              createVNode("p", null, "Comptabilisation des heures p\xE9nalisantes par mati\xE8re.")
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
            _push2(`<h4 data-v-dd6deae0${_scopeId}>Pr\xE9paration du Jury</h4><p data-v-dd6deae0${_scopeId}>R\xE9sultats annuels et d\xE9cisions finale.</p>`);
          } else {
            return [
              createVNode("h4", null, "Pr\xE9paration du Jury"),
              createVNode("p", null, "R\xE9sultats annuels et d\xE9cisions finale.")
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
            _push2(`<h4 data-v-dd6deae0${_scopeId}>Gestion des Enseignants</h4><p data-v-dd6deae0${_scopeId}>Assignation des mati\xE8res et gestion du personnel.</p>`);
          } else {
            return [
              createVNode("h4", null, "Gestion des Enseignants"),
              createVNode("p", null, "Assignation des mati\xE8res et gestion du personnel.")
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
            _push2(`<h4 data-v-dd6deae0${_scopeId}>\xC9dition des Bulletins</h4><p data-v-dd6deae0${_scopeId}>Gestion de la structure : semestres, UE, mati\xE8res, absences.</p>`);
          } else {
            return [
              createVNode("h4", null, "\xC9dition des Bulletins"),
              createVNode("p", null, "Gestion de la structure : semestres, UE, mati\xE8res, absences.")
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
            _push2(`<h4 data-v-dd6deae0${_scopeId}>Modification des Notes</h4><p data-v-dd6deae0${_scopeId}>Consultation et correction des notes par mati\xE8re.</p>`);
          } else {
            return [
              createVNode("h4", null, "Modification des Notes"),
              createVNode("p", null, "Consultation et correction des notes par mati\xE8re.")
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

export { index as default };
//# sourceMappingURL=index-DySAWk-Q.mjs.map
