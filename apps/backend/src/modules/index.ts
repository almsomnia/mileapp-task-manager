import { Router } from "express"
import { authRouter } from "./auth/auth.route"

type ModuleRoute = {
   path: string
   router: Router
}

export const moduleRoutes: ModuleRoute[] = [
   { path: "/auth", router: authRouter  },
]