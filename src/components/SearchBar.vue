<script setup lang="ts">
import { ref, defineProps, type Ref } from 'vue'
import { searchSummonerByQuery } from '@/services/otpbuildService'

import type { Summoner } from '@/types.ts'

import SummonerSuggestion from '@/components/SummonerSuggestion.vue'



const searchInput = ref('')

const suggestions: Ref<Summoner[]> = ref([])

async function autoComplete() {
  if (searchInput.value === '') {
    suggestions.value = []
    return
  }

  await searchSummonerByQuery(searchInput.value).then((value) => {
    suggestions.value = value.reverse();
    console.log(value.reverse())
  })
}
</script>

<template>
  <div class="search-form form-group">
    <input v-model="searchInput" type="text" placeholder="Search for a player..." @keyup="autoComplete" />
    <ul v-if="suggestions.length > 0" class="suggestions">
      <li v-for="(summoner) in suggestions" :key="summoner.id" class="suggestion-item">
        <SummonerSuggestion :summoner="summoner" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.form-group {
  margin: 0 auto;
  position: relative;
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
  border-color: #f8b55f;
  background-color: #242424;
  box-shadow: 0 0 0 3px rgba(248, 181, 95, 0.46);
}

.search-form {
  width: 500px;
  display: flex;
  max-width: 650px;
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
  box-shadow: 0 0 5px 3px rgba(248, 181, 95, 0.54);
}

.search-form input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background-color: #1e1e1e;
  border-radius: 12px;
  z-index: 1000;
  margin-top: 0.5rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.suggestion-item {
  cursor: pointer;
  padding: 5px;
  transition: background-color 0.2s;
}

.suggestion-item:hover {
  background-color: #2b2b2b;
}

.search-container {
  position: relative;
}
</style>
