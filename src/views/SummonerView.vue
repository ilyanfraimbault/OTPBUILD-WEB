<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import SummonerInfos from '../components/SummonerInfos.vue';
import { getSummonerByRiotId, getSummonerByPuuid } from '../services/otpbuildService';
import type { Summoner as SummonerType } from '../types';

const route = useRoute();
const summoner = ref<SummonerType | null>(null);
const loading = ref(true);
const error = ref('');

async function fetchSummonerData() {
  loading.value = true;
  error.value = '';
  summoner.value = null;

  try {
    if (route.params.puuid) {
      summoner.value = await getSummonerByPuuid(route.params.puuid as string);
    } else if (route.params.gameName && route.params.tagLine) {
      summoner.value = await getSummonerByRiotId(
        route.params.gameName as string,
        route.params.tagLine as string
      );
    } else {
      error.value = 'Invalid route parameters';
    }
  } catch (err) {
    error.value = 'Failed to fetch summoner data';
    console.error(err);
  } finally {
    loading.value = false;
  }
}

// Fetch data when component is mounted
onMounted(fetchSummonerData);

// Watch for changes in route params and re-fetch data when they change
watch(() => route.params, fetchSummonerData, { deep: true });

</script>

<template>
  <div class="summoner-view">
    <div v-if="error" class="error">
      <div class="error-content">
        <div class="error-icon">⚠️</div>
        <div class="error-message">{{ error }}</div>
      </div>
    </div>

    <div v-else-if="summoner" class="summoner-container">
      <SummonerInfos :summoner="summoner" />
    </div>

    <div v-else class="not-found">
      Summoner not found
    </div>
  </div>
</template>

<style scoped>
.summoner-view {
  width: 100%;
  padding: 30px;
}

.not-found {
  text-align: center;
  padding: 2rem;
  background-color: rgba(245, 245, 245, 0);
  border-radius: 8px;
  margin-bottom: 2rem;
}

.error {
  text-align: center;
  padding: 1.5rem;
  background-color: #242424;
  border-radius: 8px;
  margin-bottom: 2rem;
  border: 1px solid #ff5252;
  box-shadow: 0 4px 8px rgba(255, 82, 82, 0.1);
}

.error-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.error-icon {
  font-size: 2rem;
}

.error-message {
  color: #ff5252;
  font-weight: 500;
  font-size: 1.1rem;
}

.summoner-container {
  margin-top: 2rem;
}
</style>
