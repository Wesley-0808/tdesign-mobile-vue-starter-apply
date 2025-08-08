<template>
  <div class="mine-card">
    <t-avatar class="mine-card--avatar" size="large" alt=""></t-avatar>
    <div class="mine-card--content">
      <div class="mine-card--content--info">
        <div class="mine-card--content--info--name">陈梓博</div>
        <div class="mine-card--content--info--age_reputation">
          <div>21岁</div>
          <div style="margin-left: 8px">前端开发工程师</div>
        </div>
      </div>
      <div class="mine-card--content--edit"><t-icon name="edit" size="20px" /></div>
    </div>
  </div>
  <t-tabs :value="currentValue" :list="tabList" @change="onChange">
    <t-tab-panel v-for="item in tabList" :key="item.value" :value="item.value" :badge-props="item.badgeProps">
      <t-list :async-loading="loading" @scroll="onScroll">
        <div
          v-for="cell in filterActivityList(allActivity.list, currentValue)"
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
          <div
            v-if="isShowLoading && !isShowAll"
            class="t-list--item-click_loading"
            @click.stop="() => onLoad(false, true)"
          >
            <div>点击加载更多</div>
          </div>
          <div v-if="isShowAll" class="t-list--item-had_show_all">
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

import { getMyActivityList } from '@/api/list';
import type { MyActivityList, MyActivityListResult } from '@/api/model/listModel';

const currentPage = ref<number>(1);
const badge = ref<boolean>(false);
const isShowLoading = ref<boolean>(true);
const isShowAll = ref<boolean>(false);

const calShowLoading: () => boolean = () => {
  const viewportWidth = window.innerWidth;
  // 计算 110vw 的像素值
  const vwHeight = viewportWidth * 1.1;
  const totalHeight = filterActivityList(allActivity.value.list, currentValue.value).length * 152;
  return totalHeight < vwHeight;
};

const loadData = async (data: Ref<MyActivityListResult>, isRefresh?: boolean, loadMore = false) => {
  try {
    const page = isRefresh ? 1 : currentPage.value + 1 + (loadMore ? 1 : 0);
    const temp = await getMyActivityList({ page });
    console.log(temp);

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
        console.log(currentPage.value);

        data.value.list.push(...temp.list);
        data.value.is_end = temp.is_end;
        isShowAll.value = temp.is_end;
      }
    }
    isShowLoading.value = calShowLoading();
    return Promise.resolve(data);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

const allActivity = ref<MyActivityListResult>({ list: [], is_end: false });
const loading = ref('');

const onLoad = (isRefresh?: boolean, loadMore = false) => {
  if (allActivity.value.is_end || loading.value) {
    return;
  }
  loading.value = 'loading';
  loadData(allActivity, isRefresh, loadMore)
    .catch((err) => {
      console.log(err);

      Toast({
        theme: 'error',
        direction: 'column',
        message: err,
      });
    })
    .finally(() => {
      loading.value = '';
    });
};

const filterActivityList: (arr: MyActivityList[], tabVal: TabValue) => MyActivityList[] = (
  arr: MyActivityList[],
  tabVal: TabValue,
) => {
  switch (tabVal) {
    case '2':
      return arr;
    case '1':
      return arr.filter((item) => item.status === 1);
    case '0':
      return arr.filter((item) => item.status === 0);
  }
};

const onScroll = (scrollBottom: number) => {
  if (scrollBottom < 50) {
    onLoad();
  }
};

onMounted(() => {
  onLoad();
});

const currentValue = ref<TabValue>('0');
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

const onChange = (value: TabValue) => {
  currentValue.value = value;

  isShowLoading.value = calShowLoading();
  console.log(`change to ${value}`);
};
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
        .flex-center();

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
      .flex-center(space-between);

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
          white-space: nowrap;
          overflow: auto;
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
        margin: 12px 16px;
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
    &-had_show_all {
      .flex-center();

      div {
        height: 20px;
        color: #0009;
        font-size: 16px;
        line-height: 20px;
      }
    }

    &-had_show_all {
      margin-bottom: 16px;
    }
  }
}
</style>
