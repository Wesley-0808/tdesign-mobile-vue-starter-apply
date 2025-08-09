<template>
  <t-tab-bar v-if="tabbarVisible" v-model="tabbarValue" theme="tag" :split="false" :on-change="gotoPage">
    <t-tab-bar-item v-for="item in tabbarConfig.tabbarList.value" :key="item.path" :value="item.path">
      {{ item.label }}
      <template #icon>
        <t-icon :name="item.icon" />
      </template>
    </t-tab-bar-item>
  </t-tab-bar>
</template>
<script setup lang="ts">
import '@/style/layout.less';

import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { getActive } from '@/router';
import { useRouterStore } from '@/store';

const router = useRouter();
const routerStore = useRouterStore();
const tabbarConfig = storeToRefs(routerStore);

const tabbarVisible = ref(false);
const activeRoutes = computed(() => getActive());

watch(
  activeRoutes,
  (newRoutes) => {
    // 如果当前页面是tabbar的页面
    tabbarVisible.value = tabbarConfig.tabbarPath.value.includes(newRoutes);
  },
  { immediate: true },
);

const tabbarValue = ref(activeRoutes.value);

const gotoPage = (path: string | number) => {
  router.push(path as string);
};
</script>
