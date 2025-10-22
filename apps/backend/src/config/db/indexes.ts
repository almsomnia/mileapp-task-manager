/**
 * Mock MongoDB index definitions, based on this project's mock API query usage
 * For documentation purposes only
 *
 * Usage Example:
 *
 * @example
 * taskIndex.forEach((item) => {
 *    db.tasks.createIndex(item.index, item.opts ?? undefined)
 * })
 */

export const userIndex = [
   {
      /**
       * Ensure user's email is unique
       */
      index: { email: 1 },
      opts: { unique: true },
   },
]

export const taskIndex = [
   {
      /**
       * Ensure ID is unique
       */
      index: { id: 1 },
      opts: { unique: true },
   },
   {
      /**
       * Compound index for common sorting & filtering
       */
      index: { status: 1, due_date: -1 },
   },
   {
      /**
       * (Optional) Created at sorting index
       */
      index: { created_at: 1 }
   },
   {
      /**
       * (Optional) Common search index
       */
      index: { title: "text" },
   },
]
