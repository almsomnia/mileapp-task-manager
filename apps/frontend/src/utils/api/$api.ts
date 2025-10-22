import { useAuthStore } from "@/stores/auth"
import { ofetch, type FetchOptions } from "ofetch"

export const $api = <T = unknown>(endpoint: string, opts?: FetchOptions) => {
   const handler = ofetch.create({
      baseURL: import.meta.env.APP_API_URL,
      ...opts,
      onRequest: ({ request, options }) => {
         const authStore = useAuthStore()
         options.headers.set("Accept", "application/json")
         if (authStore.token) {
            options.headers.set("Authorization", `Bearer ${authStore.token}`)
         }
      },
      onResponse: ({ response }) => {
         return response._data
      },
   })

   return handler<T>(endpoint)
}
