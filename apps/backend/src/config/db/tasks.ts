export type Task = {
   id: string
   title: string
   status: "TODO" | "PROGRESS" | "DONE"
   created_at: string
   updated_at: string
}

export let tasks = [
   {
      id: "a8a66c97-7006-4049-a436-0f80176e8eda",
      title: "Task 1",
      status: "TODO",
      created_at: "2025-10-21T07:00:00Z",
      updated_at: "2025-10-21T07:00:00Z",
   },
   {
      id: "17474c16-cded-4b42-8b76-9e384058a13d",
      title: "Task 2",
      status: "PROGRESS",
      created_at: "2025-09-11T07:00:00Z",
      updated_at: "2025-09-11T07:00:00Z",
   },
]

export const $reset = () => {
   tasks = []
}