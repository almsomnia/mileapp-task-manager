import * as uuid from "uuid"
import { db } from "../../config/db"
import { InferredSchema as TaskSchema } from "./task.validation"
import { Request } from "express"
import { paginate } from "@/utils/paginate"
import { filter } from "@/utils/filter"
import { sortByDate } from "@/utils/sort"
import { HttpError } from "@/config/errors/HttpError"

export class TaskService {
   public get = async (query?: Request["query"]) => {
      let data = db.tasks
      const meta: Record<string, any> = {}

      if (query?.sort_key && query.sort_dir) {
         const sortKey = query.sort_key as keyof (typeof data)[number]
         const sortDirection = query.sort_dir as "asc" | "desc"

         if (sortKey !== "created_at" && sortKey !== "updated_at") {
            throw new HttpError("Invalid sort key", 422)
         }

         data = sortByDate(data, sortKey, sortDirection)
         Object.assign(meta, {
            sort_key: sortKey,
            sort_direction: sortDirection,
         })
      }

      const page = Number(query?.page ?? 0)
      const perPage = Number(query?.per_page ?? 0)

      const { data: paginated, meta: paginateMeta } = paginate(
         data,
         page,
         perPage
      )
      data = paginated
      Object.assign(meta, paginateMeta)

      if (query?.search_title) {
         data = filter(data, "title", (value) =>
            value.toLowerCase().includes(query.search_title as string)
         )
      }

      if (query?.status) {
         data = filter(
            data,
            "status",
            (value) => value == (query.status as string)
         )
         Object.assign(meta, { status: query.status })
      }

      return Promise.resolve({
         data,
         meta,
      })
   }

   public create = async (payload: TaskSchema) => {
      const data: (typeof db.tasks)[number] = {
         ...payload,
         created_at: new Date().toISOString(),
         updated_at: new Date().toISOString(),
         id: uuid.v4(),
      }
      db.tasks.push(data)
      return Promise.resolve({
         data,
         meta: {
            message: "Task created.",
         },
      })
   }

   public update = async (id: string, payload: TaskSchema) => {
      const data = db.tasks.find((item) => item.id == id)
      if (!data) {
         throw new HttpError("Data not found", 404)
      }

      for (let key in payload) {
         data[key as keyof typeof data] = payload[key as keyof typeof payload]
      }
      data.updated_at = new Date().toISOString()

      return Promise.resolve({
         data,
         meta: {
            message: "Task updated.",
         },
      })
   }

   public delete = async (id: string) => {
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
