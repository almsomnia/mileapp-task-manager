<script setup lang="ts" generic="T extends Record<string, any>">
import { shallowRef } from "vue"
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

/**
 * Column sorting strategy handler
 * Sorting cycle: ASC -> DESC -> unset
 *
 * @param field Field to sort
 *
 * @emits sort
 */
function setSortingStrategy(field: string) {
   switch (true) {
      /**
       * Case filter strategy is unset OR switching field to sort
       * assign the field and set direction to ASC
       */
      case sortField.value !== field:
         sortField.value = field
         sortDirection.value = 1
         break

      /**
       * Case setting same field and current direction is ASC
       * set direction to DESC
       */
      case sortDirection.value == 1:
         sortDirection.value = -1
         break

      /**
       * Case setting same field and current direction is DESC
       * Reset sorting strategy
       */
      default:
         sortField.value = null
         sortDirection.value = 1
   }

   /**
    * Emit sorting strategy to further handled
    */
   emit("sort", {
      field: sortField.value,
      direction: sortDirection.value,
   })
}
</script>

<template>
   <div class="flex flex-col gap-4">
      <slot name="header" />
      <div class="relative">
         <div class="overflow-x-auto">
            <table class="table">
               <thead>
                  <tr>
                     <th
                        v-for="column in props.columns"
                        :class="{
                           'hover:bg-gray-100 cursor-pointer': column.sortable,
                        }"
                        :style="column.style"
                        @click="
                           column.sortable &&
                              setSortingStrategy(column.field as string)
                        "
                     >
                        <div class="inline-flex justify-between w-full">
                           <span>
                              {{ column.header }}
                           </span>
                           <template v-if="column.sortable">
                              <component
                                 :is="
                                    column.field == sortField &&
                                    sortDirection < 0
                                       ? SortDesc
                                       : SortAsc
                                 "
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
         <div
            class="absolute inset-0 bg-black/24 z-99 flex items-center justify-center backdrop-blur-xs"
            v-if="props.loading"
         >
            <Loader2
               :size="24"
               class="stroke-white animate-spin"
            />
         </div>
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
               v-model:per-page="perPage"
               :total="props.total"
            />
         </div>
      </slot>
   </div>
</template>
