<script setup lang="ts">
import { useAppStore } from "@/stores/app"
import { AlertCircle } from "lucide-vue-next"

const props = withDefaults(
   defineProps<{
      prompt?: string
      confirmLabel?: string
      cancelLabel?: string
   }>(),
   {
      prompt: "Confirm action?",
      confirmLabel: "Confirm",
      cancelLabel: "Cancel",
   }
)

const emit = defineEmits<{
   (e: "confirm"): void
   (e: "cancel"): void
}>()

const appStore = useAppStore()
function onCancel() {
   appStore.closeDialog()
   emit("cancel")
}

function onConfirm() {
   emit("confirm")
}
</script>

<template>
   <div class="flex flex-col items-center justify-center gap-4">
      <AlertCircle
         class="stroke-gray-500"
         :size="64"
      />
      <p>
         {{ props.prompt }}
      </p>
      <div class="flex gap-4 w-full pt-4">
         <button
            class="btn grow"
            @click="onCancel"
         >
            {{ props.cancelLabel }}
         </button>
         <button
            class="btn grow btn-primary"
            @click="onConfirm"
         >
            {{ props.confirmLabel }}
         </button>
      </div>
   </div>
</template>
