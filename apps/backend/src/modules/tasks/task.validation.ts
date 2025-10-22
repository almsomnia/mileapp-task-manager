import { z } from "zod"

const baseSchema = z.object({
   title: z.string(),
   status: z.enum(["TODO", "PROGRESS", "DONE"]),
   due_date: z.iso.date()
})

export const schema = {
   create: baseSchema,
   update: baseSchema,
}

export type InferredSchema = z.infer<typeof baseSchema>