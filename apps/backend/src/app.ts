import express from "express"
import cors from "cors"
import { moduleRoutes } from "./modules"
import { errorHandler } from "./middlewares/errorHandler"

const app = express()

app.use(cors())
app.use(express.json())

// Module registration
moduleRoutes.forEach((module) => {
   app.use(module.path, module.router)
})

// Global error handler
app.use(errorHandler)

export default app