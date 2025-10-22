<script setup lang="ts">
import { useValidation } from "@/composables/useValidation"
import { $taskSchema } from "@/utils/validations/task"
import dayjs from "dayjs"
import { onBeforeMount, ref } from "vue"
import type { infer as InferType } from "zod"

const props = defineProps<{
   data?: InferType<ReturnType<typeof $taskSchema>["base"]>
}>()

const emit = defineEmits<{
   (e: "submit", value: InferType<ReturnType<typeof $taskSchema>["base"]>): void
}>()

const form = ref<{
   title: string | null
   status: "TODO" | "PROGRESS" | "DONE" | null
   due_date: string | null
}>({
   title: null,
   status: null,
   due_date: null
})

onBeforeMount(() => {
   if (props.data) {
      for (let key in form.value) {
         if (key == "due_date") {
            form.value.due_date = dayjs(props.data.due_date).format("YYYY-MM-DD")
            continue
         }
         form.value[key as keyof typeof form.value] = props.data[key as keyof typeof form.value] as any
      }
   }
})

const { errors, validate } = useValidation($taskSchema().base)

async function onSubmit() {
   const payload = validate(form.value)
   if (!payload) return
   emit("submit", payload)
}

const statusOptions = ["TODO", "PROGRESS", "DONE"]
</script>

<template>
   <form
      @submit.prevent="onSubmit"
      class="flex flex-col gap-4"
   >
      <fieldset class="fieldset">
         <legend class="fieldset-legend">Title</legend>
         <input
            v-model="form.title"
            class="input w-full"
            :class="{
               'input-error text-error': !!errors.title,
            }"
         />
         <p
            v-if="errors.title"
            class="label text-error"
         >
            {{ errors.title }}
         </p>
      </fieldset>
      <fieldset class="fieldset">
         <legend class="fieldset-legend">Status</legend>
         <select
            v-model="form.status"
            class="select w-full"
            :class="{
               'select-error text-error': !!errors.status,
            }"
         >
            <option
               v-for="opt in statusOptions"
               :selected="form.status == opt"
            >
               {{ opt }}
            </option>
         </select>
         <p
            v-if="errors.status"
            class="label text-error"
         >
            {{ errors.status }}
         </p>
      </fieldset>
      <fieldset class="fieldset">
         <legend class="fieldset-legend">Due Date</legend>
         <input
            v-model="form.due_date"
            type="date"
            class="input w-full"
            :class="{
               'input-error text-error': !!errors.due_date,
            }"
         />
         <p
            v-if="errors.due_date"
            class="label text-error"
         >
            {{ errors.due_date }}
         </p>
      </fieldset>
      <div class="flex items-center justify-end">
         <button
            class="btn btn-primary"
            type="submit"
         >
            Submit
         </button>
      </div>
   </form>
</template>
