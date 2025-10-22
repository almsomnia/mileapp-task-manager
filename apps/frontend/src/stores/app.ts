import { defineStore } from "pinia"
import { h, ref } from "vue"
import { v4 } from "uuid"

type Dialog = {
   show: boolean
   title: string
   component: ReturnType<typeof h>
}

export const useAppStore = defineStore("app", () => {
   const dialog = ref({
      show: false,
      title: "",
      component: h("div"),
   })

   function showDialog(title: string, component: Dialog["component"]) {
      dialog.value.title = title
      dialog.value.component = component
      dialog.value.show = true
   }

   function closeDialog() {
      dialog.value.show = false
      setTimeout(() => {
         dialog.value.title = ""
         dialog.value.component = h("div")
      }, 500)
   }

   const toasts = ref<Toast[]>([])

   function notify(message: string, severity?: Toast["severity"]) {
      const uuid = v4()
      toasts.value.push({ uuid, message, severity: severity ?? "info" })
      setTimeout(() => {
         toasts.value = toasts.value.filter((item) => item.uuid !== uuid)
      }, 5000)
   }

   return {
      dialog,
      showDialog,
      closeDialog,
      toasts,
      notify,
   }
})
