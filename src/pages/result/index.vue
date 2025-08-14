<template>
  <div class="result-page">
    <!-- 1. 顶部导航 -->
    <div class="header">
      <t-button theme="default" size="small" class="back-btn" padding="0" @click="goBack">
        <t-icon name="chevron-left" style="width: 8.07px; height: 13.38px; opacity: 1; color: #000000e6" />
      </t-button>
      <span class="title">购买结果</span>
    </div>

    <!-- 2. 结果状态区 -->
    <div class="result-status">
      <check-circle-icon class="success-icon" size="70" color="#2BAA71" />
      <t-text
        class="status-title"
        :style="{
          width: '80px',
          height: '28px',
          opacity: 1,
          color: '#000000e6',
          fontSize: '20px',
          fontWeight: 600,
          fontFamily: 'PingFang SC',
          textAlign: 'center',
          lineHeight: '28px',
          marginTop: '8px',
        }"
      >
        购买成功
      </t-text>
    </div>

    <!-- 3. 活动信息卡片 -->
    <div class="activity-card">
      <t-image :src="posterUrl" width="100%" height="175" fit="cover" style="border-radius: 12px 12px 0 0" />
      <div class="activity-info">
        <t-text class="activity-title" size="16" weight="600"> 2021 SICC 服务设计创新大会 </t-text>
        <div class="activity-details">
          <t-space align="center" size="small">
            <time-icon size="14" color="#0052D9" />
            <t-text size="12" color="#000">2021年3月16日</t-text>
            <location-icon size="14" color="#0052D9" class="ml-16" />
            <t-text size="12" color="#000">深圳市腾讯滨海大厦</t-text>
          </t-space>
        </div>
      </div>
    </div>

    <!-- 4. 报名人员信息 -->
    <div class="applicant-section">
      <t-text class="section-title">报名人员</t-text>
      <t-list>
        <t-list-item
          :avatar="avatarUrl"
          title="蔡宣轩"
          description="29岁 设计师/艺术从业者"
          style="border-radius: 8px"
        />
      </t-list>
    </div>

    <!-- 5. 操作按钮区 -->
    <div class="action-btns">
      <t-button class="share-btn" theme="default" size="medium"> 分享给朋友 </t-button>
      <t-button class="check-btn" theme="default" size="medium"> 去查看 </t-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { CheckCircleIcon, LocationIcon, TimeIcon } from 'tdesign-icons-vue-next';
import {
  Button as TButton,
  Icon as TIcon,
  Image as TImage,
  List as TList,
  ListItem as TListItem,
  Space as TSpace,
  Text as TText,
} from 'tdesign-mobile-vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const goBack = () => router.back();

const posterUrl = '/assets/activity-poster.png';
const avatarUrl = '/assets/user-avatar.png';
</script>
<style scoped>
/* 总页面容器：严格匹配设计尺寸 */
.result-page {
  width: 375px;
  height: 812px;
  opacity: 1;
  background: #f5f6f7; /* 替换为指定背景色 */
  padding: 16px;
  box-sizing: border-box; /* 确保padding不影响总尺寸 */
  overflow-y: auto; /* 内容超出时可滚动 */
  margin: 0 auto; /* 居中显示（模拟手机屏幕） */
  position: relative; /* 便于内部元素定位 */
}

.header {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  margin: -16px -16px 16px;
  width: 100%;
}

.header .back-btn {
  border: none;
  background: transparent;
  margin-right: 16px;
}

.header .back-btn:hover {
  background: transparent;
}

.header .back-btn .t-icon {
  width: 8.07px !important;
  height: 13.38px !important;
  opacity: 1 !important;
  color: #000000e6 !important;
}

.header .title {
  font-size: 18px;
  font-weight: 600;
  color: #000;
}

.result-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px 0;
}

.result-status .success-icon {
  width: 70px !important;
  height: 70px !important;
  opacity: 1 !important;
  background-color: #2baa71 !important;
}

.result-status .status-title {
  width: 80px;
  height: 28px;
  opacity: 1;
  color: #000000e6;
  font-size: 20px;
  font-weight: 600;
  font-family: 'PingFang SC', sans-serif;
  text-align: center;
  line-height: 28px;
  margin-top: 8px;
}

/* 活动信息卡片 */
.activity-card {
  width: 343px;
  height: 282px;
  border-radius: 12px;
  opacity: 1;
  background: #fff;
  box-shadow:
    0 6px 30px 5px #0000000d,
    0 16px 24px 2px #0000000a,
    0 8px 10px -5px #00000014;
  overflow: hidden;
  margin-bottom: 16px;
}

.activity-card .activity-info {
  padding: 16px;
}

.activity-card .activity-title {
  margin-bottom: 8px;
}

.activity-card .activity-details {
  display: flex;
  align-items: center;
}

.applicant-section {
  width: 327px;
  height: 82px;
  opacity: 1;
  border: 0 solid #e7e7e7;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-sizing: border-box;
}

.applicant-section .section-title {
  width: 249px;
  height: 24px;
  opacity: 1;
  color: #000000e6;
  font-size: 16px;
  font-weight: 600;
  font-family: 'PingFang SC', sans-serif;
  text-align: left;
  line-height: 24px;
  margin-bottom: 8px;
}

.action-btns {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
  width: 100%;
  max-width: 343px;
}

.action-btns .share-btn {
  width: 167.5px;
  height: 48px;
  border-radius: 6px;
  opacity: 1;
  border: 1px solid #0052d9;
  background: #f2f3ff;
  color: #0052d9;
  font-weight: 500;
}

.action-btns .check-btn {
  width: 167.5px;
  height: 48px;
  border-radius: 6px;
  opacity: 1;
  background: #0052d9;
  color: #fff;
  border: none;
  font-weight: 500;
}

.ml-16 {
  margin-left: 16px;
}
</style>
