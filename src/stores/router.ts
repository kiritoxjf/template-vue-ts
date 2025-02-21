import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Router } from 'vue-router'

export const useRouterStore = defineStore('router', () => {
  const router = ref<Router>()
  const setRouter = (r: Router) => {
    router.value = r
  }
  return {
    router,
    setRouter
  }
})
