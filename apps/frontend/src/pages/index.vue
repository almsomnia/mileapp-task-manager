<script setup lang="ts">
import CoreDataTable from "@/components/core/CoreDataTable.vue"
import { $api } from "@/utils/api/$api"
import { h, onMounted, ref, shallowRef } from "vue"
import { Search, X, Plus, Edit, Trash, Filter } from "lucide-vue-next"
import { watchExcludable } from "@/composables/watchExcludable"
import {
   watchDebounced,
   useBreakpoints,
   breakpointsTailwind,
} from "@vueuse/core"
import dayjs from "dayjs"
import { useAppStore } from "@/stores/app"
import FormTask from "@/components/forms/FormTask.vue"
import CoreDialogConfirmBody from "@/components/core/CoreDialogConfirmBody.vue"

type TaskMeta = {
   page: number
   per_page: number
   total: number
   [x: string]: any
}

const loading = shallowRef(false)
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
   {
      field: "title",
      header: "Title",
      style: {
         minWidth: "6rem",
      },
   },
   { field: "status", header: "Status" },
   {
      field: "updated_at",
      header: "Updated at",
      sortable: true,
      style: {
         minWidth: "12rem",
      },
   },
   { field: "actions", header: "" },
]

async function fetchData() {
   try {
      loading.value = true
      const response = await $api<API.Response<Model.Task[], TaskMeta>>(
         `/tasks`,
         {
            method: "get",
            query: query.value,
         }
      )

      data.value = response.data
      meta.value = response.meta
   } finally {
      loading.value = false
   }
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

const appStore = useAppStore()
function openForm(data?: Model.Task) {
   appStore.showDialog(
      data ? "Update Task" : "New Task",
      h(FormTask, {
         data,
         onSubmit: async (values) => {
            const endpoint = data ? `/tasks/${data.id}` : `/tasks`
            const method = data ? "put" : "post"

            const response = await $api<API.Response<Model.Task>>(endpoint, {
               method,
               body: values,
            })

            appStore.notify(response.meta.message, "success")
            appStore.closeDialog()
            await fetchData()
         },
      })
   )
}

function onDelete(data: Model.Task) {
   appStore.showDialog(
      "Confirm Delete Task",
      h(CoreDialogConfirmBody, {
         prompt: `Confirm delete ${data.title}?`,
         onConfirm: async () => {
            await $api(`/tasks/${data.id}`, {
               method: "delete",
            })
            appStore.notify("Task deleted", "info")
            appStore.closeDialog()
            await fetchData()
         },
      })
   )
}

const breakpoints = useBreakpoints(breakpointsTailwind)
</script>

<template>
   <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
         <CoreDataTable
            :rows="data"
            :columns="columns"
            :total="meta.total"
            :loading="loading"
            v-model:page="query.page"
            v-model:per-page="query.per_page"
            @sort="(value) => onSort(value.field, value.direction)"
         >
            <template #header>
               <div class="grid grid-cols-12 gap-4">
                  <template v-if="breakpoints.md.value">
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
                  </template>
                  <template v-else>
                     <div class="col-span-3">
                        <div class="indicator">
                           <span
                              v-if="query.status || query.search_title"
                              class="indicator-item status status-lg status-secondary"
                           ></span>
                           <div class="dropdown">
                              <div
                                 tabindex="0"
                                 role="button"
                                 class="btn"
                              >
                                 <Filter
                                    class="-ms-1.5"
                                    :size="16"
                                 />
                                 Filter
                              </div>
                              <div
                                 tabindex="0"
                                 class="dropdown-content card card-sm bg-base-100 z-1 w-64 shadow-lg"
                              >
                                 <div class="card-body">
                                    <div class="flex flex-col gap-4">
                                       <label class="input w-full">
                                          <Search :size="16" />
                                          <input
                                             v-model="query.search_title"
                                             type="search"
                                             class="grow"
                                             placeholder="Search"
                                          />
                                       </label>
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
                                                :selected="
                                                   query.status == option
                                                "
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
                              </div>
                           </div>
                        </div>
                     </div>
                  </template>
                  <div
                     class="col-span-2 col-end-13 flex items-center justify-end"
                  >
                     <button
                        class="btn btn-primary"
                        @click="openForm()"
                     >
                        <Plus
                           :size="16"
                           class="-ms-1.5"
                        />
                        New Task
                     </button>
                  </div>
               </div>
            </template>
            <template #row.status="{ row }">
               <span
                  class="badge badge-soft badge-sm"
                  :class="{
                     'badge-neutral': row.status == 'TODO',
                     'badge-info': row.status == 'PROGRESS',
                     'badge-success': row.status == 'DONE',
                  }"
               >
                  {{ row.status }}
               </span>
            </template>
            <template #row.updated_at="{ row }">
               {{ dayjs(row.updated_at).format("MMM DD, YYYY HH:mm") }}
            </template>
            <template #row.actions="{ row }">
               <div class="flex items-center gap-1">
                  <button
                     class="btn btn-soft btn-info btn-sm btn-circle"
                     @click="openForm(row)"
                  >
                     <Edit :size="12" />
                  </button>
                  <button
                     class="btn btn-soft btn-error btn-sm btn-circle"
                     @click="onDelete(row)"
                  >
                     <Trash :size="12" />
                  </button>
               </div>
            </template>
         </CoreDataTable>
      </div>
   </div>
</template>
