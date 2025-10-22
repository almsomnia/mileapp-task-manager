import { Request, Response, NextFunction } from "express"
import { AuthService } from "./auth.service"
import { httpResponse } from "@/utils/httpResponse"

export class AuthController {
   private service = new AuthService()

   public login = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { user, token } = await this.service.login(req.body)
         res.status(200).json(httpResponse(user, { token }))
      } catch (e) {
         next(e)
      }
   }
}
