<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
   email: null,
   password: null
})

async function onSubmit() {}
</script>

<template>
   <div class="h-screen flex items-center justify-center">
      <div class="card bg-base-100 shadow w-md">
         <div class="card-body">
            <h2 class="card-title">Login</h2>
            <form
               @submit.prevent="onSubmit"
               class="flex flex-col gap-4"
            >
               <input
                  v-model="form.email"
                  class="input w-full"
                  placeholder="Email"
                  type="text"
               />
               <input
                  v-model="form.password"
                  class="input w-full"
                  placeholder="Password"
                  type="password"
               />
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
