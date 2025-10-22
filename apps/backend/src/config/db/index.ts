import { users } from "./users"
import { tasks, $reset as $resetTasks } from "./tasks"

export const db = {
   users,
   tasks
}

export const dbCtrl = {
   tasks: {
      $reset: $resetTasks
   }
}