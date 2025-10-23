import { db } from "@/config/db/connection"
import { HttpError } from "@/config/errors/HttpError"
import { sortByDate } from "@/utils/sort"
import { filter as filterFn } from "@/utils/filter"
import { paginate } from "@/utils/paginate"
import { InferredSchema as TaskSchema } from "./task.validation"
import { v4 } from "uuid"

export class TaskRepository {
   public get = async (filter?: Record<string, any>) => {
      let data = db.tasks
      const meta: Record<string, any> = {}

      if (filter?.sort_key && filter.sort_direction) {
         const sortKey = filter.sort_key as keyof Model.Task

         if (!["created_at", "updated_at", "due_date"].includes(sortKey)) {
            throw new HttpError("Invalid sort key", 422)
         }

         data = sortByDate(data, sortKey, filter.sort_direction)

         Object.assign(meta, {
            sort_key: sortKey,
            sort_direction: filter.sort_direction,
         })
      }

      if (filter?.search_title) {
         data = filterFn(data, "title", (value) => {
            return value.toLowerCase().includes(filter.search_title)
         })
      }

      if (filter?.status) {
         data = filterFn(data, "status", (value) => value == filter.status)
         Object.assign(meta, { status: filter.status })
      }

      const { data: paginated, meta: paginateMeta } = paginate(
         data,
         filter?.page ?? 0,
         filter?.per_page ?? 0
      )
      data = paginated
      Object.assign(meta, paginateMeta)

      return Promise.resolve({
         data,
         meta,
      })
   }

   public store = (payload: TaskSchema) => {
      const data: Model.Task = {
         ...payload,
         created_at: new Date().toISOString(),
         updated_at: new Date().toISOString(),
         id: v4(),
      }
      db.tasks.push(data)
      return {
         data: payload,
         meta: {
            message: "Task created.",
         },
      }
   }

   public update = (id: string, payload: TaskSchema) => {
      const data = db.tasks.find((item) => item.id == id)
      if (!data) {
         throw new HttpError("Data not found", 404)
      }

      for (let key in payload) {
         data[key as keyof typeof data] = payload[
            key as keyof typeof payload
         ] as any
      }
      data.updated_at = new Date().toISOString()

      return {
         data,
         meta: {
            message: "Task updated.",
         },
      }
   }

   public delete = (id: string) => {
      const data = db.tasks.find((item) => item.id == id)
      if (!data) {
         throw new HttpError("Data not found", 404)
      }

      db.tasks = db.tasks.filter((item) => item.id != id)
      return {
         data: null,
         meta: {
            message: "Task deleted.",
         },
      }
   }
}
