<template>
  <div class="home-container">
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
.hidden-track {
  :deep(.t-tabs__track) {
    display: none;
  }
}

.top-container {
  background: var(--td-bg-color-container);
  background-image: url('/assets/image/bg-head.png');
  background-repeat: no-repeat;
  background-size: cover;
}

.location-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
}

.location-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.city-name {
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  line-height: 22px;
}

.example-search {
  padding: 8px 16px;
}

.hot-recommendations {
  margin-bottom: 8px;
}

.title-container {
  padding: 16px 16px 0;

  .title-text {
    font-size: 20px;
    font-weight: 600;
    color: #000;
  }
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
}

.activity-nav {
  display: flex;
  flex-direction: row;

  .filter-btn {
    height: 48px;
    display: flex;
    align-items: center;

    > div {
      width: 125px;
      display: flex;
      align-items: center;
      gap: 2px;
      line-height: 22px;
      font-size: 14px;
      font-weight: 400;
      justify-content: center;
      border-left: 1px solid #e7e7e7;
    }
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
