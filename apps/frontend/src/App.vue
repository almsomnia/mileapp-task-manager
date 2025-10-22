<script setup lang="ts">
import { useRoute } from "vue-router"
import CoreDialog from "./components/core/CoreDialog.vue"
import CoreToast from "./components/core/CoreToast.vue"
import { useAppStore } from "./stores/app"

const appStore = useAppStore()
const route = useRoute()
</script>

<template>
   <div>
      <component :is="route.meta.layout">
         <RouterView />
      </component>
      <CoreDialog
         :visible="appStore.dialog.show"
         :title="appStore.dialog.title"
         @close="appStore.closeDialog()"
      >
         <component :is="appStore.dialog.component" />
      </CoreDialog>
      <CoreToast :items="appStore.toasts" />
   </div>
</template>
