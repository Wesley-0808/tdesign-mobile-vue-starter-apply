<template>
  <div class="home-container">
    <!-- 位置头部 -->
    <div class="location-header">
      <div class="location-info" @click="goToRegion">
        <img src="../../../assets/location.svg" alt="位置" class="location-icon" />
        <span class="city-name">深圳市</span>
      </div>
      <div class="menu-container">
        <div class="menu-button">
          <img src="../../../assets/menu-right.svg" alt="菜单" class="menu-icon" />
        </div>
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
    <t-sticky :offset-top="0" :z-index="100">
      <div class="sticky-header">
        <div class="title-container">
          <div class="title-text">全部活动</div>
        </div>
        <div class="filter-tabs">
          <div class="filter-tab active">最新活动</div>
          <div class="filter-tab">高分活动</div>
          <div class="filter-tab">
            <t-icon name="filter" size="16" />
            筛选
          </div>
        </div>
      </div>
    </t-sticky>

    <!-- 活动列表内容 -->
    <div class="activity-list">
      <div v-for="(activity, index) in activityList" :key="index" class="activity-item">
        <div class="activity-image">
          <img :src="activity.image" :alt="activity.title" />
        </div>
        <div class="activity-content">
          <div class="activity-title">{{ activity.title }}</div>
          <div class="activity-rating">
            <t-rate :value="activity.rating" :max="5" size="12" />
            <span class="rating-text">{{ activity.rating }}分</span>
          </div>
          <div class="activity-price">{{ activity.price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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
<style scoped lang="scss">
.home-container {
  background: #fff !important;
  min-height: 100vh;
  background-image: url('/assets/image/bg-head.png') !important;
  background-size: 100% auto !important;
  background-repeat: no-repeat !important;
  background-position: top center !important;
}

.location-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(10px);
  padding: 8px 12px;
  // background: #fff;
}

.location-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.location-icon {
  width: 20px;
  height: 20px;
  filter: drop-shadow(0 1px 2px rgb(0 0 0 / 10%));
}

.city-name {
  font-size: 14px;
  font-weight: 400;
  color: #000;
  letter-spacing: 0.5px;
}

.menu-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.menu-button {
  width: 87px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgb(255 255 255 / 95%);
    transform: translateY(-1px);
  }
}

.menu-icon {
  width: 87px;
  height: 32px;
}

.example-search {
  padding: 8px 16px;
}

.hot-recommendations {
  margin-bottom: 8px;
}

.title-container {
  padding: 16px 16px 8px;
}

.title-text {
  font-size: 20px;
  font-weight: 600;
  color: #000;
}

// 轮播图容器样式
.swiper-wrapper {
  padding: 0 16px 16px;
  overflow: hidden;
  position: relative;
}

// 轮播图样式
:deep(.t-swiper-outside) {
  touch-action: pan-y pinch-zoom;

  .t-swiper__container {
    overflow: hidden;
  }

  .t-swiper__item {
    touch-action: pan-y pinch-zoom;
  }
}

// 吸顶头部样式
.sticky-header {
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  padding: 16px 16px 12px;
}

.filter-tabs {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 12px;
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #999;
  cursor: pointer;
  transition: color 0.2s ease;

  &.active {
    color: #0052d9;
    font-weight: 500;
  }

  &:hover {
    color: #0052d9;
  }
}

// 活动列表样式
.activity-list {
  background: #fff;
  padding: 0 16px;
  padding-bottom: 60px;
}

.activity-item {
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}

.activity-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 12px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.activity-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.activity-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  line-height: 1.4;
  margin-bottom: 8px;
}

.activity-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.rating-text {
  font-size: 12px;
  color: #999;
}

.activity-price {
  font-size: 14px;
  color: #ff6b35;
  font-weight: 500;
}
</style>
