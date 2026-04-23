import { ref, computed, resolveComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
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
  __name: "enseignants",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Gestion des Enseignants | Bull ASUR" });
    const teachers = ref([]);
    const searchTerm = ref("");
    const showModal = ref(false);
    const modalMode = ref("add");
    const loading = ref(false);
    const currentTeacher = ref(null);
    const showAssignModal = ref(false);
    const selectedTeacher = ref(null);
    const selectedMatieres = ref([]);
    const availableUEs = ref([]);
    ref([]);
    const formData = ref({
      nom: "",
      prenom: "",
      email: "",
      matricule: "",
      telephone: "",
      specialite: "",
      matieres: []
    });
    const teacherColumns = [
      { key: "nom", label: "Nom" },
      { key: "prenom", label: "Prénom" },
      { key: "email", label: "Email" },
      { key: "matricule", label: "Matricule" },
      { key: "specialite", label: "Spécialité" },
      { key: "matieres", label: "Matières assignées" }
    ];
    const filteredTeachers = computed(() => {
      return teachers.value.filter((teacher) => {
        const searchLower = searchTerm.value.toLowerCase();
        return `${teacher.nom} ${teacher.prenom} ${teacher.email || ""} ${teacher.matricule || ""} ${teacher.specialite || ""}`.toLowerCase().includes(searchLower);
      });
    });
    const openModal = (mode, teacher = null) => {
      modalMode.value = mode;
      currentTeacher.value = teacher;
      if (teacher) {
        formData.value = { ...teacher };
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
        telephone: "",
        specialite: "",
        matieres: []
      };
    };
    const deleteTeacher = async (teacherId) => {
      if (!confirm("Êtes-vous sûr de vouloir supprimer cet enseignant ?")) {
        return;
      }
      try {
        await $fetch(`${$config.public.apiBase}/enseignants/${teacherId}`, {
          method: "DELETE"
        });
        teachers.value = teachers.value.filter((t) => t.id !== teacherId);
        console.log("Enseignant supprimé avec succès");
      } catch (error) {
        console.error("Erreur API, utilisation du LocalStorage");
        const { useMockDb } = await import("./useMockDb-he2d-K3-.js");
        const db = useMockDb();
        db.deleteDoc("enseignants", teacherId);
        teachers.value = teachers.value.filter((t) => t.id !== teacherId);
      }
    };
    const openAssignModal = (teacher) => {
      selectedTeacher.value = teacher;
      selectedMatieres.value = teacher.matieres || [];
      showAssignModal.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DataTable = resolveComponent("DataTable");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-enseignants" }, _attrs))} data-v-52c93673><header class="page-header" data-v-52c93673><div class="header-content" data-v-52c93673><h2 data-v-52c93673>Gestion des Enseignants</h2><p data-v-52c93673>Assignez les matières et gérez les intervenants pédagogiques.</p></div><div class="header-actions" data-v-52c93673><button class="btn btn-primary" data-v-52c93673><span class="icon" data-v-52c93673>➕</span> Ajouter un Enseignant </button></div></header><div class="filters-section" data-v-52c93673><div class="search-box-compact" data-v-52c93673><input type="text"${ssrRenderAttr("value", searchTerm.value)} placeholder="Rechercher..." class="form-control-compact" data-v-52c93673></div></div><div class="teachers-list-section" data-v-52c93673><div class="teachers-table" data-v-52c93673><div class="table-header" data-v-52c93673><div class="header-cell" data-v-52c93673>Nom</div><div class="header-cell" data-v-52c93673>Prénom</div><div class="header-cell" data-v-52c93673>Email</div><div class="header-cell" data-v-52c93673>Spécialité</div><div class="header-cell" data-v-52c93673>Actions</div></div><!--[-->`);
      ssrRenderList(filteredTeachers.value, (teacher) => {
        _push(`<div class="teacher-row" data-v-52c93673><div class="table-cell name-cell" data-v-52c93673><div class="cell-avatar" data-v-52c93673><div class="avatar-circle-small" data-v-52c93673>${ssrInterpolate(teacher.nom?.charAt(0))}</div></div><span class="cell-text" data-v-52c93673>${ssrInterpolate(teacher.nom)}</span></div><div class="table-cell" data-v-52c93673><span class="cell-text" data-v-52c93673>${ssrInterpolate(teacher.prenom)}</span></div><div class="table-cell email-cell" data-v-52c93673><span class="cell-text" data-v-52c93673>${ssrInterpolate(teacher.email || "Non renseigné")}</span></div><div class="table-cell" data-v-52c93673><span class="cell-text specialty-text" data-v-52c93673>${ssrInterpolate(teacher.specialite || "Non spécifiée")}</span></div><div class="table-cell actions-cell" data-v-52c93673><div class="teacher-actions-inline" data-v-52c93673><button class="action-btn" title="Modifier" data-v-52c93673><span class="icon" data-v-52c93673>edit</span></button><button class="action-btn" title="Assigner matières" data-v-52c93673><span class="icon" data-v-52c93673>book</span></button><button class="action-btn danger" title="Supprimer" data-v-52c93673><span class="icon" data-v-52c93673>delete</span></button></div></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (filteredTeachers.value.length === 0) {
        _push(`<div class="empty-state" data-v-52c93673><div class="empty-icon" data-v-52c93673>person_search</div><h4 data-v-52c93673>Aucun enseignant trouvé</h4><p data-v-52c93673>Aucun enseignant ne correspond à votre recherche.</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="table-container" style="${ssrRenderStyle({ "display": "none" })}" data-v-52c93673>`);
      _push(ssrRenderComponent(_component_DataTable, {
        columns: teacherColumns,
        data: filteredTeachers.value,
        title: "Liste des enseignants",
        actions: true
      }, {
        matieres: withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="matieres-tags" data-v-52c93673${_scopeId}><!--[-->`);
            ssrRenderList(row.matieres, (mat) => {
              _push2(`<span class="tag" data-v-52c93673${_scopeId}>${ssrInterpolate(mat)}</span>`);
            });
            _push2(`<!--]-->`);
            if (!row.matieres?.length) {
              _push2(`<span class="text-muted" data-v-52c93673${_scopeId}>Aucune</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "matieres-tags" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(row.matieres, (mat) => {
                  return openBlock(), createBlock("span", {
                    key: mat,
                    class: "tag"
                  }, toDisplayString(mat), 1);
                }), 128)),
                !row.matieres?.length ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "text-muted"
                }, "Aucune")) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        actions: withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="btn btn-sm btn-secondary" data-v-52c93673${_scopeId}> ✏️ </button><button class="btn btn-sm btn-info" data-v-52c93673${_scopeId}> 🔗 </button><button class="btn btn-sm btn-danger" data-v-52c93673${_scopeId}> 🗑️ </button>`);
          } else {
            return [
              createVNode("button", {
                class: "btn btn-sm btn-secondary",
                onClick: ($event) => openModal("edit", row)
              }, " ✏️ ", 8, ["onClick"]),
              createVNode("button", {
                class: "btn btn-sm btn-info",
                onClick: ($event) => openAssignModal(row)
              }, " 🔗 ", 8, ["onClick"]),
              createVNode("button", {
                class: "btn btn-sm btn-danger",
                onClick: ($event) => deleteTeacher(row.id)
              }, " 🗑️ ", 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (showModal.value) {
        _push(`<div class="modal-overlay" data-v-52c93673><div class="modal-content" data-v-52c93673><div class="modal-header" data-v-52c93673><h3 data-v-52c93673>${ssrInterpolate(modalMode.value === "add" ? "Ajouter" : "Modifier")} un enseignant</h3><button class="modal-close" data-v-52c93673>×</button></div><form class="modal-form" data-v-52c93673><div class="form-row" data-v-52c93673><div class="form-group" data-v-52c93673><label for="nom" data-v-52c93673>Nom *</label><input type="text" id="nom"${ssrRenderAttr("value", formData.value.nom)} required class="form-control" data-v-52c93673></div><div class="form-group" data-v-52c93673><label for="prenom" data-v-52c93673>Prénom *</label><input type="text" id="prenom"${ssrRenderAttr("value", formData.value.prenom)} required class="form-control" data-v-52c93673></div></div><div class="form-row" data-v-52c93673><div class="form-group" data-v-52c93673><label for="email" data-v-52c93673>Email *</label><input type="email" id="email"${ssrRenderAttr("value", formData.value.email)} required class="form-control" placeholder="email@example.com" data-v-52c93673></div><div class="form-group" data-v-52c93673><label for="matricule" data-v-52c93673>Matricule *</label><input type="text" id="matricule"${ssrRenderAttr("value", formData.value.matricule)} required class="form-control" placeholder="ENSE001" data-v-52c93673></div></div><div class="alert-info-credentials" data-v-52c93673><p data-v-52c93673><strong data-v-52c93673>Note :</strong> Les identifiants de connexion par défaut seront :</p><ul data-v-52c93673><li data-v-52c93673><strong data-v-52c93673>Identifiant :</strong> ${ssrInterpolate(formData.value.prenom || "Prénom")}</li><li data-v-52c93673><strong data-v-52c93673>Mot de passe :</strong> ${ssrInterpolate(formData.value.matricule || "Matricule")}</li></ul></div><div class="form-row" data-v-52c93673><div class="form-group" data-v-52c93673><label for="telephone" data-v-52c93673>Téléphone</label><input type="tel" id="telephone"${ssrRenderAttr("value", formData.value.telephone)} class="form-control" data-v-52c93673></div></div><div class="form-group" data-v-52c93673><label for="specialite" data-v-52c93673>Spécialité</label><select id="specialite" class="form-control" required data-v-52c93673><option value="" data-v-52c93673${ssrIncludeBooleanAttr(Array.isArray(formData.value.specialite) ? ssrLooseContain(formData.value.specialite, "") : ssrLooseEqual(formData.value.specialite, "")) ? " selected" : ""}>Sélectionner une spécialité...</option><!--[-->`);
        ssrRenderList(availableUEs.value, (ue) => {
          _push(`<optgroup${ssrRenderAttr("label", ue.libelle)} data-v-52c93673><!--[-->`);
          ssrRenderList(ue.matieres, (mat) => {
            _push(`<option${ssrRenderAttr("value", mat.libelle)} data-v-52c93673${ssrIncludeBooleanAttr(Array.isArray(formData.value.specialite) ? ssrLooseContain(formData.value.specialite, mat.libelle) : ssrLooseEqual(formData.value.specialite, mat.libelle)) ? " selected" : ""}>${ssrInterpolate(mat.libelle)}</option>`);
          });
          _push(`<!--]--></optgroup>`);
        });
        _push(`<!--]--></select><small class="text-muted" data-v-52c93673>Sélectionnez la matière principale d&#39;enseignement</small></div><div class="form-actions" data-v-52c93673><button type="button" class="btn btn-secondary" data-v-52c93673> Annuler </button><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-52c93673>${ssrInterpolate(loading.value ? "Enregistrement..." : modalMode.value === "add" ? "Ajouter" : "Modifier")}</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showAssignModal.value) {
        _push(`<div class="modal-overlay" data-v-52c93673><div class="modal-content" data-v-52c93673><header class="modal-header" data-v-52c93673><h3 data-v-52c93673>Assigner des matières à ${ssrInterpolate(selectedTeacher.value?.nom)} ${ssrInterpolate(selectedTeacher.value?.prenom)}</h3><button class="close-btn" data-v-52c93673>×</button></header><div class="modal-body" data-v-52c93673><div class="form-group" data-v-52c93673><label data-v-52c93673>Matières disponibles</label><div class="matieres-list" data-v-52c93673><!--[-->`);
        ssrRenderList(availableUEs.value, (ue) => {
          _push(`<div class="ue-group" data-v-52c93673><h4 data-v-52c93673>${ssrInterpolate(ue.libelle)}</h4><div class="matieres-checkboxes" data-v-52c93673><!--[-->`);
          ssrRenderList(ue.matieres, (mat) => {
            _push(`<label class="checkbox-label" data-v-52c93673><input type="checkbox"${ssrRenderAttr("value", mat.id)}${ssrIncludeBooleanAttr(Array.isArray(selectedMatieres.value) ? ssrLooseContain(selectedMatieres.value, mat.id) : selectedMatieres.value) ? " checked" : ""} data-v-52c93673><span data-v-52c93673>${ssrInterpolate(mat.libelle)} (${ssrInterpolate(mat.coefficient)} coeff, ${ssrInterpolate(mat.credits)} ECTS)</span></label>`);
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]--></div></div></div><footer class="modal-footer" data-v-52c93673><button class="btn btn-secondary" data-v-52c93673>Annuler</button><button class="btn btn-primary" data-v-52c93673>Confirmer l&#39;assignation</button></footer></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/secretariat/enseignants.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const enseignants = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-52c93673"]]);
export {
  enseignants as default
};
//# sourceMappingURL=enseignants-DcjyTSF1.js.map
