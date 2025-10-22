<script setup lang="ts">
import { User, LogOut } from "lucide-vue-next"
import { useAuthStore } from "@/stores/auth"

const authStore = useAuthStore()

async function onLogout() {
   await authStore.logout(() => {
      ;(document.activeElement as any)?.blur()
   })
}
</script>

<template>
   <header class="bg-base-100 shadow-md">
      <div class="container mx-auto xl:max-w-7xl">
         <div class="flex items-center justify-between py-2">
            <RouterLink to="/">
               <span class="font-medium"> App Title </span>
            </RouterLink>

            <div class="dropdown">
               <div
                  tabindex="0"
                  role="button"
                  class="btn"
               >
                  <User
                     class="-ms-1"
                     :size="16"
                  />
                  {{ authStore.user?.name }}
               </div>
               <ul
                  tabindex="-1"
                  class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
               >
                  <li
                     class="text-error"
                     @click="onLogout"
                  >
                     <a>
                        <LogOut
                           :size="14"
                           class="-ms-1"
                        />
                        Logout
                     </a>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   </header>
</template>
