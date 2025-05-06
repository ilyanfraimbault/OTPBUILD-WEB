<script setup lang="ts">
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import { ref, computed } from 'vue';

const router = useRouter();
const route = useRoute();
const searchInput = ref('');

// Check if we're on the home page
const isHomePage = computed(() => {
  return route.name === 'home';
});

function searchByRiotId() {
  if (!searchInput.value) {
    return;
  }

  // Split the input by # to get gameName and tagLine
  const parts = searchInput.value.split('#');
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    return;
  }

  const gameName = parts[0];
  const tagLine = parts[1];

  router.push({
    name: 'summonerByRiotId',
    params: {
      gameName: gameName,
      tagLine: tagLine
    }
  });

  searchInput.value = '';
}
</script>

<template>
  <div class="app-container">
    <header>
      <div class="menu-bar">
        <div class="logo">
          <RouterLink to="/">
            <h2>OTP Build</h2>
          </RouterLink>
        </div>
        <div v-if="!isHomePage" class="search-container">
            <div class="form-group">
              <input
                id="searchInput"
                v-model="searchInput"
                type="text"
                placeholder="Search for a player..."
                @keyup.enter="searchByRiotId"
              />
          </div>
        </div>
        <div class="nav-container">
          <nav>
            <RouterLink to="/" class="nav-link">Home</RouterLink>
            <RouterLink to="/champion" class="nav-link">Champion</RouterLink>
            <RouterLink to="/ranking" class="nav-link">Ranking</RouterLink>
          </nav>
        </div>
      </div>
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <p>&copy; 2025 OTP Build. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #1a1a1a;
  color: #f0f0f0;
}

header {
  background-color: #1a1a1a;
  color: white;
  padding: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.menu-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
}

.logo {
  display: flex;
  align-items: center;
}

.logo a {
  text-decoration: none;
}

.logo .router-link-active {
  border-bottom: none;
}

.logo h1, .logo h2 {
  font-size: 1.5rem;
  margin: 0;
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: bold;
}

.nav-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

nav {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-link:hover {
  color: #42d392;
  transform: translateY(-1px);
  transition: all 0.2s ease-in-out;
}
.search-container {
  display: flex;
  align-items: center;
  margin: 0 1rem;
}

.form-group {
  width: 500px;
}

.form-group input {
  width: 100%;
  padding: 0.6rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  background-color: #242424;
  color: rgba(255, 255, 255, 0.87);
  transition: all 0.3s ease;
}

.form-group input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.form-group input:focus {
  outline: none;
  border-color: #42b883;
  background-color: #242424;
  box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.3);
}

.search-submit {
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.6rem 1rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.search-submit:hover {
  background-color: #3aa876;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(66, 184, 131, 0.5);
}

main {
  flex: 1;
  padding: 0;
  width: 100%;
}

footer {
  background-color: #1a1a1a;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  padding: 1rem 0;
  margin-top: auto;
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .menu-bar {
    flex-direction: column;
    padding: 1rem;
    gap: 0.75rem;
  }

  .nav-container {
    width: 100%;
    justify-content: center;
  }

  .search-container {
    width: 100%;
    margin: 0.5rem 0;
    justify-content: center;
  }

  .form-group {
    width: 100%;
  }

  nav {
    margin-top: 0;
    justify-content: center;
  }
}
</style>
