<script setup lang="ts">
import CoreDataTable from "@/components/core/CoreDataTable.vue"
import { $api } from "@/utils/api/$api"
import { onMounted, ref, watch } from "vue"

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
})

watch(query, () => fetchData(), { deep: true })

const columns: DataTableColumn<Model.Task>[] = [
   { field: "title", header: "Title" },
   { field: "status", header: "Status" },
   { field: "updated_at", header: "Updated at" },
]

async function fetchData() {
   const response = await $api<API.Response<Model.Task[], TaskMeta>>(`/tasks`, {
      method: "get",
      query: query.value,
   })

   data.value = response.data
   meta.value = response.meta
}

onMounted(async () => {
   await fetchData()
})
</script>

<template>
   <div class="container mx-auto">
      <CoreDataTable
         :rows="data"
         :columns="columns"
         :total="meta.total"
         v-model:page="query.page"
         v-model:per-page="query.per_page"
      />
   </div>
</template>
