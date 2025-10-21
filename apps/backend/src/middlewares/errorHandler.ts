import { Request, Response, NextFunction } from "express"
import { httpResponse } from "@/utils/httpResponse"

export function errorHandler(
   err: Error,
   req: Request,
   res: Response,
   next: NextFunction
) {
   console.error(err)
   res.status(500).json(
      httpResponse(null, undefined, {
         message: err.message,
         stack: err.stack,
      })
   )
}
