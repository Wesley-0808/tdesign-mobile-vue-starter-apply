<template>
  <div class="activity-detail">
    <div class="content-wrapper">
      <!-- 活动封面图 -->
      <div class="cover-image-container">
        <t-image
          class="cover-image"
          fit="cover"
          :src="coverImageSrc"
          :style="{ width: '100%', height: '200px' }"
        ></t-image>
      </div>

      <!-- 活动嘉宾轮播 -->
      <div class="swiper-wrapper">
        <h3>活动嘉宾</h3>
        <t-swiper
          :navigation="{ type: 'dots', placement: 'outside' }"
          :autoplay="false"
          animation="slide"
          :loop="true"
          :duration="300"
          @click="handleClick"
          @change="handleChange"
        >
          <t-swiper-item v-for="(item, index) in swiperList" :key="index" style="height: 192px">
            <img :src="item" class="img" alt="轮播图片" />
          </t-swiper-item>
        </t-swiper>
      </div>

      <!-- 活动会场轮播 -->
      <div class="swiper-wrapper venue-swiper">
        <h3>活动会场</h3>
        <t-swiper
          :navigation="{ type: 'dots', placement: 'outside' }"
          :autoplay="false"
          animation="slide"
          :loop="true"
          :duration="300"
          @click="handleVenueClick"
          @change="handleVenueChange"
        >
          <t-swiper-item v-for="(item, index) in venueList" :key="index" style="height: 192px">
            <img :src="item" class="img" alt="会场轮播图片" />
          </t-swiper-item>
        </t-swiper>
      </div>
    </div>

    <!-- 抽屉 -->
    <div class="bottom-drawer" :class="{ 'no-transition': isDragging }" :style="{ height: `${drawerHeight}px` }">
      <div
        class="drawer-handle"
        :class="{ dragging: isDragging }"
        @mousedown="onDragStart"
        @touchstart.prevent="onDragStart"
      >
        <span class="drawer-arrow" :class="{ expanded: isExpanded }">^</span>
      </div>
      <div v-if="isExpanded" class="drawer-content">
        <p style="padding: 0 16px 16px; margin: 0; font-size: 14px; color: #555">这里是抽屉内容。</p>
      </div>
    </div>

    <!-- 底部操作栏 -->
    <div class="bottom-bar">
      <div class="action-item">
        <t-icon name="heart" size="24px" />
        <span>收藏</span>
      </div>
      <div class="action-item">
        <t-icon name="share" size="24px" />
        <span>分享</span>
      </div>
      <t-button theme="primary" shape="round" class="buy-button">立即购买 ¥88-¥228</t-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

// 抽屉展开收起逻辑
const MIN_DRAWER_HEIGHT = 60;
const MAX_DRAWER_HEIGHT = window.innerHeight * 0.6;
const drawerHeight = ref(MIN_DRAWER_HEIGHT);
const SNAP_THRESHOLD = (MIN_DRAWER_HEIGHT + MAX_DRAWER_HEIGHT) / 2;
const isExpanded = computed(() => drawerHeight.value > MIN_DRAWER_HEIGHT);

const toggleDrawer = () => {
  drawerHeight.value = isExpanded.value ? MIN_DRAWER_HEIGHT : MAX_DRAWER_HEIGHT;
};

// 抽屉拖拽逻辑
const isDragging = ref(false);
let startY = 0;
let startHeight = 0;
let movedDistance = 0;
const CLICK_DRAG_THRESHOLD = 5; // 小于此位移视为点击

const getClientY = (e: MouseEvent | TouchEvent) => ('touches' in e ? e.touches[0].clientY : e.clientY);

const onDragStart = (e: MouseEvent | TouchEvent) => {
  isDragging.value = true;
  startY = getClientY(e);
  startHeight = drawerHeight.value;
  movedDistance = 0;
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('mouseup', onDragEnd);
  window.addEventListener('touchmove', onDragMove, { passive: false });
  window.addEventListener('touchend', onDragEnd);
};

const onDragMove = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return;
  const currentY = getClientY(e);
  const delta = startY - currentY;
  movedDistance = Math.max(movedDistance, Math.abs(delta));
  let next = startHeight + delta;
  next = Math.max(MIN_DRAWER_HEIGHT, Math.min(next, MAX_DRAWER_HEIGHT));
  drawerHeight.value = next;
  if ('touches' in e) e.preventDefault(); // 阻止页面滚动
};

const onDragEnd = () => {
  if (!isDragging.value) return;
  isDragging.value = false;

  if (movedDistance < CLICK_DRAG_THRESHOLD) {
    // 轻点：切换
    toggleDrawer();
  } else {
    // 拖动：根据当前位置吸附
    drawerHeight.value = drawerHeight.value >= SNAP_THRESHOLD ? MAX_DRAWER_HEIGHT : MIN_DRAWER_HEIGHT;
  }

  window.removeEventListener('mousemove', onDragMove);
  window.removeEventListener('mouseup', onDragEnd);
  window.removeEventListener('touchmove', onDragMove);
  window.removeEventListener('touchend', onDragEnd);
};

const imageCdn = 'https://tdesign.gtimg.com/mobile/demos';
// 添加封面图片
const coverImageSrc = ref('https://tdesign.gtimg.com/demo/demo-image-1.png');

const swiperList = [
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
];

const venueList = [
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
];

const handleClick = (value: number) => {
  console.log('嘉宾点击: ', value);
};

const handleChange = (index: number, context: any) => {
  console.log('嘉宾轮播，页数变化到》》》', index, context);
};

const handleVenueClick = (value: number) => {
  console.log('会场点击: ', value);
};

const handleVenueChange = (index: number, context: any) => {
  console.log('会场轮播，页数变化到》》》', index, context);
};

// 确保导航栏显示在顶部
onMounted(() => {
  // 设置页面标题
  document.title = '活动详情';
});
</script>
<style lang="less" scoped>
.activity-detail {
  min-height: 100vh;
  background-color: #f5f5f5;
  box-sizing: border-box;
  // 添加顶部内边距，为导航栏留出空间
  padding-top: 50px; // 根据实际导航栏高度调整

  .content-wrapper {
    position: relative;
    height: calc(100vh - 50px); // 减去导航栏高度
    overflow-y: auto; // 允许内容滚动
    -webkit-overflow-scrolling: touch; // 增强iOS滚动体验

    // 封面图样式
    .cover-image-container {
      position: relative;
      width: 100%;
      margin-bottom: 16px;

      .cover-image {
        border-radius: 0; // 封面图通常是全宽无圆角
      }

      .cover-title {
        position: absolute;
        bottom: 16px;
        left: 16px;
        color: white;
        font-size: 24px;
        font-weight: bold;
        text-shadow: 0 2px 4px rgb(0 0 0 / 50%); // 添加文字阴影提高可读性
      }
    }

    .swiper-wrapper {
      padding: 0 16px;
      margin-top: 16px;
      margin-bottom: 24px; // 添加底部间距

      h3 {
        margin-bottom: 12px;
        font-size: 18px;
        color: #333;
        font-weight: 500;
      }

      // 确保轮播容器样式正确
      :deep(.t-swiper) {
        overflow: hidden;
        position: relative;
      }

      :deep(.t-swiper__track) {
        display: flex;
        transition: transform 0.3s ease;
      }

      :deep(.t-swiper-item) {
        flex-shrink: 0;
        width: 100%;
      }
    }

    .venue-swiper {
      margin-top: 8px;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover; // 确保图片完全覆盖容器而不变形
      border-radius: 8px; // 添加圆角
    }
  }
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 -2px 4px rgb(0 0 0 / 5%);
  z-index: 1000;

  .action-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 24px;
    font-size: 10px;
    color: #666;

    .t-icon {
      margin-bottom: 4px;
    }
  }

  .buy-button {
    flex: 1;
    height: 40px;
    font-size: 16px;
  }
}

.bottom-drawer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 72px; // 与底部操作栏(假设高度≈72px)错开
  background: #fff;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0 -4px 12px rgb(0 0 0 / 8%);
  overflow: hidden;
  z-index: 999;
  display: flex;
  flex-direction: column;
  transition: height 0.28s ease; // 步骤2：添加高度过渡

  .drawer-handle {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: grab;

    &.dragging {
      cursor: grabbing;
    }
  }

  &.no-transition {
    transition: none;

    .drawer-arrow {
      transition: none;
    }
  }

  .drawer-arrow {
    font-size: 20px;
    color: #999;
    transition: transform 0.28s;

    &.expanded {
      transform: rotate(180deg);
    }
  }

  .drawer-content {
    flex: 1;
    overflow: auto;
  }
}
</style>
