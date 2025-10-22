import { z } from "zod"

export const $taskSchema = () => {
   const base = z.object({
      title: z.string(),
      status: z.enum(["TODO", "PROGRESS", "DONE"]),
      due_date: z.iso.date()
   })

   return {
      base
   }
}
