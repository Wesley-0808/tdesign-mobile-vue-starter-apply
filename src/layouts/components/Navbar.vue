<template>
  <t-navbar v-if="!isInTabbar" :title="currentTitle" :fixed="false" :left-arrow="showLeftArrow" />
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { RouteMeta } from 'vue-router';
import { useRoute } from 'vue-router';

import tabbarList from '@/config/tabbar';
import { useLocale } from '@/locales/useLocale';
import { getActive } from '@/router';

const route = useRoute();
const { locale } = useLocale();

type RouteTitleMeta = RouteMeta & { title: { [key: string]: string } };

const activeRoutes = computed(() => getActive().split('/').filter(Boolean));

// 判断当前路由是否在tabbar中
const isInTabbar = computed(() => tabbarList.some((item) => item.value === activeRoutes.value[0] || ''));

// 获取当前标题
const currentTitle = computed(() => {
  const currentRoute = route.matched[route.matched.length - 1];
  const meta = currentRoute?.meta as RouteTitleMeta;
  if (meta?.title) {
    if (typeof meta.title === 'string') {
      return meta.title;
    } else {
      return meta.title[locale.value];
    }
  }
  return currentRoute?.name?.toString() || route.path.split('/').pop() || '';
});

// 判断是否显示返回箭头
const showLeftArrow = computed(() => {
  // 获取当前路由层级
  const routeLevel = activeRoutes.value.length;

  // 如果路由层级<=1且在tabbar中，则不显示返回箭头
  return !(routeLevel <= 1 && isInTabbar.value);
});
</script>
