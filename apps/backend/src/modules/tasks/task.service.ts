import { InferredSchema as TaskSchema } from "./task.validation"
import { Request } from "express"
import { TaskRepository } from "./task.repository"

export class TaskService {
   private repo = new TaskRepository()

   public get = async (query?: Request["query"]) => {
      const filter = {
         sort_key: query?.sort_key,
         sort_direction: query?.sort_dir,
         status: query?.status,
         page: query?.page && Number(query.page ?? 0),
         per_page: query?.per_page && Number(query.per_page ?? 0),
      }

      const result = this.repo.get(filter)
      return result
   }

   public create = async (payload: TaskSchema) => {
      const data = {
         ...payload,
         due_date: new Date(payload.due_date).toISOString(),
      }
      const result = this.repo.store(data)
      return Promise.resolve(result)
   }

   public update = async (id: string, payload: TaskSchema) => {
      const data = {
         ...payload,
         due_date: new Date(payload.due_date).toISOString(),
      }
      const result = this.repo.update(id, data)
      return Promise.resolve(result)
   }

   public delete = async (id: string) => {
      const result = this.repo.delete(id)
      return Promise.resolve(result)
   }
}
