<script setup lang="ts">
const props = defineProps<{
   items: Toast[]
}>()

function resolveSeverity(severity: Toast["severity"]) {
   switch (severity) {
      case "error":
         return "alert-error"
      case "info":
         return "alert-info"
      case "success":
         return "alert-success"
      case "warning":
         return "alert-warning"
      default:
         throw new Error("Invalid severity")
   }
}
</script>

<template>
   <div class="toast toast-bottom toast-end">
      <template v-for="item in props.items">
         <div
            class="alert alert-soft"
            :class="[resolveSeverity(item.severity)]"
         >
            <span>
               {{ item.message }}
            </span>
         </div>
      </template>
   </div>
</template>
