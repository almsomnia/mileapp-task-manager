declare namespace API {
   type Response<T, M extends Record<string, any> = {}> = {
      data: T
      meta: {
         message: string
      } & M
      error: {
         message: string
         stack: string
      } | null
   }
}
