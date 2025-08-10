<template>
  <div>index</div>
  <!---->
  <t-popup v-model="filterPopupVisible" placement="bottom">
    <div :class="`${prefix}-filter-view`">
      <div :class="`${prefix}-filter-view__header`">
        <div class="title">全部筛选</div>
        <div class="close-icon"><close-icon size="24px" /></div>
      </div>
      <div :class="`${prefix}-filter-view__body`">
        <form-render :form-options="formOptions" :form-config="{ labelAlign: 'top' }" :btn-config="btns" />
      </div>
    </div>
  </t-popup>
</template>
<script setup lang="tsx">
import { CloseIcon } from 'tdesign-icons-vue-next';
import { ref } from 'vue';

import FormRender from '@/components/form';
import type { BtnConfig, FormItems } from '@/components/form/type';
import { ActivityField, ActivityType } from '@/config/consts';
import { prefix } from '@/config/global';

// const prefixClass = `${prefix}`;

const filterPopupVisible = ref(true);
const formOptions: FormItems[] = [
  {
    id: 'activityField',
    label: '面向领域',
    type: 'check-tag',
    class: 'hidden-divider',
    componentProps: {
      options: ActivityField,
    },
  },
  {
    id: 'activityType',
    label: '活动形式',
    type: 'check-tag',
    componentProps: {
      options: ActivityType,
    },
  },
  {
    id: 'phone',
    label: '活动日期',
    type: 'custom',
    component: 123,
  },
  {
    id: 'idCard',
    label: '价格范围（元）',
    type: 'slider',
    componentProps: {
      min: 0,
      max: 588,
      defaultValue: [58, 288],
    },
  },
];
const btns: BtnConfig[] = [
  {
    theme: 'light',
    size: 'large',
    type: 'reset',
    block: true,
    t: 'pages.home.reset',
  },
  {
    theme: 'primary',
    size: 'large',
    type: 'submit',
    block: true,
    t: 'pages.home.confirm',
  },
];
</script>
<style lang="less" scoped>
@import './index.less';
</style>
