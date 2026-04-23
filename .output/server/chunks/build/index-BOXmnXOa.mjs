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
    useHead({
      title: "Accueil | Bull ASUR"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "landing-page" }, _attrs))} data-v-721647eb><div class="overlay" data-v-721647eb></div><div class="content-wrapper" data-v-721647eb><header class="landing-header" data-v-721647eb><h1 data-v-721647eb>Bienvenue sur Bull ASUR</h1><p data-v-721647eb>Le portail de gestion des bulletins de notes <strong data-v-721647eb>DAR 3</strong></p></header><div class="roles-grid" data-v-721647eb>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login?role=etudiant",
        class: "role-card etudiant-theme"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 data-v-721647eb${_scopeId}>Espace \xC9tudiant</h2><p data-v-721647eb${_scopeId}>Consultez vos notes officielles.</p>`);
          } else {
            return [
              createVNode("h2", null, "Espace \xC9tudiant"),
              createVNode("p", null, "Consultez vos notes officielles.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login?role=enseignant",
        class: "role-card enseignant-theme"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 data-v-721647eb${_scopeId}>Espace Enseignant</h2><p data-v-721647eb${_scopeId}>Gerez vos evaluations simplement.</p>`);
          } else {
            return [
              createVNode("h2", null, "Espace Enseignant"),
              createVNode("p", null, "Gerez vos evaluations simplement.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login?role=secretariat",
        class: "role-card secretariat-theme"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 data-v-721647eb${_scopeId}>Secr\xE9tariat P\xE9dagogique</h2><p data-v-721647eb${_scopeId}>Gestion administrative de l&#39;ensemble du personnel.</p>`);
          } else {
            return [
              createVNode("h2", null, "Secr\xE9tariat P\xE9dagogique"),
              createVNode("p", null, "Gestion administrative de l'ensemble du personnel.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login?role=admin",
        class: "role-card admin-theme"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 data-v-721647eb${_scopeId}>Administrateur</h2><p data-v-721647eb${_scopeId}>Management syst\xE8me.</p>`);
          } else {
            return [
              createVNode("h2", null, "Administrateur"),
              createVNode("p", null, "Management syst\xE8me.")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-721647eb"]]);

export { index as default };
//# sourceMappingURL=index-BOXmnXOa.mjs.map
