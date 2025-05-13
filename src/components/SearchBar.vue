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
  <div ref="searchBarRef" class="search-form">
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
@import "@/components/css/search-form.css";
</style>
