<script setup lang="ts">
import { ref, defineProps, defineEmits, type Ref } from 'vue'
import { searchSummonerByQuery } from '@/services/otpbuildService';
import type { Summoner } from '@/types.ts'

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Search for a player...'
  },
  width: {
    type: String,
    default: '500px'
  },
  variant: {
    type: String,
    default: 'header' // 'header' or 'home'
  }
});

const searchInput = ref('');

const emit = defineEmits(['search']);
const suggestions: Ref<Summoner[]> = ref([]);

function handleSearch() {
  if (!searchInput.value) {
    return;
  }

  const parts = searchInput.value.split('#');
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    if (props.variant === 'home') {
      alert('Please enter a valid format: GameName#TagLine');
    }
    return;
  }

  const gameName = parts[0];
  const tagLine = parts[1];

  emit('search', { gameName, tagLine });

  searchInput.value = '';
}

async function autoComplete() {
  if (searchInput.value.length < 3) return;

  suggestions.value = await searchSummonerByQuery(searchInput.value);
  console.log(suggestions);
}
</script>

<template>
  <div :class="['search-container', `search-${variant}`]">
    <div :class="variant === 'header' ? 'form-group' : 'search-form'">
      <input
        v-model="searchInput"
        type="text"
        :placeholder="placeholder"
        @keyup.enter="handleSearch"
        @keyup="autoComplete"
      />
    </div>
  </div>
</template>

<style scoped>

.form-group {
  width: v-bind('width');
  margin: 0 auto;
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
  border-color: #F8B55F;
  background-color: #242424;
  box-shadow: 0 0 0 3px rgba(248, 181, 95, 0.46);
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
  box-shadow: 0 0 5px 3px rgba(248, 181, 95, 0.54);
}

.search-form input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}
</style>
