type ErrorParam = {
   message: string
   stack?: any
}

export const httpResponse = <T, M extends Record<PropertyKey, unknown>>(
   data: T,
   meta?: M,
   error?: ErrorParam
) => {
   const response = {
      data: data ?? null,
      meta: {
         ...meta,
         message: meta?.message ?? "",
      },
      error: error ?? null,
   }
   return response
}
