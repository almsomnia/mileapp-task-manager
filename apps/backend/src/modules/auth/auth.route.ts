import { Router } from "express"
import { AuthController } from "./auth.controller"

const router = Router()
const c = new AuthController()

router.post("/login", c.login)

export { router as authRouter }
