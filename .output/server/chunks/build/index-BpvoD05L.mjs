import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { computed, ref, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { u as useApi } from './useApi-C5ZVQEPH.mjs';
import { u as useHead } from './v3-D2Flwojj.mjs';
import { u as useCookie } from './cookie-BQ1yN6Gj.mjs';
import { _ as _export_sfc } from './server.mjs';
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

const _imports_0 = "" + buildAssetsURL("logo_inptic.BdRW7qYQ.png");
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Bulletins | Bull ASUR" });
    const { apiFetch } = useApi();
    const authRole = useCookie("authRole", { default: () => "etudiant" });
    const isEtudiant = computed(() => authRole.value === "etudiant");
    const selectedSemester = ref("S5");
    const etudiantsList = ref([
      { id: "TEST2026001", nom: "MBA NSOME", prenom: "Yannick Lionel" },
      { id: "TEST2026002", nom: "Martin", prenom: "Sophie" },
      { id: "TEST2026003", nom: "Bernard", prenom: "Luc" }
    ]);
    const studentInfo = ref(null);
    const selectedStudent = ref(null);
    const isDataLoading = ref(false);
    const bulletinData = ref(null);
    const editMode = ref(null);
    watch(selectedSemester, (newVal) => {
      if (selectedStudent.value) {
        loadBulletin(selectedStudent.value, newVal);
      }
    });
    const loadBulletin = async (id, semester) => {
      var _a;
      isDataLoading.value = true;
      try {
        const detailedStudent = await apiFetch(`/api/etudiants/${id}/`).catch(() => null);
        const { useMockDb } = await import('./useMockDb-he2d-K3-.mjs');
        const db = useMockDb();
        studentInfo.value = detailedStudent || db.getCollection("etudiants").find((s) => s.id === id) || etudiantsList.value.find((s) => s.id === id);
        if (!((_a = studentInfo.value) == null ? void 0 : _a.date_naissance)) {
          studentInfo.value = { ...studentInfo.value, date_naissance: "05/05/1989", lieu_naissance: "Libreville" };
        }
        if (semester === "Annuel") {
          bulletinData.value = {
            rang_annuel: "5\xE8me",
            mention_annuelle: "Assez Bien",
            decision: "ADMIS",
            ues_annuel: [
              { id: "UE1", libelle: "Communication / Management", coeff_s1: "4,50", note_s1: "12,00", rang_s1: "5", moy_classe_s1: "11,06", coeff_s2: "9,00", note_s2: "11,27", rang_s2: "1", moy_classe_s2: "12,12", coeff_annuel: "13,50", note_annuel: "11,45", rang_annuel: "2", moy_classe_annuel: "11,67", status_annuel: "VALID\xC9" },
              { id: "UE2", libelle: "Sciences de base (R\xE9seaux)", coeff_s1: "6,00", note_s1: "12,40", rang_s1: "1", moy_classe_s1: "9,34", coeff_s2: "3,00", note_s2: "11,14", rang_s2: "1", moy_classe_s2: "10,30", coeff_annuel: "9,00", note_annuel: "12,05", rang_annuel: "1", moy_classe_annuel: "9,66", status_annuel: "VALID\xC9" }
            ]
          };
        } else {
          const response = await apiFetch(`/api/resultats/semestre/${id}/`, { params: { semestre: semester.replace("S", "") } }).catch(() => null);
          if (response) {
            bulletinData.value = response;
          } else {
            const ues = db.getCollection("ues");
            const matieres = db.getCollection("matieres");
            const notes = db.getCollection("notes").filter((n) => n.etudiant_id === id);
            const uesData = ues.map((ue) => {
              const ueMatieres = matieres.filter((m) => m.ue_id === ue.id).map((m) => {
                var _a2, _b, _c;
                const matiereNotes = notes.filter((n) => n.matiere_id === m.id);
                const cc = ((_a2 = matiereNotes.find((n) => n.type === "CC")) == null ? void 0 : _a2.note) || 0;
                const exam = ((_b = matiereNotes.find((n) => n.type === "Examen")) == null ? void 0 : _b.note) || 0;
                const ratrap = ((_c = matiereNotes.find((n) => n.type === "Rattrapage")) == null ? void 0 : _c.note) || null;
                let moyenne = cc * 0.4 + exam * 0.6;
                if (ratrap !== null && ratrap > moyenne) {
                  moyenne = ratrap;
                }
                return {
                  libelle: m.libelle,
                  credits: m.credits,
                  coeff: m.coefficient.toFixed(2),
                  moyenne,
                  moyenne_classe: 12
                };
              });
              const totalCredits = ueMatieres.reduce((acc, m) => acc + m.credits, 0);
              const sumMoyennes = ueMatieres.reduce((acc, m) => acc + m.moyenne * parseFloat(m.coeff), 0);
              const totalCoeffs = ueMatieres.reduce((acc, m) => acc + parseFloat(m.coeff), 0);
              const moyenne_ue = totalCoeffs > 0 ? sumMoyennes / totalCoeffs : 0;
              return {
                id: ue.code,
                libelle: ue.libelle,
                total_credits_ue: totalCredits,
                credits_acquis: moyenne_ue >= 10 ? totalCredits : 0,
                moyenne_ue,
                matieres: ueMatieres
              };
            });
            const sumUeMoyennes = uesData.reduce((acc, ue) => acc + ue.moyenne_ue, 0);
            const moyenne_generale = uesData.length > 0 ? sumUeMoyennes / uesData.length : 0;
            bulletinData.value = {
              moyenne_generale,
              moyenne_classe_generale: 11.5,
              mention: moyenne_generale >= 16 ? "Tr\xE8s Bien" : moyenne_generale >= 14 ? "Bien" : moyenne_generale >= 12 ? "Assez Bien" : moyenne_generale >= 10 ? "Passable" : "Insuffisant",
              rang: "Non class\xE9",
              absences: 0,
              credits_acquis: uesData.reduce((acc, ue) => acc + ue.credits_acquis, 0),
              total_credits: uesData.reduce((acc, ue) => acc + ue.total_credits_ue, 0),
              valide: moyenne_generale >= 10,
              validation_commentaire: moyenne_generale >= 10 ? "Semestre Acquis" : "Semestre Non Acquis",
              decision: moyenne_generale >= 10 ? `${semester} valid\xE9` : `${semester} non valid\xE9`,
              ues: uesData
            };
          }
        }
      } catch (error) {
        console.error("Failed to load bulletin:", error);
      } finally {
        isDataLoading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-bulletins" }, _attrs))} data-v-83c69eca><header class="page-header no-print" data-v-83c69eca><div class="header-content" data-v-83c69eca><h2 data-v-83c69eca>Bulletins Individuels</h2><div class="header-subtitle" data-v-83c69eca><span class="dot" data-v-83c69eca></span><p data-v-83c69eca>Mod\xE8le officiel INPTIC A4</p></div></div><div class="toggle-container" data-v-83c69eca>`);
      if (!isEtudiant.value) {
        _push(`<div class="admin-toolbar no-print" data-v-83c69eca><button class="${ssrRenderClass([{ active: editMode.value === null }, "tool-btn"])}" data-v-83c69eca>\u{1F441}\uFE0F Vue</button><button class="${ssrRenderClass([{ active: editMode.value === "structure" }, "tool-btn"])}" data-v-83c69eca>\u{1F3D7}\uFE0F Structure</button><button class="${ssrRenderClass([{ active: editMode.value === "data" }, "tool-btn"])}" data-v-83c69eca>\u{1F4DD} Saisie</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="toggle-group" data-v-83c69eca><!--[-->`);
      ssrRenderList(["S5", "S6", "Annuel"], (sem) => {
        _push(`<button class="${ssrRenderClass([{ active: selectedSemester.value === sem }, "toggle-btn"])}" data-v-83c69eca>${ssrInterpolate(sem === "Annuel" ? "Annuel" : "Semestre " + sem.substring(1))}</button>`);
      });
      _push(`<!--]--><div class="${ssrRenderClass(["pos-" + selectedSemester.value, "toggle-slider"])}" data-v-83c69eca></div></div></div></header><div class="content-wrapper" data-v-83c69eca>`);
      if (!isEtudiant.value) {
        _push(`<div class="students-list no-print" data-v-83c69eca><h3 data-v-83c69eca>Liste d&#39;\xC9tudiants </h3>`);
        if (isDataLoading.value) {
          _push(`<div class="mini-loader" data-v-83c69eca>Chargement...</div>`);
        } else {
          _push(`<ul data-v-83c69eca><!--[-->`);
          ssrRenderList(etudiantsList.value, (student) => {
            _push(`<li class="${ssrRenderClass({ active: selectedStudent.value === student.id })}" data-v-83c69eca>${ssrInterpolate(student.nom)} ${ssrInterpolate(student.prenom)}</li>`);
          });
          _push(`<!--]--></ul>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (selectedStudent.value) {
        _push(`<div class="bulletin-preview" data-v-83c69eca><div class="a4-sheet" id="printableArea" data-v-83c69eca><div class="top-header" data-v-83c69eca><div class="left-header" data-v-83c69eca><p data-v-83c69eca>INSTITUT NATIONAL DE LA POSTE, DES TECHNOLOGIES</p><p data-v-83c69eca>DE L&#39;INFORMATION ET DE LA COMMUNICATION</p><p class="subtitle mt-1" data-v-83c69eca>DIRECTION DES ETUDES ET DE LA PEDAGOGIE</p></div><div class="center-header" data-v-83c69eca><h1 class="main-title" data-v-83c69eca>Bulletin de notes ${ssrInterpolate(selectedSemester.value === "Annuel" ? "Annuel" : "du " + selectedSemester.value)}</h1><p class="annee-univ" data-v-83c69eca>Ann\xE9e universitaire : 2025/2026</p></div><div class="right-header" data-v-83c69eca><p data-v-83c69eca>R\xC9PUBLIQUE GABONAISE</p><p data-v-83c69eca>-------------</p><p data-v-83c69eca>Union - Travail - Justice</p><p data-v-83c69eca>-------------</p><img${ssrRenderAttr("src", _imports_0)} alt="Logo INPTIC" class="logo-inptic-img" data-v-83c69eca></div></div><div class="class-block" data-v-83c69eca><strong data-v-83c69eca>Classe :</strong> Licence Professionnelle R\xE9seaux et T\xE9l\xE9communications <strong data-v-83c69eca>Option Administration et S\xE9curit\xE9 des R\xE9seaux (ASUR)</strong></div><div class="student-info-block mt-2" data-v-83c69eca><div class="info-row" data-v-83c69eca><div class="label-col" data-v-83c69eca>Nom(s) et Pr\xE9nom(s)</div><div class="val-col font-bold" data-v-83c69eca>${ssrInterpolate((_a = studentInfo.value) == null ? void 0 : _a.nom)} ${ssrInterpolate((_b = studentInfo.value) == null ? void 0 : _b.prenom)}</div></div><div class="info-row" data-v-83c69eca><div class="label-col" data-v-83c69eca>Date et lieu de naissance</div><div class="val-col" data-v-83c69eca>N\xE9(e) le ${ssrInterpolate((_c = studentInfo.value) == null ? void 0 : _c.date_naissance)} \xE0 ${ssrInterpolate(((_d = studentInfo.value) == null ? void 0 : _d.lieu_naissance) || "Libreville")}</div></div></div>`);
        if (selectedSemester.value !== "Annuel") {
          _push(`<!--[--><table class="grades-table mt-4" data-v-83c69eca><thead data-v-83c69eca><tr data-v-83c69eca><th data-v-83c69eca></th><th width="60" class="center" data-v-83c69eca>Cr\xE9dits</th><th width="80" class="center" data-v-83c69eca>Coefficients</th><th width="110" class="center" data-v-83c69eca>Notes de l&#39;\xE9tudiant</th><th width="110" class="center" data-v-83c69eca>Moyenne de classe</th></tr></thead><tbody data-v-83c69eca><!--[-->`);
          ssrRenderList((_e = bulletinData.value) == null ? void 0 : _e.ues, (ue) => {
            var _a2;
            _push(`<!--[--><tr class="ue-header" data-v-83c69eca><td colspan="5" data-v-83c69eca><div class="flex-between" data-v-83c69eca><span data-v-83c69eca>${ssrInterpolate(ue.id)} : ${ssrInterpolate(ue.libelle)}</span>`);
            if (editMode.value === "structure") {
              _push(`<div class="ue-tools no-print" data-v-83c69eca><button class="icon-btn" data-v-83c69eca>\u270F\uFE0F</button><button class="icon-btn" data-v-83c69eca>\u2795</button></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></td></tr><!--[-->`);
            ssrRenderList(ue.matieres, (matiere) => {
              var _a3, _b2;
              _push(`<tr data-v-83c69eca><td class="matiere" data-v-83c69eca>${ssrInterpolate(matiere.libelle)} `);
              if (editMode.value === "structure") {
                _push(`<button class="icon-btn no-print" data-v-83c69eca>\u270F\uFE0F</button>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</td><td class="center" data-v-83c69eca>${ssrInterpolate(matiere.credits || "--")}</td><td class="center" data-v-83c69eca>${ssrInterpolate(matiere.coeff || "1.00")}</td><td class="center text-blue font-bold" data-v-83c69eca>${ssrInterpolate((_a3 = matiere.moyenne) == null ? void 0 : _a3.toFixed(2))}</td><td class="center" data-v-83c69eca>${ssrInterpolate(((_b2 = matiere.moyenne_classe) == null ? void 0 : _b2.toFixed(2)) || "11.50")}</td></tr>`);
            });
            _push(`<!--]--><tr class="ue-moyenne font-bold" data-v-83c69eca><td class="right" data-v-83c69eca>Moyenne ${ssrInterpolate(ue.id)}</td><td class="center" data-v-83c69eca>${ssrInterpolate(ue.total_credits_ue || "--")}</td><td class="center" data-v-83c69eca>--</td><td class="center text-blue" data-v-83c69eca>${ssrInterpolate((_a2 = ue.moyenne_ue) == null ? void 0 : _a2.toFixed(2))}</td><td class="center" data-v-83c69eca>--</td></tr><!--]-->`);
          });
          _push(`<!--]--><tr class="penalties-row" data-v-83c69eca><td class="matiere" data-v-83c69eca>P\xE9nalit\xE9s d&#39;absences</td><td colspan="2" class="center text-orange font-bold" data-v-83c69eca>0,01/heure</td><td class="center" data-v-83c69eca>`);
          if (editMode.value === "data") {
            _push(`<div class="absence-input-wrap" data-v-83c69eca><input type="number"${ssrRenderAttr("value", bulletinData.value.absences)} class="abs-field" data-v-83c69eca></div>`);
          } else {
            _push(`<span data-v-83c69eca>${ssrInterpolate(((_f = bulletinData.value) == null ? void 0 : _f.absences) || 0)} heure(s)</span>`);
          }
          _push(`</td><td data-v-83c69eca></td></tr><tr class="semester-total-row" data-v-83c69eca><td colspan="3" class="right font-bold" data-v-83c69eca>Moyenne ${ssrInterpolate(selectedSemester.value)}</td><td class="center font-bold text-blue bg-light" data-v-83c69eca>${ssrInterpolate((_h = (_g = bulletinData.value) == null ? void 0 : _g.moyenne_generale) == null ? void 0 : _h.toFixed(2))}</td><td class="center" data-v-83c69eca>${ssrInterpolate(((_i = bulletinData.value) == null ? void 0 : _i.moyenne_classe_generale) || "11.80")}</td></tr></tbody></table><div class="rank-mention-block mt-2" data-v-83c69eca><table class="simple-table center-table" data-v-83c69eca><tbody data-v-83c69eca><tr data-v-83c69eca><td width="50%" data-v-83c69eca>Rang de l&#39;\xE9tudiant au Semestre</td><td data-v-83c69eca>Mention</td></tr><tr class="font-bold" data-v-83c69eca><td data-v-83c69eca>${ssrInterpolate(((_j = bulletinData.value) == null ? void 0 : _j.rang) || "Non class\xE9")}</td><td data-v-83c69eca>${ssrInterpolate(((_k = bulletinData.value) == null ? void 0 : _k.mention) || "Passable")}</td></tr></tbody></table></div><div class="validation-block mt-4" data-v-83c69eca><h4 class="text-center font-bold mb-1" data-v-83c69eca>Etat de la Validation des Cr\xE9dits au ${ssrInterpolate(selectedSemester.value)}</h4><table class="validation-table" data-v-83c69eca><tbody data-v-83c69eca><tr data-v-83c69eca><!--[-->`);
          ssrRenderList((_l = bulletinData.value) == null ? void 0 : _l.ues, (ue) => {
            _push(`<td class="center" data-v-83c69eca>${ssrInterpolate(ue.id)}</td>`);
          });
          _push(`<!--]--><td class="center" data-v-83c69eca>Cr\xE9dits valid\xE9s au ${ssrInterpolate(selectedSemester.value)}</td></tr><tr data-v-83c69eca><!--[-->`);
          ssrRenderList((_m = bulletinData.value) == null ? void 0 : _m.ues, (ue) => {
            _push(`<td class="center" data-v-83c69eca>${ssrInterpolate(ue.credits_acquis)} Cr\xE9dits / ${ssrInterpolate(ue.total_credits_ue)}</td>`);
          });
          _push(`<!--]--><td class="center" data-v-83c69eca>${ssrInterpolate((_n = bulletinData.value) == null ? void 0 : _n.credits_acquis)} Cr\xE9dits / ${ssrInterpolate(((_o = bulletinData.value) == null ? void 0 : _o.total_credits) || 30)}</td></tr><tr data-v-83c69eca><td${ssrRenderAttr("colspan", ((_q = (_p = bulletinData.value) == null ? void 0 : _p.ues) == null ? void 0 : _q.length) || 0)} class="center text-blue font-bold" data-v-83c69eca>${ssrInterpolate(((_r = bulletinData.value) == null ? void 0 : _r.validation_commentaire) || "Semestre Acquis")}</td><td class="center text-blue font-bold" data-v-83c69eca>${ssrInterpolate(((_s = bulletinData.value) == null ? void 0 : _s.valide) ? "Semestre Acquis" : "NON VALIDE")}</td></tr></tbody></table></div><!--]-->`);
        } else {
          _push(`<!--[--><table class="grades-table mt-4" data-v-83c69eca><thead data-v-83c69eca><tr data-v-83c69eca><th data-v-83c69eca></th><th width="80" class="center" data-v-83c69eca>Coefficients</th><th width="100" class="center" data-v-83c69eca>Notes</th><th width="80" class="center" data-v-83c69eca>Rang</th><th width="110" class="center" data-v-83c69eca>Moyenne de classe</th></tr></thead><tbody data-v-83c69eca><!--[-->`);
          ssrRenderList((_t = bulletinData.value) == null ? void 0 : _t.ues_annuel, (ue) => {
            _push(`<!--[--><tr class="ue-header-annual" data-v-83c69eca><td colspan="5" data-v-83c69eca>${ssrInterpolate(ue.id)} : ${ssrInterpolate(ue.libelle)}</td></tr><tr data-v-83c69eca><td class="matiere pl-4" data-v-83c69eca>Semestre 1</td><td class="center" data-v-83c69eca>${ssrInterpolate(ue.coeff_s1 || "3,00")}</td><td class="center" data-v-83c69eca>${ssrInterpolate(ue.note_s1 || "11,61")}</td><td class="center" data-v-83c69eca>${ssrInterpolate(ue.rang_s1 || "23")}</td><td class="center" data-v-83c69eca>${ssrInterpolate(ue.moy_classe_s1 || "10,34")}</td></tr><tr data-v-83c69eca><td class="matiere pl-4" data-v-83c69eca>Semestre 2</td><td class="center" data-v-83c69eca>${ssrInterpolate(ue.coeff_s2 || "3,00")}</td><td class="center" data-v-83c69eca>${ssrInterpolate(ue.note_s2 || "10,78")}</td><td class="center" data-v-83c69eca>${ssrInterpolate(ue.rang_s2 || "2")}</td><td class="center" data-v-83c69eca>${ssrInterpolate(ue.moy_classe_s2 || "11,09")}</td></tr><tr class="annual-row font-bold" data-v-83c69eca><td class="matiere pl-4" data-v-83c69eca>Annuel</td><td class="center" data-v-83c69eca>${ssrInterpolate(ue.coeff_annuel || "6,00")}</td><td class="center text-blue" data-v-83c69eca>${ssrInterpolate(ue.note_annuel || "10,90")}</td><td class="center" data-v-83c69eca>${ssrInterpolate(ue.rang_annuel || "5")}</td><td class="center" data-v-83c69eca>${ssrInterpolate(ue.moy_classe_annuel || "10,71")}</td></tr><!--]-->`);
          });
          _push(`<!--]--><tr class="ue-header-annual" data-v-83c69eca><td colspan="5" data-v-83c69eca>Moyenne Annuelle</td></tr><tr class="font-bold" data-v-83c69eca><td class="pl-4" data-v-83c69eca>Annuel</td><td class="center" data-v-83c69eca>42.00</td><td class="center text-blue" data-v-83c69eca>12.78</td><td class="center" data-v-83c69eca>10</td><td class="center" data-v-83c69eca>11.06</td></tr></tbody></table><div class="annual-summary-block mt-4" data-v-83c69eca><div class="summary-header text-center font-bold" data-v-83c69eca>Rang de l&#39;\xE9tudiant \xE0 l&#39;ann\xE9e</div><div class="summary-value text-center font-bold text-blue p-2 border-l border-r border-b" data-v-83c69eca>${ssrInterpolate(((_u = bulletinData.value) == null ? void 0 : _u.rang_annuel) || "5\xE8me")}</div></div><div class="annual-bilan mt-4" data-v-83c69eca><table class="bilan-table" data-v-83c69eca><tbody data-v-83c69eca><tr data-v-83c69eca><!--[-->`);
          ssrRenderList((_v = bulletinData.value) == null ? void 0 : _v.ues_annuel, (ue) => {
            _push(`<td class="center font-bold" data-v-83c69eca>${ssrInterpolate(ue.id)}</td>`);
          });
          _push(`<!--]--><td class="center font-bold bg-light" data-v-83c69eca>Bilan annuel</td></tr><tr data-v-83c69eca><!--[-->`);
          ssrRenderList((_w = bulletinData.value) == null ? void 0 : _w.ues_annuel, (ue) => {
            _push(`<td class="center" data-v-83c69eca>${ssrInterpolate(ue.status_annuel || "VALID\xC9")}</td>`);
          });
          _push(`<!--]--><td class="center font-bold text-blue" data-v-83c69eca>ADMIS</td></tr></tbody></table></div><div class="decision-block-annual mt-4" data-v-83c69eca><p data-v-83c69eca>D\xE9cision du Conseil d&#39;Etablissement : <strong class="text-blue" data-v-83c69eca>${ssrInterpolate(((_x = bulletinData.value) == null ? void 0 : _x.decision) || "ADMIS")}</strong></p><p data-v-83c69eca>Mention : <strong class="text-blue" data-v-83c69eca>${ssrInterpolate(((_y = bulletinData.value) == null ? void 0 : _y.mention_annuelle) || "Assez Bien")}</strong></p></div><!--]-->`);
        }
        if (selectedSemester.value !== "Annuel") {
          _push(`<div class="decision-footer mt-5" data-v-83c69eca><div class="decision-text" data-v-83c69eca><p data-v-83c69eca>D\xE9cision du Jury : <strong class="text-blue" data-v-83c69eca>${ssrInterpolate(((_z = bulletinData.value) == null ? void 0 : _z.decision) || "Semestre 5 valid\xE9")}</strong></p></div><div class="signature-block" data-v-83c69eca><p data-v-83c69eca>Fait \xE0 Libreville, le ${ssrInterpolate((/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }))}</p><p class="direction" data-v-83c69eca>Le Directeur des Etudes et de la P\xE9dagogie</p><p class="name mt-4" data-v-83c69eca>Davy Edgard MOUSSAVOU</p></div></div>`);
        } else {
          _push(`<div class="decision-footer mt-5" data-v-83c69eca><div class="decision-text" data-v-83c69eca></div><div class="signature-block" data-v-83c69eca><p data-v-83c69eca>Fait \xE0 Libreville, le ${ssrInterpolate((/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }))}</p><p class="direction" data-v-83c69eca>Le Directeur des Etudes et de la P\xE9dagogie</p><p class="name mt-4" data-v-83c69eca>Davy Edgard MOUSSAVOU</p></div></div>`);
        }
        _push(`<div class="footer-note" data-v-83c69eca> Il ne sera d\xE9livr\xE9 qu&#39;un seul et unique exemplaire de bulletins de notes. L&#39;\xE9tudiant est donc pri\xE9 d&#39;en faire plusieurs copies l\xE9galis\xE9es. </div></div>`);
        if (editMode.value === "structure") {
          _push(`<div class="structure-tools no-print" data-v-83c69eca><button class="btn btn-dashed" data-v-83c69eca><span class="icon" data-v-83c69eca>\u2795</span> Ajouter une Unit\xE9 d&#39;Enseignement (UE) </button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="bulletin-actions no-print" data-v-83c69eca><button class="btn btn-primary btn-lg" data-v-83c69eca><span class="icon" data-v-83c69eca>\u{1F5A8}\uFE0F</span> Imprimer le bulletin en PDF </button></div></div>`);
      } else if (!isDataLoading.value) {
        _push(`<div class="empty-selection" data-v-83c69eca><p data-v-83c69eca>S\xE9lectionnez un \xE9tudiant dans la liste pour pr\xE9visualiser son bulletin.</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/bulletins/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-83c69eca"]]);

export { index as default };
//# sourceMappingURL=index-BpvoD05L.mjs.map
