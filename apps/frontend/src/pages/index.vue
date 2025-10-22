<script setup lang="ts">
import CoreDataTable from "@/components/core/CoreDataTable.vue"
import { $api } from "@/utils/api/$api"
import { onMounted, ref } from "vue"
import { Search, X } from "lucide-vue-next"
import { watchExcludable } from "@/composables/watchExcludable"
import { watchDebounced } from "@vueuse/core"

type TaskMeta = {
   page: number
   per_page: number
   total: number
   [x: string]: any
}

const data = ref<Model.Task[]>([])
const meta = ref<TaskMeta>({ page: 0, per_page: 0, total: 0 })
const query = ref({
   page: 1,
   per_page: 10,
   search_title: "",
   sort_key: "",
   sort_dir: "",
   status: "",
})

watchExcludable(query, () => fetchData(), { exclude: ["search_title"] })
watchDebounced(
   () => query.value.search_title,
   () => fetchData(),
   { debounce: 800, maxWait: 1000 }
)

const columns: DataTableColumn<Model.Task>[] = [
   { field: "title", header: "Title" },
   { field: "status", header: "Status" },
   { field: "updated_at", header: "Updated at", sortable: true },
]

async function fetchData() {
   const response = await $api<API.Response<Model.Task[], TaskMeta>>(`/tasks`, {
      method: "get",
      query: query.value,
   })

   data.value = response.data
   meta.value = response.meta
}

const statusOptions = ["TODO", "PROGRESS", "DONE"]

function onSort(field: string | null, direction: 1 | -1) {
   if (!field) {
      query.value.sort_key = ""
      query.value.sort_dir = ""
      return
   }
   query.value.sort_key = field
   query.value.sort_dir = direction > 0 ? "asc" : "desc"
}

onMounted(async () => {
   await fetchData()
})
</script>

<template>
   <div class="container mx-auto py-4">
      <CoreDataTable
         :rows="data"
         :columns="columns"
         :total="meta.total"
         v-model:page="query.page"
         v-model:per-page="query.per_page"
         @sort="(value) => onSort(value.field, value.direction)"
      >
         <template #header>
            <div class="grid grid-cols-12 gap-4">
               <div class="col-span-3">
                  <label class="input w-full">
                     <Search :size="16" />
                     <input
                        v-model="query.search_title"
                        type="search"
                        class="grow"
                        placeholder="Search"
                     />
                  </label>
               </div>
               <div class="col-span-2">
                  <label class="select">
                     <select
                        class="grow"
                        v-model="query.status"
                     >
                        <option
                           value=""
                           disabled
                        >
                           Status
                        </option>
                        <option
                           v-for="option in statusOptions"
                           :selected="query.status == option"
                        >
                           {{ option }}
                        </option>
                     </select>
                     <X
                        :size="16"
                        v-if="query.status"
                        class="cursor-pointer"
                        @click="query.status = ''"
                     />
                  </label>
               </div>
            </div>
         </template>
      </CoreDataTable>
   </div>
</template>
