import { defineStore } from "pinia"
import { h, ref } from "vue"

type Dialog = {
   show: boolean
   title: string
   component: ReturnType<typeof h>
}

export const useAppStore = defineStore("app", () => {
   const dialog = ref({
      show: false,
      title: "",
      component: h("div")
   })

   function showDialog(
      title: string,
      component: Dialog["component"]
   ) {
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

   return {
      dialog,
      showDialog,
      closeDialog
   }
})