<script setup lang="ts" generic="T extends Record<any, any>">
import CorePagination from './CorePagination.vue'

const props = defineProps<{
   rows: T[]
   columns: DataTableColumn<T>[]
   total: number
}>()

const page = defineModel<number>("page", {
   required: false,
   default: 1,
})
const perPage = defineModel<number>("perPage", {
   required: false,
   default: 10,
})
</script>

<template>
   <div class="overflow-x-auto flex flex-col gap-4">
      <table class="table">
         <thead>
            <tr>
               <th v-for="column in props.columns">
                  {{ column.header }}
               </th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="(item, index) in props.rows">
               <td v-for="col in props.columns">
                  {{ item[col.field as keyof T] }}
               </td>
            </tr>
         </tbody>
      </table>
      <div class="flex items-center justify-center">
         <CorePagination
            v-model:page="page"
            :perPage="perPage"
            :total="props.total"
         />
      </div>
   </div>
</template>
