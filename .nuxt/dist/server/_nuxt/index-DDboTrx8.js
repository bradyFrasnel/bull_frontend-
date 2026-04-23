import { computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { useRoute } from "vue-router";
import { u as useHead } from "./v3-D2Flwojj.js";
import { u as useCookie } from "./cookie-BQ1yN6Gj.js";
import { _ as _export_sfc } from "../server.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/@unhead/vue/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/cookie-es/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/h3/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/destr/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/ohash/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/klona/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/hookable/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/unctx/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/defu/dist/defu.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/ufo/dist/index.mjs";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Profil | Bull ASUR" });
    useRoute();
    const currentRole = useCookie("authRole", { default: () => "etudiant" });
    const username = useCookie("authUsername", { default: () => "Yannick" });
    const email = useCookie("authEmail", { default: () => "yannick.mba@inptic.ga" });
    const fullName = useCookie("authFullName", { default: () => "MBA NSOME Yannick Lionel" });
    const initial = computed(() => fullName.value.charAt(0).toUpperCase() || "U");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-profil" }, _attrs))} data-v-3bb37e45><header class="page-header" data-v-3bb37e45><h2 data-v-3bb37e45>Mon Profil</h2><p data-v-3bb37e45>Gérez vos informations personnelles et préférences de connexion.</p></header><div class="profil-card" data-v-3bb37e45><div class="profil-header" data-v-3bb37e45><div class="avatar-large" data-v-3bb37e45>${ssrInterpolate(initial.value)}</div><div class="profil-main-info" data-v-3bb37e45><h3 data-v-3bb37e45>${ssrInterpolate(unref(fullName))}</h3><p class="role-badge" data-v-3bb37e45>${ssrInterpolate(unref(currentRole).toUpperCase())}</p></div></div><form class="profil-form" data-v-3bb37e45><div class="form-group" data-v-3bb37e45><label data-v-3bb37e45>Identifiant (Prénom)</label><input type="text"${ssrRenderAttr("value", unref(username))} disabled data-v-3bb37e45></div><div class="form-group" data-v-3bb37e45><label data-v-3bb37e45>Adresse Email</label><input type="email"${ssrRenderAttr("value", unref(email))} disabled data-v-3bb37e45></div><div class="form-group mt-2" data-v-3bb37e45><h4 data-v-3bb37e45>Changer le mot de passe</h4><div class="form-row" data-v-3bb37e45><input type="password" placeholder="Mot de passe actuel" data-v-3bb37e45><input type="password" placeholder="Nouveau mot de passe" data-v-3bb37e45></div></div><div class="actions" data-v-3bb37e45><button type="submit" class="btn btn-primary" data-v-3bb37e45>Enregistrer les modifications</button></div></form></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profil/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3bb37e45"]]);
export {
  index as default
};
//# sourceMappingURL=index-DDboTrx8.js.map
