declare type DataTableColumn<T extends Record<string, any>> = {
   field: keyof T | (string & {})
   header: string
   sortable?: boolean
}
