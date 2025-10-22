import { defineStore } from "pinia"
import { computed } from "vue"

export const useAuthStore = defineStore("auth", () => {
   const token = computed({
      get: () => {
         return localStorage.getItem("auth-token")
      },
      set: (value: string | null) => {
         if (!value) {
            localStorage.removeItem("auth-token")
            return
         }
         localStorage.setItem("auth-token", value)
      },
   })

   const user = computed<Model.User | null>({
      get: () => {
         const stringified = localStorage.getItem("auth-user")
         if (!stringified) return stringified
         return JSON.parse(stringified)
      },
      set: (value) => {
         if (!value) {
            localStorage.removeItem("auth-user")
            return
         }
         const stringified = JSON.stringify(value)
         localStorage.setItem("auth-user", stringified)
      },
   })

   return {
      token,
      user,
   }
})
