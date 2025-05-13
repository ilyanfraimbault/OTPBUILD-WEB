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
        {{ props.summoner.gameName }}#{{ props.summoner.tagLine }}
      </div>
    </div>
    <div class="summoner-platform">
      {{ props.summoner.platformId }}
    </div>
  </div>
</template>

<style scoped>
@import "@/components/css/summoner-suggestion.css";
</style>
