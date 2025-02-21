<template>
  <div>
    <Header />
    <div>
      <router-view v-slot="{ Component }">
        <Transition
          name="slide"
          mode="out-in"
        >
          <component :is="Component" />
        </Transition>
      </router-view>
    </div>
    <Footer />
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'
</script>
<style lang="scss" scoped>
/* 进入和离开的动画 */
.slide-enter-active,
.slide-leave-active {
  transition:
    transform 0.2s ease-in-out,
    opacity 0.2s;
}

/* 旧页面离开时设置绝对定位，防止堆叠 */
.slide-leave-active {
  position: absolute;
  width: 100%;
}

/* 进入前状态（新页面从右侧进入） */
.slide-enter-from {
  transform: translateX(-5%);
  opacity: 0;
}

/* 进入后状态（新页面恢复正常位置） */
.slide-enter {
  transform: translateX(0);
  opacity: 1;
}

/* 离开后状态（旧页面向左侧退出） */
.slide-leave-to {
  transform: translateX(5%);
  opacity: 0;
}
</style>
