<script setup lang="ts">
import { computed } from "vue"

const props = withDefaults(
   defineProps<{
      total: number
      perPageOptions?: number[]
   }>(),
   {
      perPageOptions: () => [5, 10, 20, 50, -1],
   }
)

const page = defineModel<number>("page", { required: true })
const perPage = defineModel<number>("perPage", { required: true })

const totalPage = computed(() => {
   if (perPage.value < 1) return 1
   return Math.ceil(props.total / perPage.value)
})
</script>

<template>
   <div class="flex items-center gap-4">
      <select
         v-model="perPage"
         class="select"
      >
         <option v-for="option in props.perPageOptions" :value="option">
            {{ option > 0 && `${option} per page` || "All" }}
         </option>
      </select>
      <div class="join">
         <button
            v-for="n in totalPage"
            class="join-item btn"
            :class="{
               'btn-active': n == page,
            }"
            @click="page = n"
         >
            {{ n }}
         </button>
      </div>
   </div>
</template>
