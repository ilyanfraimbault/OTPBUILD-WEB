<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Summoner } from '@/types'
import { getSummonerIconUrl } from '@/services/cdragonService.ts'

const props = defineProps<{
  summoner: Summoner
}>()

const summonerIconUrl = ref('')
const isLoading = ref(true)
const hasError = ref(false)

onMounted(async () => {
  try {
    isLoading.value = true
    summonerIconUrl.value = await getSummonerIconUrl(props.summoner?.profileIconId)
  } catch (error) {
    console.error('Error loading summoner icon:', error)
    hasError.value = true
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div v-if="props.summoner" class="summoner-card">
    <div class="summoner-header">
      <div class="summoner-icon">
        <div v-if="isLoading" class="loading-icon">Loading...</div>
        <img v-else-if="summonerIconUrl" :src="summonerIconUrl" alt="Profile Icon" />
        <div v-else-if="hasError" class="error-icon">!</div>
        <div v-else class="default-icon"></div>
      </div>
      <div class="summoner-info">
        <h2>{{ props.summoner.gameName }} #{{ props.summoner.tagLine }}</h2>
        <p>Level: {{ props.summoner.level }}</p>
      </div>
    </div>

    <div class="summoner-details">
      <div class="detail-item">
        <span class="label">Summoner ID:</span>
        <span class="value">{{ props.summoner.id }}</span>
      </div>
      <div class="detail-item">
        <span class="label">Account ID:</span>
        <span class="value">{{ props.summoner.accountId }}</span>
      </div>
      <div class="detail-item">
        <span class="label">PUUID:</span>
        <span class="value">{{ props.summoner.puuid }}</span>
      </div>
      <div class="detail-item">
        <span class="label">Platform:</span>
        <span class="value">{{ props.summoner.platformId }}</span>
      </div>
      <div class="detail-item">
        <span class="label">Last Updated:</span>
        <span class="value">{{ new Date(props.summoner.revisionDate).toLocaleString() }}</span>
      </div>
    </div>
  </div>
  <div v-else class="summoner-card error-card">
    <p>Summoner data not available</p>
  </div>
</template>

<style scoped>
.summoner-card {
  background-color: #242424;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.error-card {
  padding: 2rem;
  text-align: center;
  color: #ff5252;
}

.summoner-header {
  display: flex;
  padding: 1.5rem;
  border-bottom: 1px solid #444444;
}

.summoner-icon {
  width: 80px;
  height: 80px;
  overflow: hidden;
  margin-right: 1.5rem;
  border: 2px solid rgba(176, 176, 176, 0.25);
  border-radius: 10px;
}

.summoner-icon img,
.summoner-icon .loading-icon,
.summoner-icon .error-icon,
.summoner-icon .default-icon {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: cover;
}

.summoner-icon .loading-icon {
  background-color: #f5f5f5;
  color: #666;
  font-size: 0.8rem;
}

.summoner-icon .error-icon {
  background-color: #ffebee;
  color: #f44336;
  font-size: 1.5rem;
  font-weight: bold;
}

.summoner-icon .default-icon {
  background-color: #e0e0e0;
}

.summoner-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.summoner-info h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: #ffffff;
}

.summoner-info p {
  margin: 0;
  color: #aaaaaa;
}

.summoner-details {
  padding: 1.5rem;
}

.detail-item {
  display: flex;
  margin-bottom: 0.75rem;
}

.detail-item:last-child {
  margin-bottom: 0;
}

.label {
  font-weight: bold;
  width: 120px;
  color: #aaaaaa;
}

.value {
  flex: 1;
  word-break: break-all;
  color: #ffffff;
}

@media (max-width: 600px) {
  .summoner-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .summoner-icon {
    margin-right: 0;
    margin-bottom: 1rem;
  }

  .detail-item {
    flex-direction: column;
  }

  .label {
    width: 100%;
    margin-bottom: 0.25rem;
  }
}
</style>
