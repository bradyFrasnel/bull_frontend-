import { computed, ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/hookable/dist/index.mjs";
import { u as useHead } from "./v3-D2Flwojj.js";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/klona/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/@unhead/vue/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/unctx/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/h3/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/defu/dist/defu.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/ufo/dist/index.mjs";
const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    const userRole = computed(() => route.query.role || "etudiant");
    const roleTitle = computed(() => {
      switch (userRole.value) {
        case "admin":
          return "Administration";
        case "secretariat":
          return "Secrétariat Pédagogique";
        case "enseignant":
          return "Espace Enseignant";
        case "etudiant":
          return "Espace Étudiant";
        default:
          return "Espace Étudiant";
      }
    });
    useHead({
      title: computed(() => `Connexion ${roleTitle.value} | LP ASUR`)
    });
    const username = ref("");
    const password = ref("");
    const loading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-container" }, _attrs))} data-v-b6d3ff48><div class="login-card" data-v-b6d3ff48><div class="login-header" data-v-b6d3ff48><h1 data-v-b6d3ff48>Bull ASUR</h1><p data-v-b6d3ff48>Connexion | ${ssrInterpolate(roleTitle.value)}</p></div><form class="login-form" data-v-b6d3ff48><div class="form-group" data-v-b6d3ff48><label for="username" data-v-b6d3ff48>Identifiant</label><input type="text" id="username"${ssrRenderAttr("value", username.value)} placeholder="Entrez votre identifiant" required data-v-b6d3ff48></div><div class="form-group" data-v-b6d3ff48><label for="password" data-v-b6d3ff48>Mot de passe</label><input type="password" id="password"${ssrRenderAttr("value", password.value)} placeholder="Entrez votre mot de passe" required data-v-b6d3ff48></div><button type="submit" class="login-btn"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-b6d3ff48>`);
      if (!loading.value) {
        _push(`<span data-v-b6d3ff48>Se Connecter</span>`);
      } else {
        _push(`<span class="loader" data-v-b6d3ff48></span>`);
      }
      _push(`</button></form></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b6d3ff48"]]);
export {
  login as default
};
//# sourceMappingURL=login-D34VsApY.js.map
