import { computed, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { u as useApi } from './useApi-C5ZVQEPH.mjs';
import { u as useHead } from './v3-D2Flwojj.mjs';
import { u as useCookie } from './cookie-BQ1yN6Gj.mjs';
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
      title: "Saisie | Bull ASUR"
    });
    useApi();
    const authRole = useCookie("authRole", { default: () => "etudiant" });
    const isEnseignant = computed(() => authRole.value === "enseignant");
    const selectedMatiere = ref("M1");
    const availableMatieres = ref([]);
    const etudiants = ref([]);
    const isSaving = ref(false);
    const isRattrapageEligible = (etudiant) => {
      const cc = etudiant.cc !== null && etudiant.cc !== "" ? Number(etudiant.cc) : null;
      const ex = etudiant.exam !== null && etudiant.exam !== "" ? Number(etudiant.exam) : null;
      if (cc === null || ex === null) return true;
      return cc * 0.4 + ex * 0.6 < 10;
    };
    const calculateMoyenne = (etudiant) => {
      let cc = etudiant.cc !== null && etudiant.cc !== "" ? Number(etudiant.cc) : null;
      let ex = etudiant.exam !== null && etudiant.exam !== "" ? Number(etudiant.exam) : null;
      let rat = etudiant.ratrap !== null && etudiant.ratrap !== "" ? Number(etudiant.ratrap) : null;
      if (!isRattrapageEligible(etudiant)) {
        rat = null;
      }
      let baseMoyenne = null;
      if (rat !== null) {
        if (cc === null && ex !== null) {
          baseMoyenne = rat * 0.4 + ex * 0.6;
        } else if (ex === null && cc !== null) {
          baseMoyenne = cc * 0.4 + rat * 0.6;
        } else if (cc !== null && ex !== null) {
          let finalCC = cc;
          let finalEx = ex;
          if (rat > Math.min(cc, ex)) {
            if (cc < ex) {
              finalCC = rat;
            } else {
              finalEx = rat;
            }
          }
          baseMoyenne = finalCC * 0.4 + finalEx * 0.6;
        } else {
          baseMoyenne = rat;
        }
      } else {
        if (cc !== null && ex !== null) {
          baseMoyenne = cc * 0.4 + ex * 0.6;
        } else if (cc !== null) {
          baseMoyenne = cc;
        } else if (ex !== null) {
          baseMoyenne = ex;
        }
      }
      if (baseMoyenne !== null) {
        const absenceMalus = (etudiant.absences || 0) * 0.01;
        let finalGrade = baseMoyenne - absenceMalus;
        return Math.max(0, finalGrade).toFixed(2);
      }
      return "-";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-saisie" }, _attrs))} data-v-53176bfa><header class="page-header" data-v-53176bfa><div class="header-content" data-v-53176bfa><h2 data-v-53176bfa>Saisie des Notes et Absences</h2><p data-v-53176bfa>Semestre 5 - Anglais technique (UE5-1)</p></div><div class="header-actions" data-v-53176bfa><select class="matiere-select" data-v-53176bfa><!--[-->`);
      ssrRenderList(availableMatieres.value, (matiere) => {
        _push(`<option${ssrRenderAttr("value", matiere.id)} data-v-53176bfa${ssrIncludeBooleanAttr(Array.isArray(selectedMatiere.value) ? ssrLooseContain(selectedMatiere.value, matiere.id) : ssrLooseEqual(selectedMatiere.value, matiere.id)) ? " selected" : ""}>${ssrInterpolate(matiere.libelle)}</option>`);
      });
      _push(`<!--]--></select><button class="btn btn-primary"${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} data-v-53176bfa>`);
      if (!isSaving.value) {
        _push(`<span data-v-53176bfa>Enregistrer les Notes</span>`);
      } else {
        _push(`<span data-v-53176bfa>Enregistrement...</span>`);
      }
      _push(`</button></div></header><div class="table-container" data-v-53176bfa><table class="grid-saisie" data-v-53176bfa><thead data-v-53176bfa><tr data-v-53176bfa><th width="80" data-v-53176bfa>ID</th><th data-v-53176bfa>\xC9tudiant</th><th width="120" class="center" data-v-53176bfa>Note CC (40%)</th><th width="120" class="center" data-v-53176bfa>Examen (60%)</th><th width="120" class="center" data-v-53176bfa>Rattrapage</th><th width="120" class="center" data-v-53176bfa>Absences (h)</th><th width="120" class="center bg-gray" data-v-53176bfa>Moyenne (*)</th></tr></thead><tbody data-v-53176bfa><!--[-->`);
      ssrRenderList(etudiants.value, (etudiant) => {
        _push(`<tr class="${ssrRenderClass({ "is-failed": parseFloat(calculateMoyenne(etudiant)) < 10 && calculateMoyenne(etudiant) !== "-" })}" data-v-53176bfa><td data-v-53176bfa>${ssrInterpolate(etudiant.id)}</td><td class="font-bold" data-v-53176bfa>${ssrInterpolate(etudiant.nom)} ${ssrInterpolate(etudiant.prenom)}</td><td class="center" data-v-53176bfa><input type="number" min="0" max="20" step="0.25"${ssrRenderAttr("value", etudiant.cc)} class="grade-input" data-v-53176bfa></td><td class="center" data-v-53176bfa><input type="number" min="0" max="20" step="0.25"${ssrRenderAttr("value", etudiant.exam)} class="grade-input" data-v-53176bfa></td><td class="center" data-v-53176bfa><input type="number" min="0" max="20" step="0.25"${ssrRenderAttr("value", etudiant.ratrap)} class="grade-input"${ssrIncludeBooleanAttr(!isRattrapageEligible(etudiant)) ? " disabled" : ""}${ssrRenderAttr("title", !isRattrapageEligible(etudiant) ? "Rattrapage non autoris\xE9 (moyenne >= 10)" : "")} data-v-53176bfa></td><td class="center" data-v-53176bfa><input type="number" min="0"${ssrRenderAttr("value", etudiant.absences)} class="grade-input abscence"${ssrIncludeBooleanAttr(isEnseignant.value) ? " disabled" : ""}${ssrRenderAttr("title", isEnseignant.value ? "La gestion des absences rel\xE8ve du secr\xE9tariat" : "")} data-v-53176bfa></td><td class="center bg-gray font-bold value-cell" data-v-53176bfa>${ssrInterpolate(calculateMoyenne(etudiant))}</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/saisie/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-53176bfa"]]);

export { index as default };
//# sourceMappingURL=index-DSEMMOGn.mjs.map
