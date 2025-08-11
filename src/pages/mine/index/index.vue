<template>
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
      <div class="mine-card--content--edit" @click="onEdit"><t-icon name="edit" size="20px" /></div>
    </div>
  </div>
  <t-tabs :value="currentValue" :list="tabList" @change="onChange">
    <t-tab-panel v-for="item in tabList" :key="item.value" :value="item.value" :badge-props="item.badgeProps">
      <t-list :async-loading="activityLoading" @scroll="onScroll">
        <div
          v-for="cell in filterActivityList(allActivityList.list, currentValue)"
          :key="cell.id"
          class="t-list--item"
          align="middle"
        >
          <div class="t-list--item-imgcontainer">
            <img :src="cell.img" alt="" />
          </div>
          <div class="t-list--item-textcontainer">
            <div class="t-list--item-textcontainer-info">
              <div class="t-list--item-textcontainer-info-activity_name">{{ cell.name }}</div>
              <div class="t-list--item-textcontainer-info-date">{{ cell.date }}</div>
            </div>
            <div class="t-list--item-textcontainer-statusbox">
              <div
                class="t-list--item-textcontainer-statusbox-status"
                :style="{ color: cell.status ? '#2ba471' : '#00000066' }"
              >
                {{ cell.status ? '已完成' : '待参加' }}
              </div>
              <div v-if="cell.status" class="t-list--item-textcontainer-statusbox-comment">去评价</div>
            </div>
          </div>
        </div>
        <template #footer>
          <div v-if="userInfo.userid === -1" class="t-list--item-click_to_login" @click.stop="onLogin">
            您还未登录，点击登录
          </div>
          <div
            v-if="userInfo.userid !== -1 && isShowLoading && !isShowAll"
            class="t-list--item-click_loading"
            @click.stop="() => onActivityLoad(false, true)"
          >
            <div>点击加载更多</div>
          </div>
          <div v-if="userInfo.userid !== -1 && isShowAll" class="t-list--item-had_show_all">
            <div>再往下滑也没有啦</div>
          </div>
        </template>
      </t-list>
    </t-tab-panel>
  </t-tabs>
</template>
<script setup lang="ts">
import type { TabValue } from 'tdesign-mobile-vue';
import { Toast } from 'tdesign-mobile-vue';
import type { Ref } from 'vue';
import { onMounted, ref, watch } from 'vue';

import { getMyActivityList, getUserInfo } from '@/api/list';
import type { MyActivityList, MyActivityListResult, UserInfoResult } from '@/api/model/listModel';

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
.mine-card {
  position: relative;
  height: 96px;
  border-radius: 12px;
  background: #fff;
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
        font-size: 16px;
        font-weight: 600;
        white-space: nowrap;
        text-align: center;
        line-height: 24px;
      }

      &--age_reputation {
        height: 24px;
        min-width: 157px;
        .flex-center(flex-start);

        div {
          width: auto;
          height: 20px;
          border-radius: 3px;
          background: #f3f3f3;
          padding: 2px 8px;
          font-size: 12px;
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
  height: 110vw;
  border-radius: 12px;
  background: #fff;
  margin: 0 16px;
  overflow: hidden;

  :deep(&__nav) {
    z-index: 2;
    position: absolute;
    border-radius: 12px;
  }
}

.t-list {
  padding-top: 48px;
  height: 110vw;
  overflow: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  overscroll-behavior: contain;
  border-radius: 12px;

  &::-webkit-scrollbar {
    display: none;
    height: 0;
    width: 0;
  }

  &--item {
    margin: 16px;
    height: 120px;
    border-radius: 9px;
    background: #fff;
    box-shadow:
      0 6px 30px 5px #0000000d,
      0 16px 24px 2px #0000000a,
      0 8px 10px -5px #00000014;
    .flex-center(flex-start);

    &-imgcontainer {
      width: 120px;
      height: 120px;
      border-radius: 9px 0 0 9px;

      img {
        width: 120px;
        height: 120px;
        object-fit: cover;
        object-position: left;
        border-radius: inherit;
      }
    }

    &-textcontainer {
      width: calc(100% - 120px);
      height: 120px;
      display: flex;
      flex-direction: column;

      &-info {
        width: calc(100% - 32px);
        height: 46px;
        margin: 16px;

        &-activity_name {
          height: 22px;
          margin-bottom: 4px;
          color: #000000e6;
          font-size: 14px;
          text-align: left;
          line-height: 22px;
          overflow-x: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        &-date {
          width: 100%;
          height: 20px;
          color: #0009;
          font-size: 12px;
          text-align: left;
          line-height: 20px;
        }
      }

      &-statusbox {
        width: calc(100% - 32px);
        height: 22px;
        margin: 16px;
        margin-top: 10px;
        .flex-center(space-between);

        text-align: left;
        line-height: 22px;
        font-size: 14px;

        &-status {
          font-weight: 600;
        }

        &-comment {
          color: #0052d9;
          font-weight: 400;
        }
      }
    }

    &-click_loading,
    &-click_to_login,
    &-had_show_all {
      .flex-center();

      margin: 16px 0;

      div {
        height: 20px;
        color: #0009;
        font-size: 16px;
        line-height: 20px;
      }
    }

    &-click_to_login {
      color: var(--td-brand-color-6);
      font-size: 18px;
      line-height: 22px;
    }
  }
}
</style>
