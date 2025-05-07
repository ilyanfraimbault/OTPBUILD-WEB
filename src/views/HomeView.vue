<script setup lang="ts">
import { useRouter } from 'vue-router'
import SearchBar from '@/components/SearchBar.vue'

const router = useRouter()

function handleSearch(data: { gameName: string; tagLine: string }) {
  router.push({
    name: 'summonerByRiotId',
    params: {
      gameName: data.gameName,
      tagLine: data.tagLine,
    },
  })
}
</script>

<template>
  <main>
    <div class="welcome-container">
      <h1>Welcome to OTP Build</h1>
      <p class="welcome-text">
        Explore top-tier champion builds and stats from the best one-trick ponies in League of
        Legends. Focused insights, real data.
      </p>
      <SearchBar variant="home" @search="handleSearch" />
    </div>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
}

.welcome-container {
  max-width: 800px;
  text-align: center;
  padding: 3rem 2rem;
  background-color: #242424;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

h1 {
  font-size: 2.75rem;
  margin-bottom: 1.5rem;
  background: -webkit-linear-gradient(315deg, #c95792 25%, #f8b55f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

h2 {
  font-size: 1.5rem;
  margin: 0;
  background: -webkit-linear-gradient(315deg, #c95792 25%, #f8b55f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: bold;
}

.welcome-text {
  font-size: 1.25rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.87);
  margin-bottom: 2rem;
}

</style>
