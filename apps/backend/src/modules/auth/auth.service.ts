import { createHmac, randomUUID } from "crypto"
import { db } from "@/config/db"

export class AuthService {
   public async login(payload: any) {
      const { password, ...user } = db.users[0]

      return Promise.resolve({
         user: user,
         token: randomUUID().replaceAll("-", ""),
      })
   }
}
