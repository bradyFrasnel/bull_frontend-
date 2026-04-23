import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { u as useHead } from "./v3-D2Flwojj.js";
import { _ as _export_sfc } from "../server.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/@unhead/vue/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/hookable/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/unctx/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/defu/dist/defu.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/ufo/dist/index.mjs";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Référentiels | LP ASUR"
    });
    const ues = ref([
      {
        id: 1,
        code: "UE5-1",
        libelle: "Enseignement Général",
        semestre: "Semestre 5",
        matieres: [
          { id: 101, libelle: "Anglais technique", coefficient: 1, credits: 2 },
          { id: 102, libelle: "Management d'équipe", coefficient: 1, credits: 1 },
          { id: 103, libelle: "Communication", coefficient: 2, credits: 1 },
          { id: 104, libelle: "Droit de l'informatique", coefficient: 2, credits: 2 }
        ]
      },
      {
        id: 2,
        code: "UE5-2",
        libelle: "Connaissances de Base et Outils LAN",
        semestre: "Semestre 5",
        matieres: [
          { id: 201, libelle: "Remise à niveau IOS", coefficient: 2, credits: 2 },
          { id: 202, libelle: "Connaissance des réseaux LAN", coefficient: 2, credits: 2 }
        ]
      }
    ]);
    const totalCredits = (ue) => {
      return ue.matieres.reduce((acc, current) => acc + current.credits, 0);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-referentiels" }, _attrs))} data-v-9688683f><header class="page-header" data-v-9688683f><div class="header-content" data-v-9688683f><h2 data-v-9688683f>Gestion des Référentiels Pédagogiques</h2><p data-v-9688683f>Gérez la structure académique: Unités d&#39;Enseignement (UE) et Matières.</p></div><div class="header-actions" data-v-9688683f><button class="btn btn-primary" data-v-9688683f><span class="icon" data-v-9688683f>➕</span> Ajouter une UE </button></div></header><div class="referentiels-container" data-v-9688683f><!--[-->`);
      ssrRenderList(ues.value, (ue) => {
        _push(`<div class="ue-card" data-v-9688683f><div class="ue-header" data-v-9688683f><div class="ue-title" data-v-9688683f><h3 data-v-9688683f>${ssrInterpolate(ue.code)} : ${ssrInterpolate(ue.libelle)}</h3><span class="badge" data-v-9688683f>${ssrInterpolate(ue.semestre)}</span></div><div class="ue-actions" data-v-9688683f><button class="action-btn edit-btn" data-v-9688683f>✏️</button><button class="action-btn delete-btn" data-v-9688683f>🗑️</button></div></div><table class="matieres-table" data-v-9688683f><thead data-v-9688683f><tr data-v-9688683f><th data-v-9688683f>Matière</th><th width="100" class="center" data-v-9688683f>Coefficient</th><th width="100" class="center" data-v-9688683f>Crédits</th><th width="80" class="center" data-v-9688683f>Actions</th></tr></thead><tbody data-v-9688683f><!--[-->`);
        ssrRenderList(ue.matieres, (mat) => {
          _push(`<tr data-v-9688683f><td data-v-9688683f>${ssrInterpolate(mat.libelle)}</td><td class="center font-bold" data-v-9688683f>${ssrInterpolate(mat.coefficient)}</td><td class="center font-bold" data-v-9688683f>${ssrInterpolate(mat.credits)}</td><td class="center actions-cell" data-v-9688683f><button class="action-btn edit-sm-btn" data-v-9688683f>✏️</button></td></tr>`);
        });
        _push(`<!--]--></tbody><tfoot data-v-9688683f><tr data-v-9688683f><td class="add-matiere-cell" data-v-9688683f><button class="btn btn-dashed" data-v-9688683f><span class="icon" data-v-9688683f>➕</span> Ajouter une matière à ${ssrInterpolate(ue.code)}</button></td><td class="center total-lbl" data-v-9688683f>Total :</td><td class="center total-val" data-v-9688683f>${ssrInterpolate(totalCredits(ue))}</td><td data-v-9688683f></td></tr></tfoot></table></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/referentiels/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9688683f"]]);
export {
  index as default
};
//# sourceMappingURL=index-DUxkCsdC.js.map
