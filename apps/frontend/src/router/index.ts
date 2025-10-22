import { createRouter, createWebHistory } from "vue-router"
import { routes as authRoutes } from "./auth"
import { useAuthStore } from "@/stores/auth"
import { h } from "vue"
import DefaultLayout from "@/components/layouts/default/DefaultLayout.vue"

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: "/",
         component: () => import("@/pages/index.vue"),
         meta: {
            layout: h(DefaultLayout),
            title: "Task List"
         },
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
