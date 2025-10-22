import { ref } from "vue"
import { type ZodType, type infer as InferType, ZodError } from "zod"

export function useValidation<S extends ZodType>(schema: S) {
   const errors = ref<Record<string, any>>({})

   const validate = <T extends Record<keyof InferType<S>, any>>(
      data: T
   ): InferType<S> | undefined => {
      try {
         errors.value = {}
         const result = schema.parse(data)
         return result
      } catch (e) {
         if (e instanceof ZodError) {
            errors.value = e.issues.reduce((acc, curr) => {
               const key = curr.path.join(".")
               acc[key] = curr.message
               return acc
            }, {} as Record<string, string>)
         }
      }
   }

   return {
      errors,
      validate,
   }
}
