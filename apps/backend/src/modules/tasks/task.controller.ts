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
         res.status(200).json(httpResponse(data, meta))
      } catch (e) {
         next(e)
      }
   }

   public create = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const payload = await schema.create.parseAsync(req.body)
         const { data, meta } = await this.service.create(payload)
         res.status(201).json(httpResponse(data, meta))
      } catch (e) {
         next(e)
      }
   }

   public update = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const payload = await schema.update.parseAsync(req.body)
         const { data, meta } = await this.service.update(
            req.params.id,
            payload
         )
         res.status(200).json(httpResponse(data, meta))
      } catch (e) {
         next(e)
      }
   }

   public delete = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { data, meta } = await this.service.delete(req.params.id)
         res.status(204).send()
      } catch (e) {
         next(e)
      }
   }
}
