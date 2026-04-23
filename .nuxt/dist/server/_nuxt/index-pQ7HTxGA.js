import { _ as __nuxt_component_0 } from "./nuxt-link-DZBS4QqW.js";
import { ref, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { u as useApi } from "./useApi-C5ZVQEPH.js";
import { u as useHead } from "./v3-D2Flwojj.js";
import { _ as _export_sfc } from "../server.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/ufo/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/defu/dist/defu.mjs";
import "./cookie-BQ1yN6Gj.js";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/cookie-es/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/h3/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/destr/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/ohash/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/klona/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/@unhead/vue/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/hookable/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/unctx/dist/index.mjs";
import "vue-router";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Espace Étudiant | Bull ASUR" });
    useApi();
    const isLoading = ref(true);
    const studentResults = ref(null);
    const absencesCount = ref(4);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dashboard-etudiant" }, _attrs))} data-v-29140269><header class="dashboard-header" data-v-29140269><h2 data-v-29140269>Espace Étudiant</h2>`);
      if (!isLoading.value) {
        _push(`<p class="subtitle" data-v-29140269>Consultez vos performances scolaires pour le Semestre ${ssrInterpolate(studentResults.value?.semestre || 5)}.</p>`);
      } else {
        _push(`<p class="subtitle" data-v-29140269>Chargement de vos résultats...</p>`);
      }
      _push(`</header>`);
      if (isLoading.value) {
        _push(`<div class="loading-state" data-v-29140269> Chargement des données en cours... </div>`);
      } else if (studentResults.value) {
        _push(`<div class="dashboard-content" data-v-29140269><div class="stats-overview" data-v-29140269><div class="kpi-card" data-v-29140269><h4 data-v-29140269>Moyenne S${ssrInterpolate(studentResults.value.semestre || 5)}</h4><div class="${ssrRenderClass([{ success: studentResults.value.moyenne_generale >= 10 }, "value"])}" data-v-29140269>${ssrInterpolate(studentResults.value.moyenne_generale)}<small data-v-29140269>/20</small></div></div><div class="kpi-card" data-v-29140269><h4 data-v-29140269>Crédits</h4><div class="value" data-v-29140269>${ssrInterpolate(studentResults.value.credits_acquis)}<small data-v-29140269>/${ssrInterpolate(studentResults.value.total_credits || 30)}</small></div></div><div class="kpi-card" data-v-29140269><h4 data-v-29140269>Absences</h4><div class="value warning" data-v-29140269>${ssrInterpolate(absencesCount.value)}<small data-v-29140269>heures</small></div></div></div><div class="widgets" data-v-29140269><div class="widget" data-v-29140269><h3 data-v-29140269>Mes Unités d&#39;Enseignement (UE)</h3><ul class="grade-list" data-v-29140269><!--[-->`);
        ssrRenderList(studentResults.value.ues, (ue) => {
          _push(`<li data-v-29140269><div class="ue-info" data-v-29140269><strong data-v-29140269>${ssrInterpolate(ue.id)} : ${ssrInterpolate(ue.libelle)}</strong></div><div class="ue-moyenne" data-v-29140269>${ssrInterpolate(ue.moyenne_ue.toFixed(2))} / 20</div></li>`);
        });
        _push(`<!--]--></ul>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/bulletins",
          class: "link-btn"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Voir mon bulletin détaillé →`);
            } else {
              return [
                createTextVNode("Voir mon bulletin détaillé →")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/etudiant/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-29140269"]]);
export {
  index as default
};
//# sourceMappingURL=index-pQ7HTxGA.js.map
