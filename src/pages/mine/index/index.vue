<template>
  <div class="container-view">
    <div class="mine-card">
      <t-avatar class="mine-card--avatar" size="large" :image="userInfo.avatar" alt=""></t-avatar>
      <div class="mine-card--content">
        <div class="mine-card--content--info">
          <div class="mine-card--content--info--name">{{ userInfo.username }}</div>
          <div class="mine-card--content--info--age_reputation">
            <div v-show="userInfo.age !== 0">{{ userInfo.age }}岁</div>
            <div v-show="userInfo.reputation !== ''" style="margin-left: 8px">{{ userInfo.reputation }}</div>
          </div>
        </div>
        <div class="mine-card--content--edit" @click="onEdit"><edit-icon size="20px" /></div>
      </div>
    </div>
    <t-tabs :value="currentValue" :list="tabList" @change="onChange">
      <t-tab-panel v-for="item in tabList" :key="item.value" :value="item.value" :badge-props="item.badgeProps">
        <t-list :async-loading="activityLoading" @scroll="onScroll">
          <div
            v-for="cell in filterActivityList(allActivityList.list, currentValue)"
            :key="cell.id"
            class="t-list__item"
            align="middle"
          >
            <div class="t-list__item-img">
              <img :src="cell.img" alt="" />
            </div>
            <div class="t-list__item-content">
              <div class="t-list__item-content-info">
                <div class="t-list__item-content-info-name">{{ cell.name }}</div>
                <div class="t-list__item-content-info-date">{{ cell.date }}</div>
              </div>
              <div class="t-list__item-content-footer">
                <div
                  class="t-list__item-content-footer-status"
                  :style="{ color: cell.status ? '' : 'var(--td-success-color)' }"
                >
                  {{ cell.status ? '已完成' : '待参加' }}
                </div>
                <div v-if="cell.status" class="t-list__item-content-footer-comment">去评价</div>
              </div>
            </div>
          </div>
          <template #footer>
            <div v-if="userInfo.userid === -1" class="t-list__item-click_to_login" @click.stop="onLogin">
              您还未登录，点击登录
            </div>
            <div
              v-if="userInfo.userid !== -1 && isShowLoading && !isShowAll"
              class="t-list__item-empty"
              @click.stop="() => onActivityLoad(false, true)"
            >
              <empty class="t-list__item-empty_img" />
              <div class="t-list__item-empty_title">点击加载更多</div>
            </div>
            <div v-if="userInfo.userid !== -1 && isShowAll" class="t-list__item-end">
              <div>再往下滑也没有啦</div>
            </div>
          </template>
        </t-list>
      </t-tab-panel>
    </t-tabs>
  </div>
</template>
<script setup lang="ts">
import { EditIcon } from 'tdesign-icons-vue-next';
import type { TabValue } from 'tdesign-mobile-vue';
import { Toast } from 'tdesign-mobile-vue';
import type { Ref } from 'vue';
import { onMounted, ref, watch } from 'vue';

import { getMyActivityList, getUserInfo } from '@/api/list';
import type { MyActivityList, MyActivityListResult, UserInfoResult } from '@/api/model/listModel';
import Empty from '@/components/result/Empty';

const userInfo = ref<UserInfoResult>({ userid: -1, username: '', age: 0, avatar: '', reputation: '' }); // 用户信息
const currentPage = ref<number>(1); // 分页加载活动列表
const badge = ref<boolean>(false); // 待参加的右上角的小红点
const isShowLoading = ref<boolean>(true); // 是否显示“点击加载更多”
const isShowAll = ref<boolean>(false); // 是否显示“再往下滑也没有啦”
const allActivityList = ref<MyActivityListResult>({ list: [], is_end: false }); // 活动列表存储
const activityLoading = ref(''); // t-list自带的加载loading，官方用法如此
const currentValue = ref<TabValue>('0'); // 活动列表的tab值

// 定义t-tabs的相关属性
const tabList = [
  {
    value: '0',
    label: '待参加',
    badgeProps: { dot: badge, offset: [-4, 1] },
  },
  {
    value: '1',
    label: '已完成',
  },
  {
    value: '2',
    label: '全部活动',
  },
];

// 点击蓝字登录时触发
const onLogin = () => {
  console.log('登录 逻辑需要你开发～');
};

// 点击编辑icon触发
const onEdit = () => {
  if (userInfo.value.userid === -1) {
    return;
  }
  console.log('编辑 逻辑需要你开发～');
};

// 活动列表滚动到底部触发
const onScroll = (scrollBottom: number) => {
  if (scrollBottom < 50) {
    onActivityLoad();
  }
};

// 更改活动列表tab时触发
const onChange = (value: TabValue) => {
  currentValue.value = value;
  isShowLoading.value = calShowLoading();
};

// 根据t-list盒子的高和视窗高进行判断，看是否需要显示“点击加载更多”
const calShowLoading: () => boolean = () => {
  const viewportWidth = window.innerWidth;
  const vwHeight = viewportWidth * 1.1;
  const totalHeight = filterActivityList(allActivityList.value.list, currentValue.value).length * 152;
  // 列表盒子的子项内容未overflow时就显示“点击加载更多”
  return totalHeight < vwHeight;
};

// 加工活动列表，以在切换到不同tab时，能够正确显示对应的内容
const filterActivityList: (arr: MyActivityList[], tabVal: TabValue) => MyActivityList[] = (
  arr: MyActivityList[],
  tabVal: TabValue,
) => {
  // 和tab文字的意义对应，筛选即可
  switch (tabVal) {
    case '2':
      return arr;
    case '1':
      return arr.filter((item) => item.status === 1);
    case '0':
      return arr.filter((item) => item.status === 0);
  }
};

// 异步请求活动列表
const loadActivityData = async (data: Ref<MyActivityListResult>, isRefresh?: boolean, loadMore = false) => {
  try {
    const page = isRefresh ? 1 : currentPage.value + 1 + (loadMore ? 1 : 0); // 分页加载活动列表，一次不必存储全部
    const userid = userInfo.value.userid !== -1 && userInfo.value.userid;

    // 未登录就不请求
    if (userInfo.value.userid === -1) {
      Toast({
        theme: 'error',
        direction: 'column',
        message: '您还未登录，请先登录',
      });
      return;
    }

    const temp = await getMyActivityList({ page, userid });

    // 检查是否需要增加“待参加”的右上角小红点
    watch(
      () => temp.list.some((item) => item.status === 0),
      (bool) => {
        return bool ? (badge.value = true) : (badge.value = false);
      },
      { immediate: true },
    );

    if (temp.list) {
      if (isRefresh) {
        data.value = temp;
        currentPage.value = 1;
      } else {
        currentPage.value++;
        data.value.list.push(...temp.list);
        data.value.is_end = temp.is_end;
        isShowAll.value = temp.is_end;
      }
    }
    isShowLoading.value = calShowLoading(); // 检查活动数量是否多到overflow了
    return Promise.resolve(data);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

// 加载活动列表主函数
const onActivityLoad = (isRefresh?: boolean, loadMore = false) => {
  // 已经加载完或仍在加载时，不请求
  if (allActivityList.value.is_end || activityLoading.value) {
    return;
  }
  activityLoading.value = 'loading'; // 加上t-list自带的loading
  loadActivityData(allActivityList, isRefresh, loadMore)
    .catch((err) => {
      console.log(err);

      Toast({
        theme: 'error',
        direction: 'column',
        message: err,
      });
    })
    .finally(() => {
      activityLoading.value = '';
    });
};

// 加载用户信息主函数
const onUserInfoLoad = async () => {
  try {
    const res = await getUserInfo();
    userInfo.value = res;
  } catch (err) {
    console.error(err);
    Toast({
      theme: 'error',
      direction: 'column',
      message: err,
    });
  }
};

onMounted(() => {
  onUserInfoLoad();
  onActivityLoad();
});
</script>
<style scoped lang="less">
.container-view {
  margin-bottom: 0 !important;
}

.mine-card {
  position: relative;
  height: 96px;
  border-radius: var(--td-radius-extraLarge);
  background: var(--td-bg-color-container);
  margin: 0 16px;
  margin-bottom: 16px;
  .flex-center(space-evenly);

  &--avatar {
    margin-left: 16px;
  }

  &--content {
    flex-grow: 1;
    height: 64px;
    .flex-center(space-between);

    &--info {
      margin-left: 16px;
      height: 54px;
      .flex-center(flex-end,flex-start);

      flex-direction: column;

      &--name {
        height: 24px;
        font-size: var(--td-font-size-link-large);
        font-weight: 600;
        white-space: nowrap;
        text-align: center;
        line-height: var(--td-line-height-link-large);
      }

      &--age_reputation {
        height: 24px;
        min-width: 157px;
        .flex-center(flex-start);

        div {
          width: auto;
          height: 20px;
          border-radius: var(--td-radius-default);
          background: var(--td-bg-color-page);
          padding: 2px 8px;
          font-size: var(--td-font-size-link-small);
          font-weight: 400;
          text-align: center;
          line-height: 18px;
        }
      }
    }

    &--edit {
      margin: 0 16px;
      width: 20px;
      height: 20px;
      .flex-center();
    }
  }
}

.t-tabs {
  position: relative;
  border-radius: var(--td-radius-extraLarge);
  background: var(--td-bg-color-container);
  margin: 0 16px;
  padding-bottom: 16px;
  overflow: hidden;

  :deep(&__nav) {
    z-index: 2;
    position: absolute;
    border-radius: var(--td-radius-extraLarge);
  }
}

.t-list {
  padding-top: 48px;
  overflow: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  overscroll-behavior: contain;
  border-radius: var(--td-radius-extraLarge);
  height: calc(100vh - 248px);

  &::-webkit-scrollbar {
    display: none;
    height: 0;
    width: 0;
  }

  &__item {
    margin: 16px;
    height: 120px;
    border-radius: var(--td-radius-large);
    background: var(--td-bg-color-container);
    box-shadow: var(--td-shadow-2);
    .flex-center(flex-start);

    overflow: hidden;

    &-img {
      width: 120px;
      height: 120px;
      border-radius: var(--td-radius-large) 0 0 var(--td-radius-large);

      img {
        width: 120px;
        height: 120px;
        object-fit: cover;
        object-position: left;
        border-radius: inherit;
      }
    }

    &-content {
      padding: 16px 16px 12px;
      width: calc(100% - 120px);
      height: 100%;
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &-info {
        &-name {
          height: 22px;
          margin-bottom: 4px;
          color: var(--td-text-color-primary);
          font-size: var(--td-font-size-link-medium);
          text-align: left;
          line-height: var(--td-line-height-link-medium);
          overflow-x: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        &-date {
          width: 100%;
          height: 20px;
          color: var(--td-text-color-secondary);
          font-size: var(--td-font-size-link-small);
          text-align: left;
          line-height: var(--td-line-height-link-small);
        }
      }

      &-footer {
        height: 22px;
        .flex-center(space-between);

        text-align: left;
        line-height: var(--td-line-height-link-medium);
        font-size: var(--td-font-size-link-medium);

        &-status {
          font-weight: 600;
          color: var(--td-text-color-placeholder);
        }

        &-comment {
          color: var(--td-brand-color);
          font-weight: 400;
        }
      }
    }

    &-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 36px 0;

      &_img {
        font-size: 48px;
        display: flex;
        justify-content: center;
      }

      &_text {
        font: var(--td-font-body-medium);
        color: var(--td-text-color-secondary);
        margin-top: var(--td-comp-margin-s);
        margin-bottom: 0;
      }
    }

    &-end {
      .flex-center();

      margin-top: 16px;
      color: var(--td-text-color-secondary);
      font-size: var(--td-font-size-link-medium);
      line-height: var(--td-line-height-link-small);
    }

    &-click_to_login {
      .flex-center();

      color: var(--td-brand-color-6);
      font-size: var(--td-font-size-title-large);
      line-height: var(--td-line-height-link-medium);
      margin: 16px 0;

      div {
        height: 20px;
        color: var(--td-text-color-secondary);
        font-size: var(--td-font-size-link-large);
        line-height: var(--td-line-height-link-small);
      }
    }
  }
}
</style>
