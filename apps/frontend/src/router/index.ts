import { createRouter, createWebHistory } from 'vue-router'
import { routes as authRoutes } from "./auth"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   ...authRoutes
  ],
})

export default router
