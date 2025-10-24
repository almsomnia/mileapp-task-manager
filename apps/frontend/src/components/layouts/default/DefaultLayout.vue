<script setup lang="ts">
import { useRoute } from 'vue-router'
import DefaultLayoutHeader from './DefaultLayoutHeader.vue'

const route = useRoute()
</script>

<template>
   <div>
      <DefaultLayoutHeader class="fixed top-0 inset-x-0 z-100" />
      <main class="container mx-auto px-4 pb-4 xl:max-w-7xl mt-16">
         <div v-if="route.meta.title" class="py-8">
            <h2 class="text-3xl font-medium">
               {{ route.meta.title }}
            </h2>
         </div>
         <slot />
      </main>
   </div>
</template>