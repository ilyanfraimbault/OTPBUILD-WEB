<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Summoner from '../components/Summoner.vue';
import { getSummonerByRiotId, getSummonerByPuuid } from '../services/otpbuildService';
import type { Summoner as SummonerType } from '../types';

const route = useRoute();
const summoner = ref<SummonerType | null>(null);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    // Check which route parameters are available
    if (route.params.puuid) {
      // Fetch summoner by PUUID
      summoner.value = await getSummonerByPuuid(route.params.puuid as string);
    } else if (route.params.gameName && route.params.tagLine) {
      // Fetch summoner by Riot ID
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
});
</script>

<template>
  <div class="summoner-view">
    <div v-if="loading" class="loading">
      Loading summoner data...
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else-if="summoner" class="summoner-container">
      <Summoner :summoner="summoner" />
    </div>

    <div v-else class="not-found">
      Summoner not found
    </div>
  </div>
</template>

<style scoped>
.summoner-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.loading, .error, .not-found {
  text-align: center;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.error {
  color: red;
}

.summoner-container {
  margin-top: 2rem;
}
</style>
