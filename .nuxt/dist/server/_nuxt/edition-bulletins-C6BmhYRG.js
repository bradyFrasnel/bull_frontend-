import { ref, computed, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr } from "vue/server-renderer";
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
  __name: "edition-bulletins",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Édition des Bulletins | Bull ASUR" });
    const activeTab = ref("semestres");
    const showModal = ref(false);
    const modalType = ref("");
    const modalMode = ref("add");
    const loading = ref(false);
    const currentItem = ref(null);
    const semestres = ref([]);
    const ues = ref([]);
    const matieres = ref([]);
    const absences = ref([]);
    const etudiants = ref([]);
    const absenceFilters = ref({
      etudiant_id: "",
      matiere_id: ""
    });
    const formData = ref({});
    const tabs = [
      { id: "semestres", label: "Semestres" },
      { id: "ues", label: "Unités d'Enseignement" },
      { id: "matieres", label: "Matières" },
      { id: "absences", label: "Absences" }
    ];
    const semestreColumns = [
      { key: "libelle", label: "Libellé" },
      { key: "annee_universitaire", label: "Année universitaire" }
    ];
    const ueColumns = [
      { key: "code", label: "Code" },
      { key: "libelle", label: "Libellé" },
      { key: "semestre", label: "Semestre" }
    ];
    const matiereColumns = [
      { key: "libelle", label: "Libellé" },
      { key: "coefficient", label: "Coefficient" },
      { key: "credits", label: "Crédits ECTS" },
      { key: "ue", label: "UE" }
    ];
    const absenceColumns = [
      { key: "etudiant", label: "Étudiant" },
      { key: "matiere", label: "Matière" },
      { key: "heures", label: "Heures d'absence" }
    ];
    const filteredAbsences = computed(() => {
      return absences.value.filter((absence) => {
        const matchesEtudiant = !absenceFilters.value.etudiant_id || absence.etudiant_id === absenceFilters.value.etudiant_id;
        const matchesMatiere = !absenceFilters.value.matiere_id || absence.matiere_id === absenceFilters.value.matiere_id;
        return matchesEtudiant && matchesMatiere;
      });
    });
    const getModalTitle = () => {
      const typeLabels = {
        semestre: "Semestre",
        ue: "Unité d'Enseignement",
        matiere: "Matière",
        absence: "Absence"
      };
      const action = modalMode.value === "add" ? "Ajouter" : "Modifier";
      return `${action} un(e) ${typeLabels[modalType.value]}`;
    };
    const getSemestreLibelle = (semestreId) => {
      const semestre = semestres.value.find((s) => s.id === semestreId);
      return semestre ? `${semestre.libelle} (${semestre.annee_universitaire})` : "N/A";
    };
    const getUELibelle = (ueId) => {
      const ue = ues.value.find((u) => u.id === ueId);
      return ue ? `${ue.code} - ${ue.libelle}` : "N/A";
    };
    const getMatiereLibelle = (matiereId) => {
      const matiere = matieres.value.find((m) => m.id === matiereId);
      return matiere ? matiere.libelle : "N/A";
    };
    const getEtudiantLibelle = (etudiantId) => {
      const etudiant = etudiants.value.find((e) => e.id === etudiantId);
      return etudiant ? `${etudiant.nom} ${etudiant.prenom}` : "N/A";
    };
    const openModal = (type, mode, item = null) => {
      modalType.value = type;
      modalMode.value = mode;
      currentItem.value = item;
      if (item) {
        formData.value = { ...item };
      } else {
        resetForm();
      }
      showModal.value = true;
    };
    const resetForm = () => {
      formData.value = {};
    };
    const deleteItem = async (type, itemId) => {
      const typeLabels = {
        semestre: "ce semestre",
        ue: "cette UE",
        matiere: "cette matière",
        absence: "cette absence"
      };
      if (!confirm(`Êtes-vous sûr de vouloir supprimer ${typeLabels[type]} ?`)) {
        return;
      }
      try {
        const apiEndpoints = {
          semestre: "semestres",
          ue: "ues",
          matiere: "matieres",
          absence: "absences"
        };
        await $fetch(`${$config.public.apiBase}/${apiEndpoints[type]}/${itemId}`, {
          method: "DELETE"
        });
        const dataArray = {
          semestre: semestres,
          ue: ues,
          matiere: matieres,
          absence: absences
        }[type].value;
        const index = dataArray.findIndex((item) => item.id === itemId);
        if (index !== -1) {
          dataArray.splice(index, 1);
        }
        console.log(`${type} supprimé avec succès`);
      } catch (error) {
        console.error(`Erreur lors de la suppression:`, error);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DataTable = resolveComponent("DataTable");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-edition-bulletins" }, _attrs))} data-v-827e4bc2><header class="page-header" data-v-827e4bc2><div class="header-content" data-v-827e4bc2><h2 data-v-827e4bc2>Édition des Bulletins</h2><p data-v-827e4bc2>Gestion de la structure des bulletins : semestres, UE, matières et absences.</p></div></header><div class="tabs-container" data-v-827e4bc2><div class="tabs" data-v-827e4bc2><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<button class="${ssrRenderClass(["tab-button", { active: activeTab.value === tab.id }])}" data-v-827e4bc2>${ssrInterpolate(tab.label)}</button>`);
      });
      _push(`<!--]--></div></div><div class="tab-content" data-v-827e4bc2>`);
      if (activeTab.value === "semestres") {
        _push(`<div class="tab-panel" data-v-827e4bc2><div class="panel-header" data-v-827e4bc2><h3 data-v-827e4bc2>Gestion des Semestres</h3><button class="btn btn-primary" data-v-827e4bc2> ➕ Ajouter un semestre </button></div><div class="table-container" data-v-827e4bc2>`);
        _push(ssrRenderComponent(_component_DataTable, {
          columns: semestreColumns,
          data: semestres.value,
          actions: true
        }, {
          actions: withCtx(({ row }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button class="btn btn-sm btn-secondary" data-v-827e4bc2${_scopeId}> ✏️ </button><button class="btn btn-sm btn-danger" data-v-827e4bc2${_scopeId}> 🗑️ </button>`);
            } else {
              return [
                createVNode("button", {
                  class: "btn btn-sm btn-secondary",
                  onClick: ($event) => openModal("semestre", "edit", row)
                }, " ✏️ ", 8, ["onClick"]),
                createVNode("button", {
                  class: "btn btn-sm btn-danger",
                  onClick: ($event) => deleteItem("semestre", row.id)
                }, " 🗑️ ", 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "ues") {
        _push(`<div class="tab-panel" data-v-827e4bc2><div class="panel-header" data-v-827e4bc2><h3 data-v-827e4bc2>Gestion des Unités d&#39;Enseignement</h3><button class="btn btn-primary" data-v-827e4bc2> ➕ Ajouter une UE </button></div><div class="table-container" data-v-827e4bc2>`);
        _push(ssrRenderComponent(_component_DataTable, {
          columns: ueColumns,
          data: ues.value,
          actions: true
        }, {
          semestre: withCtx(({ row }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(getSemestreLibelle(row.semestre_id))}`);
            } else {
              return [
                createTextVNode(toDisplayString(getSemestreLibelle(row.semestre_id)), 1)
              ];
            }
          }),
          actions: withCtx(({ row }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button class="btn btn-sm btn-secondary" data-v-827e4bc2${_scopeId}> ✏️ </button><button class="btn btn-sm btn-danger" data-v-827e4bc2${_scopeId}> 🗑️ </button>`);
            } else {
              return [
                createVNode("button", {
                  class: "btn btn-sm btn-secondary",
                  onClick: ($event) => openModal("ue", "edit", row)
                }, " ✏️ ", 8, ["onClick"]),
                createVNode("button", {
                  class: "btn btn-sm btn-danger",
                  onClick: ($event) => deleteItem("ue", row.id)
                }, " 🗑️ ", 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "matieres") {
        _push(`<div class="tab-panel" data-v-827e4bc2><div class="panel-header" data-v-827e4bc2><h3 data-v-827e4bc2>Gestion des Matières</h3><button class="btn btn-primary" data-v-827e4bc2> ➕ Ajouter une matière </button></div><div class="table-container" data-v-827e4bc2>`);
        _push(ssrRenderComponent(_component_DataTable, {
          columns: matiereColumns,
          data: matieres.value,
          actions: true
        }, {
          ue: withCtx(({ row }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(getUELibelle(row.ue_id))}`);
            } else {
              return [
                createTextVNode(toDisplayString(getUELibelle(row.ue_id)), 1)
              ];
            }
          }),
          actions: withCtx(({ row }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button class="btn btn-sm btn-secondary" data-v-827e4bc2${_scopeId}> ✏️ </button><button class="btn btn-sm btn-danger" data-v-827e4bc2${_scopeId}> 🗑️ </button>`);
            } else {
              return [
                createVNode("button", {
                  class: "btn btn-sm btn-secondary",
                  onClick: ($event) => openModal("matiere", "edit", row)
                }, " ✏️ ", 8, ["onClick"]),
                createVNode("button", {
                  class: "btn btn-sm btn-danger",
                  onClick: ($event) => deleteItem("matiere", row.id)
                }, " 🗑️ ", 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "absences") {
        _push(`<div class="tab-panel" data-v-827e4bc2><div class="panel-header" data-v-827e4bc2><h3 data-v-827e4bc2>Gestion des Absences</h3><button class="btn btn-primary" data-v-827e4bc2> ➕ Ajouter une absence </button></div><div class="filters-section" data-v-827e4bc2><div class="filter-group" data-v-827e4bc2><label data-v-827e4bc2>Étudiant:</label><select class="form-control" data-v-827e4bc2><option value="" data-v-827e4bc2${ssrIncludeBooleanAttr(Array.isArray(absenceFilters.value.etudiant_id) ? ssrLooseContain(absenceFilters.value.etudiant_id, "") : ssrLooseEqual(absenceFilters.value.etudiant_id, "")) ? " selected" : ""}>Tous les étudiants</option><!--[-->`);
        ssrRenderList(etudiants.value, (etudiant) => {
          _push(`<option${ssrRenderAttr("value", etudiant.id)} data-v-827e4bc2${ssrIncludeBooleanAttr(Array.isArray(absenceFilters.value.etudiant_id) ? ssrLooseContain(absenceFilters.value.etudiant_id, etudiant.id) : ssrLooseEqual(absenceFilters.value.etudiant_id, etudiant.id)) ? " selected" : ""}>${ssrInterpolate(etudiant.nom)} ${ssrInterpolate(etudiant.prenom)}</option>`);
        });
        _push(`<!--]--></select></div><div class="filter-group" data-v-827e4bc2><label data-v-827e4bc2>Matière:</label><select class="form-control" data-v-827e4bc2><option value="" data-v-827e4bc2${ssrIncludeBooleanAttr(Array.isArray(absenceFilters.value.matiere_id) ? ssrLooseContain(absenceFilters.value.matiere_id, "") : ssrLooseEqual(absenceFilters.value.matiere_id, "")) ? " selected" : ""}>Toutes les matières</option><!--[-->`);
        ssrRenderList(matieres.value, (matiere) => {
          _push(`<option${ssrRenderAttr("value", matiere.id)} data-v-827e4bc2${ssrIncludeBooleanAttr(Array.isArray(absenceFilters.value.matiere_id) ? ssrLooseContain(absenceFilters.value.matiere_id, matiere.id) : ssrLooseEqual(absenceFilters.value.matiere_id, matiere.id)) ? " selected" : ""}>${ssrInterpolate(matiere.libelle)}</option>`);
        });
        _push(`<!--]--></select></div></div><div class="table-container" data-v-827e4bc2>`);
        _push(ssrRenderComponent(_component_DataTable, {
          columns: absenceColumns,
          data: filteredAbsences.value,
          actions: true
        }, {
          etudiant: withCtx(({ row }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(getEtudiantLibelle(row.etudiant_id))}`);
            } else {
              return [
                createTextVNode(toDisplayString(getEtudiantLibelle(row.etudiant_id)), 1)
              ];
            }
          }),
          matiere: withCtx(({ row }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(getMatiereLibelle(row.matiere_id))}`);
            } else {
              return [
                createTextVNode(toDisplayString(getMatiereLibelle(row.matiere_id)), 1)
              ];
            }
          }),
          actions: withCtx(({ row }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button class="btn btn-sm btn-secondary" data-v-827e4bc2${_scopeId}> ✏️ </button><button class="btn btn-sm btn-danger" data-v-827e4bc2${_scopeId}> 🗑️ </button>`);
            } else {
              return [
                createVNode("button", {
                  class: "btn btn-sm btn-secondary",
                  onClick: ($event) => openModal("absence", "edit", row)
                }, " ✏️ ", 8, ["onClick"]),
                createVNode("button", {
                  class: "btn btn-sm btn-danger",
                  onClick: ($event) => deleteItem("absence", row.id)
                }, " 🗑️ ", 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (showModal.value) {
        _push(`<div class="modal-overlay" data-v-827e4bc2><div class="modal-content" data-v-827e4bc2><div class="modal-header" data-v-827e4bc2><h3 data-v-827e4bc2>${ssrInterpolate(getModalTitle())}</h3><button class="modal-close" data-v-827e4bc2>×</button></div><form class="modal-form" data-v-827e4bc2>`);
        if (modalType.value === "semestre") {
          _push(`<div data-v-827e4bc2><div class="form-group" data-v-827e4bc2><label for="semestre_libelle" data-v-827e4bc2>Libellé *</label><input type="text" id="semestre_libelle"${ssrRenderAttr("value", formData.value.libelle)} required class="form-control" placeholder="Ex: Semestre 5" data-v-827e4bc2></div><div class="form-group" data-v-827e4bc2><label for="semestre_annee" data-v-827e4bc2>Année universitaire *</label><input type="text" id="semestre_annee"${ssrRenderAttr("value", formData.value.annee_universitaire)} required class="form-control" placeholder="Ex: 2025-2026" data-v-827e4bc2></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (modalType.value === "ue") {
          _push(`<div data-v-827e4bc2><div class="form-group" data-v-827e4bc2><label for="ue_code" data-v-827e4bc2>Code *</label><input type="text" id="ue_code"${ssrRenderAttr("value", formData.value.code)} required class="form-control" placeholder="Ex: UE5-1" data-v-827e4bc2></div><div class="form-group" data-v-827e4bc2><label for="ue_libelle" data-v-827e4bc2>Libellé *</label><input type="text" id="ue_libelle"${ssrRenderAttr("value", formData.value.libelle)} required class="form-control" placeholder="Ex: Enseignement Général" data-v-827e4bc2></div><div class="form-group" data-v-827e4bc2><label for="ue_semestre" data-v-827e4bc2>Semestre *</label><select id="ue_semestre" required class="form-control" data-v-827e4bc2><option value="" data-v-827e4bc2${ssrIncludeBooleanAttr(Array.isArray(formData.value.semestre_id) ? ssrLooseContain(formData.value.semestre_id, "") : ssrLooseEqual(formData.value.semestre_id, "")) ? " selected" : ""}>Sélectionner un semestre...</option><!--[-->`);
          ssrRenderList(semestres.value, (semestre) => {
            _push(`<option${ssrRenderAttr("value", semestre.id)} data-v-827e4bc2${ssrIncludeBooleanAttr(Array.isArray(formData.value.semestre_id) ? ssrLooseContain(formData.value.semestre_id, semestre.id) : ssrLooseEqual(formData.value.semestre_id, semestre.id)) ? " selected" : ""}>${ssrInterpolate(semestre.libelle)} (${ssrInterpolate(semestre.annee_universitaire)}) </option>`);
          });
          _push(`<!--]--></select></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (modalType.value === "matiere") {
          _push(`<div data-v-827e4bc2><div class="form-row" data-v-827e4bc2><div class="form-group" data-v-827e4bc2><label for="matiere_libelle" data-v-827e4bc2>Libellé *</label><input type="text" id="matiere_libelle"${ssrRenderAttr("value", formData.value.libelle)} required class="form-control" placeholder="Ex: Anglais technique" data-v-827e4bc2></div><div class="form-group" data-v-827e4bc2><label for="matiere_coefficient" data-v-827e4bc2>Coefficient *</label><input type="number" id="matiere_coefficient"${ssrRenderAttr("value", formData.value.coefficient)} required min="1" step="0.5" class="form-control" data-v-827e4bc2></div></div><div class="form-row" data-v-827e4bc2><div class="form-group" data-v-827e4bc2><label for="matiere_credits" data-v-827e4bc2>Crédits ECTS *</label><input type="number" id="matiere_credits"${ssrRenderAttr("value", formData.value.credits)} required min="1" class="form-control" data-v-827e4bc2></div><div class="form-group" data-v-827e4bc2><label for="matiere_ue" data-v-827e4bc2>UE *</label><select id="matiere_ue" required class="form-control" data-v-827e4bc2><option value="" data-v-827e4bc2${ssrIncludeBooleanAttr(Array.isArray(formData.value.ue_id) ? ssrLooseContain(formData.value.ue_id, "") : ssrLooseEqual(formData.value.ue_id, "")) ? " selected" : ""}>Sélectionner une UE...</option><!--[-->`);
          ssrRenderList(ues.value, (ue) => {
            _push(`<option${ssrRenderAttr("value", ue.id)} data-v-827e4bc2${ssrIncludeBooleanAttr(Array.isArray(formData.value.ue_id) ? ssrLooseContain(formData.value.ue_id, ue.id) : ssrLooseEqual(formData.value.ue_id, ue.id)) ? " selected" : ""}>${ssrInterpolate(ue.code)} - ${ssrInterpolate(ue.libelle)}</option>`);
          });
          _push(`<!--]--></select></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (modalType.value === "absence") {
          _push(`<div data-v-827e4bc2><div class="form-row" data-v-827e4bc2><div class="form-group" data-v-827e4bc2><label for="absence_etudiant" data-v-827e4bc2>Étudiant *</label><select id="absence_etudiant" required class="form-control" data-v-827e4bc2><option value="" data-v-827e4bc2${ssrIncludeBooleanAttr(Array.isArray(formData.value.etudiant_id) ? ssrLooseContain(formData.value.etudiant_id, "") : ssrLooseEqual(formData.value.etudiant_id, "")) ? " selected" : ""}>Sélectionner un étudiant...</option><!--[-->`);
          ssrRenderList(etudiants.value, (etudiant) => {
            _push(`<option${ssrRenderAttr("value", etudiant.id)} data-v-827e4bc2${ssrIncludeBooleanAttr(Array.isArray(formData.value.etudiant_id) ? ssrLooseContain(formData.value.etudiant_id, etudiant.id) : ssrLooseEqual(formData.value.etudiant_id, etudiant.id)) ? " selected" : ""}>${ssrInterpolate(etudiant.nom)} ${ssrInterpolate(etudiant.prenom)}</option>`);
          });
          _push(`<!--]--></select></div><div class="form-group" data-v-827e4bc2><label for="absence_matiere" data-v-827e4bc2>Matière *</label><select id="absence_matiere" required class="form-control" data-v-827e4bc2><option value="" data-v-827e4bc2${ssrIncludeBooleanAttr(Array.isArray(formData.value.matiere_id) ? ssrLooseContain(formData.value.matiere_id, "") : ssrLooseEqual(formData.value.matiere_id, "")) ? " selected" : ""}>Sélectionner une matière...</option><!--[-->`);
          ssrRenderList(matieres.value, (matiere) => {
            _push(`<option${ssrRenderAttr("value", matiere.id)} data-v-827e4bc2${ssrIncludeBooleanAttr(Array.isArray(formData.value.matiere_id) ? ssrLooseContain(formData.value.matiere_id, matiere.id) : ssrLooseEqual(formData.value.matiere_id, matiere.id)) ? " selected" : ""}>${ssrInterpolate(matiere.libelle)}</option>`);
          });
          _push(`<!--]--></select></div></div><div class="form-group" data-v-827e4bc2><label for="absence_heures" data-v-827e4bc2>Nombre d&#39;heures *</label><input type="number" id="absence_heures"${ssrRenderAttr("value", formData.value.heures)} required min="0.5" step="0.5" class="form-control" placeholder="Ex: 2.5" data-v-827e4bc2></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="form-actions" data-v-827e4bc2><button type="button" class="btn btn-secondary" data-v-827e4bc2> Annuler </button><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-827e4bc2>${ssrInterpolate(loading.value ? "Enregistrement..." : modalMode.value === "add" ? "Ajouter" : "Modifier")}</button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/secretariat/edition-bulletins.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const editionBulletins = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-827e4bc2"]]);
export {
  editionBulletins as default
};
//# sourceMappingURL=edition-bulletins-C6BmhYRG.js.map
