import { ofetch, type FetchOptions } from "ofetch"

export const $api = <T = unknown>(endpoint: string, opts?: FetchOptions) => {
   const handler = ofetch.create({
      baseURL: import.meta.env.APP_API_URL,
      ...opts,
      onRequest: ({ request, options }) => {
         options.headers.set("Accept", "application/json")
      },
      onResponse: ({ response }) => {
         return response._data
      },
   })

   return handler<T>(endpoint)
}
