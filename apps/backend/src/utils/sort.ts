import { HttpError } from "@/config/errors/HttpError"

export const sortByDate = <T extends Record<string, any>, K extends keyof T>(
   data: T[],
   key: K,
   direction: "asc" | "desc"
) => {
   if (direction !== "asc" && direction !== "desc") {
      throw new HttpError("Invalid sort direction", 422)
   }

   return data.toSorted((a, b) => {
      const aVal = new Date(a[key]).valueOf()
      const bVal = new Date(b[key]).valueOf()

      return direction == "asc" ? aVal - bVal : bVal - aVal
   })
}
