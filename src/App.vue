<script setup lang="ts">
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import { computed } from 'vue';
import SearchBar from '@/components/SearchBar.vue';

const router = useRouter();
const route = useRoute();

const isHomePage = computed(() => {
  return route.name === 'home';
});

function handleSearch(data: { gameName: string, tagLine: string }) {
  router.push({
    name: 'summonerByRiotId',
    params: {
      gameName: data.gameName,
      tagLine: data.tagLine
    }
  });
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
        <SearchBar
          v-if="!isHomePage"
          variant="header"
          width="500px"
          @search="handleSearch"
        />
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

.logo h1, .logo h2 {
  font-size: 1.5rem;
  margin: 0;
  /*
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  */
  background: -webkit-linear-gradient(315deg, #C95792 25%, #F8B55F);
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
  color: #e18878;
  transform: translateY(-1px);
  transition: all 0.2s ease-in-out;
}

/* Search bar styling moved to SearchBar component */

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

</style>
