<template>
  <t-tab-bar v-if="tabbarVisible" v-model="tabbarValue" theme="tag" :split="false" :on-change="gotoPage">
    <t-tab-bar-item v-for="item in tabbarList" :key="item.value" :value="item.value">
      {{ item.label }}
      <template #icon>
        <t-icon :name="item.icon" />
      </template>
    </t-tab-bar-item>
  </t-tab-bar>
</template>
<script setup lang="ts">
import '@/style/layout.less';

import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import tabbarList from '@/config/tabbar';
import { getActive } from '@/router';

const router = useRouter();

const tabbarVisible = ref(false);
const activeRoutes = computed(() => getActive().split('/').filter(Boolean));

watch(
  activeRoutes,
  (newRoutes) => {
    const routeLength = newRoutes.length;
    // 二级页面不显示tabs
    tabbarVisible.value = routeLength < 2;
  },
  { immediate: true },
);

const tabbarValue = ref(activeRoutes.value[0]);

const gotoPage = (path: string | number) => {
  router.push(path as string);
};
</script>
