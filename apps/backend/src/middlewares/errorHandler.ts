import { Request, Response, NextFunction } from "express"
import { httpResponse } from "@/utils/httpResponse"
import { ZodError } from "zod"
import { HttpError } from "@/config/errors/HttpError"

export function errorHandler(
   err: Error,
   req: Request,
   res: Response,
   next: NextFunction
) {
   console.error(err)

   let status = 500
   let message = err.message

   if (err instanceof ZodError) {
      status = 422
      const issues = err.issues.map((i) => {
         const path = i.path.join(".")
         return `[${path}] ${i.message}`
      })
      message = issues.join("\n")
   }

   if (err instanceof HttpError) {
      status = err.statusCode
   }

   res.status(status).json(
      httpResponse(null, undefined, {
         message: message,
         stack: err.stack,
      })
   )
}
