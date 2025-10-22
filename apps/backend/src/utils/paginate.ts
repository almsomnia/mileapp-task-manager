export const paginate = <T>(data: T[], page: number, perPage: number) => {
   const total = data.length
   perPage = perPage > 0 && perPage || total
   const totalPages = Math.ceil(total / perPage)

   const currentPage = Math.min(Math.max(page, 1), totalPages)

   const start = (currentPage - 1) * perPage
   const end = start + perPage
   const items = data.slice(start, end)

   return {
      data: items,
      meta: {
         page: currentPage,
         per_page: perPage,
         total
      }
   }
}
