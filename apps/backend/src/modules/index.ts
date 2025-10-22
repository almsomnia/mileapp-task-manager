import { Router } from "express"
import { authRouter } from "./auth/auth.route"
import { taskRouter } from "./tasks/task.route"

type ModuleRoute = {
   path: string
   router: Router
}

const moduleRoutes: ModuleRoute[] = [
   { path: "/auth", router: authRouter },
   { path: "/tasks", router: taskRouter },
]

const router = Router()

moduleRoutes.forEach((module) => {
   router.use(module.path, module.router)
})

export { router as moduleRouter }
