import { ref, computed, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
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
  __name: "modification-notes",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Modification des Notes | Bull ASUR" });
    const loading = ref(false);
    const showHistoryModal = ref(false);
    const selectedHistory = ref([]);
    const semestres = ref([]);
    const ues = ref([]);
    const matieres = ref([]);
    const evaluations = ref([]);
    const originalEvaluations = ref([]);
    const etudiants = ref([]);
    const filters = ref({
      semestre_id: "",
      ue_id: "",
      matiere_id: ""
    });
    const evaluationTypes = [
      { key: "controle_continu", label: "Contrôle Continu" },
      { key: "examen_final", label: "Examen Final" },
      { key: "rattrapage", label: "Rattrapage" }
    ];
    const filteredUEs = computed(() => {
      if (!filters.value.semestre_id) return [];
      return ues.value.filter((ue) => ue.semestre_id === filters.value.semestre_id);
    });
    const filteredMatieres = computed(() => {
      if (!filters.value.ue_id) return [];
      return matieres.value.filter((mat) => mat.ue_id === filters.value.ue_id);
    });
    const hasChanges = computed(() => {
      return JSON.stringify(evaluations.value) !== JSON.stringify(originalEvaluations.value);
    });
    const stats = computed(() => {
      if (!evaluations.value.length) return {
        moyenneGenerale: 0,
        noteMax: 0,
        noteMin: 0,
        tauxReussite: 0
      };
      const moyennes = etudiants.value.map((etudiant) => calculerMoyenne(etudiant.id));
      const validMoyennes = moyennes.filter((m) => m > 0);
      return {
        moyenneGenerale: validMoyennes.reduce((a, b) => a + b, 0) / validMoyennes.length || 0,
        noteMax: Math.max(...validMoyennes, 0),
        noteMin: Math.min(...validMoyennes, 20),
        tauxReussite: validMoyennes.filter((m) => m >= 10).length / validMoyennes.length * 100 || 0
      };
    });
    const getMatiereLibelle = (matiereId) => {
      if (!matiereId) return "";
      const matiere = matieres.value.find((m) => m.id === matiereId);
      return matiere ? matiere.libelle : "";
    };
    const getNoteValue = (etudiantId, type) => {
      const evaluation = evaluations.value.find(
        (e) => e.etudiant_id === etudiantId && e.type === type
      );
      return evaluation ? evaluation.note : "";
    };
    const isNoteModified = (etudiantId, type) => {
      const current = getNoteValue(etudiantId, type);
      const original = originalEvaluations.value.find(
        (e) => e.etudiant_id === etudiantId && e.type === type
      );
      return current !== (original ? original.note : "");
    };
    const calculerMoyenne = (etudiantId) => {
      const etudiantEvaluations = evaluations.value.filter((e) => e.etudiant_id === etudiantId);
      if (etudiantEvaluations.length === 0) return 0;
      const cc = etudiantEvaluations.find((e) => e.type === "CC")?.note || 0;
      const examen = etudiantEvaluations.find((e) => e.type === "EXAMEN")?.note || 0;
      const rattrapage = etudiantEvaluations.find((e) => e.type === "RATTRAPAGE")?.note;
      if (rattrapage && rattrapage > Math.min(cc, examen)) {
        const maxNote = Math.max(cc, examen);
        return maxNote * 0.6 + rattrapage * 0.4;
      }
      return cc * 0.4 + examen * 0.6;
    };
    const getMoyenneClass = (moyenne) => {
      if (moyenne >= 15) return "excellent";
      if (moyenne >= 12) return "bien";
      if (moyenne >= 10) return "passable";
      return "insuffisant";
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString("fr-FR");
    };
    const loadNotes = async () => {
      if (!filters.value.matiere_id) {
        evaluations.value = [];
        originalEvaluations.value = [];
        return;
      }
      try {
        const response = await $fetch(`${$config.public.apiBase}/evaluations/matiere/${filters.value.matiere_id}`);
        evaluations.value = response;
        originalEvaluations.value = JSON.parse(JSON.stringify(response));
      } catch (error) {
        console.error("Erreur lors du chargement des évaluations:", error);
        evaluations.value = [];
        originalEvaluations.value = [];
      }
    };
    watch(() => filters.value.ue_id, () => {
      filters.value.matiere_id = "";
      loadNotes();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-modification-notes" }, _attrs))} data-v-6a92bfa7><header class="page-header" data-v-6a92bfa7><div class="header-content" data-v-6a92bfa7><h2 data-v-6a92bfa7>Modification des Notes</h2><p data-v-6a92bfa7>Consultation et modification des notes des étudiants par semestre et matière.</p></div></header><div class="filters-section" data-v-6a92bfa7><div class="filter-group" data-v-6a92bfa7><label for="semestre_filter" data-v-6a92bfa7>Semestre:</label><select id="semestre_filter" class="form-control" data-v-6a92bfa7><option value="" data-v-6a92bfa7${ssrIncludeBooleanAttr(Array.isArray(filters.value.semestre_id) ? ssrLooseContain(filters.value.semestre_id, "") : ssrLooseEqual(filters.value.semestre_id, "")) ? " selected" : ""}>Sélectionner un semestre...</option><!--[-->`);
      ssrRenderList(semestres.value, (semestre) => {
        _push(`<option${ssrRenderAttr("value", semestre.id)} data-v-6a92bfa7${ssrIncludeBooleanAttr(Array.isArray(filters.value.semestre_id) ? ssrLooseContain(filters.value.semestre_id, semestre.id) : ssrLooseEqual(filters.value.semestre_id, semestre.id)) ? " selected" : ""}>${ssrInterpolate(semestre.libelle)} (${ssrInterpolate(semestre.annee_universitaire)}) </option>`);
      });
      _push(`<!--]--></select></div><div class="filter-group" data-v-6a92bfa7><label for="ue_filter" data-v-6a92bfa7>Unité d&#39;Enseignement:</label><select id="ue_filter" class="form-control" data-v-6a92bfa7><option value="" data-v-6a92bfa7${ssrIncludeBooleanAttr(Array.isArray(filters.value.ue_id) ? ssrLooseContain(filters.value.ue_id, "") : ssrLooseEqual(filters.value.ue_id, "")) ? " selected" : ""}>Toutes les UE</option><!--[-->`);
      ssrRenderList(filteredUEs.value, (ue) => {
        _push(`<option${ssrRenderAttr("value", ue.id)} data-v-6a92bfa7${ssrIncludeBooleanAttr(Array.isArray(filters.value.ue_id) ? ssrLooseContain(filters.value.ue_id, ue.id) : ssrLooseEqual(filters.value.ue_id, ue.id)) ? " selected" : ""}>${ssrInterpolate(ue.code)} - ${ssrInterpolate(ue.libelle)}</option>`);
      });
      _push(`<!--]--></select></div><div class="filter-group" data-v-6a92bfa7><label for="matiere_filter" data-v-6a92bfa7>Matière:</label><select id="matiere_filter" class="form-control" data-v-6a92bfa7><option value="" data-v-6a92bfa7${ssrIncludeBooleanAttr(Array.isArray(filters.value.matiere_id) ? ssrLooseContain(filters.value.matiere_id, "") : ssrLooseEqual(filters.value.matiere_id, "")) ? " selected" : ""}>Toutes les matières</option><!--[-->`);
      ssrRenderList(filteredMatieres.value, (matiere) => {
        _push(`<option${ssrRenderAttr("value", matiere.id)} data-v-6a92bfa7${ssrIncludeBooleanAttr(Array.isArray(filters.value.matiere_id) ? ssrLooseContain(filters.value.matiere_id, matiere.id) : ssrLooseEqual(filters.value.matiere_id, matiere.id)) ? " selected" : ""}>${ssrInterpolate(matiere.libelle)}</option>`);
      });
      _push(`<!--]--></select></div></div>`);
      if (filters.value.semestre_id) {
        _push(`<div class="notes-container" data-v-6a92bfa7><div class="table-header" data-v-6a92bfa7><h3 data-v-6a92bfa7>Notes ${ssrInterpolate(getMatiereLibelle(filters.value.matiere_id) || "du semestre")}</h3><div class="batch-actions" data-v-6a92bfa7><button class="btn btn-secondary" data-v-6a92bfa7> 📊 Exporter </button><button class="btn btn-primary"${ssrIncludeBooleanAttr(!hasChanges.value || loading.value) ? " disabled" : ""} data-v-6a92bfa7> 💾 Enregistrer tout </button></div></div><div class="table-container" data-v-6a92bfa7><table class="notes-table" data-v-6a92bfa7><thead data-v-6a92bfa7><tr data-v-6a92bfa7><th data-v-6a92bfa7>Étudiant</th><!--[-->`);
        ssrRenderList(evaluationTypes, (evaluationType) => {
          _push(`<th data-v-6a92bfa7>${ssrInterpolate(evaluationType.label)}</th>`);
        });
        _push(`<!--]--><th data-v-6a92bfa7>Moyenne</th><th data-v-6a92bfa7>Actions</th></tr></thead><tbody data-v-6a92bfa7><!--[-->`);
        ssrRenderList(etudiants.value, (etudiant) => {
          _push(`<tr data-v-6a92bfa7><td class="etudiant-info" data-v-6a92bfa7><div class="etudiant-name" data-v-6a92bfa7>${ssrInterpolate(etudiant.nom)} ${ssrInterpolate(etudiant.prenom)}</div><div class="etudiant-details" data-v-6a92bfa7>${ssrInterpolate(etudiant.date_naissance)}</div></td><!--[-->`);
          ssrRenderList(evaluationTypes, (type) => {
            _push(`<td class="note-cell" data-v-6a92bfa7><input type="number"${ssrRenderAttr("value", getNoteValue(etudiant.id, type.key))}${ssrRenderAttr("min", 0)}${ssrRenderAttr("max", 20)} step="0.5" class="${ssrRenderClass([{ "modified": isNoteModified(etudiant.id, type.key) }, "note-input"])}" data-v-6a92bfa7></td>`);
          });
          _push(`<!--]--><td class="moyenne-cell" data-v-6a92bfa7><span class="${ssrRenderClass([getMoyenneClass(calculerMoyenne(etudiant.id)), "moyenne"])}" data-v-6a92bfa7>${ssrInterpolate(calculerMoyenne(etudiant.id).toFixed(2))}</span></td><td class="actions-cell" data-v-6a92bfa7><button class="btn btn-sm btn-secondary" data-v-6a92bfa7> 🔄 Réinitialiser </button><button class="btn btn-sm btn-danger" data-v-6a92bfa7> 🗑️ Supprimer </button></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div><div class="stats-section" data-v-6a92bfa7><h4 data-v-6a92bfa7>Statistiques de la matière</h4><div class="stats-grid" data-v-6a92bfa7><div class="stat-card" data-v-6a92bfa7><div class="stat-label" data-v-6a92bfa7>Moyenne générale</div><div class="stat-value" data-v-6a92bfa7>${ssrInterpolate(stats.value.moyenneGenerale.toFixed(2))}</div></div><div class="stat-card" data-v-6a92bfa7><div class="stat-label" data-v-6a92bfa7>Note la plus haute</div><div class="stat-value" data-v-6a92bfa7>${ssrInterpolate(stats.value.noteMax.toFixed(2))}</div></div><div class="stat-card" data-v-6a92bfa7><div class="stat-label" data-v-6a92bfa7>Note la plus basse</div><div class="stat-value" data-v-6a92bfa7>${ssrInterpolate(stats.value.noteMin.toFixed(2))}</div></div><div class="stat-card" data-v-6a92bfa7><div class="stat-label" data-v-6a92bfa7>Taux de réussite</div><div class="stat-value" data-v-6a92bfa7>${ssrInterpolate(stats.value.tauxReussite.toFixed(1))}%</div></div></div></div></div>`);
      } else {
        _push(`<div class="empty-state" data-v-6a92bfa7><div class="empty-icon" data-v-6a92bfa7>📚</div><h3 data-v-6a92bfa7>Sélectionnez un semestre pour commencer</h3><p data-v-6a92bfa7>Choisissez un semestre, une UE et une matière pour visualiser et modifier les notes.</p></div>`);
      }
      if (showHistoryModal.value) {
        _push(`<div class="modal-overlay" data-v-6a92bfa7><div class="modal-content" data-v-6a92bfa7><div class="modal-header" data-v-6a92bfa7><h3 data-v-6a92bfa7>Historique des modifications</h3><button class="modal-close" data-v-6a92bfa7>×</button></div><div class="modal-body" data-v-6a92bfa7><div class="history-list" data-v-6a92bfa7><!--[-->`);
        ssrRenderList(selectedHistory.value, (modification) => {
          _push(`<div class="history-item" data-v-6a92bfa7><div class="history-info" data-v-6a92bfa7><strong data-v-6a92bfa7>${ssrInterpolate(modification.etudiant)}</strong><span class="history-date" data-v-6a92bfa7>${ssrInterpolate(formatDate(modification.date))}</span></div><div class="history-changes" data-v-6a92bfa7><span class="old-value" data-v-6a92bfa7>${ssrInterpolate(modification.ancienne_valeur)}</span><span class="arrow" data-v-6a92bfa7>→</span><span class="new-value" data-v-6a92bfa7>${ssrInterpolate(modification.nouvelle_valeur)}</span><span class="history-type" data-v-6a92bfa7>(${ssrInterpolate(modification.type_evaluation)})</span></div><div class="history-author" data-v-6a92bfa7> Par: ${ssrInterpolate(modification.auteur)}</div></div>`);
        });
        _push(`<!--]--></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/secretariat/modification-notes.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const modificationNotes = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6a92bfa7"]]);
export {
  modificationNotes as default
};
//# sourceMappingURL=modification-notes-ChjsZVLj.js.map
