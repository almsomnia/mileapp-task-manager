import { randomUUID } from "crypto"
import { db } from "../../config/db"
import { InferredSchema as TaskSchema } from "./task.validation"

export class TaskService {
   public get = async () => {
      const data = db.tasks
      return Promise.resolve(data)
   }

   public create = async (payload: TaskSchema) => {
      const data: (typeof db.tasks)[number] = {
         ...payload,
         created_at: new Date().toISOString(),
         updated_at: new Date().toISOString(),
         id: randomUUID(),
      }
      db.tasks.push(data)
      return Promise.resolve(data)
   }

   public update = async (id: string, payload: TaskSchema) => {
      const data = db.tasks.find((item) => item.id == id)
      if (!data) {
         throw new Error("Data not found")
      }

      for (let key in payload) {
         data[key as keyof typeof data] = payload[key as keyof typeof payload]
      }
      data.updated_at = new Date().toISOString()

      return Promise.resolve(data)
   }

   public delete = async (id: string) => {
      db.tasks.filter((item) => item.id != id)
      return true
   }
}
