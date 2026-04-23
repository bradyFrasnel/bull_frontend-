import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useHead } from './v3-D2Flwojj.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
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
      title: "R\xE9f\xE9rentiels | LP ASUR"
    });
    const ues = ref([
      {
        id: 1,
        code: "UE5-1",
        libelle: "Enseignement G\xE9n\xE9ral",
        semestre: "Semestre 5",
        matieres: [
          { id: 101, libelle: "Anglais technique", coefficient: 1, credits: 2 },
          { id: 102, libelle: "Management d'\xE9quipe", coefficient: 1, credits: 1 },
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
          { id: 201, libelle: "Remise \xE0 niveau IOS", coefficient: 2, credits: 2 },
          { id: 202, libelle: "Connaissance des r\xE9seaux LAN", coefficient: 2, credits: 2 }
        ]
      }
    ]);
    const totalCredits = (ue) => {
      return ue.matieres.reduce((acc, current) => acc + current.credits, 0);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-referentiels" }, _attrs))} data-v-9688683f><header class="page-header" data-v-9688683f><div class="header-content" data-v-9688683f><h2 data-v-9688683f>Gestion des R\xE9f\xE9rentiels P\xE9dagogiques</h2><p data-v-9688683f>G\xE9rez la structure acad\xE9mique: Unit\xE9s d&#39;Enseignement (UE) et Mati\xE8res.</p></div><div class="header-actions" data-v-9688683f><button class="btn btn-primary" data-v-9688683f><span class="icon" data-v-9688683f>\u2795</span> Ajouter une UE </button></div></header><div class="referentiels-container" data-v-9688683f><!--[-->`);
      ssrRenderList(ues.value, (ue) => {
        _push(`<div class="ue-card" data-v-9688683f><div class="ue-header" data-v-9688683f><div class="ue-title" data-v-9688683f><h3 data-v-9688683f>${ssrInterpolate(ue.code)} : ${ssrInterpolate(ue.libelle)}</h3><span class="badge" data-v-9688683f>${ssrInterpolate(ue.semestre)}</span></div><div class="ue-actions" data-v-9688683f><button class="action-btn edit-btn" data-v-9688683f>\u270F\uFE0F</button><button class="action-btn delete-btn" data-v-9688683f>\u{1F5D1}\uFE0F</button></div></div><table class="matieres-table" data-v-9688683f><thead data-v-9688683f><tr data-v-9688683f><th data-v-9688683f>Mati\xE8re</th><th width="100" class="center" data-v-9688683f>Coefficient</th><th width="100" class="center" data-v-9688683f>Cr\xE9dits</th><th width="80" class="center" data-v-9688683f>Actions</th></tr></thead><tbody data-v-9688683f><!--[-->`);
        ssrRenderList(ue.matieres, (mat) => {
          _push(`<tr data-v-9688683f><td data-v-9688683f>${ssrInterpolate(mat.libelle)}</td><td class="center font-bold" data-v-9688683f>${ssrInterpolate(mat.coefficient)}</td><td class="center font-bold" data-v-9688683f>${ssrInterpolate(mat.credits)}</td><td class="center actions-cell" data-v-9688683f><button class="action-btn edit-sm-btn" data-v-9688683f>\u270F\uFE0F</button></td></tr>`);
        });
        _push(`<!--]--></tbody><tfoot data-v-9688683f><tr data-v-9688683f><td class="add-matiere-cell" data-v-9688683f><button class="btn btn-dashed" data-v-9688683f><span class="icon" data-v-9688683f>\u2795</span> Ajouter une mati\xE8re \xE0 ${ssrInterpolate(ue.code)}</button></td><td class="center total-lbl" data-v-9688683f>Total :</td><td class="center total-val" data-v-9688683f>${ssrInterpolate(totalCredits(ue))}</td><td data-v-9688683f></td></tr></tfoot></table></div>`);
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

export { index as default };
//# sourceMappingURL=index-DUxkCsdC.mjs.map
