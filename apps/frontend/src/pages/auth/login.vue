<script setup lang="ts">
import { ref } from "vue"
import { $authSchema } from "@/utils/validations/auth"
import { useValidation } from "@/composables/useValidation"
import { useAuthStore } from "@/stores/auth"

const form = ref<Record<"email" | "password", string | null>>({
   email: null,
   password: null,
})

const { errors, validate } = useValidation($authSchema().login)

const authStore = useAuthStore()

async function onSubmit() {
   const payload = validate(form.value)
   if (!payload) return
   await authStore.login(payload)
}
</script>

<template>
   <div class="h-screen flex items-center justify-center px-2">
      <div class="card bg-base-100 shadow w-md">
         <div class="card-body">
            <h2 class="card-title">Login</h2>
            <form
               @submit.prevent="onSubmit"
               class="flex flex-col gap-4"
            >
               <fieldset class="fieldset">
                  <input
                     v-model="form.email"
                     class="input w-full"
                     :class="{
                        'input-error text-error': !!errors.email,
                     }"
                     placeholder="Email"
                     type="text"
                  />
                  <p
                     v-if="errors.email"
                     class="label text-error"
                  >
                     {{ errors.email }}
                  </p>
               </fieldset>
               <fieldset class="fieldset">
                  <input
                     v-model="form.password"
                     class="input w-full"
                     :class="{
                        'input-error text-error': !!errors.password,
                     }"
                     placeholder="Password"
                     type="password"
                  />
                  <p
                     v-if="errors.password"
                     class="label text-error"
                  >
                     {{ errors.password }}
                  </p>
               </fieldset>
               <button
                  type="submit"
                  class="btn btn-primary"
               >
                  Login
               </button>
            </form>
         </div>
      </div>
   </div>
</template>
