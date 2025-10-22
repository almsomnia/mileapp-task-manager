declare type DataTableColumn<T extends Record<PropertyKey, any>> = {
   field: keyof T | (string & {})
   header: string
}
