<template>
  <t-navbar
    v-if="showNav"
    :style="customColorStyle"
    :title="currentTitle"
    :fixed="true"
    :left-arrow="showLeftArrow"
    :on-left-click="() => router.go(-1)"
  />
  <!-- <img src="/assets/image/bg-head.png" style="width: 100vw; position: absolute" /> -->
  <div v-if="!isInTabbar || showNav" style="height: var(--td-navbar-height, 48px)"></div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { RouteMeta } from 'vue-router';
import { useRoute, useRouter } from 'vue-router';

import tabbarList from '@/config/tabbar';
import { useLocale } from '@/locales/useLocale';
import { getActive } from '@/router';

const route = useRoute();
const router = useRouter();
const { locale } = useLocale();

type RouteTitleMeta = RouteMeta & { title: { [key: string]: string } };

const activeRoutes = computed(() => getActive().split('/').filter(Boolean));

// 判断当前路由是否在tabbar中
const isInTabbar = computed(() => tabbarList.some((item) => item.value === activeRoutes.value[0] || ''));

const currentRoute = computed(() => route.matched[route.matched.length - 1]);
const currentRouteMeta = computed(() => currentRoute.value?.meta as RouteTitleMeta);
console.log(currentRouteMeta.value);

// 获取当前标题
const currentTitle = computed(() => {
  if (currentRouteMeta.value?.title) {
    if (typeof currentRouteMeta.value.title === 'string') {
      return currentRouteMeta.value.title;
    } else {
      return currentRouteMeta.value.title[locale.value];
    }
  }
  return currentRoute.value?.name?.toString() || route.path.split('/').pop() || '';
});

const customColorStyle = computed(() => {
  const { navBgColor, navFgColor } = currentRouteMeta.value;
  return {
    '--td-navbar-bg-color': navBgColor,
    '--td-navbar-color': navFgColor,
  };
});

// 判断是否显示返回箭头
const showLeftArrow = computed(() => {
  // 获取当前路由层级
  const routeLevel = activeRoutes.value.length;

  // 如果路由层级<=1且在tabbar中，则不显示返回箭头
  return !(routeLevel <= 1 && isInTabbar.value);
});
const showNav = computed(() => {
  return showLeftArrow.value || !!currentRouteMeta.value.showNav;
});
</script>
