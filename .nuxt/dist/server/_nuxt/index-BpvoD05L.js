import { computed, ref, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { u as useApi } from "./useApi-C5ZVQEPH.js";
import { u as useHead } from "./v3-D2Flwojj.js";
import { u as useCookie } from "./cookie-BQ1yN6Gj.js";
import { _ as _export_sfc } from "../server.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/@unhead/vue/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/cookie-es/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/h3/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/destr/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/ohash/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/klona/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/hookable/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/unctx/dist/index.mjs";
import "vue-router";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/defu/dist/defu.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/ufo/dist/index.mjs";
const _imports_0 = "" + __buildAssetsURL("logo_inptic.BdRW7qYQ.png");
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
      isDataLoading.value = true;
      try {
        const detailedStudent = await apiFetch(`/api/etudiants/${id}/`).catch(() => null);
        const { useMockDb } = await import("./useMockDb-he2d-K3-.js");
        const db = useMockDb();
        studentInfo.value = detailedStudent || db.getCollection("etudiants").find((s) => s.id === id) || etudiantsList.value.find((s) => s.id === id);
        if (!studentInfo.value?.date_naissance) {
          studentInfo.value = { ...studentInfo.value, date_naissance: "05/05/1989", lieu_naissance: "Libreville" };
        }
        if (semester === "Annuel") {
          bulletinData.value = {
            rang_annuel: "5ème",
            mention_annuelle: "Assez Bien",
            decision: "ADMIS",
            ues_annuel: [
              { id: "UE1", libelle: "Communication / Management", coeff_s1: "4,50", note_s1: "12,00", rang_s1: "5", moy_classe_s1: "11,06", coeff_s2: "9,00", note_s2: "11,27", rang_s2: "1", moy_classe_s2: "12,12", coeff_annuel: "13,50", note_annuel: "11,45", rang_annuel: "2", moy_classe_annuel: "11,67", status_annuel: "VALIDÉ" },
              { id: "UE2", libelle: "Sciences de base (Réseaux)", coeff_s1: "6,00", note_s1: "12,40", rang_s1: "1", moy_classe_s1: "9,34", coeff_s2: "3,00", note_s2: "11,14", rang_s2: "1", moy_classe_s2: "10,30", coeff_annuel: "9,00", note_annuel: "12,05", rang_annuel: "1", moy_classe_annuel: "9,66", status_annuel: "VALIDÉ" }
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
                const matiereNotes = notes.filter((n) => n.matiere_id === m.id);
                const cc = matiereNotes.find((n) => n.type === "CC")?.note || 0;
                const exam = matiereNotes.find((n) => n.type === "Examen")?.note || 0;
                const ratrap = matiereNotes.find((n) => n.type === "Rattrapage")?.note || null;
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
              mention: moyenne_generale >= 16 ? "Très Bien" : moyenne_generale >= 14 ? "Bien" : moyenne_generale >= 12 ? "Assez Bien" : moyenne_generale >= 10 ? "Passable" : "Insuffisant",
              rang: "Non classé",
              absences: 0,
              credits_acquis: uesData.reduce((acc, ue) => acc + ue.credits_acquis, 0),
              total_credits: uesData.reduce((acc, ue) => acc + ue.total_credits_ue, 0),
              valide: moyenne_generale >= 10,
              validation_commentaire: moyenne_generale >= 10 ? "Semestre Acquis" : "Semestre Non Acquis",
              decision: moyenne_generale >= 10 ? `${semester} validé` : `${semester} non validé`,
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-bulletins" }, _attrs))} data-v-83c69eca><header class="page-header no-print" data-v-83c69eca><div class="header-content" data-v-83c69eca><h2 data-v-83c69eca>Bulletins Individuels</h2><div class="header-subtitle" data-v-83c69eca><span class="dot" data-v-83c69eca></span><p data-v-83c69eca>Modèle officiel INPTIC A4</p></div></div><div class="toggle-container" data-v-83c69eca>`);
      if (!isEtudiant.value) {
        _push(`<div class="admin-toolbar no-print" data-v-83c69eca><button class="${ssrRenderClass([{ active: editMode.value === null }, "tool-btn"])}" data-v-83c69eca>👁️ Vue</button><button class="${ssrRenderClass([{ active: editMode.value === "structure" }, "tool-btn"])}" data-v-83c69eca>🏗️ Structure</button><button class="${ssrRenderClass([{ active: editMode.value === "data" }, "tool-btn"])}" data-v-83c69eca>📝 Saisie</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="toggle-group" data-v-83c69eca><!--[-->`);
      ssrRenderList(["S5", "S6", "Annuel"], (sem) => {
        _push(`<button class="${ssrRenderClass([{ active: selectedSemester.value === sem }, "toggle-btn"])}" data-v-83c69eca>${ssrInterpolate(sem === "Annuel" ? "Annuel" : "Semestre " + sem.substring(1))}</button>`);
      });
      _push(`<!--]--><div class="${ssrRenderClass(["pos-" + selectedSemester.value, "toggle-slider"])}" data-v-83c69eca></div></div></div></header><div class="content-wrapper" data-v-83c69eca>`);
      if (!isEtudiant.value) {
        _push(`<div class="students-list no-print" data-v-83c69eca><h3 data-v-83c69eca>Liste d&#39;Étudiants </h3>`);
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
        _push(`<div class="bulletin-preview" data-v-83c69eca><div class="a4-sheet" id="printableArea" data-v-83c69eca><div class="top-header" data-v-83c69eca><div class="left-header" data-v-83c69eca><p data-v-83c69eca>INSTITUT NATIONAL DE LA POSTE, DES TECHNOLOGIES</p><p data-v-83c69eca>DE L&#39;INFORMATION ET DE LA COMMUNICATION</p><p class="subtitle mt-1" data-v-83c69eca>DIRECTION DES ETUDES ET DE LA PEDAGOGIE</p></div><div class="center-header" data-v-83c69eca><h1 class="main-title" data-v-83c69eca>Bulletin de notes ${ssrInterpolate(selectedSemester.value === "Annuel" ? "Annuel" : "du " + selectedSemester.value)}</h1><p class="annee-univ" data-v-83c69eca>Année universitaire : 2025/2026</p></div><div class="right-header" data-v-83c69eca><p data-v-83c69eca>RÉPUBLIQUE GABONAISE</p><p data-v-83c69eca>-------------</p><p data-v-83c69eca>Union - Travail - Justice</p><p data-v-83c69eca>-------------</p><img${ssrRenderAttr("src", _imports_0)} alt="Logo INPTIC" class="logo-inptic-img" data-v-83c69eca></div></div><div class="class-block" data-v-83c69eca><strong data-v-83c69eca>Classe :</strong> Licence Professionnelle Réseaux et Télécommunications <strong data-v-83c69eca>Option Administration et Sécurité des Réseaux (ASUR)</strong></div><div class="student-info-block mt-2" data-v-83c69eca><div class="info-row" data-v-83c69eca><div class="label-col" data-v-83c69eca>Nom(s) et Prénom(s)</div><div class="val-col font-bold" data-v-83c69eca>${ssrInterpolate(studentInfo.value?.nom)} ${ssrInterpolate(studentInfo.value?.prenom)}</div></div><div class="info-row" data-v-83c69eca><div class="label-col" data-v-83c69eca>Date et lieu de naissance</div><div class="val-col" data-v-83c69eca>Né(e) le ${ssrInterpolate(studentInfo.value?.date_naissance)} à ${ssrInterpolate(studentInfo.value?.lieu_naissance || "Libreville")}</div></div></div>`);
        if (selectedSemester.value !== "Annuel") {
          _push(`<!--[--><table class="grades-table mt-4" data-v-83c69eca><thead data-v-83c69eca><tr data-v-83c69eca><th data-v-83c69eca></th><th width="60" class="center" data-v-83c69eca>Crédits</th><th width="80" class="center" data-v-83c69eca>Coefficients</th><th width="110" class="center" data-v-83c69eca>Notes de l&#39;étudiant</th><th width="110" class="center" data-v-83c69eca>Moyenne de classe</th></tr></thead><tbody data-v-83c69eca><!--[-->`);
          ssrRenderList(bulletinData.value?.ues, (ue) => {
            _push(`<!--[--><tr class="ue-header" data-v-83c69eca><td colspan="5" data-v-83c69eca><div class="flex-between" data-v-83c69eca><span data-v-83c69eca>${ssrInterpolate(ue.id)} : ${ssrInterpolate(ue.libelle)}</span>`);
            if (editMode.value === "structure") {
              _push(`<div class="ue-tools no-print" data-v-83c69eca><button class="icon-btn" data-v-83c69eca>✏️</button><button class="icon-btn" data-v-83c69eca>➕</button></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></td></tr><!--[-->`);
            ssrRenderList(ue.matieres, (matiere) => {
              _push(`<tr data-v-83c69eca><td class="matiere" data-v-83c69eca>${ssrInterpolate(matiere.libelle)} `);
              if (editMode.value === "structure") {
                _push(`<button class="icon-btn no-print" data-v-83c69eca>✏️</button>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</td><td class="center" data-v-83c69eca>${ssrInterpolate(matiere.credits || "--")}</td><td class="center" data-v-83c69eca>${ssrInterpolate(matiere.coeff || "1.00")}</td><td class="center text-blue font-bold" data-v-83c69eca>${ssrInterpolate(matiere.moyenne?.toFixed(2))}</td><td class="center" data-v-83c69eca>${ssrInterpolate(matiere.moyenne_classe?.toFixed(2) || "11.50")}</td></tr>`);
            });
            _push(`<!--]--><tr class="ue-moyenne font-bold" data-v-83c69eca><td class="right" data-v-83c69eca>Moyenne ${ssrInterpolate(ue.id)}</td><td class="center" data-v-83c69eca>${ssrInterpolate(ue.total_credits_ue || "--")}</td><td class="center" data-v-83c69eca>--</td><td class="center text-blue" data-v-83c69eca>${ssrInterpolate(ue.moyenne_ue?.toFixed(2))}</td><td class="center" data-v-83c69eca>--</td></tr><!--]-->`);
          });
          _push(`<!--]--><tr class="penalties-row" data-v-83c69eca><td class="matiere" data-v-83c69eca>Pénalités d&#39;absences</td><td colspan="2" class="center text-orange font-bold" data-v-83c69eca>0,01/heure</td><td class="center" data-v-83c69eca>`);
          if (editMode.value === "data") {
            _push(`<div class="absence-input-wrap" data-v-83c69eca><input type="number"${ssrRenderAttr("value", bulletinData.value.absences)} class="abs-field" data-v-83c69eca></div>`);
          } else {
            _push(`<span data-v-83c69eca>${ssrInterpolate(bulletinData.value?.absences || 0)} heure(s)</span>`);
          }
          _push(`</td><td data-v-83c69eca></td></tr><tr class="semester-total-row" data-v-83c69eca><td colspan="3" class="right font-bold" data-v-83c69eca>Moyenne ${ssrInterpolate(selectedSemester.value)}</td><td class="center font-bold text-blue bg-light" data-v-83c69eca>${ssrInterpolate(bulletinData.value?.moyenne_generale?.toFixed(2))}</td><td class="center" data-v-83c69eca>${ssrInterpolate(bulletinData.value?.moyenne_classe_generale || "11.80")}</td></tr></tbody></table><div class="rank-mention-block mt-2" data-v-83c69eca><table class="simple-table center-table" data-v-83c69eca><tbody data-v-83c69eca><tr data-v-83c69eca><td width="50%" data-v-83c69eca>Rang de l&#39;étudiant au Semestre</td><td data-v-83c69eca>Mention</td></tr><tr class="font-bold" data-v-83c69eca><td data-v-83c69eca>${ssrInterpolate(bulletinData.value?.rang || "Non classé")}</td><td data-v-83c69eca>${ssrInterpolate(bulletinData.value?.mention || "Passable")}</td></tr></tbody></table></div><div class="validation-block mt-4" data-v-83c69eca><h4 class="text-center font-bold mb-1" data-v-83c69eca>Etat de la Validation des Crédits au ${ssrInterpolate(selectedSemester.value)}</h4><table class="validation-table" data-v-83c69eca><tbody data-v-83c69eca><tr data-v-83c69eca><!--[-->`);
          ssrRenderList(bulletinData.value?.ues, (ue) => {
            _push(`<td class="center" data-v-83c69eca>${ssrInterpolate(ue.id)}</td>`);
          });
          _push(`<!--]--><td class="center" data-v-83c69eca>Crédits validés au ${ssrInterpolate(selectedSemester.value)}</td></tr><tr data-v-83c69eca><!--[-->`);
          ssrRenderList(bulletinData.value?.ues, (ue) => {
            _push(`<td class="center" data-v-83c69eca>${ssrInterpolate(ue.credits_acquis)} Crédits / ${ssrInterpolate(ue.total_credits_ue)}</td>`);
          });
          _push(`<!--]--><td class="center" data-v-83c69eca>${ssrInterpolate(bulletinData.value?.credits_acquis)} Crédits / ${ssrInterpolate(bulletinData.value?.total_credits || 30)}</td></tr><tr data-v-83c69eca><td${ssrRenderAttr("colspan", bulletinData.value?.ues?.length || 0)} class="center text-blue font-bold" data-v-83c69eca>${ssrInterpolate(bulletinData.value?.validation_commentaire || "Semestre Acquis")}</td><td class="center text-blue font-bold" data-v-83c69eca>${ssrInterpolate(bulletinData.value?.valide ? "Semestre Acquis" : "NON VALIDE")}</td></tr></tbody></table></div><!--]-->`);
        } else {
          _push(`<!--[--><table class="grades-table mt-4" data-v-83c69eca><thead data-v-83c69eca><tr data-v-83c69eca><th data-v-83c69eca></th><th width="80" class="center" data-v-83c69eca>Coefficients</th><th width="100" class="center" data-v-83c69eca>Notes</th><th width="80" class="center" data-v-83c69eca>Rang</th><th width="110" class="center" data-v-83c69eca>Moyenne de classe</th></tr></thead><tbody data-v-83c69eca><!--[-->`);
          ssrRenderList(bulletinData.value?.ues_annuel, (ue) => {
            _push(`<!--[--><tr class="ue-header-annual" data-v-83c69eca><td colspan="5" data-v-83c69eca>${ssrInterpolate(ue.id)} : ${ssrInterpolate(ue.libelle)}</td></tr><tr data-v-83c69eca><td class="matiere pl-4" data-v-83c69eca>Semestre 1</td><td class="center" data-v-83c69eca>${ssrInterpolate(ue.coeff_s1 || "3,00")}</td><td class="center" data-v-83c69eca>${ssrInterpolate(ue.note_s1 || "11,61")}</td><td class="center" data-v-83c69eca>${ssrInterpolate(ue.rang_s1 || "23")}</td><td class="center" data-v-83c69eca>${ssrInterpolate(ue.moy_classe_s1 || "10,34")}</td></tr><tr data-v-83c69eca><td class="matiere pl-4" data-v-83c69eca>Semestre 2</td><td class="center" data-v-83c69eca>${ssrInterpolate(ue.coeff_s2 || "3,00")}</td><td class="center" data-v-83c69eca>${ssrInterpolate(ue.note_s2 || "10,78")}</td><td class="center" data-v-83c69eca>${ssrInterpolate(ue.rang_s2 || "2")}</td><td class="center" data-v-83c69eca>${ssrInterpolate(ue.moy_classe_s2 || "11,09")}</td></tr><tr class="annual-row font-bold" data-v-83c69eca><td class="matiere pl-4" data-v-83c69eca>Annuel</td><td class="center" data-v-83c69eca>${ssrInterpolate(ue.coeff_annuel || "6,00")}</td><td class="center text-blue" data-v-83c69eca>${ssrInterpolate(ue.note_annuel || "10,90")}</td><td class="center" data-v-83c69eca>${ssrInterpolate(ue.rang_annuel || "5")}</td><td class="center" data-v-83c69eca>${ssrInterpolate(ue.moy_classe_annuel || "10,71")}</td></tr><!--]-->`);
          });
          _push(`<!--]--><tr class="ue-header-annual" data-v-83c69eca><td colspan="5" data-v-83c69eca>Moyenne Annuelle</td></tr><tr class="font-bold" data-v-83c69eca><td class="pl-4" data-v-83c69eca>Annuel</td><td class="center" data-v-83c69eca>42.00</td><td class="center text-blue" data-v-83c69eca>12.78</td><td class="center" data-v-83c69eca>10</td><td class="center" data-v-83c69eca>11.06</td></tr></tbody></table><div class="annual-summary-block mt-4" data-v-83c69eca><div class="summary-header text-center font-bold" data-v-83c69eca>Rang de l&#39;étudiant à l&#39;année</div><div class="summary-value text-center font-bold text-blue p-2 border-l border-r border-b" data-v-83c69eca>${ssrInterpolate(bulletinData.value?.rang_annuel || "5ème")}</div></div><div class="annual-bilan mt-4" data-v-83c69eca><table class="bilan-table" data-v-83c69eca><tbody data-v-83c69eca><tr data-v-83c69eca><!--[-->`);
          ssrRenderList(bulletinData.value?.ues_annuel, (ue) => {
            _push(`<td class="center font-bold" data-v-83c69eca>${ssrInterpolate(ue.id)}</td>`);
          });
          _push(`<!--]--><td class="center font-bold bg-light" data-v-83c69eca>Bilan annuel</td></tr><tr data-v-83c69eca><!--[-->`);
          ssrRenderList(bulletinData.value?.ues_annuel, (ue) => {
            _push(`<td class="center" data-v-83c69eca>${ssrInterpolate(ue.status_annuel || "VALIDÉ")}</td>`);
          });
          _push(`<!--]--><td class="center font-bold text-blue" data-v-83c69eca>ADMIS</td></tr></tbody></table></div><div class="decision-block-annual mt-4" data-v-83c69eca><p data-v-83c69eca>Décision du Conseil d&#39;Etablissement : <strong class="text-blue" data-v-83c69eca>${ssrInterpolate(bulletinData.value?.decision || "ADMIS")}</strong></p><p data-v-83c69eca>Mention : <strong class="text-blue" data-v-83c69eca>${ssrInterpolate(bulletinData.value?.mention_annuelle || "Assez Bien")}</strong></p></div><!--]-->`);
        }
        if (selectedSemester.value !== "Annuel") {
          _push(`<div class="decision-footer mt-5" data-v-83c69eca><div class="decision-text" data-v-83c69eca><p data-v-83c69eca>Décision du Jury : <strong class="text-blue" data-v-83c69eca>${ssrInterpolate(bulletinData.value?.decision || "Semestre 5 validé")}</strong></p></div><div class="signature-block" data-v-83c69eca><p data-v-83c69eca>Fait à Libreville, le ${ssrInterpolate((/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }))}</p><p class="direction" data-v-83c69eca>Le Directeur des Etudes et de la Pédagogie</p><p class="name mt-4" data-v-83c69eca>Davy Edgard MOUSSAVOU</p></div></div>`);
        } else {
          _push(`<div class="decision-footer mt-5" data-v-83c69eca><div class="decision-text" data-v-83c69eca></div><div class="signature-block" data-v-83c69eca><p data-v-83c69eca>Fait à Libreville, le ${ssrInterpolate((/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }))}</p><p class="direction" data-v-83c69eca>Le Directeur des Etudes et de la Pédagogie</p><p class="name mt-4" data-v-83c69eca>Davy Edgard MOUSSAVOU</p></div></div>`);
        }
        _push(`<div class="footer-note" data-v-83c69eca> Il ne sera délivré qu&#39;un seul et unique exemplaire de bulletins de notes. L&#39;étudiant est donc prié d&#39;en faire plusieurs copies légalisées. </div></div>`);
        if (editMode.value === "structure") {
          _push(`<div class="structure-tools no-print" data-v-83c69eca><button class="btn btn-dashed" data-v-83c69eca><span class="icon" data-v-83c69eca>➕</span> Ajouter une Unité d&#39;Enseignement (UE) </button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="bulletin-actions no-print" data-v-83c69eca><button class="btn btn-primary btn-lg" data-v-83c69eca><span class="icon" data-v-83c69eca>🖨️</span> Imprimer le bulletin en PDF </button></div></div>`);
      } else if (!isDataLoading.value) {
        _push(`<div class="empty-selection" data-v-83c69eca><p data-v-83c69eca>Sélectionnez un étudiant dans la liste pour prévisualiser son bulletin.</p></div>`);
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
export {
  index as default
};
//# sourceMappingURL=index-BpvoD05L.js.map
