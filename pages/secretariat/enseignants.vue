<template>
  <div class="page-enseignants">
    <header class="page-header">
      <div class="header-content">
        <h2>Gestion des Enseignants</h2>
        <p>Assignez les matières et gérez les intervenants pédagogiques.</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary" @click="openModal('add')">
          <span class="icon">➕</span> Ajouter un Enseignant
        </button>
      </div>
    </header>

    <!-- Filtres et recherche -->
    <div class="filters-section">
      <div class="search-box-compact">
        <input 
          type="text" 
          v-model="searchTerm" 
          placeholder="Rechercher..."
          class="form-control-compact"
        >
      </div>
    </div>

    <!-- Liste des enseignants -->
    <div class="teachers-list-section">
      <div class="teachers-table">
        <!-- En-têtes de colonnes -->
        <div class="table-header">
          <div class="header-cell">Nom</div>
          <div class="header-cell">Prénom</div>
          <div class="header-cell">Email</div>
          <div class="header-cell">Spécialité</div>
          <div class="header-cell">Actions</div>
        </div>
        
        <!-- Lignes des enseignants -->
        <div 
          v-for="teacher in filteredTeachers" 
          :key="teacher.id" 
          class="teacher-row"
        >
          <div class="table-cell name-cell">
            <div class="cell-avatar">
              <div class="avatar-circle-small">
                {{ teacher.nom?.charAt(0) }}
              </div>
            </div>
            <span class="cell-text">{{ teacher.nom }}</span>
          </div>
          <div class="table-cell">
            <span class="cell-text">{{ teacher.prenom }}</span>
          </div>
          <div class="table-cell email-cell">
            <span class="cell-text">{{ teacher.email || 'Non renseigné' }}</span>
          </div>
          <div class="table-cell">
            <span class="cell-text specialty-text">{{ teacher.specialite || 'Non spécifiée' }}</span>
          </div>
          <div class="table-cell actions-cell">
            <div class="teacher-actions-inline">
              <button class="action-btn" @click="openModal('edit', teacher)" title="Modifier">
                <span class="icon">edit</span>
              </button>
              <button class="action-btn" @click="openAssignModal(teacher)" title="Assigner matières">
                <span class="icon">book</span>
              </button>
              <button class="action-btn danger" @click="deleteTeacher(teacher.id)" title="Supprimer">
                <span class="icon">delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Message si aucun enseignant -->
      <div v-if="filteredTeachers.length === 0" class="empty-state">
        <div class="empty-icon">person_search</div>
        <h4>Aucun enseignant trouvé</h4>
        <p>Aucun enseignant ne correspond à votre recherche.</p>
      </div>
    </div>

    <!-- Tableau des enseignants (optionnel - caché par défaut) -->
    <div class="table-container" style="display: none;">
      <DataTable
        :columns="teacherColumns"
        :data="filteredTeachers"
        title="Liste des enseignants"
        :actions="true"
      >
        <template #matieres="{ row }">
          <div class="matieres-tags">
            <span v-for="mat in row.matieres" :key="mat" class="tag">
              {{ mat }}
            </span>
            <span v-if="!row.matieres?.length" class="text-muted">Aucune</span>
          </div>
        </template>
        <template #actions="{ row }">
          <button class="btn btn-sm btn-secondary" @click="openModal('edit', row)">
            ✏️
          </button>
          <button class="btn btn-sm btn-info" @click="openAssignModal(row)">
            🔗
          </button>
          <button class="btn btn-sm btn-danger" @click="deleteTeacher(row.id)">
            🗑️
          </button>
        </template>
      </DataTable>
    </div>

    <!-- Modal Ajout/Modification -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ modalMode === 'add' ? 'Ajouter' : 'Modifier' }} un enseignant</h3>
          <button class="modal-close" @click="closeModal">&times;</button>
        </div>
        
        <form @submit.prevent="saveTeacher" class="modal-form">
          <div class="form-row">
            <div class="form-group">
              <label for="nom">Nom *</label>
              <input 
                type="text" 
                id="nom" 
                v-model="formData.nom" 
                required 
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="prenom">Prénom *</label>
              <input 
                type="text" 
                id="prenom" 
                v-model="formData.prenom" 
                required 
                class="form-control"
              >
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="email">Email *</label>
              <input 
                type="email" 
                id="email" 
                v-model="formData.email" 
                required 
                class="form-control"
                placeholder="email@example.com"
              >
            </div>
            <div class="form-group">
              <label for="matricule">Matricule *</label>
              <input 
                type="text" 
                id="matricule" 
                v-model="formData.matricule" 
                required 
                class="form-control"
                placeholder="ENSE001"
              >
            </div>
          </div>

          <div class="alert-info-credentials">
            <p><strong>Note :</strong> Les identifiants de connexion par défaut seront :</p>
            <ul>
              <li><strong>Identifiant :</strong> {{ formData.prenom || 'Prénom' }}</li>
              <li><strong>Mot de passe :</strong> {{ formData.matricule || 'Matricule' }}</li>
            </ul>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="telephone">Téléphone</label>
              <input 
                type="tel" 
                id="telephone" 
                v-model="formData.telephone" 
                class="form-control"
              >
            </div>
          </div>

          <div class="form-group">
            <label for="specialite">Spécialité</label>
            <select 
              id="specialite" 
              v-model="formData.specialite" 
              class="form-control"
              required
            >
              <option value="">Sélectionner une spécialité...</option>
              <template v-for="ue in availableUEs" :key="ue.id">
                <optgroup :label="ue.libelle">
                  <option v-for="mat in ue.matieres" :key="mat.id" :value="mat.libelle">
                    {{ mat.libelle }}
                  </option>
                </optgroup>
              </template>
            </select>
            <small class="text-muted">Sélectionnez la matière principale d'enseignement</small>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Annuler
            </button>
            <button type="submit" class="btn btn-primary" :disabled="loading">
              {{ loading ? 'Enregistrement...' : (modalMode === 'add' ? 'Ajouter' : 'Modifier') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Assignation -->
    <div v-if="showAssignModal" class="modal-overlay" @click.self="closeAssignModal">
      <div class="modal-content">
        <header class="modal-header">
          <h3>Assigner des matières à {{ selectedTeacher?.nom }} {{ selectedTeacher?.prenom }}</h3>
          <button class="close-btn" @click="closeAssignModal">&times;</button>
        </header>
        <div class="modal-body">
          <div class="form-group">
            <label>Matières disponibles</label>
            <div class="matieres-list">
              <div v-for="ue in availableUEs" :key="ue.id" class="ue-group">
                <h4>{{ ue.libelle }}</h4>
                <div class="matieres-checkboxes">
                  <label v-for="mat in ue.matieres" :key="mat.id" class="checkbox-label">
                    <input 
                      type="checkbox" 
                      :value="mat.id"
                      v-model="selectedMatieres"
                    >
                    <span>{{ mat.libelle }} ({{ mat.coefficient }} coeff, {{ mat.credits }} ECTS)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer class="modal-footer">
          <button class="btn btn-secondary" @click="closeAssignModal">Annuler</button>
          <button class="btn btn-primary" @click="assignMatieres">Confirmer l'assignation</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

useHead({ title: 'Gestion des Enseignants | Bull ASUR' })

// État
const teachers = ref([])
const searchTerm = ref('')
const showModal = ref(false)
const modalMode = ref('add')
const loading = ref(false)
const currentTeacher = ref(null)
const showAssignModal = ref(false)
const selectedTeacher = ref(null)
const selectedMatieres = ref([])
const availableUEs = ref([])
const allMatieres = ref([])

// Formulaire
const formData = ref({
  nom: '',
  prenom: '',
  email: '',
  matricule: '',
  telephone: '',
  specialite: '',
  matieres: []
})

// Colonnes du tableau
const teacherColumns = [
  { key: 'nom', label: 'Nom' },
  { key: 'prenom', label: 'Prénom' },
  { key: 'email', label: 'Email' },
  { key: 'matricule', label: 'Matricule' },
  { key: 'specialite', label: 'Spécialité' },
  { key: 'matieres', label: 'Matières assignées' }
]

// Filtrage
const filteredTeachers = computed(() => {
  return teachers.value.filter(teacher => {
    const searchLower = searchTerm.value.toLowerCase()
    return `${teacher.nom} ${teacher.prenom} ${teacher.email || ''} ${teacher.matricule || ''} ${teacher.specialite || ''}`.toLowerCase().includes(searchLower)
  })
})

// Méthodes CRUD
const openModal = (mode, teacher = null) => {
  modalMode.value = mode
  currentTeacher.value = teacher
  
  if (mode === 'edit' && teacher) {
    formData.value = { ...teacher }
  } else {
    resetForm()
  }
  
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  resetForm()
  currentTeacher.value = null
}

const resetForm = () => {
  formData.value = {
    nom: '',
    prenom: '',
    email: '',
    matricule: '',
    telephone: '',
    specialite: '',
    matieres: []
  }
}

const loadTeachers = async () => {
  try {
    const response = await $fetch(`${$config.public.apiBase}/enseignants`)
    teachers.value = response
  } catch (error) {
    console.error('Erreur API, fallback sur LocalStorage')
    const { useMockDb } = await import('~/composables/useMockDb.js')
    const db = useMockDb()
    teachers.value = db.getCollection('enseignants')
  }
}

const loadAvailableMatieres = async () => {
  try {
    const response = await $fetch(`${$config.public.apiBase}/matieres-with-ue`)
    availableUEs.value = response
  } catch (error) {
    console.error('Erreur API, fallback sur LocalStorage')
    const { useMockDb } = await import('~/composables/useMockDb.js')
    const db = useMockDb()
    
    // Construction de l'arbre UEs -> Matières pour l'affichage
    const ues = db.getCollection('ues')
    const matieres = db.getCollection('matieres')
    
    availableUEs.value = ues.map(ue => ({
      ...ue,
      matieres: matieres.filter(m => m.ue_id === ue.id)
    }))
  }
}

const saveTeacher = async () => {
  loading.value = true
  
  try {
    const url = modalMode.value === 'add' 
      ? `${$config.public.apiBase}/enseignants`
      : `${$config.public.apiBase}/enseignants/${currentTeacher.value.id}`
    
    const method = modalMode.value === 'add' ? 'POST' : 'PUT'
    
    const response = await $fetch(url, {
      method,
      body: formData.value
    })
    
    if (modalMode.value === 'add') {
      teachers.value.push({ ...response, matieres: [] })
    } else {
      const index = teachers.value.findIndex(t => t.id === currentTeacher.value.id)
      if (index !== -1) {
        teachers.value[index] = { ...response, matieres: teachers.value[index].matieres }
      }
    }
    
    closeModal()
    console.log('Enseignant enregistré avec succès via API')
    
  } catch (error) {
    console.error('Erreur API, utilisation du LocalStorage')
    const { useMockDb } = await import('~/composables/useMockDb.js')
    const db = useMockDb()
    
    if (modalMode.value === 'add') {
      const newTeacher = db.addDoc('enseignants', { ...formData.value, matieres: [] })
      teachers.value.push(newTeacher)
    } else {
      const updatedTeacher = db.updateDoc('enseignants', currentTeacher.value.id, formData.value)
      if (updatedTeacher) {
        const index = teachers.value.findIndex(t => t.id === currentTeacher.value.id)
        if (index !== -1) teachers.value[index] = updatedTeacher
      }
    }
    closeModal()
  } finally {
    loading.value = false
  }
}

const deleteTeacher = async (teacherId) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cet enseignant ?')) {
    return
  }
  
  try {
    await $fetch(`${$config.public.apiBase}/enseignants/${teacherId}`, {
      method: 'DELETE'
    })
    
    teachers.value = teachers.value.filter(t => t.id !== teacherId)
    console.log('Enseignant supprimé avec succès')
    
  } catch (error) {
    console.error('Erreur API, utilisation du LocalStorage')
    const { useMockDb } = await import('~/composables/useMockDb.js')
    const db = useMockDb()
    db.deleteDoc('enseignants', teacherId)
    teachers.value = teachers.value.filter(t => t.id !== teacherId)
  }
}

// Gestion des assignations
const openAssignModal = (teacher) => {
  selectedTeacher.value = teacher
  selectedMatieres.value = teacher.matieres || []
  showAssignModal.value = true
}

const closeAssignModal = () => {
  showAssignModal.value = false
  selectedTeacher.value = null
  selectedMatieres.value = []
}

const assignMatieres = async () => {
  try {
    await $fetch(`${$config.public.apiBase}/enseignants/${selectedTeacher.value.id}/assign-matieres`, {
      method: 'POST',
      body: { matiere_ids: selectedMatieres.value }
    })
    
    // Mettre à jour localement (API)
    updateLocalTeacherMatieres()
    
  } catch (error) {
    console.error('Erreur API, utilisation du LocalStorage')
    const { useMockDb } = await import('~/composables/useMockDb.js')
    const db = useMockDb()
    
    db.updateDoc('enseignants', selectedTeacher.value.id, { matieres: selectedMatieres.value })
    updateLocalTeacherMatieres()
  }
}

const updateLocalTeacherMatieres = () => {
  const teacher = teachers.value.find(t => t.id === selectedTeacher.value.id)
  if (teacher) {
    teacher.matieres = [...selectedMatieres.value]
  }
  closeAssignModal()
}

onMounted(() => {
  loadTeachers()
  loadAvailableMatieres()
})
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
}

.header-content h2 {
  font-size: 1.25rem;
  color: var(--text-main);
  margin-bottom: 0.15rem;
  font-weight: 600;
}

.header-content p {
  color: var(--text-muted);
  font-size: 0.75rem;
}

.filters-section {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  padding: 0.5rem;
  background: var(--surface);
  border-radius: var(--radius);
  border: 1px solid var(--border);
}

.search-box-compact {
  max-width: 200px;
}

.form-control-compact {
  width: 100%;
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-size: 0.75rem;
  background: var(--bg-color);
  color: var(--text-main);
}

.form-control-compact:focus {
  outline: none;
  border-color: var(--primary);
}

.teachers-list-section {
  margin-bottom: 1rem;
}

.teachers-table {
  background: var(--surface);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 1.2fr 1fr 2.5fr 1.5fr 0.8fr;
  background: var(--bg-color);
  border-bottom: 1px solid var(--border);
}

.header-cell {
  padding: 0.35rem 0.5rem;
  font-weight: 500;
  color: var(--text-main);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.2px;
  border-right: 1px solid var(--border);
}

.header-cell:last-child {
  border-right: none;
}

.teacher-row {
  display: grid;
  grid-template-columns: 1.2fr 1fr 2.5fr 1.5fr 0.8fr;
  border-bottom: 1px solid var(--border);
  transition: background-color 0.1s ease;
  align-items: center;
}

.teacher-row:last-child {
  border-bottom: none;
}

.teacher-row:hover {
  background-color: rgba(0, 0, 0, 0.01);
}

.table-cell {
  padding: 0.35rem 0.5rem;
  display: flex;
  align-items: center;
  border-right: 1px solid var(--border);
  min-height: 32px;
}

.table-cell:last-child {
  border-right: none;
  justify-content: center;
}

.name-cell {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.cell-avatar {
  flex-shrink: 0;
}

.avatar-circle-small {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.6rem;
  text-transform: uppercase;
}

.cell-text {
  font-size: 0.7rem;
  color: var(--text-main);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.email-cell .cell-text {
  font-size: 0.65rem;
  color: var(--text-muted);
}

.specialty-text {
  color: var(--primary);
  font-weight: 500;
  font-size: 0.65rem;
}

.actions-cell {
  justify-content: center;
}

.teacher-actions-inline {
  display: flex;
  gap: 0.05rem;
}

.action-btn {
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 2px;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s ease;
  font-size: 0.6rem;
}

.action-btn:hover {
  background: var(--primary);
  color: white;
}

.action-btn.danger:hover {
  background: var(--danger);
}

.empty-state {
  text-align: center;
  padding: 3rem 2rem;
  color: var(--text-muted);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h4 {
  margin-bottom: 0.5rem;
  color: var(--text-main);
}

.empty-state p {
  font-size: 0.9rem;
}

.table-container {
  background: var(--surface);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  overflow: hidden;
}

.matieres-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.matieres-tags .tag {
  background: var(--bg-color);
  color: var(--text-muted);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  border: 1px solid var(--border);
}

.text-muted {
  color: var(--text-muted);
  font-style: italic;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--surface);
  border-radius: var(--radius);
  width: 85%;
  max-width: 450px;
  max-height: 85vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid var(--border);
}

.modal-header h3 {
  margin: 0;
  color: var(--text-main);
  font-size: 0.9rem;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--text-muted);
}

.modal-form {
  padding: 0.75rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.25rem;
  font-weight: 500;
  color: var(--text-main);
  font-size: 0.7rem;
}

.form-control {
  padding: 0.4rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-size: 0.75rem;
  transition: border-color 0.15s;
}

.form-control:focus {
  outline: none;
  border-color: var(--primary);
}

.form-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border);
}

/* Modal assignation styles */
.modal-body {
  padding: 1.5rem;
}

.matieres-list {
  max-height: 400px;
  overflow-y: auto;
}

.ue-group {
  margin-bottom: 1.5rem;
}

.ue-group h4 {
  margin-bottom: 0.75rem;
  color: var(--primary);
  font-size: 1rem;
  font-weight: 600;
}

.matieres-checkboxes {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.checkbox-label:hover {
  background-color: var(--bg-color);
}

.checkbox-label input[type="checkbox"] {
  margin: 0;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
  background: var(--bg-color);
}

.btn {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: var(--radius);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.15s;
  font-weight: 500;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-hover);
}

.btn-secondary {
  background: var(--bg-color);
  color: var(--text-main);
  border: 1px solid var(--border);
}

.btn-secondary:hover {
  background: var(--border);
}

.btn-info {
  background: #3b82f6;
  color: white;
}

.btn-danger {
  background: var(--danger);
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

.btn-sm {
  padding: 0.3rem;
  font-size: 0.7rem;
}

.alert-info-credentials {
  background-color: #f0f9ff;
  border-left: 4px solid #0ea5e9;
  padding: 0.8rem;
  margin-bottom: 1.2rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
}

.alert-info-credentials p {
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #0369a1;
}

.alert-info-credentials ul {
  list-style: none;
  padding-left: 0.5rem;
}

.alert-info-credentials li {
  font-size: 0.9rem;
  color: #0c4a6e;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .filters-section {
    flex-direction: column;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .modal-content {
    width: 95%;
    margin: 1rem;
  }
}
</style>
