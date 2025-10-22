declare namespace Model {
   type Task = {
      id: string
      title: string
      status: "TODO" | "PROGRESS" | "DONE"
      due_date: string
      created_at: string
      updated_at: string
   }
}