import { ref, computed, resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "etudiants",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Gestion des \xC9tudiants | Bull ASUR" });
    const students = ref([]);
    const searchTerm = ref("");
    const filterBac = ref("");
    const showModal = ref(false);
    const modalMode = ref("add");
    const loading = ref(false);
    const currentStudent = ref(null);
    const formData = ref({
      nom: "",
      prenom: "",
      email: "",
      matricule: "",
      date_naissance: "",
      lieu_naissance: "",
      bac: "",
      provenance: ""
    });
    const studentColumns = [
      { key: "nom", label: "Nom" },
      { key: "prenom", label: "Pr\xE9nom" },
      { key: "email", label: "Email" },
      { key: "matricule", label: "Matricule" },
      { key: "date_naissance", label: "Date de naissance" },
      { key: "lieu_naissance", label: "Lieu de naissance" },
      { key: "bac", label: "Bac" },
      { key: "provenance", label: "Provenance" }
    ];
    const filteredStudents = computed(() => {
      return students.value.filter((student) => {
        const matchesSearch = `${student.nom} ${student.prenom} ${student.email} ${student.matricule}`.toLowerCase().includes(searchTerm.value.toLowerCase());
        const matchesBac = !filterBac.value || student.bac === filterBac.value;
        return matchesSearch && matchesBac;
      });
    });
    const openModal = (mode, student = null) => {
      modalMode.value = mode;
      currentStudent.value = student;
      if (student) {
        formData.value = { ...student };
      } else {
        resetForm();
      }
      showModal.value = true;
    };
    const resetForm = () => {
      formData.value = {
        nom: "",
        prenom: "",
        email: "",
        matricule: "",
        date_naissance: "",
        lieu_naissance: "",
        bac: "",
        provenance: ""
      };
    };
    const deleteStudent = async (studentId) => {
      if (!confirm("\xCAtes-vous s\xFBr de vouloir supprimer cet \xE9tudiant ?")) {
        return;
      }
      try {
        await $fetch(`${$config.public.apiBase}/etudiants/${studentId}`, {
          method: "DELETE"
        });
        students.value = students.value.filter((s) => s.id !== studentId);
        console.log("\xC9tudiant supprim\xE9 avec succ\xE8s");
      } catch (error) {
        console.error("Erreur API, utilisation du LocalStorage");
        const { useMockDb } = await import('./useMockDb-he2d-K3-.mjs');
        const db = useMockDb();
        db.deleteDoc("etudiants", studentId);
        students.value = students.value.filter((s) => s.id !== studentId);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DataTable = resolveComponent("DataTable");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-etudiants" }, _attrs))} data-v-398cb59e><header class="page-header" data-v-398cb59e><div class="header-content" data-v-398cb59e><h2 data-v-398cb59e>Gestion des \xC9tudiants</h2><p data-v-398cb59e>Inscriptions, informations administratives et suivi acad\xE9mique.</p></div><div class="header-actions" data-v-398cb59e><button class="btn btn-primary" data-v-398cb59e><span class="icon" data-v-398cb59e>\u2795</span> Ajouter un \xC9tudiant </button></div></header><div class="filters-section" data-v-398cb59e><div class="search-box" data-v-398cb59e><input type="text"${ssrRenderAttr("value", searchTerm.value)} placeholder="Rechercher par nom, pr\xE9nom..." class="form-control" data-v-398cb59e></div><div class="filter-options" data-v-398cb59e><select class="form-control" data-v-398cb59e><option value="" data-v-398cb59e${ssrIncludeBooleanAttr(Array.isArray(filterBac.value) ? ssrLooseContain(filterBac.value, "") : ssrLooseEqual(filterBac.value, "")) ? " selected" : ""}>Tous les bacs</option><option value="S" data-v-398cb59e${ssrIncludeBooleanAttr(Array.isArray(filterBac.value) ? ssrLooseContain(filterBac.value, "S") : ssrLooseEqual(filterBac.value, "S")) ? " selected" : ""}>Scientifique</option><option value="ES" data-v-398cb59e${ssrIncludeBooleanAttr(Array.isArray(filterBac.value) ? ssrLooseContain(filterBac.value, "ES") : ssrLooseEqual(filterBac.value, "ES")) ? " selected" : ""}>\xC9conomique et Social</option><option value="L" data-v-398cb59e${ssrIncludeBooleanAttr(Array.isArray(filterBac.value) ? ssrLooseContain(filterBac.value, "L") : ssrLooseEqual(filterBac.value, "L")) ? " selected" : ""}>Litt\xE9raire</option><option value="STMG" data-v-398cb59e${ssrIncludeBooleanAttr(Array.isArray(filterBac.value) ? ssrLooseContain(filterBac.value, "STMG") : ssrLooseEqual(filterBac.value, "STMG")) ? " selected" : ""}>STMG</option><option value="STI2D" data-v-398cb59e${ssrIncludeBooleanAttr(Array.isArray(filterBac.value) ? ssrLooseContain(filterBac.value, "STI2D") : ssrLooseEqual(filterBac.value, "STI2D")) ? " selected" : ""}>STI2D</option><option value="Autre" data-v-398cb59e${ssrIncludeBooleanAttr(Array.isArray(filterBac.value) ? ssrLooseContain(filterBac.value, "Autre") : ssrLooseEqual(filterBac.value, "Autre")) ? " selected" : ""}>Autre</option></select></div></div><div class="table-container" data-v-398cb59e>`);
      _push(ssrRenderComponent(_component_DataTable, {
        columns: studentColumns,
        data: filteredStudents.value,
        title: "Liste des \xE9tudiants",
        actions: true
      }, {
        actions: withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="btn btn-sm btn-secondary" data-v-398cb59e${_scopeId}> \u270F\uFE0F </button><button class="btn btn-sm btn-danger" data-v-398cb59e${_scopeId}> \u{1F5D1}\uFE0F </button>`);
          } else {
            return [
              createVNode("button", {
                class: "btn btn-sm btn-secondary",
                onClick: ($event) => openModal("edit", row)
              }, " \u270F\uFE0F ", 8, ["onClick"]),
              createVNode("button", {
                class: "btn btn-sm btn-danger",
                onClick: ($event) => deleteStudent(row.id)
              }, " \u{1F5D1}\uFE0F ", 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (showModal.value) {
        _push(`<div class="modal-overlay" data-v-398cb59e><div class="modal-content" data-v-398cb59e><div class="modal-header" data-v-398cb59e><h3 data-v-398cb59e>${ssrInterpolate(modalMode.value === "add" ? "Ajouter" : "Modifier")} un \xE9tudiant</h3><button class="modal-close" data-v-398cb59e>\xD7</button></div><form class="modal-form" data-v-398cb59e><div class="form-row" data-v-398cb59e><div class="form-group" data-v-398cb59e><label for="nom" data-v-398cb59e>Nom *</label><input type="text" id="nom"${ssrRenderAttr("value", formData.value.nom)} required class="form-control" data-v-398cb59e></div><div class="form-group" data-v-398cb59e><label for="prenom" data-v-398cb59e>Pr\xE9nom *</label><input type="text" id="prenom"${ssrRenderAttr("value", formData.value.prenom)} required class="form-control" data-v-398cb59e></div></div><div class="form-row" data-v-398cb59e><div class="form-group" data-v-398cb59e><label for="email" data-v-398cb59e>Email *</label><input type="email" id="email"${ssrRenderAttr("value", formData.value.email)} required class="form-control" placeholder="email@example.com" data-v-398cb59e></div><div class="form-group" data-v-398cb59e><label for="matricule" data-v-398cb59e>Matricule *</label><input type="text" id="matricule"${ssrRenderAttr("value", formData.value.matricule)} required class="form-control" placeholder="Ex: LPASUR001" data-v-398cb59e></div></div><div class="alert-info-credentials" data-v-398cb59e><p data-v-398cb59e><strong data-v-398cb59e>Note :</strong> Les identifiants de connexion par d\xE9faut seront :</p><ul data-v-398cb59e><li data-v-398cb59e><strong data-v-398cb59e>Identifiant :</strong> ${ssrInterpolate(formData.value.prenom || "Pr\xE9nom")}</li><li data-v-398cb59e><strong data-v-398cb59e>Mot de passe :</strong> ${ssrInterpolate(formData.value.matricule || "Matricule")}</li></ul></div><div class="form-row" data-v-398cb59e><div class="form-group" data-v-398cb59e><label for="date_naissance" data-v-398cb59e>Date de naissance *</label><input type="date" id="date_naissance"${ssrRenderAttr("value", formData.value.date_naissance)} required class="form-control" data-v-398cb59e></div><div class="form-group" data-v-398cb59e><label for="lieu_naissance" data-v-398cb59e>Lieu de naissance *</label><input type="text" id="lieu_naissance"${ssrRenderAttr("value", formData.value.lieu_naissance)} required class="form-control" data-v-398cb59e></div></div><div class="form-row" data-v-398cb59e><div class="form-group" data-v-398cb59e><label for="bac" data-v-398cb59e>Type de Bac *</label><select id="bac" required class="form-control" data-v-398cb59e><option value="" data-v-398cb59e${ssrIncludeBooleanAttr(Array.isArray(formData.value.bac) ? ssrLooseContain(formData.value.bac, "") : ssrLooseEqual(formData.value.bac, "")) ? " selected" : ""}>S\xE9lectionner...</option><option value="S" data-v-398cb59e${ssrIncludeBooleanAttr(Array.isArray(formData.value.bac) ? ssrLooseContain(formData.value.bac, "S") : ssrLooseEqual(formData.value.bac, "S")) ? " selected" : ""}>Scientifique</option><option value="ES" data-v-398cb59e${ssrIncludeBooleanAttr(Array.isArray(formData.value.bac) ? ssrLooseContain(formData.value.bac, "ES") : ssrLooseEqual(formData.value.bac, "ES")) ? " selected" : ""}>\xC9conomique et Social</option><option value="L" data-v-398cb59e${ssrIncludeBooleanAttr(Array.isArray(formData.value.bac) ? ssrLooseContain(formData.value.bac, "L") : ssrLooseEqual(formData.value.bac, "L")) ? " selected" : ""}>Litt\xE9raire</option><option value="STMG" data-v-398cb59e${ssrIncludeBooleanAttr(Array.isArray(formData.value.bac) ? ssrLooseContain(formData.value.bac, "STMG") : ssrLooseEqual(formData.value.bac, "STMG")) ? " selected" : ""}>STMG</option><option value="STI2D" data-v-398cb59e${ssrIncludeBooleanAttr(Array.isArray(formData.value.bac) ? ssrLooseContain(formData.value.bac, "STI2D") : ssrLooseEqual(formData.value.bac, "STI2D")) ? " selected" : ""}>STI2D</option><option value="Autre" data-v-398cb59e${ssrIncludeBooleanAttr(Array.isArray(formData.value.bac) ? ssrLooseContain(formData.value.bac, "Autre") : ssrLooseEqual(formData.value.bac, "Autre")) ? " selected" : ""}>Autre</option></select></div><div class="form-group" data-v-398cb59e><label for="provenance" data-v-398cb59e>Provenance *</label><input type="text" id="provenance"${ssrRenderAttr("value", formData.value.provenance)} placeholder="Lyc\xE9e d&#39;origine" required class="form-control" data-v-398cb59e></div></div><div class="form-actions" data-v-398cb59e><button type="button" class="btn btn-secondary" data-v-398cb59e> Annuler </button><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-398cb59e>${ssrInterpolate(loading.value ? "Enregistrement..." : modalMode.value === "add" ? "Ajouter" : "Modifier")}</button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/secretariat/etudiants.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const etudiants = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-398cb59e"]]);

export { etudiants as default };
//# sourceMappingURL=etudiants-DMNwjdEf.mjs.map
