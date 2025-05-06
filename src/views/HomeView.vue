<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchInput = ref('')

function searchSummoner() {
  if (!searchInput.value) {
    return
  }

  // Split the input by # to get gameName and tagLine
  const parts = searchInput.value.split('#')
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    // Handle invalid input format
    alert('Please enter a valid format: GameName#TagLine')
    return
  }

  const gameName = parts[0]
  const tagLine = parts[1]

  router.push({
    name: 'summonerByRiotId',
    params: {
      gameName: gameName,
      tagLine: tagLine,
    },
  })

  // Reset form after submission
  searchInput.value = ''
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

      <div class="search-container">
        <div class="search-form">
          <input
            v-model="searchInput"
            type="text"
            placeholder="Search for a player..."
            @keyup.enter="searchSummoner"
          />
        </div>
      </div>
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
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  /*-webkit-linear-gradient(315deg, #C95792 25%, #F8B55F)*/
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

h2 {
  font-size: 1.5rem;
  margin: 0;
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  /*-webkit-linear-gradient(315deg, #C95792 25%, #F8B55F)*/
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

.search-container {
  margin-top: 2rem;
  width: 100%;
}

.search-form {
  display: flex;
  max-width: 600px;
  margin: 0 auto;
  gap: 0.75rem;
}

.search-form input {
  flex: 1;
  padding: 0.8rem 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  background-color: #1a1a1a;
  color: rgba(255, 255, 255, 0.87);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-form input:focus {
  outline: none;
  /*
  border-color: rgba(66, 184, 131, 0.55);
  */
  box-shadow: 0 0 5px 3px rgba(0, 255, 143, 0.38);
}

.search-form input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}
</style>
