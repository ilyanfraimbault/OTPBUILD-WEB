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
</template>

<style scoped>

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
</style>
