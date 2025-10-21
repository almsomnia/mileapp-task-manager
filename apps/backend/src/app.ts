import express from "express"
import type { NextFunction, Request, Response } from "express"
import cors from "cors"
import { errorHandler } from "./middlewares/errorHandler"

const app = express()

app.use(cors())
app.use(express.json())

// Global error handler
app.use(errorHandler)

export default app