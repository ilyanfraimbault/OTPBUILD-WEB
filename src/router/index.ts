import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/summoner/:gameName/:tagLine",
      name: "summonerByRiotId",
      component: () => import("@/views/SummonerView.vue"),
    },
    {
      path: "/summoner/puuid/:puuid",
      name: "summonerByPuuid",
      component: () => import("@/views/SummonerView.vue"),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: () => {
        return { name: 'home' }
      }
    }
  ],
})

export default router
