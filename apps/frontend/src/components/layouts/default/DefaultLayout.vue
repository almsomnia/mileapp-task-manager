<script setup lang="ts">
import { useRoute } from 'vue-router'
import DefaultLayoutHeader from './DefaultLayoutHeader.vue'

const route = useRoute()
</script>

<template>
   <div>
      <DefaultLayoutHeader />
      <main class="container mx-auto xl:max-w-7xl">
         <div v-if="route.meta.title" class="my-8">
            <h2 class="text-3xl font-medium">
               {{ route.meta.title }}
            </h2>
         </div>
         <slot />
      </main>
   </div>
</template>