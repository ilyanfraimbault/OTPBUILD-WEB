<script setup lang="ts">
import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import { searchSummonerByQuery } from '@/services/otpbuildService'

import type { Summoner } from '@/types.ts'

import SummonerSuggestion from '@/components/SummonerSuggestion.vue'
import router from '@/router'

const searchInput = ref('')
const suggestions: Ref<Summoner[]> = ref([])
const showSuggestions = ref(false)
const searchBarRef = ref<HTMLElement | null>(null)
const selectedIndex = ref(0)

async function autoComplete() {
  if (!searchInput.value) {
    showSuggestions.value = false
    return
  }

  try {
    const value = await searchSummonerByQuery(searchInput.value)
    suggestions.value = value.reverse()
    showSuggestions.value = true
  } catch (error) {
    console.error('Error fetching summoner suggestions:', error)
  }
}

async function handleKeys(event: KeyboardEvent) {
  if (!searchInput.value.trim()) {
    showSuggestions.value = false
    return
  }

  const { key } = event

  if (key === 'Enter') {
    const suggestion = suggestions.value[selectedIndex.value]
    emptyInput()

    selectedIndex.value = 0
    await router.push({
      name: 'summonerByRiotId',
      params: { gameName: suggestion.gameName, tagLine: suggestion.tagLine }
    })

    return
  } else if (key === 'Escape') {
    event.preventDefault()
    event.stopPropagation()
    showSuggestions.value = false
    return
  } else if (key === 'Backspace' || key === 'Delete' || key.length === 1) {
    await autoComplete()
    selectedIndex.value = 0
  }

  if (key === 'ArrowDown' || key === 'ArrowUp') {
    const direction = key === 'ArrowDown' ? 1 : -1
    selectedIndex.value =
      (selectedIndex.value + direction + suggestions.value.length) % suggestions.value.length

    const suggestion = suggestions.value[selectedIndex.value]
    searchInput.value = `${suggestion.gameName}#${suggestion.tagLine}`.trim()
  }

  const summonersSuggestions = document.querySelectorAll<HTMLElement>('.summoner-suggestion')

  summonersSuggestions.forEach((item, index) => {
    item.classList.toggle('selected', index === selectedIndex.value)
  })
}

function handleClickOutside(event: MouseEvent) {
  if (searchBarRef.value && !searchBarRef.value.contains(event.target as Node)) {
    showSuggestions.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

function emptyInput() {
  searchInput.value = ''
  showSuggestions.value = false
  suggestions.value = []
}
</script>

<template>
  <div ref="searchBarRef" class="search-form form-group">
    <input
      v-model="searchInput"
      type="text"
      placeholder="Search for a player..."
      @keyup="handleKeys"
      @focus="showSuggestions = true"
      id="searchInput"
    />
    <ul v-if="showSuggestions && suggestions.length > 0" class="suggestions">
      <li
        v-for="summoner in suggestions"
        :key="summoner.id"
        class="suggestion-item"
        @click="emptyInput"
      >
        <SummonerSuggestion :summoner="summoner" class="summoner-suggestion" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.form-group {
  margin: 0 auto;
  position: relative;
  width: 500px;
}

.search-form input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search-form input:focus {
  outline: none;
  border-color: #e18878;
  box-shadow: 0 0 5px rgba(225, 136, 120, 0.5);
  background-color: #242424;
}

.search-form input {
  flex: 1;
  padding: 0.8rem 1.2rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  background-color: #1a1a1a;
  color: rgba(255, 255, 255, 0.87);
  font-size: 1rem;
  transition: all 0.3s ease;
  width: 500px;
}

.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 400px;
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

.summoner-suggestion:hover,
.selected {
  background-color: #444444;
}
</style>
