declare type DataTableColumn<T extends Record<string, any>> = {
   field: keyof T | (string & {})
   header: string
   sortable?: boolean
}

declare type Toast = {
   uuid: string
   message: string
   severity: "info" | "success" | "warning" | "error"
}
