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
        <h3 class="activity-title">活动嘉宾</h3>
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
        <h3 class="activity-title">活动场地</h3>
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
    <div
      class="bottom-drawer"
      :class="{ 'is-expanded': isExpanded, 'no-transition': isDragging }"
      :style="{ height: `${drawerHeight}px` }"
    >
      <div
        class="drawer-handle"
        :class="{ dragging: isDragging }"
        @mousedown="onDragStart"
        @touchstart.prevent="onDragStart"
      >
        <!-- 弧形图片，仅收回状态显示 -->
        <img v-if="!isExpanded" src="@/assets/assets-detail-arcs.png" alt="弧形装饰" class="drawer-arc-img" />
        <div class="drawer-arrow-container" :class="{ expanded: isExpanded, collapsed: !isExpanded }">
          <t-icon :name="isExpanded ? 'chevron-down' : 'chevron-up'" class="drawer-arrow-icon" />
        </div>
      </div>
      <div v-if="isExpanded" class="drawer-content" @touchmove="onDrawerTouchMove" @wheel.stop>
        <!-- 活动详情容器 -->
        <div class="activity-info-wrapper">
          <!-- 标题 -->
          <h1 class="activity-main-title">{{ activityDetails.title }}</h1>

          <!-- 感兴趣 -->
          <div class="interested-section">
            <div class="avatar-group">
              <img
                v-for="(avatar, index) in activityDetails.interested.avatars"
                :key="index"
                :src="avatar"
                class="avatar"
              />
              <div class="avatar-more">99+</div>
            </div>
            <span class="interested-count">{{ activityDetails.interested.count }}人感兴趣</span>
          </div>

          <!-- 时间与地点 -->
          <div class="info-block">
            <div class="info-row">
              <t-icon name="time" size="20px" />
              <span>时间：{{ activityDetails.time }}</span>
            </div>
            <div class="info-row">
              <t-icon name="location" size="20px" />
              <span>地点：{{ activityDetails.location }}</span>
              <t-button theme="primary" variant="base" size="small" class="nav-button">导航</t-button>
            </div>
          </div>

          <!-- 活动评价 -->
          <div class="rating-section">
            <div class="section-header">
              <h2 class="section-title">活动评价({{ activityDetails.rating.count }})</h2>
              <div class="rating-display">
                <t-rate :default-value="activityDetails.rating.average" size="16px" allow-half show-text disabled />
              </div>
            </div>
            <!-- 评论滚动区 -->
            <div class="reviews-scroll-container">
              <t-cell
                v-for="(review, index) in activityDetails.reviews"
                :key="index"
                :title="review.name"
                :description="review.comment"
                :image="review.avatar"
                :bordered="false"
                class="review-cell"
              />
            </div>
          </div>

          <!-- 活动介绍 -->
          <div class="intro-section">
            <div class="section-header">
              <h2 class="section-title">活动介绍</h2>
            </div>
            <p class="intro-paragraph">{{ activityDetails.introduction }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部操作栏 -->
    <div class="bottom-bar">
      <div class="action-item" :class="{ favorited: isFavorited }" @click="handleFavoriteClick">
        <t-icon :name="isFavorited ? 'heart-filled' : 'heart'" size="24px" />
        <span>{{ isFavorited ? '已收藏' : '收藏' }}</span>
      </div>
      <div class="action-item" @click="handleShareClick">
        <t-icon name="share" size="24px" />
        <span>分享</span>
      </div>
      <t-button theme="primary" shape="rectangle" class="buy-button" @click="handleBuyClick"
        >立即购买 ¥88-¥228</t-button
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
// --- 底部操作栏逻辑 ---
const isFavorited = ref(false);

const handleFavoriteClick = () => {
  isFavorited.value = !isFavorited.value;
  console.log(isFavorited.value ? '已收藏' : '已取消收藏');
};

const handleShareClick = () => {
  console.log('触发分享');
};

const router = useRouter();
const handleBuyClick = () => {
  // 跳转到订单确认页面
  router.push({ path: '/order/confirm' });
};

// 抽屉展开收起逻辑
const MIN_DRAWER_HEIGHT = 20;
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

// 防止滚动冒泡
let lastDrawerTouchY: number | undefined;
const onDrawerTouchMove = (e: TouchEvent) => {
  const target = e.currentTarget as HTMLElement;
  const scrollTop = target.scrollTop;
  const scrollHeight = target.scrollHeight;
  const offsetHeight = target.offsetHeight;
  const direction = e.touches[0].clientY - (lastDrawerTouchY ?? e.touches[0].clientY);
  lastDrawerTouchY = e.touches[0].clientY;

  // 判断是否到达顶部或底部，防止边界穿透
  if ((scrollTop === 0 && direction > 0) || (scrollTop + offsetHeight >= scrollHeight && direction < 0)) {
    e.preventDefault();
    e.stopPropagation();
  } else {
    // 在抽屉内滚动时阻止冒泡
    e.stopPropagation();
  }
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
const activityDetails = reactive({
  title: '2021 SICC服务设计创新大会',
  interested: {
    count: 236,
    avatars: [
      'https://tdesign.gtimg.com/mobile/demos/avatar_1.png',
      'https://tdesign.gtimg.com/mobile/demos/avatar_2.png',
      'https://tdesign.gtimg.com/mobile/demos/avatar_3.png',
      'https://tdesign.gtimg.com/mobile/demos/avatar_4.png',
      'https://tdesign.gtimg.com/mobile/demos/avatar_5.png',
    ],
  },
  time: '2021年3月16日',
  location: '深圳市腾讯滨海大厦',
  rating: {
    average: 4.5,
    count: 26,
  },
  reviews: [
    {
      name: '小小轩',
      avatar: 'https://tdesign.gtimg.com/mobile/demos/avatar_1.png',
      comment: '我已经是第三次参加SICC大会了，作为一名服务体验设计行业的从业者，每次参与都受益匪浅...',
    },
    {
      name: '用户B',
      avatar: 'https://tdesign.gtimg.com/mobile/demos/avatar_2.png',
      comment: '干货满满，特别是关于数字化转型的部分，对我的工作很有启发，强烈推荐！',
    },
    {
      name: '用户C',
      avatar: 'https://tdesign.gtimg.com/mobile/demos/avatar_3.png',
      comment: '场地安排得很好，嘉宾分享也非常精彩。期待下一届的举办。',
    },
  ],
  introduction:
    '在数字化时代背景下，如何抓住机遇，构建“数字”+“文化”更高效、宽领域、深覆盖的新时代文化创新之路，让优秀传统文化得以延续和新生，被更多人认可和接受，也是我们服务设计探索的方向。2021年5月16日，由腾讯用户研究与体验设计部（简称CDC）主办的第三届服务创新大会，将在深圳腾讯滨海大厦召开。近年来数字化正在赋能传统文化的传承和传播，而传统文化也同样在启发新的服务设计理念和思路，两者之间的界限越来越模糊，相互融合。本次大会将围绕文化保育和文化创新，邀请7位传统文物、建筑、服饰、工艺等不同艺术领域的行业专家，为我们分享最新发展趋势和实践经验，开拓来宾在传统文化与数字科技间的碰撞思路，探索新的服务设计课题，让我们先睹为快，了解这些专家们将会分享哪些主题。',
});
</script>
<style lang="less" scoped>
@import './index.less';
</style>
