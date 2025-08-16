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
      <t-image :src="activity.img" width="100%" height="175" fit="cover" style="border-radius: 12px 12px 0 0" />
      <div class="activity-info">
        <t-text class="activity-title" size="16" weight="600"> {{ activity.name }} </t-text>
        <div class="activity-details">
          <t-space align="center" size="small">
            <time-icon size="14" color="#0052D9" />
            <t-text size="12" color="#000">{{ activity.date[0] }}</t-text>
            <location-icon size="14" color="#0052D9" class="ml-16" />
            <t-text size="12" color="#000">{{ activity.place }}</t-text>
          </t-space>
        </div>
      </div>
    </div>

    <!-- 4. 报名人员信息 - 从resultStore获取数据 -->
    <div v-if="users.length > 0" class="applicant-section">
      <t-text class="section-title">报名人员</t-text>
      <t-list>
        <t-list-item
          v-for="user in users"
          :key="user.id"
          :avatar="user.avatar"
          :title="user.name"
          :description="`${getUserAge(user)}岁 ${user.occupation}`"
          style="border-radius: 8px"
        />
      </t-list>
    </div>

    <!-- 5. 操作按钮区 -->
    <div class="action-btns">
      <t-button class="share-btn" theme="default" size="medium"> 分享给朋友 </t-button>
      <t-button class="check-btn" theme="default" size="medium" @click="goToActivityDetail"> 去查看 </t-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { CheckCircleIcon, LocationIcon, TimeIcon } from 'tdesign-icons-vue-next';
import { computed } from 'vue';
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
</script>
<!-- 抽离后的独立样式文件 -->
<style lang="less" scoped src="./result.less" />
