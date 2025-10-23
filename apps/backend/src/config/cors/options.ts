import { CorsOptions } from "cors"
import { HttpError } from "../errors/HttpError"

export const corsOptions: CorsOptions = {
   origin: (origin, callback) => {
      if (
         !origin ||
         (process.env.NODE_ENV != "production" && origin.includes("localhost"))
      ) {
         return callback(null, true)
      }

      const allowed = ["https://mileapp-task-manager-frontend.vercel.app"]

      if (allowed.includes(origin)) {
         return callback(null, true)
      }

      return callback(new HttpError("Not allowed by CORS"))
   },
}
