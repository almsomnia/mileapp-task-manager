import { useAuthStore } from "@/stores/auth"
import type { RouteRecordRaw } from "vue-router"

export const routes: RouteRecordRaw[] = [
   {
      path: "/auth",
      children: [
         {
            path: "login",
            component: () => import("@/pages/auth/login.vue"),
            meta: {
               layout: "div",
            },
            beforeEnter: (to, from) => {
               const authStore = useAuthStore()
               if (authStore.token) {
                  return {
                     path: "/"
                  }
               }
            }
         }
      ]
   }
]