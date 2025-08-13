<template>
  <div>
    <navbar />
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
    <tabbar />
  </div>
</template>
<script setup lang="ts">
import '@/style/layout.less';

// import { prefix } from '@/config/global';
import Navbar from './components/Navbar.vue';
import Tabbar from './components/Tabbar.vue';
</script>
