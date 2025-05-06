<script setup lang="ts">
import { ref } from 'vue';
import Summoner from '../components/Summoner.vue';
import { getSummonerByRiotId } from '../services/otpbuildService';
import type { Summoner as SummonerType } from '../types';

const gameName = ref('');
const tagLine = ref('');
const summoner = ref<SummonerType | null>(null);
const loading = ref(false);
const error = ref('');

async function searchSummoner() {
  if (!gameName.value || !tagLine.value) {
    error.value = 'Please enter both Game Name and Tag Line';
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    summoner.value = await getSummonerByRiotId(gameName.value, tagLine.value);
  } catch (err) {
    error.value = 'Failed to fetch summoner data';
    console.error(err);
    summoner.value = null;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <main>
    <h1>OTP Build</h1>

    <div class="search-container">
      <h2>Search Summoner</h2>
      <div class="search-form">
        <div class="form-group">
          <label for="gameName">Game Name</label>
          <input
            id="gameName"
            v-model="gameName"
            type="text"
            placeholder="Enter game name"
          />
        </div>

        <div class="form-group">
          <label for="tagLine">Tag Line</label>
          <input
            id="tagLine"
            v-model="tagLine"
            type="text"
            placeholder="Enter tag line"
          />
        </div>

        <button @click="searchSummoner" :disabled="loading">
          {{ loading ? 'Searching...' : 'Search' }}
        </button>
      </div>

      <p v-if="error" class="error">{{ error }}</p>
    </div>

    <div v-if="summoner" class="summoner-container">
      <Summoner :summoner="summoner" />
    </div>
  </main>
</template>

<style scoped>
main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.search-container {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

h2 {
  margin-top: 0;
  margin-bottom: 1rem;
}

.search-form {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-end;
}

.form-group {
  flex: 1;
  min-width: 200px;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 1rem;
}

.summoner-container {
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .search-form {
    flex-direction: column;
  }

  .form-group {
    width: 100%;
  }
}
</style>
