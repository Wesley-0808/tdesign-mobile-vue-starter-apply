<template>
  <div class="result-page container-view">
    <div class="result-status">
      <check-circle-icon class="success-icon" size="70" color="#2BAA71" />
      <span class="status-title"> 购买成功 </span>
    </div>

    <div v-if="activity" class="activity-card">
      <t-image :src="activity.img" fit="cover" class="activity-img" />
      <div class="activity-info">
        <span class="activity-title"> {{ activity.name }} </span>
        <div class="activity-details">
          <div>
            <time-icon size="16" color="#0052D9" />
            <span class="activity-details-text">{{ activity.date[0] }}</span>
          </div>
          <div>
            <location-icon size="16" color="#0052D9" />
            <span class="activity-details-text">{{ activity.place }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="users.length &gt; 0" class="applicant-wrapper">
      <div class="applicant-title">
        <span>报名人员</span>
      </div>

      <!-- 单独的报名人员列表区域 -->
      <div class="applicant-list">
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

    <div class="action-btns">
      <t-button
        class="btn"
        theme="light"
        variant="outline"
        block
        size="medium"
        :icon="shareIcon"
        @click="handleShareClick"
      >
        分享给朋友
      </t-button>
      <t-button class="btn" theme="primary" size="medium" block @click="goToActivityDetail">去查看</t-button>
    </div>
  </div>

  <t-popup v-model:visible="shareActionSheetVisible" class="share-action-sheet" placement="bottom" destroy-on-close>
    <div class="share-popup-content">
      <div v-for="item in shareActionSheet" :key="item.label" class="share-section">
        <div class="section-title">{{ item.label }}</div>
        <div class="section-list">
          <div v-for="(icon, index) in item.children" :key="index" class="section-item">
            <img :src="icon.img" class="section-img" />
            <p class="section-name">{{ icon.label }}</p>
          </div>
        </div>
      </div>
    </div>

    <t-button class="rectangle-button" size="large" variant="text" block @click="shareActionSheetVisible = false">
      取消
    </t-button>
  </t-popup>
</template>
<script setup lang="ts">
import { CheckCircleIcon, LocationIcon, ShareIcon, TimeIcon } from 'tdesign-icons-vue-next';
import { computed, h, ref } from 'vue';
import { useRouter } from 'vue-router';

import type { ActivityModel } from '@/api/model/listModel';
import { shareActionSheet } from '@/constants';
import { useResultStore } from '@/store/modules/result';
import type { UserInfo } from '@/types/interface';

const shareIcon = () => h(ShareIcon, { size: '20px' });

const resultStore = useResultStore();
const router = useRouter();

const activity = computed<ActivityModel | null>(() => resultStore.getActivity);

const users = computed<UserInfo[]>(() => resultStore.getUsers);

// 计算用户年龄
const getUserAge = (user: UserInfo) => {
  if (!user.birthday) return '未知';
  // 假设birthday格式为"MM-DD"，这里简化处理
  const birthYear = new Date().getFullYear() - 29; // 实际项目中应根据完整生日计算
  return new Date().getFullYear() - birthYear;
};

const goToActivityDetail = () => {
  if (activity.value) {
    router.push(`/activity/detail/${activity.value.id}`);
  }
};

const shareActionSheetVisible = ref(false);

const handleShareClick = () => {
  shareActionSheetVisible.value = true;
};
</script>
<style lang="less" scoped>
@import './index.less';
</style>
