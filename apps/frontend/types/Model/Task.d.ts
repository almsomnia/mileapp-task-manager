declare namespace Model {
   type Task = {
      id: string
      title: string
      status: "TODO" | "PROGRESS" | "DONE"
      created_at: string
      updated_at: string
   }
}