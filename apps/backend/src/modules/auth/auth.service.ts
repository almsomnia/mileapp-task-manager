import * as uuid from "uuid"
import { db } from "@/config/db/connection"

export class AuthService {
   public async login(payload: any) {
      const { password, ...user } = db.users[0]

      return Promise.resolve({
         user: user,
         token: uuid.v4().replaceAll("-", ""),
      })
   }
}
