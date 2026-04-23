import { ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
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
  __name: "bulletins",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "G\xE9n\xE9ration des Bulletins | Bull ASUR" });
    const etudiants = ref([]);
    const selectedEtudiant = ref("");
    ref(false);
    const filters = ref({
      promotion: "2025-2026",
      semestre: "",
      statut: ""
    });
    const batchOptions = ref({
      S5: false,
      S6: false,
      annuel: false
    });
    const showProgressModal = ref(false);
    const progressMessage = ref("");
    const progressCurrent = ref(0);
    const progressTotal = ref(0);
    const stats = ref({
      total_etudiants: 0,
      diplomes: 0,
      admissibles: 0,
      redoublants: 0
    });
    const filteredEtudiants = computed(() => {
      let filtered = etudiants.value;
      if (filters.value.semestre) {
        filtered = filtered.filter((e) => {
          if (filters.value.semestre === "S5") return e.moyenne_S5;
          if (filters.value.semestre === "S6") return e.moyenne_S6;
          return true;
        });
      }
      if (filters.value.statut) {
        filtered = filtered.filter((e) => e.decision_jury === filters.value.statut);
      }
      return filtered;
    });
    const hasBatchOption = computed(() => {
      return batchOptions.value.S5 || batchOptions.value.S6 || batchOptions.value.annuel;
    });
    const getDecisionClass = (decision) => {
      if (!decision) return "";
      switch (decision) {
        case "Dipl\xF4m\xE9(e)":
          return "decision-success";
        case "Admissible":
          return "decision-warning";
        case "Redouble la Licence 3":
          return "decision-danger";
        default:
          return "";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-bulletins" }, _attrs))} data-v-f3d26f88><header class="page-header" data-v-f3d26f88><div class="header-content" data-v-f3d26f88><h2 data-v-f3d26f88>G\xE9n\xE9ration des Bulletins</h2><p data-v-f3d26f88>G\xE9n\xE9rez les bulletins PDF et exportez les donn\xE9es Excel pour les \xE9tudiants.</p></div></header><div class="filters-section" data-v-f3d26f88><div class="filter-row" data-v-f3d26f88><div class="filter-group" data-v-f3d26f88><label for="promotion" data-v-f3d26f88>Promotion:</label><select id="promotion" class="form-control" data-v-f3d26f88><option value="2025-2026" data-v-f3d26f88${ssrIncludeBooleanAttr(Array.isArray(filters.value.promotion) ? ssrLooseContain(filters.value.promotion, "2025-2026") : ssrLooseEqual(filters.value.promotion, "2025-2026")) ? " selected" : ""}>2025-2026</option><option value="2024-2025" data-v-f3d26f88${ssrIncludeBooleanAttr(Array.isArray(filters.value.promotion) ? ssrLooseContain(filters.value.promotion, "2024-2025") : ssrLooseEqual(filters.value.promotion, "2024-2025")) ? " selected" : ""}>2024-2025</option></select></div><div class="filter-group" data-v-f3d26f88><label for="semestre" data-v-f3d26f88>Semestre:</label><select id="semestre" class="form-control" data-v-f3d26f88><option value="" data-v-f3d26f88${ssrIncludeBooleanAttr(Array.isArray(filters.value.semestre) ? ssrLooseContain(filters.value.semestre, "") : ssrLooseEqual(filters.value.semestre, "")) ? " selected" : ""}>Tous</option><option value="S5" data-v-f3d26f88${ssrIncludeBooleanAttr(Array.isArray(filters.value.semestre) ? ssrLooseContain(filters.value.semestre, "S5") : ssrLooseEqual(filters.value.semestre, "S5")) ? " selected" : ""}>Semestre 5</option><option value="S6" data-v-f3d26f88${ssrIncludeBooleanAttr(Array.isArray(filters.value.semestre) ? ssrLooseContain(filters.value.semestre, "S6") : ssrLooseEqual(filters.value.semestre, "S6")) ? " selected" : ""}>Semestre 6</option></select></div><div class="filter-group" data-v-f3d26f88><label for="statut" data-v-f3d26f88>Statut:</label><select id="statut" class="form-control" data-v-f3d26f88><option value="" data-v-f3d26f88${ssrIncludeBooleanAttr(Array.isArray(filters.value.statut) ? ssrLooseContain(filters.value.statut, "") : ssrLooseEqual(filters.value.statut, "")) ? " selected" : ""}>Tous</option><option value="valide" data-v-f3d26f88${ssrIncludeBooleanAttr(Array.isArray(filters.value.statut) ? ssrLooseContain(filters.value.statut, "valide") : ssrLooseEqual(filters.value.statut, "valide")) ? " selected" : ""}>Valid\xE9</option><option value="admissible" data-v-f3d26f88${ssrIncludeBooleanAttr(Array.isArray(filters.value.statut) ? ssrLooseContain(filters.value.statut, "admissible") : ssrLooseEqual(filters.value.statut, "admissible")) ? " selected" : ""}>Admissible</option><option value="non_valide" data-v-f3d26f88${ssrIncludeBooleanAttr(Array.isArray(filters.value.statut) ? ssrLooseContain(filters.value.statut, "non_valide") : ssrLooseEqual(filters.value.statut, "non_valide")) ? " selected" : ""}>Non valid\xE9</option></select></div></div><div class="filter-actions" data-v-f3d26f88><button class="btn btn-primary" data-v-f3d26f88><span data-v-f3d26f88>Appliquer</span></button><button class="btn btn-secondary" data-v-f3d26f88><span data-v-f3d26f88>R\xE9initialiser</span></button></div></div><div class="stats-section" data-v-f3d26f88><div class="stats-grid" data-v-f3d26f88><div class="stat-card" data-v-f3d26f88><h4 data-v-f3d26f88>${ssrInterpolate(stats.value.total_etudiants)}</h4><p data-v-f3d26f88>Total \xC9tudiants</p></div><div class="stat-card success" data-v-f3d26f88><h4 data-v-f3d26f88>${ssrInterpolate(stats.value.diplomes)}</h4><p data-v-f3d26f88>Dipl\xF4m\xE9s</p></div><div class="stat-card warning" data-v-f3d26f88><h4 data-v-f3d26f88>${ssrInterpolate(stats.value.admissibles)}</h4><p data-v-f3d26f88>Admissibles</p></div><div class="stat-card danger" data-v-f3d26f88><h4 data-v-f3d26f88>${ssrInterpolate(stats.value.redoublants)}</h4><p data-v-f3d26f88>Redoublants</p></div></div></div><div class="actions-section" data-v-f3d26f88><h3 data-v-f3d26f88>Actions de G\xE9n\xE9ration</h3><div class="action-grid" data-v-f3d26f88><div class="action-card" data-v-f3d26f88><h4 data-v-f3d26f88>G\xE9n\xE9ration Individuelle</h4><p data-v-f3d26f88>G\xE9n\xE9rez des bulletins pour des \xE9tudiants sp\xE9cifiques</p><div class="action-controls" data-v-f3d26f88><select class="form-control" data-v-f3d26f88><option value="" data-v-f3d26f88${ssrIncludeBooleanAttr(Array.isArray(selectedEtudiant.value) ? ssrLooseContain(selectedEtudiant.value, "") : ssrLooseEqual(selectedEtudiant.value, "")) ? " selected" : ""}>Choisir un \xE9tudiant...</option><!--[-->`);
      ssrRenderList(filteredEtudiants.value, (etudiant) => {
        _push(`<option${ssrRenderAttr("value", etudiant.id)} data-v-f3d26f88${ssrIncludeBooleanAttr(Array.isArray(selectedEtudiant.value) ? ssrLooseContain(selectedEtudiant.value, etudiant.id) : ssrLooseEqual(selectedEtudiant.value, etudiant.id)) ? " selected" : ""}>${ssrInterpolate(etudiant.nom)} ${ssrInterpolate(etudiant.prenom)} (${ssrInterpolate(etudiant.matricule)}) </option>`);
      });
      _push(`<!--]--></select><div class="button-group" data-v-f3d26f88><button${ssrIncludeBooleanAttr(!selectedEtudiant.value) ? " disabled" : ""} class="btn btn-primary" data-v-f3d26f88><span data-v-f3d26f88>PDF</span> Bulletin S5 </button><button${ssrIncludeBooleanAttr(!selectedEtudiant.value) ? " disabled" : ""} class="btn btn-primary" data-v-f3d26f88><span data-v-f3d26f88>PDF</span> Bulletin S6 </button><button${ssrIncludeBooleanAttr(!selectedEtudiant.value) ? " disabled" : ""} class="btn btn-success" data-v-f3d26f88><span data-v-f3d26f88>PDF</span> Bulletin Annuel </button></div></div></div><div class="action-card" data-v-f3d26f88><h4 data-v-f3d26f88>G\xE9n\xE9ration par Lot</h4><p data-v-f3d26f88>G\xE9n\xE9rez tous les bulletins pour la promotion</p><div class="action-controls" data-v-f3d26f88><div class="checkbox-group" data-v-f3d26f88><label data-v-f3d26f88><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(batchOptions.value.S5) ? ssrLooseContain(batchOptions.value.S5, null) : batchOptions.value.S5) ? " checked" : ""} data-v-f3d26f88> Bulletins S5 </label><label data-v-f3d26f88><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(batchOptions.value.S6) ? ssrLooseContain(batchOptions.value.S6, null) : batchOptions.value.S6) ? " checked" : ""} data-v-f3d26f88> Bulletins S6 </label><label data-v-f3d26f88><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(batchOptions.value.annuel) ? ssrLooseContain(batchOptions.value.annuel, null) : batchOptions.value.annuel) ? " checked" : ""} data-v-f3d26f88> Bulletins Annuels </label></div><button${ssrIncludeBooleanAttr(!hasBatchOption.value) ? " disabled" : ""} class="btn btn-success" data-v-f3d26f88><span data-v-f3d26f88>PDF</span> G\xE9n\xE9rer le Lot </button></div></div><div class="action-card" data-v-f3d26f88><h4 data-v-f3d26f88>Export Excel</h4><p data-v-f3d26f88>Exportez les donn\xE9es en format Excel</p><div class="action-controls" data-v-f3d26f88><div class="button-group" data-v-f3d26f88><button class="btn btn-secondary" data-v-f3d26f88><span data-v-f3d26f88>Excel</span> Relev\xE9 S5 </button><button class="btn btn-secondary" data-v-f3d26f88><span data-v-f3d26f88>Excel</span> Relev\xE9 S6 </button><button class="btn btn-info" data-v-f3d26f88><span data-v-f3d26f88>Excel</span> D\xE9cisions Jury </button></div></div></div></div></div><div class="table-section" data-v-f3d26f88><h3 data-v-f3d26f88>Liste des \xC9tudiants</h3><div class="table-container" data-v-f3d26f88><table class="students-table" data-v-f3d26f88><thead data-v-f3d26f88><tr data-v-f3d26f88><th data-v-f3d26f88>Matricule</th><th data-v-f3d26f88>Nom</th><th data-v-f3d26f88>Pr\xE9nom</th><th data-v-f3d26f88>Moyenne S5</th><th data-v-f3d26f88>Cr\xE9dits S5</th><th data-v-f3d26f88>Moyenne S6</th><th data-v-f3d26f88>Cr\xE9dits S6</th><th data-v-f3d26f88>Moyenne Annuelle</th><th data-v-f3d26f88>D\xE9cision</th><th data-v-f3d26f88>Actions</th></tr></thead><tbody data-v-f3d26f88><!--[-->`);
      ssrRenderList(filteredEtudiants.value, (etudiant) => {
        _push(`<tr data-v-f3d26f88><td data-v-f3d26f88>${ssrInterpolate(etudiant.matricule)}</td><td data-v-f3d26f88>${ssrInterpolate(etudiant.nom)}</td><td data-v-f3d26f88>${ssrInterpolate(etudiant.prenom)}</td><td data-v-f3d26f88>${ssrInterpolate(etudiant.moyenne_S5 || "-")}</td><td data-v-f3d26f88>${ssrInterpolate(etudiant.credits_S5 || "-")}</td><td data-v-f3d26f88>${ssrInterpolate(etudiant.moyenne_S6 || "-")}</td><td data-v-f3d26f88>${ssrInterpolate(etudiant.credits_S6 || "-")}</td><td data-v-f3d26f88>${ssrInterpolate(etudiant.moyenne_annuelle || "-")}</td><td data-v-f3d26f88><span class="${ssrRenderClass(getDecisionClass(etudiant.decision_jury))}" data-v-f3d26f88>${ssrInterpolate(etudiant.decision_jury || "-")}</span></td><td data-v-f3d26f88><div class="action-buttons" data-v-f3d26f88><button class="btn btn-sm btn-primary" title="Bulletin S5" data-v-f3d26f88><span data-v-f3d26f88>PDF</span></button><button class="btn btn-sm btn-primary" title="Bulletin S6" data-v-f3d26f88><span data-v-f3d26f88>PDF</span></button><button class="btn btn-sm btn-success" title="Bulletin Annuel" data-v-f3d26f88><span data-v-f3d26f88>PDF</span></button></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div>`);
      if (showProgressModal.value) {
        _push(`<div class="modal-overlay" data-v-f3d26f88><div class="modal-content" data-v-f3d26f88><div class="modal-header" data-v-f3d26f88><h3 data-v-f3d26f88>G\xE9n\xE9ration en Cours...</h3></div><div class="modal-body" data-v-f3d26f88><div class="progress-info" data-v-f3d26f88><p data-v-f3d26f88>${ssrInterpolate(progressMessage.value)}</p><div class="progress-bar" data-v-f3d26f88><div class="progress-fill" style="${ssrRenderStyle({ width: _ctx.progressPercentage + "%" })}" data-v-f3d26f88></div></div><p data-v-f3d26f88>${ssrInterpolate(progressCurrent.value)} / ${ssrInterpolate(progressTotal.value)}</p></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/secretariat/bulletins.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const bulletins = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f3d26f88"]]);

export { bulletins as default };
//# sourceMappingURL=bulletins-pzfT4SXi.mjs.map
