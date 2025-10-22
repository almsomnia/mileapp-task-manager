import { createRouter, createWebHistory } from "vue-router"
import { routes as authRoutes } from "./auth"
import Index from "@/pages/index.vue"
import { useAuthStore } from "@/stores/auth"

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: "/",
         component: Index,
         beforeEnter: (to, from) => {
            const authStore = useAuthStore()
            if (!authStore.token) {
               return {
                  path: "/auth/login"
               }
            }
         }
      },
      ...authRoutes,
   ],
})

export default router
