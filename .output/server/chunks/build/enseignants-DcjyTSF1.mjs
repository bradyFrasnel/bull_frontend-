import { ref, computed, resolveComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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
      { key: "prenom", label: "Pr\xE9nom" },
      { key: "email", label: "Email" },
      { key: "matricule", label: "Matricule" },
      { key: "specialite", label: "Sp\xE9cialit\xE9" },
      { key: "matieres", label: "Mati\xE8res assign\xE9es" }
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
      if (!confirm("\xCAtes-vous s\xFBr de vouloir supprimer cet enseignant ?")) {
        return;
      }
      try {
        await $fetch(`${$config.public.apiBase}/enseignants/${teacherId}`, {
          method: "DELETE"
        });
        teachers.value = teachers.value.filter((t) => t.id !== teacherId);
        console.log("Enseignant supprim\xE9 avec succ\xE8s");
      } catch (error) {
        console.error("Erreur API, utilisation du LocalStorage");
        const { useMockDb } = await import('./useMockDb-he2d-K3-.mjs');
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
      var _a, _b;
      const _component_DataTable = resolveComponent("DataTable");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-enseignants" }, _attrs))} data-v-52c93673><header class="page-header" data-v-52c93673><div class="header-content" data-v-52c93673><h2 data-v-52c93673>Gestion des Enseignants</h2><p data-v-52c93673>Assignez les mati\xE8res et g\xE9rez les intervenants p\xE9dagogiques.</p></div><div class="header-actions" data-v-52c93673><button class="btn btn-primary" data-v-52c93673><span class="icon" data-v-52c93673>\u2795</span> Ajouter un Enseignant </button></div></header><div class="filters-section" data-v-52c93673><div class="search-box-compact" data-v-52c93673><input type="text"${ssrRenderAttr("value", searchTerm.value)} placeholder="Rechercher..." class="form-control-compact" data-v-52c93673></div></div><div class="teachers-list-section" data-v-52c93673><div class="teachers-table" data-v-52c93673><div class="table-header" data-v-52c93673><div class="header-cell" data-v-52c93673>Nom</div><div class="header-cell" data-v-52c93673>Pr\xE9nom</div><div class="header-cell" data-v-52c93673>Email</div><div class="header-cell" data-v-52c93673>Sp\xE9cialit\xE9</div><div class="header-cell" data-v-52c93673>Actions</div></div><!--[-->`);
      ssrRenderList(filteredTeachers.value, (teacher) => {
        var _a2;
        _push(`<div class="teacher-row" data-v-52c93673><div class="table-cell name-cell" data-v-52c93673><div class="cell-avatar" data-v-52c93673><div class="avatar-circle-small" data-v-52c93673>${ssrInterpolate((_a2 = teacher.nom) == null ? void 0 : _a2.charAt(0))}</div></div><span class="cell-text" data-v-52c93673>${ssrInterpolate(teacher.nom)}</span></div><div class="table-cell" data-v-52c93673><span class="cell-text" data-v-52c93673>${ssrInterpolate(teacher.prenom)}</span></div><div class="table-cell email-cell" data-v-52c93673><span class="cell-text" data-v-52c93673>${ssrInterpolate(teacher.email || "Non renseign\xE9")}</span></div><div class="table-cell" data-v-52c93673><span class="cell-text specialty-text" data-v-52c93673>${ssrInterpolate(teacher.specialite || "Non sp\xE9cifi\xE9e")}</span></div><div class="table-cell actions-cell" data-v-52c93673><div class="teacher-actions-inline" data-v-52c93673><button class="action-btn" title="Modifier" data-v-52c93673><span class="icon" data-v-52c93673>edit</span></button><button class="action-btn" title="Assigner mati\xE8res" data-v-52c93673><span class="icon" data-v-52c93673>book</span></button><button class="action-btn danger" title="Supprimer" data-v-52c93673><span class="icon" data-v-52c93673>delete</span></button></div></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (filteredTeachers.value.length === 0) {
        _push(`<div class="empty-state" data-v-52c93673><div class="empty-icon" data-v-52c93673>person_search</div><h4 data-v-52c93673>Aucun enseignant trouv\xE9</h4><p data-v-52c93673>Aucun enseignant ne correspond \xE0 votre recherche.</p></div>`);
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
          var _a2, _b2;
          if (_push2) {
            _push2(`<div class="matieres-tags" data-v-52c93673${_scopeId}><!--[-->`);
            ssrRenderList(row.matieres, (mat) => {
              _push2(`<span class="tag" data-v-52c93673${_scopeId}>${ssrInterpolate(mat)}</span>`);
            });
            _push2(`<!--]-->`);
            if (!((_a2 = row.matieres) == null ? void 0 : _a2.length)) {
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
                !((_b2 = row.matieres) == null ? void 0 : _b2.length) ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "text-muted"
                }, "Aucune")) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        actions: withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="btn btn-sm btn-secondary" data-v-52c93673${_scopeId}> \u270F\uFE0F </button><button class="btn btn-sm btn-info" data-v-52c93673${_scopeId}> \u{1F517} </button><button class="btn btn-sm btn-danger" data-v-52c93673${_scopeId}> \u{1F5D1}\uFE0F </button>`);
          } else {
            return [
              createVNode("button", {
                class: "btn btn-sm btn-secondary",
                onClick: ($event) => openModal("edit", row)
              }, " \u270F\uFE0F ", 8, ["onClick"]),
              createVNode("button", {
                class: "btn btn-sm btn-info",
                onClick: ($event) => openAssignModal(row)
              }, " \u{1F517} ", 8, ["onClick"]),
              createVNode("button", {
                class: "btn btn-sm btn-danger",
                onClick: ($event) => deleteTeacher(row.id)
              }, " \u{1F5D1}\uFE0F ", 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (showModal.value) {
        _push(`<div class="modal-overlay" data-v-52c93673><div class="modal-content" data-v-52c93673><div class="modal-header" data-v-52c93673><h3 data-v-52c93673>${ssrInterpolate(modalMode.value === "add" ? "Ajouter" : "Modifier")} un enseignant</h3><button class="modal-close" data-v-52c93673>\xD7</button></div><form class="modal-form" data-v-52c93673><div class="form-row" data-v-52c93673><div class="form-group" data-v-52c93673><label for="nom" data-v-52c93673>Nom *</label><input type="text" id="nom"${ssrRenderAttr("value", formData.value.nom)} required class="form-control" data-v-52c93673></div><div class="form-group" data-v-52c93673><label for="prenom" data-v-52c93673>Pr\xE9nom *</label><input type="text" id="prenom"${ssrRenderAttr("value", formData.value.prenom)} required class="form-control" data-v-52c93673></div></div><div class="form-row" data-v-52c93673><div class="form-group" data-v-52c93673><label for="email" data-v-52c93673>Email *</label><input type="email" id="email"${ssrRenderAttr("value", formData.value.email)} required class="form-control" placeholder="email@example.com" data-v-52c93673></div><div class="form-group" data-v-52c93673><label for="matricule" data-v-52c93673>Matricule *</label><input type="text" id="matricule"${ssrRenderAttr("value", formData.value.matricule)} required class="form-control" placeholder="ENSE001" data-v-52c93673></div></div><div class="alert-info-credentials" data-v-52c93673><p data-v-52c93673><strong data-v-52c93673>Note :</strong> Les identifiants de connexion par d\xE9faut seront :</p><ul data-v-52c93673><li data-v-52c93673><strong data-v-52c93673>Identifiant :</strong> ${ssrInterpolate(formData.value.prenom || "Pr\xE9nom")}</li><li data-v-52c93673><strong data-v-52c93673>Mot de passe :</strong> ${ssrInterpolate(formData.value.matricule || "Matricule")}</li></ul></div><div class="form-row" data-v-52c93673><div class="form-group" data-v-52c93673><label for="telephone" data-v-52c93673>T\xE9l\xE9phone</label><input type="tel" id="telephone"${ssrRenderAttr("value", formData.value.telephone)} class="form-control" data-v-52c93673></div></div><div class="form-group" data-v-52c93673><label for="specialite" data-v-52c93673>Sp\xE9cialit\xE9</label><select id="specialite" class="form-control" required data-v-52c93673><option value="" data-v-52c93673${ssrIncludeBooleanAttr(Array.isArray(formData.value.specialite) ? ssrLooseContain(formData.value.specialite, "") : ssrLooseEqual(formData.value.specialite, "")) ? " selected" : ""}>S\xE9lectionner une sp\xE9cialit\xE9...</option><!--[-->`);
        ssrRenderList(availableUEs.value, (ue) => {
          _push(`<optgroup${ssrRenderAttr("label", ue.libelle)} data-v-52c93673><!--[-->`);
          ssrRenderList(ue.matieres, (mat) => {
            _push(`<option${ssrRenderAttr("value", mat.libelle)} data-v-52c93673${ssrIncludeBooleanAttr(Array.isArray(formData.value.specialite) ? ssrLooseContain(formData.value.specialite, mat.libelle) : ssrLooseEqual(formData.value.specialite, mat.libelle)) ? " selected" : ""}>${ssrInterpolate(mat.libelle)}</option>`);
          });
          _push(`<!--]--></optgroup>`);
        });
        _push(`<!--]--></select><small class="text-muted" data-v-52c93673>S\xE9lectionnez la mati\xE8re principale d&#39;enseignement</small></div><div class="form-actions" data-v-52c93673><button type="button" class="btn btn-secondary" data-v-52c93673> Annuler </button><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-52c93673>${ssrInterpolate(loading.value ? "Enregistrement..." : modalMode.value === "add" ? "Ajouter" : "Modifier")}</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showAssignModal.value) {
        _push(`<div class="modal-overlay" data-v-52c93673><div class="modal-content" data-v-52c93673><header class="modal-header" data-v-52c93673><h3 data-v-52c93673>Assigner des mati\xE8res \xE0 ${ssrInterpolate((_a = selectedTeacher.value) == null ? void 0 : _a.nom)} ${ssrInterpolate((_b = selectedTeacher.value) == null ? void 0 : _b.prenom)}</h3><button class="close-btn" data-v-52c93673>\xD7</button></header><div class="modal-body" data-v-52c93673><div class="form-group" data-v-52c93673><label data-v-52c93673>Mati\xE8res disponibles</label><div class="matieres-list" data-v-52c93673><!--[-->`);
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

export { enseignants as default };
//# sourceMappingURL=enseignants-DcjyTSF1.mjs.map
