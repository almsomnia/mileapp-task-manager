import Login from "@/pages/auth/login.vue"
import type { RouteRecordRaw } from "vue-router"

export const routes: RouteRecordRaw[] = [
   {
      path: "/auth",
      children: [
         {
            path: "login",
            component: Login
         }
      ]
   }
]