<template>
  <t-navbar
    v-if="showNav"
    :style="customColorStyle"
    :title="currentTitle"
    :fixed="true"
    :left-arrow="!isInTabbar"
    :on-left-click="() => router.go(-1)"
  />
  <img v-if="isInTabbar" src="/assets/image/bg-head.png" style="width: 100vw; position: fixed" />
  <div v-if="!isInTabbar || showNav" style="height: var(--td-navbar-height, 48px)"></div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import type { RouteMeta } from 'vue-router';
import { useRoute, useRouter } from 'vue-router';

import { useLocale } from '@/locales/useLocale';
import { getActive } from '@/router';
import { useRouterStore } from '@/store';

const route = useRoute();
const router = useRouter();
const { locale } = useLocale();

const routerStore = useRouterStore();
const tabbarConfig = storeToRefs(routerStore);

type RouteTitleMeta = RouteMeta & { title: { [key: string]: string } };

const activeRoutes = computed(() => getActive());

// 判断当前路由是否在tabbar中
const isInTabbar = computed(() => tabbarConfig.tabbarPath.value.includes(activeRoutes.value));

const currentRoute = computed(() => route.matched[route.matched.length - 1]);
const currentRouteMeta = computed(() => currentRoute.value?.meta as RouteTitleMeta);

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

const showNav = computed(() => {
  return !isInTabbar.value || !!currentRouteMeta.value.showNav;
});
</script>
