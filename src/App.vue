<template>
  <router-view
    v-slot="{ Component }"
    class="flex flex-col flex-1"
  >
    <Transition name="fade">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>
<script setup lang="ts">
import { onMounted, Transition } from 'vue'
import { useRouter } from 'vue-router'
import { useRouterStore } from './stores/router'

const router = useRouter()
const rs = useRouterStore()

onMounted(() => {
  rs.setRouter(router)
})
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-leave-active {
  position: absolute; /* 离开时绝对定位，防止挤压 */
  width: 100%;
  height: 100%;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
