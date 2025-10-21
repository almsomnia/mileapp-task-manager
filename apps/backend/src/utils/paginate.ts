export const paginate = <T>(data: T[], page: number, perPage: number) => {
   const safeLimit = Math.max(0, perPage)
   const safeOffset = Math.max(0, page - 1)

   const startIndex = safeOffset
   const endIndex = startIndex + safeLimit

   return data.slice(startIndex, endIndex)
}
