import { useLocalStorage, StorageSerializers } from "@vueuse/core"
import { defineStore } from "pinia"

export const useAuthStore = defineStore("auth", () => {
   const user = useLocalStorage<Model.User | null>("auth-user", null, {
      deep: true,
      serializer: StorageSerializers.object
   })
   const token = useLocalStorage<string | null>("auth-token", null, {
      shallow: true,
   })

   return {
      token,
      user,
   }
})
