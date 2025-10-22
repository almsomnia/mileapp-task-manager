export const paginate = <T>(data: T[], page: number, perPage: number) => {
   let _perPage = perPage > 0 && perPage || data.length
   let _page = page > 0 && page || 1
   const safeLimit = Math.max(0, _perPage)
   const safeOffset = Math.max(0, _page - 1)

   const startIndex = safeOffset
   const endIndex = startIndex + safeLimit

   return {
      data: data.slice(startIndex, endIndex),
      meta: {
         page: _page,
         per_page: _perPage
      }
   }
}
