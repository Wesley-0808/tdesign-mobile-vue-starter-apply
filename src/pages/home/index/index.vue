<template>
  <div class="home-container container-view">
    <t-sticky :offset-top="0" :z-index="100">
      <div class="top-container">
        <!-- 位置头部 -->
        <div class="location-header">
          <div class="location-info" @click="goToRegion">
            <location-icon size="18px" />
            <span class="city-name">{{ currentCity }}</span>
          </div>
        </div>

        <!-- 搜索框 -->
        <div class="search-bar">
          <t-search
            v-model="value"
            :clearable="true"
            shape="round"
            placeholder="搜索活动"
            @change="() => onChange('')"
          ></t-search>
        </div>
      </div>
    </t-sticky>

    <!-- 热门推荐部分 -->
    <div class="hot-recommendations">
      <div class="title-container">
        <div class="title-text">热门推荐</div>
      </div>
      <div class="swiper-wrapper">
        <div class="swiper-container">
          <t-swiper
            :key="recommendList.length"
            :navigation="{ type: 'dots', placement: 'outside' }"
            :autoplay="false"
            @click="handleClick"
            @change="handleChange"
            @touchstart="handleTouchPrevent"
            @touchmove="handleTouchPrevent"
            @touchend="handleTouchPrevent"
          >
            <t-swiper-item v-for="(item, index) in recommendList" :key="item.id" style="height: 172px">
              <img :src="item.img" :alt="`推荐活动-${index + 1}`" />
            </t-swiper-item>
          </t-swiper>
        </div>
      </div>
    </div>

    <!-- 吸顶部分 -->
    <t-sticky :offset-top="104" :z-index="100">
      <div class="sticky-header">
        <div class="title-container">
          <div class="title-text">全部活动</div>
        </div>
        <div class="activity-nav">
          <t-tabs v-model="sortBy" :list="activityTabs" :split="false" class="hidden-track" style="width: 100%">
          </t-tabs>

          <div class="filter-btn">
            <div @click="filterPopupVisible = true">
              <filter-icon size="18px" />
              <span>筛选</span>
            </div>
          </div>
        </div>
      </div>
    </t-sticky>

    <!-- 活动列表内容 -->
    <div class="activity-list">
      <activity-list :data="activityListData" :sort-by="sortBy" />
    </div>
  </div>

  <!---->
  <t-popup v-model="filterPopupVisible" placement="bottom">
    <div :class="`${prefix}-filter-view`">
      <div :class="`${prefix}-filter-view__header`">
        <div class="title">全部筛选</div>
        <div class="close-icon" @click="filterPopupVisible = false"><close-icon size="24px" /></div>
      </div>
      <div :class="`${prefix}-filter-view__body`">
        <form-render
          :form-options="formOptions"
          :form-config="{ labelAlign: 'top' }"
          :btn-config="btns"
          @confirm="onFilterData"
        />
      </div>
    </div>
  </t-popup>
</template>
<script setup lang="ts">
import { CloseIcon, FilterIcon, LocationIcon } from 'tdesign-icons-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { getAllActivityList, getRecommendList } from '@/api/list';
import ActivityList from '@/components/activity-list';
import FormRender from '@/components/form';
import type { BtnConfig, FormItems } from '@/components/form/type';
import { ActivityField, ActivityType } from '@/config/consts';
import { prefix } from '@/config/global';
import { useCityStore } from '@/store';

const cityStore = useCityStore();
const router = useRouter();

onMounted(() => {
  getRecommendListData();
  getActivityListData();
});

// 从 store 获取当前城市
const currentCity = computed(() => cityStore.getCurrentCity);

const recommendList = ref([]);
const getRecommendListData = async () => {
  const res = await getRecommendList();
  recommendList.value = res.list;
};

const activityListData = ref([]);
const getActivityListData = async () => {
  const res = await getAllActivityList();
  activityListData.value = res.list;
  console.log(activityListData.value, 'activityListData');
};

const sortBy = ref('latest');
const activityTabs = [
  {
    value: 'latest',
    label: '最新活动',
  },
  {
    value: 'max-evaluate',
    label: '高分活动',
  },
];
const filterOptions = ref({});

const filterPopupVisible = ref(false);
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
    id: 'activityDate',
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

// 跳转到地区选择页面
const goToRegion = () => {
  router.push('/home/region');
};

const handleChange = (index: number, context: any) => {
  console.log('基础示例,页数变化到》》》', index, context);
};

const handleClick = (value: number) => {
  console.log('[click] ', value);
};

const onChange = (val: string) => {
  console.log('change: ', val);
};

const onFilterData = (_verify: boolean, data: any) => {
  filterOptions.value = data;
};

// 防止页面晃动的触摸事件处理
const handleTouchPrevent = (e: TouchEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

const value = ref('');
</script>
<style scoped lang="less">
@import './index.less';
</style>
