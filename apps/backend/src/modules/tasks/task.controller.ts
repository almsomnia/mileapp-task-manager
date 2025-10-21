import { Request, Response, NextFunction } from "express"
import { TaskService } from "./task.service"
import { schema } from "./task.validation"
import { ZodError } from "zod"
import { httpResponse } from "@/utils/httpResponse"

export class TaskController {
   private service = new TaskService()

   public get = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { data, meta } = await this.service.get(req.query)
         res.json(httpResponse(data, meta))
      } catch (e) {
         next(e)
      }
   }

   public create = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const payload = await schema.create
            .parseAsync(req.body)
            .catch((err: ZodError) => {
               const issues = err.issues.map((i) => {
                  const path = i.path.join(".")
                  return `[${path}] ${i.message}`
               })
               throw new Error(issues.join("\n"))
            })

         const { data, meta } = await this.service.create(payload)
         res.status(201).json(httpResponse(data, meta))
      } catch (e) {
         next(e)
      }
   }

   public update = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const payload = await schema.update
            .parseAsync(req.body)
            .catch((err: ZodError) => {
               const issues = err.issues.map((i) => {
                  const path = i.path.join(".")
                  return `[${path}] ${i.message}`
               })
               throw new Error(issues.join("\n"))
            })

         const { data, meta } = await this.service.update(
            req.params.id,
            payload
         )
         res.status(201).json(httpResponse(data, meta))
      } catch (e) {
         next(e)
      }
   }

   public delete = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { data, meta } = await this.service.delete(req.params.id)
         res.json(httpResponse(data, meta))
      } catch (e) {
         next(e)
      }
   }
}
