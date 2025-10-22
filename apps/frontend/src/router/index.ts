import { createRouter, createWebHistory } from 'vue-router'
import { routes as authRoutes } from "./auth"
import Index from '@/pages/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
      path: "/",
      component: Index
   },
   ...authRoutes
  ],
})

export default router
