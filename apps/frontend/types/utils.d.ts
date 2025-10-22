declare type DataTableColumn<T extends Record<string, any>> = {
   field: keyof T | (string & {})
   header: string
   sortable?: boolean
   style?: import("vue").HTMLAttributes["style"]
}

declare type Toast = {
   uuid: string
   message: string
   severity: "info" | "success" | "warning" | "error"
}
