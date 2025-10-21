export const sortByDate = <T extends Record<string, any>, K extends keyof T>(
   data: T[],
   key: K,
   direction: "asc" | "desc"
) => {
   return data.toSorted((a, b) => {
      const aVal = new Date(a[key]).valueOf()
      const bVal = new Date(b[key]).valueOf()

      return direction == "asc" ? aVal - bVal : bVal - aVal
   })
}
