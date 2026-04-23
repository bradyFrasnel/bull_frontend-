<template>
  <div class="landing-page">
    <div class="overlay"></div>
    <div class="content-wrapper">
      <header class="landing-header">
        <h1>Bienvenue sur Bull ASUR</h1>
        <p>Le portail de gestion des bulletins de notes <strong>DAR 3</strong></p>
      </header>

      <div class="roles-grid">
        <NuxtLink to="/login?role=etudiant" class="role-card etudiant-theme">
          <h2>Espace Étudiant</h2>
          <p>Consultez vos notes officielles.</p>
        </NuxtLink>

        <NuxtLink to="/login?role=enseignant" class="role-card enseignant-theme">
          <h2>Espace Enseignant</h2>
          <p>Gerez vos evaluations simplement.</p>
        </NuxtLink>

        <NuxtLink to="/login?role=secretariat" class="role-card secretariat-theme">
          <h2>Secrétariat Pédagogique</h2>
          <p>Gestion administrative de l'ensemble du personnel.</p>
        </NuxtLink>

        <NuxtLink to="/login?role=admin" class="role-card admin-theme">
          <h2>Administrateur</h2>
          <p>Management système.</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'empty'
})

useHead({
  title: 'Accueil | Bull ASUR'
})
</script>

<style scoped>
.landing-page {
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Image en arrière-plan */
  background-image: url('~/assets/images/acceuil_bull.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.7); /* Couche sombre pour lisibilité */
  z-index: 1;
}

.content-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1000px;
  padding: 1.5rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.landing-header {
  text-align: center;
  margin-bottom: 3rem;
}

.landing-header h1 {
  font-size: 2.75rem;
  font-weight: 700;
  letter-spacing: -0.75px;
  margin-bottom: 0.75rem;
  text-shadow: 0 3px 4px rgba(0,0,0,0.25);
}

.landing-header p {
  font-size: 1.05rem;
  font-weight: 300;
  color: rgba(255,255,255,0.9);
  text-shadow: 0 1px 3px rgba(0,0,0,0.25);
}

.roles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
  width: 100%;
}

.role-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 3px solid transparent;
  border-radius: 0.875rem;
  padding: 2rem 1.5rem;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.role-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 12px 16px -4px rgba(0,0,0,0.25);
}

/* Thèmes par couleur selon le rôle */
.etudiant-theme { border-bottom-color: #3b82f6; }
.enseignant-theme { border-bottom-color: #10b981; }
.secretariat-theme { border-bottom-color: #8b5cf6; }
.admin-theme { border-bottom-color: #f59e0b; }

.role-card h2 {
  font-size: 1.25rem;
  font-weight: 650;
  margin-bottom: 0.75rem;
}

.role-card p {
  font-size: 0.825rem;
  line-height: 1.5;
  opacity: 0.85;
}

@media (max-width: 768px) {
  .landing-header h1 { font-size: 2rem; }
  .landing-header p { font-size: 0.9rem; }
  .roles-grid { grid-template-columns: 1fr; }
}
</style>
