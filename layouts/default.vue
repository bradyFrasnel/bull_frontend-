<template>
  <div class="app-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h1>Bull ASUR</h1>
      </div>
      <nav class="sidebar-nav">
        <!-- Lien Dashboard (adapté au rôle) -->
        <NuxtLink :to="`/${currentRole}`" class="nav-link" :class="{'router-link-active': currentRoute === 'Dashboard'}">
          Dashboard
        </NuxtLink>

        <!-- Liens conditionnels -->
        <NuxtLink v-for="link in allowedLinks" :key="link.path" :to="link.path" class="nav-link">
          {{ link.label }}
        </NuxtLink>
      </nav>
      <div class="sidebar-footer">
        <NuxtLink to="/" class="nav-link logout-btn">
          Déconnexion
        </NuxtLink>
      </div>
    </aside>
    
    <main class="main-content">
      <header class="topbar">
        <div class="breadcrumb">
          <span>{{ currentRoute }}</span>
        </div>
        <div class="user-profile">
          <div class="avatar">{{ currentRole.charAt(0).toUpperCase() }}</div>
          <span class="role-lbl">{{ currentRole.toUpperCase() }}</span>
        </div>
      </header>
      <div class="page-container">
        <slot />
      </div>
    </main>
    
    <!-- Système de notifications global -->
    <NotificationSystem />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NotificationSystem from '~/components/ui/NotificationSystem.vue'

const route = useRoute()

// Lecture globale du rôle (Cookie Nuxt) avec protection par défaut
const currentRole = useCookie('authRole', { default: () => 'etudiant' })

const currentRoute = computed(() => {
  const path = route.path
  if (['/admin', '/secretariat', '/enseignant', '/etudiant'].includes(path)) return 'Dashboard'
  return path.split('/').pop().charAt(0).toUpperCase() + path.split('/').pop().substring(1)
})

// Définition centralisée de tous les liens existants
const allLinks = [
  { path: '/etudiants', label: 'Étudiants', roles: ['admin', 'secretariat'] },
  { path: '/saisie', label: 'Saisie Notes', roles: ['admin', 'secretariat', 'enseignant'] },
  { path: '/referentiels', label: 'Référentiels', roles: ['admin'] },
  { path: '/deliberations', label: 'Délibérations', roles: ['admin', 'secretariat'] },
  { path: '/bulletins', label: 'Bulletins', roles: ['admin', 'secretariat', 'etudiant'] },
  { path: '/profil', label: 'Profil', roles: ['admin', 'secretariat', 'enseignant', 'etudiant'] }
]

// Filtrage basé sur le profil
const allowedLinks = computed(() => {
  return allLinks.filter(link => link.roles.includes(currentRole.value))
})
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--bg-color);
}

.sidebar {
  width: 220px;
  background-color: var(--theme-dark);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
  box-shadow: 2px 0 6px rgba(0,0,0,0.08);
}

.sidebar-header {
  padding: 1.125rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header h1 {
  font-size: 1.25rem;
  color: white;
  font-weight: 700;
  letter-spacing: -0.375px;
}

.sidebar-nav {
  padding: 1.125rem 0.875rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.625rem 0.875rem;
  color: rgba(255,255,255,0.7);
  border-radius: calc(var(--radius) * 0.875);
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  text-decoration: none;
}

.nav-link:hover {
  background-color: rgba(255,255,255,0.1);
  color: white;
}

.router-link-active {
  background-color: rgba(255,255,255,0.2);
  color: white !important;
}

.sidebar-footer {
  padding: 0.75rem;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.logout-btn {
  color: #fca5a5;
  justify-content: center;
}

.logout-btn:hover {
  background-color: rgba(239, 68, 68, 0.2);
  color: white;
}

.main-content {
  flex: 1;
  margin-left: 220px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.topbar {
  height: 56px;
  background-color: white;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  position: sticky;
  top: 0;
  z-index: 5;
}

.breadcrumb {
  font-weight: 600;
  color: var(--text-main);
  font-size: 0.95rem;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 500;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.75rem;
}

.role-lbl {
  font-size: 0.775rem;
  color: var(--text-muted);
}

.page-container {
  padding: 1.5rem;
  flex: 1;
}
</style>
