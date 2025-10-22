import express from "express"
import cors from "cors"
import { moduleRouter } from "./modules"
import { errorHandler } from "./middlewares/errorHandler"

const app = express()

app.use(cors())
app.use(express.json())

// Module registration
app.use("/api", moduleRouter)

// Global error handler
app.use(errorHandler)

export default app