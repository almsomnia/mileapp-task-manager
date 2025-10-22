import Login from "@/pages/auth/login.vue"
import { useAuthStore } from "@/stores/auth"
import type { RouteRecordRaw } from "vue-router"

export const routes: RouteRecordRaw[] = [
   {
      path: "/auth",
      children: [
         {
            path: "login",
            component: Login,
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