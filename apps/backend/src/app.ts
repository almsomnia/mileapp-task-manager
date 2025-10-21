import express from "express"
import type { NextFunction, Request, Response } from "express"
import cors from "cors"

export const app = express()

app.use(cors())
app.use(express.json())

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
   console.error(err)
   res.status(err.status || 500).json({
      message: err.message || "Internal Server Error",
   })
})
