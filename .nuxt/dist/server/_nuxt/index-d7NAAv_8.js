import { ref, resolveComponent, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { u as useApi } from "./useApi-C5ZVQEPH.js";
import { u as useHead } from "./v3-D2Flwojj.js";
import { _ as _export_sfc } from "../server.mjs";
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
import "C:/Users/HP/Desktop/bull_frontend/node_modules/defu/dist/defu.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/ufo/dist/index.mjs";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Étudiants | LP ASUR" });
    const { apiFetch } = useApi();
    const students = ref([]);
    const pending = ref(true);
    const saving = ref(false);
    const columns = [
      { key: "id", label: "ID", width: "100px" },
      { key: "nom", label: "Nom" },
      { key: "prenom", label: "Prénom" },
      { key: "bac", label: "Baccalauréat" },
      { key: "provenance", label: "Étab. Provenance" },
      { key: "status", label: "Statut", width: "120px" }
    ];
    const showModal = ref(false);
    const modalMode = ref("view");
    const form = ref({
      id: "",
      nom: "",
      prenom: "",
      email: "",
      matricule: "",
      date_naissance: "",
      lieu_naissance: "",
      bac: "",
      provenance: "",
      status: "Inscrit"
    });
    const fetchStudents = async () => {
      pending.value = true;
      try {
        const data = await apiFetch("/api/etudiants/");
        if (data) students.value = data;
      } catch (e) {
        console.error("Fetch failed, using mock", e);
        const { useMockDb } = await import("./useMockDb-he2d-K3-.js");
        const db = useMockDb();
        students.value = db.getCollection("etudiants");
      } finally {
        pending.value = false;
      }
    };
    const openModal = (mode, student = null) => {
      modalMode.value = mode;
      if (student) {
        form.value = { ...student };
      } else {
        form.value = { id: "", nom: "", prenom: "", email: "", matricule: "", date_naissance: "", lieu_naissance: "", bac: "", provenance: "", status: "Inscrit" };
      }
      showModal.value = true;
    };
    const confirmDelete = async (student) => {
      if (confirm(`Êtes-vous sûr de vouloir supprimer l'étudiant ${student.nom}?`)) {
        try {
          await apiFetch(`/api/etudiants/${student.id}/`, { method: "DELETE" });
          await fetchStudents();
        } catch (e) {
          console.error("Erreur API, utilisation du LocalStorage");
          const { useMockDb } = await import("./useMockDb-he2d-K3-.js");
          const db = useMockDb();
          db.deleteDoc("etudiants", student.id);
          students.value = students.value.filter((s) => s.id !== student.id);
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DataTable = resolveComponent("DataTable");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-etudiants" }, _attrs))} data-v-728f2635><header class="page-header" data-v-728f2635><div class="header-content" data-v-728f2635><h2 data-v-728f2635>Gestion des Étudiants</h2><p data-v-728f2635>Gérez les élèves inscrits en Licence Professionnelle ASUR.</p></div><div class="header-actions" data-v-728f2635><button class="btn btn-secondary" data-v-728f2635><span class="icon" data-v-728f2635>📥</span> Importer (Excel) </button><button class="btn btn-primary" data-v-728f2635><span class="icon" data-v-728f2635>➕</span> Ajouter un Étudiant </button></div></header><div class="table-container" data-v-728f2635>`);
      if (pending.value) {
        _push(`<div class="loader-container" data-v-728f2635><div class="spinner" data-v-728f2635></div><p data-v-728f2635>Chargement des étudiants...</p></div>`);
      } else {
        _push(ssrRenderComponent(_component_DataTable, {
          title: "Liste de la Promotion",
          columns,
          data: students.value,
          actions: true
        }, {
          status: withCtx(({ row }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="${ssrRenderClass(["badge", row.status === "Inscrit" ? "badge-success" : "badge-warning"])}" data-v-728f2635${_scopeId}>${ssrInterpolate(row.status || "Inscrit")}</span>`);
            } else {
              return [
                createVNode("span", {
                  class: ["badge", row.status === "Inscrit" ? "badge-success" : "badge-warning"]
                }, toDisplayString(row.status || "Inscrit"), 3)
              ];
            }
          }),
          rowActions: withCtx(({ row }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button class="action-btn view-btn" title="Voir le profil" data-v-728f2635${_scopeId}>👁️</button><button class="action-btn edit-btn" title="Modifier" data-v-728f2635${_scopeId}>✏️</button><button class="action-btn delete-btn" title="Supprimer" data-v-728f2635${_scopeId}>🗑️</button>`);
            } else {
              return [
                createVNode("button", {
                  class: "action-btn view-btn",
                  onClick: ($event) => openModal("view", row),
                  title: "Voir le profil"
                }, "👁️", 8, ["onClick"]),
                createVNode("button", {
                  class: "action-btn edit-btn",
                  onClick: ($event) => openModal("edit", row),
                  title: "Modifier"
                }, "✏️", 8, ["onClick"]),
                createVNode("button", {
                  class: "action-btn delete-btn",
                  onClick: ($event) => confirmDelete(row),
                  title: "Supprimer"
                }, "🗑️", 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div>`);
      if (showModal.value) {
        _push(`<div class="modal-overlay" data-v-728f2635><div class="modal-content" data-v-728f2635><header class="modal-header" data-v-728f2635><h3 data-v-728f2635>${ssrInterpolate(modalMode.value === "add" ? "Ajouter un Étudiant" : modalMode.value === "edit" ? "Modifier l'Étudiant" : "Fiche Étudiant")}</h3><button class="close-btn" data-v-728f2635>×</button></header><form class="modal-body" data-v-728f2635><div class="form-grid" data-v-728f2635><div class="form-group" data-v-728f2635><label data-v-728f2635>Nom</label><input${ssrRenderAttr("value", form.value.nom)} required${ssrIncludeBooleanAttr(modalMode.value === "view") ? " disabled" : ""} placeholder="Mouk" data-v-728f2635></div><div class="form-group" data-v-728f2635><label data-v-728f2635>Prénom</label><input${ssrRenderAttr("value", form.value.prenom)} required${ssrIncludeBooleanAttr(modalMode.value === "view") ? " disabled" : ""} placeholder="Brady" data-v-728f2635></div><div class="form-group" data-v-728f2635><label data-v-728f2635>Email</label><input type="email"${ssrRenderAttr("value", form.value.email)} required${ssrIncludeBooleanAttr(modalMode.value === "view") ? " disabled" : ""} placeholder="brady.mouk@example.com" data-v-728f2635></div><div class="form-group" data-v-728f2635><label data-v-728f2635>Matricule</label><input${ssrRenderAttr("value", form.value.matricule)} required${ssrIncludeBooleanAttr(modalMode.value === "view") ? " disabled" : ""} placeholder="23ASUR001" data-v-728f2635></div><div class="form-group" data-v-728f2635><label data-v-728f2635>Date de Naissance</label><input type="date"${ssrRenderAttr("value", form.value.date_naissance)} required${ssrIncludeBooleanAttr(modalMode.value === "view") ? " disabled" : ""} data-v-728f2635></div><div class="form-group" data-v-728f2635><label data-v-728f2635>Lieu de Naissance</label><input${ssrRenderAttr("value", form.value.lieu_naissance)} required${ssrIncludeBooleanAttr(modalMode.value === "view") ? " disabled" : ""} placeholder="Libreville" data-v-728f2635></div><div class="form-group" data-v-728f2635><label data-v-728f2635>Baccalauréat</label><input${ssrRenderAttr("value", form.value.bac)} required${ssrIncludeBooleanAttr(modalMode.value === "view") ? " disabled" : ""} placeholder="L1, L2, C, D ..." data-v-728f2635></div><div class="form-group" data-v-728f2635><label data-v-728f2635>Provenance</label><input${ssrRenderAttr("value", form.value.provenance)} required${ssrIncludeBooleanAttr(modalMode.value === "view") ? " disabled" : ""} placeholder="Lycée Technique" data-v-728f2635></div></div>`);
        if (modalMode.value !== "view") {
          _push(`<footer class="modal-footer" data-v-728f2635><button type="button" class="btn btn-secondary" data-v-728f2635>Annuler</button><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(saving.value) ? " disabled" : ""} data-v-728f2635>${ssrInterpolate(saving.value ? "Enregistrement..." : "Enregistrer")}</button></footer>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/etudiants/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-728f2635"]]);
export {
  index as default
};
//# sourceMappingURL=index-d7NAAv_8.js.map
