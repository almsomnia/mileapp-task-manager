import { z } from "zod"

export const $authSchema = () => {
   const login = z.object({
      email: z.email(),
      password: z.string(),
   })

   return {
      login
   }
}
