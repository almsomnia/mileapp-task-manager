<script setup lang="ts">
const props = defineProps<{
   title: string
   visible: boolean
}>()

const emit = defineEmits<{
   (e: "close"): void
}>()
</script>

<template>
   <dialog
      :open="visible"
      @close="emit('close')"
      class="modal"
   >
      <div class="modal-box">
         <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            @click="emit('close')"
         >
            ✕
         </button>
         <h3 class="text-lg font-bold">
            {{ props.title }}
         </h3>
         <div class="pt-4">
            <slot />
         </div>
      </div>
   </dialog>
</template>
