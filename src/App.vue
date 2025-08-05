<template>
  <t-config-provider :global-config="getComponentsLocale">
    <router-view :key="locale" />
  </t-config-provider>
</template>
<script setup lang="ts">
import { useLocale } from '@/locales/useLocale';

const { getComponentsLocale, locale } = useLocale();
</script>
<style lang="less" scoped>
#nprogress .bar {
  background: var(--td-brand-color) !important;
}
</style>
