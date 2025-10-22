import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import dotenv from "dotenv"

if (process.env.NODE_ENV !== "production") {
   dotenv.config({
      path: resolve(dirname(fileURLToPath(import.meta.url)), "../../.env"),
   })
}

import app from "./app"

const port = process.env.SERVER_PORT || 3080

app.listen(port, () => {
   console.log(`Server running on http://localhost:${port}`)
})
