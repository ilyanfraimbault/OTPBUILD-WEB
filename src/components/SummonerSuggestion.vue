<script setup lang="ts">
import type { Summoner } from '@/types.ts'
import { onMounted, ref } from 'vue'
import { getSummonerIconUrl } from '@/services/cdragonService.ts'
import { useRouter } from 'vue-router'

const props = defineProps<{
  summoner: Summoner
}>()

const router = useRouter()
const summonerIconUrl = ref('')

onMounted(async () => {
  summonerIconUrl.value = await getSummonerIconUrl(props.summoner?.profileIconId)
})

function redirectToSummonerPage() {
  router.push({
    name: 'summonerByRiotId',
    params: {
      gameName: props.summoner.gameName,
      tagLine: props.summoner.tagLine,
    },
  })
}
</script>

<template>
  <div class="summoner-suggestion" @click="redirectToSummonerPage">
    <div class="summoner-icon">
      <img
        :src="summonerIconUrl"
        :alt="`${props.summoner.gameName}#${props.summoner.tagLine} Icon`"
      />
    </div>
    <div class="summoner-infos">
      <div class="summoner-name-tagline">
        {{ props.summoner.gameName }} #{{ props.summoner.tagLine }}
      </div>
    </div>
    <div class="summoner-platform">
      {{ props.summoner.platformId }}
    </div>
  </div>
</template>

<style scoped>
.summoner-icon {
  width: 40px;
  height: 40px;
  overflow: hidden;
  margin-right: 1.5rem;
  border: 2px solid rgba(176, 176, 176, 0.25);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.summoner-platform {
  margin-left: auto;
}

.summoner-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.summoner-suggestion {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #242424;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 50px;
}

.summoner-infos {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-weight: bolder;
}

.summoner-suggestion:hover {
  background-color: #2b2b2b;
}
</style>
