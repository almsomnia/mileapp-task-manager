<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
   perPage: number
   total: number
}>()

const page = defineModel<number>("page", { required: true })

const totalPage = computed(() => {
   return Math.ceil(props.total / props.perPage)
})
</script>

<template>
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
</template>
