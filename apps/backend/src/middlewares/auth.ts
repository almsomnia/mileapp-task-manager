import { Request, Response, NextFunction } from "express"
import { HttpError } from "@/config/errors/HttpError"

export function authGuard(req: Request, res: Response, next: NextFunction) {
   try {
      const authError = new HttpError("Unauthorized", 401)

      const authHeader = req.header("authorization")

      if (!authHeader || !authHeader.includes("Bearer")) {
         throw authError
      }

      const token = authHeader.split(" ")[1]
      if (!token) {
         throw authError
      }

      next()
   } catch (e) {
      next(e)
   }
}
