<template>
  <div class="home-container container-view">
    <t-sticky :offset-top="0" :z-index="100">
      <div class="top-container">
        <!-- 位置头部 -->
        <div class="location-header">
          <div class="location-info" @click="goToRegion">
            <location-icon size="18px" />
            <span class="city-name">深圳市</span>
          </div>
        </div>

        <!-- 搜索框 -->
        <div class="example-search">
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
        <t-swiper
          class="t-swiper-outside"
          :navigation="{ type: 'dots' }"
          :autoplay="false"
          @click="handleSwiperClick"
          @change="handleSwiperChange"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <t-swiper-item v-for="(item, index) in swiperList" :key="index" style="height: 192px">
            <img :src="item" class="img" />
          </t-swiper-item>
        </t-swiper>
      </div>
    </div>

    <!-- 吸顶部分 -->
    <t-sticky :offset-top="104" :z-index="100">
      <div class="sticky-header">
        <div class="title-container">
          <div class="title-text">全部活动</div>
        </div>
        <div class="activity-nav">
          <t-tabs
            v-model="allActivityTabsActive"
            :list="activityTabs"
            :split="false"
            class="hidden-track"
            style="width: 100%"
          >
          </t-tabs>

          <div class="filter-btn">
            <div>
              <filter-icon size="18px" />
              <span>筛选</span>
            </div>
          </div>
        </div>
      </div>
    </t-sticky>

    <!-- 活动列表内容 -->
    <div class="activity-list">
      <div v-for="(activity, index) in activityList" :key="index" class="activity-list-item">
        <div class="activity-list-item__image">
          <img :src="activity.image" :alt="activity.title" />
        </div>
        <div class="activity-list-item__content">
          <div class="activity-list-item__content-title">{{ activity.title }}</div>
          <div class="activity-list-item__content-evaluate">
            <t-rate :value="activity.rating" :max="5" size="16" placement="" allow-half />
            <span class="evaluate-text">{{ activity.rating }}分</span>
          </div>
          <div class="activity-list-item__content-price">{{ activity.price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { FilterIcon, LocationIcon } from 'tdesign-icons-vue-next';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const allActivityTabsActive = ref(0);
const activityTabs = [
  {
    value: 0,
    label: '最新活动',
  },
  {
    value: 1,
    label: '高分活动',
  },
];
const imageCdn = 'https://tdesign.gtimg.com/mobile/demos';
const swiperList = [
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
];

// 活动列表数据
const activityList = ref([
  {
    title: '2019 SICC服务设计创新大会',
    rating: 5,
    price: '免费活动',
    image: `${imageCdn}/swiper1.png`,
  },
  {
    title: '2021 SICC服务设计创新大会',
    rating: 4.5,
    price: '¥88.00-¥228.00',
    image: `${imageCdn}/swiper2.png`,
  },
  {
    title: '少年与星空 插画巡展',
    rating: 4.5,
    price: '¥98.00-¥118.00',
    image: `${imageCdn}/swiper1.png`,
  },
  {
    title: 'Universe AI艺术展',
    rating: 3.5,
    price: '¥128.00-¥228.00',
    image: `${imageCdn}/swiper2.png`,
  },
  {
    title: '2019 SICC服务设计创新大会',
    rating: 5,
    price: '免费活动',
    image: `${imageCdn}/swiper1.png`,
  },
  {
    title: '2021 SICC服务设计创新大会',
    rating: 4.5,
    price: '¥88.00-¥228.00',
    image: `${imageCdn}/swiper2.png`,
  },
  {
    title: '少年与星空 插画巡展',
    rating: 4.5,
    price: '¥98.00-¥118.00',
    image: `${imageCdn}/swiper1.png`,
  },
  {
    title: 'Universe AI艺术展',
    rating: 3.5,
    price: '¥128.00-¥228.00',
    image: `${imageCdn}/swiper2.png`,
  },
]);

const router = useRouter();

// 跳转到地区选择页面
const goToRegion = () => {
  router.push('/home/region');
};

const handleSwiperChange = (index: number, context: any) => {
  console.log('基础示例,页数变化到》》》', index, context);
};

const handleSwiperClick = (value: number) => {
  console.log('click: ', value);
};

const onChange = (val: string) => {
  console.log('change: ', val);
};

// 防止页面晃动的触摸事件处理
const handleTouchStart = (e: TouchEvent) => {
  e.stopPropagation();
};

const handleTouchMove = (e: TouchEvent) => {
  e.stopPropagation();
};

const handleTouchEnd = (e: TouchEvent) => {
  e.stopPropagation();
};

const value = ref('');
</script>
<style scoped lang="less">
@import './index.less';
</style>
