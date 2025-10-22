<script setup lang="ts" generic="T extends Record<string, any>">
import { onBeforeMount, ref, shallowRef } from "vue"
import CorePagination from "./CorePagination.vue"
import { SortAsc, SortDesc, Loader2 } from "lucide-vue-next"

const props = defineProps<{
   rows: T[]
   columns: DataTableColumn<T>[]
   total: number
   loading?: boolean
}>()

const emit = defineEmits<{
   (e: "sort", values: { field: string | null; direction: -1 | 1 }): void
}>()

const page = defineModel<number>("page", {
   required: false,
   default: 1,
})
const perPage = defineModel<number>("perPage", {
   required: false,
   default: 10,
})

const sortField = shallowRef<string | null>(null)
const sortDirection = shallowRef<1 | -1>(1) // 1: asc, -1: desc
function setSortDirection(field: string) {
   if (!sortField.value) {
      sortField.value = field
      sortDirection.value = 1
      emit("sort", {
         field: sortField.value,
         direction: sortDirection.value,
      })
      return
   }

   if (sortField.value == field) {
      if (sortDirection.value < 0) {
         sortField.value = null
         sortDirection.value = 1
         emit("sort", {
            field: sortField.value,
            direction: sortDirection.value,
         })
         return
      }

      sortDirection.value = -1
      emit("sort", {
         field: sortField.value,
         direction: sortDirection.value,
      })
   }
}
</script>

<template>
   <div class="flex flex-col gap-4">
      <slot name="header" />
      <div class="overflow-x-auto relative">
         <div
            class="absolute inset-0 h-full w-full bg-black/24 z-99 flex items-center justify-center backdrop-blur-xs"
            v-if="props.loading"
         >
            <Loader2
               :size="24"
               class="stroke-white animate-spin"
            />
         </div>
         <table class="table">
            <thead>
               <tr>
                  <th
                     v-for="column in props.columns"
                     :class="{
                        'hover:bg-gray-100 cursor-pointer': column.sortable,
                     }"
                     @click="
                        column.sortable &&
                           setSortDirection(column.field as string)
                     "
                  >
                     <div class="inline-flex justify-between w-full">
                        <span>
                           {{ column.header }}
                        </span>
                        <template v-if="column.sortable">
                           <component
                              :is="sortDirection < 0 ? SortDesc : SortAsc"
                              :size="16"
                              class="hover:cursor-pointer"
                              :class="{
                                 'opacity-50': sortField != column.field,
                              }"
                           />
                        </template>
                     </div>
                  </th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="(item, index) in props.rows">
                  <td v-for="col in props.columns">
                     <slot
                        :name="`row.${String(col.field)}`"
                        :row="item"
                     >
                        {{ item[col.field as keyof T] }}
                     </slot>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
      <slot
         name="paginator"
         :page="page"
         :perPage="perPage"
         :total="props.total"
         :rows="rows"
      >
         <div class="flex items-center justify-end">
            <CorePagination
               v-model:page="page"
               :perPage="perPage"
               :total="props.total"
            />
         </div>
      </slot>
   </div>
</template>
