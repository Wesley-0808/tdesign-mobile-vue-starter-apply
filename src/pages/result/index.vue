<template>
  <div class="result-page">
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

    <!-- 3. 活动信息卡片 - 从resultStore获取数据 -->
    <div v-if="activity" class="activity-card">
      <t-image :src="activity.img" fit="cover" class="activity-img" />
      <div class="activity-info">
        <t-text class="activity-title"> {{ activity.name }} </t-text>
        <div class="activity-details">
          <t-space align="center" size="small">
            <time-icon size="14" color="#0052D9" />
            <t-text class="date-text">{{ activity.date[0] }}</t-text>
            <location-icon size="14" color="#0052D9" class="ml-16" />
            <t-text class="place-text">{{ activity.place }}</t-text>
          </t-space>
        </div>
      </div>
    </div>

    <div v-if="users.length &gt; 0" class="applicant-section-wrapper">
      <!-- 单独的报名人员标题区域 -->
      <div class="applicant-title-container">
        <t-text class="applicant-title">报名人员</t-text>
      </div>

      <!-- 单独的报名人员列表区域 -->
      <div class="applicant-list-container">
        <div class="user-cell-list">
          <t-cell
            v-for="user in users"
            :key="user.id"
            :image="user.avatar"
            shape="circle"
            :title="user.name"
            :description="`${getUserAge(user)}岁 ${user.occupation}`"
          >
          </t-cell>
        </div>
      </div>
    </div>

    <!-- 4. 分享按钮 -->
    <div class="action-btns">
      <div class="popup-demo">
        <!-- 触发分享弹窗的按钮 -->
        <t-button class="share-btn" theme="default" size="medium" @click="handleShareClick">分享给朋友</t-button>
        <!-- 底部弹出的弹窗组件 -->
        <t-popup v-model="visible" placement="bottom" destroy-on-close>
          <div class="share-popup-content">
            <!-- 分享给朋友标题及列表 -->
            <div class="share-section">
              <div class="section-title">分享给朋友</div>
              <div class="friend-list">
                <div v-for="(friend, index) in friendList" :key="index" class="friend-item">
                  <img :src="friend.avatar" alt="friend-avatar" class="friend-avatar" />
                  <p class="friend-name">{{ friend.name }}</p>
                </div>
              </div>
            </div>
            <!-- 分享到社媒标题及列表 -->
            <div class="share-section">
              <div class="section-title">分享到社媒</div>
              <div class="social-list">
                <div v-for="(social, index) in socialList" :key="index" class="social-item">
                  <img :src="social.icon" alt="social-icon" class="social-icon" />
                  <p class="social-name">{{ social.name }}</p>
                </div>
              </div>
            </div>
            <!-- 取消按钮 -->
            <t-button theme="default" size="medium" class="cancel-btn" @click="visible = false">取消</t-button>
          </div>
        </t-popup>
      </div>
      <t-button class="check-btn" theme="default" size="medium" @click="goToActivityDetail">去查看</t-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { CheckCircleIcon, LocationIcon, TimeIcon } from 'tdesign-icons-vue-next';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import type { ActivityModel } from '@/api/model/listModel';
import { useResultStore } from '@/store/modules/result';
import type { UserInfo } from '@/types/interface';

// 初始化resultStore实例
const resultStore = useResultStore();
const router = useRouter();

// 从resultStore获取活动信息（通过getter）
const activity = computed<ActivityModel | null>(() => resultStore.getActivity);

// 从resultStore获取用户列表（通过getter）
const users = computed<UserInfo[]>(() => resultStore.getUsers);

// 计算用户年龄
const getUserAge = (user: UserInfo) => {
  if (!user.birthday) return '未知';
  // 假设birthday格式为"MM-DD"，这里简化处理
  const birthYear = new Date().getFullYear() - 29; // 实际项目中应根据完整生日计算
  return new Date().getFullYear() - birthYear;
};

// 跳转到活动详情页（使用活动ID）
const goToActivityDetail = () => {
  if (activity.value) {
    router.push(`/activity/detail/${activity.value.id}`);
  }
};

// 控制弹窗显示隐藏
const visible = ref(false);
// // 模拟分享给朋友的好友数据
const friendList = [
  { avatar: '/assets/image/Allen.png', name: 'Allen' },
  { avatar: '/assets/image/nick.png', name: 'Nick' },
  { avatar: '/assets/image/jacky.png', name: 'Jacky' },
  { avatar: '/assets/image/eric.png', name: 'Eric' },
  { avatar: '/assets/image/john.png', name: 'Johnsc' },
];
// 模拟分享到社媒的平台数据
const socialList = [
  { icon: '/assets/image/wechat.png', name: 'WeChat' },
  { icon: '/assets/image/qq.png', name: 'QQ' },
  { icon: '/assets/image/doc.png', name: 'Doc' },
  { icon: '/assets/image/map.png', name: 'Map' },
  { icon: '/assets/image/music.png', name: 'QQ Mus' },
];

// 点击分享按钮的处理函数
const handleShareClick = () => {
  visible.value = true;
};
</script>
<!-- 抽离后的独立样式文件 -->
<style lang="less" scoped src="./result.less" />
