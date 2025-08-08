<template>
  <div :style="{ backgroundColor: bgc }" class="main">
    <navbar style="position: fixed; z-index: 30" />
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
    <tabbar />
  </div>
</template>
<script setup lang="ts">
import '@/style/layout.less';

import { computed } from 'vue';
import { useRoute } from 'vue-router';

// import { prefix } from '@/config/global';
import Navbar from './components/Navbar.vue';
import Tabbar from './components/Tabbar.vue';

const route = useRoute();

const bgc = computed(() => (route.path.includes('mine') ? '#f5f6f7' : '#fff'));
</script>
<style lang="less" scoped>
.main {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  scrollbar-width: none;
}
</style>
