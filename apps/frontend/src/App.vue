<script setup lang="ts">
import CoreDialog from "./components/core/CoreDialog.vue"
import CoreToast from "./components/core/CoreToast.vue"
import { useAppStore } from "./stores/app"

const appStore = useAppStore()
</script>

<template>
   <main>
      <RouterView />
      <CoreDialog
         :visible="appStore.dialog.show"
         :title="appStore.dialog.title"
         @close="appStore.closeDialog()"
      >
         <component :is="appStore.dialog.component" />
      </CoreDialog>
      <CoreToast :items="appStore.toasts" />
   </main>
</template>
