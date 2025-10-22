import { $api } from "@/utils/api/$api"
import { useLocalStorage, StorageSerializers } from "@vueuse/core"
import { defineStore } from "pinia"
import { useAppStore } from "./app"
import { useRouter } from "vue-router"

export const useAuthStore = defineStore("auth", () => {
   const user = useLocalStorage<Model.User | null>("auth-user", null, {
      deep: true,
      serializer: StorageSerializers.object,
   })
   const token = useLocalStorage<string | null>("auth-token", null, {
      shallow: true,
   })

   const router = useRouter()
   const appStore = useAppStore()

   async function login(payload: Record<"email" | "password", string>) {
      const response = await $api<API.Response<Model.User, { token: string }>>(
         "/auth/login",
         {
            method: "post",
            body: payload,
         }
      )

      token.value = response.meta.token
      user.value = response.data

      appStore.notify("Login success", "info")
      await router.push("/")
   }

   async function logout(cb?: Function) {
      user.value = null
      token.value = null
      appStore.notify("Logout Success", "info")
      cb?.()
      await router.push("/auth/login")
   }

   return {
      token,
      user,
      login,
      logout,
   }
})
