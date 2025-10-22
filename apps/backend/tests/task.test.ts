import { jest } from "@jest/globals"
import { dbCtrl } from "../src/config/db/connection"
import request from "supertest"
import app from "../src/app"

expect.extend({
   toEvery(
      received: unknown,
      expected: string | number | boolean | ((arg: any) => boolean)
   ) {
      const pass =
         Array.isArray(received) &&
         received.every((item) =>
            expected instanceof Function ? expected(item) : item === expected
         )
      return {
         pass,
         message: () => {
            return pass
               ? `Expected array **not** to contain only '${expected}'`
               : `Expected all elements to be '${expected}', but got: ${JSON.stringify(
                    received
                 )}`
         },
      }
   },
})

let mockUuidCounter = 1
jest.mock("uuid", () => ({
   v4: () => `mock-uuid-${mockUuidCounter++}`,
}))

describe("Mock Task API", () => {
   beforeEach(() => {
      dbCtrl.tasks.$reset()
      mockUuidCounter = 1
   })

   const staticUuid = "a8a66c97-7006-4049-a436-0f80176e8eda"

   describe("GET /tasks", () => {
      it("should return an array of tasks", async () => {
         const response = await request(app).get("/tasks")
         const body = response.body

         expect(response.statusCode).toBe(200)
         expect(body.data[0].status).toBeDefined()
         expect(body.meta.page).toBeGreaterThan(0)
         expect(body.meta.per_page).toBe(body.data.length)
      })

      it("should handle pagination meta when pagination query invalid", async () => {
         const query = {
            page: 0,
            per_page: -1,
         }

         const response = await request(app).get("/tasks").query(query)
         const body = response.body

         expect(response.statusCode).toBe(200)
         expect(body.meta.page).toBe(1)
         expect(body.meta.per_page).toBe(body.data.length)
      })

      it("should return matching data on status query set", async () => {
         const query = {
            status: "TODO",
         }

         const response = await request(app).get("/tasks").query(query)
         const body = response.body

         expect(response.statusCode).toBe(200)
         expect(body.meta.status).toBe(query.status)
         expect(body.data).toBeInstanceOf(Array)
         expect(body.data.map((item: any) => item.status)).toEvery(query.status)
      })

      it("should return error when sorting keys are invalid", async () => {
         const query = {
            sort_key: "invalid_key",
            sort_dir: "invalid_dir"
         }

         const response = await request(app).get("/tasks").query(query)
         const body = response.body

         expect(response.statusCode).toBe(422)
         expect(body.error).toBeDefined()
      })
   })

   describe("POST /tasks", () => {
      it("should create a new task", async () => {
         const payload = {
            title: "New Task",
            status: "TODO",
            due_date: "2025-11-01"
         }

         const response = await request(app).post("/tasks").send(payload)
         const body = response.body

         expect(response.statusCode).toBe(201)
         expect(body.data.title).toBe("New Task")
         expect(body.data.status).toBe("TODO")
         expect(new Date(body.data.due_date).toISOString()).toBe(new Date(payload.due_date).toISOString())
         expect(body.meta.message).toBe("Task created.")
      })

      it("should return error when validation fails", async () => {
         const payload = {
            name: "Invalid key",
            status: "INVALID"
         }

         const response = await request(app).post("/tasks").send(payload)
         const body = response.body

         expect(response.statusCode).toBe(422)
         expect(body.error).toBeDefined()
      })
   })

   describe("PUT /tasks/:id", () => {
      it("should update a task", async () => {
         const payload = {
            title: "Task Updated",
            status: "DONE",
            due_date: "2026-01-01"
         }

         const response = await request(app)
            .put(`/tasks/${staticUuid}`)
            .send(payload)
         const body = response.body

         expect(response.statusCode).toBe(200)
         expect(body.data.title).toBe("Task Updated")
         expect(body.data.status).toBe("DONE")
         expect(new Date(body.data.due_date).toISOString()).toBe(new Date(payload.due_date).toISOString())
         expect(body.meta.message).toBe("Task updated.")
      })

      it("should return error when validation fails", async () => {
         const payload = {
            name: "Invalid key",
            status: "INVALID",
            due_date: null
         }

         const response = await request(app).put(`/tasks/${staticUuid}`).send(payload)
         const body = response.body

         expect(response.statusCode).toBe(422)
         expect(body.error).toBeDefined()
      })
   })

   describe("DELETE /tasks/:id", () => {
      it("should delete a task", async () => {
         const response = await request(app).delete(`/tasks/${staticUuid}`)

         expect(response.statusCode).toBe(204)
      })

      it("should return error when file not found", async () => {
         const response = await request(app).delete(`/tasks/not-an-uuid`)

         expect(response.statusCode).toBe(404)
      })
   })
})
