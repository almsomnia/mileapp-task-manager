import { Router } from "express"
import { TaskController } from "./task.controller"
import { authGuard } from "@/middlewares/auth"

const router = Router()
const c = new TaskController()

router.use(authGuard)
router.get("/", c.get)
router.post("/", c.create)
router.put("/:id", c.update)
router.delete("/:id", c.delete)

export { router as taskRouter }