<template>
  <div class="mine-card">
    <t-avatar class="mine-card--avatar" size="large" alt=""></t-avatar>
    <div class="mine-card--content">
      <div class="mine-card--content--info">
        <div class="mine-card--content--info--name">陈梓博</div>
        <div class="mine-card--content--info--age_reputation"></div>
      </div>
      <div class="mine-card--content--edit"><t-icon name="edit" size="20px" /></div>
    </div>
  </div>
  <t-tabs :value="currentValue" :list="tabList" @change="onChange">
    <t-tab-panel v-for="item in tabList" :key="item.value" :value="item.value" :badge-props="item.badgeProps">
      <t-list :async-loading="loading" @scroll="onScroll">
        <t-cell v-for="cell in list" :key="cell" align="middle">
          <span class="cell">{{ cell }}</span>
        </t-cell>
      </t-list>
    </t-tab-panel>
  </t-tabs>
</template>
<script setup lang="ts">
import type { TabValue } from 'tdesign-mobile-vue';
import { onMounted, ref } from 'vue';

const loadData = (data: any, isRefresh?: boolean) => {
  const ONCE_LOAD_NUM = 20;

  return new Promise((resolve) => {
    setTimeout(() => {
      const temp = [];
      for (let i = 0; i < ONCE_LOAD_NUM; i++) {
        if (isRefresh) {
          temp.push(`${i + 1}`);
        } else {
          temp.push(`${data.value.length + 1 + i}`);
        }
      }

      if (isRefresh) {
        data.value = temp;
      } else {
        data.value.push(...temp);
      }

      resolve(data);
    }, 1000);
  });
};

const list = ref<any[]>([]);
const loading = ref('');

const onLoad = (isRefresh?: boolean) => {
  if ((list.value.length >= 60 && !isRefresh) || loading.value) {
    return;
  }
  loading.value = 'loading';
  loadData(list, isRefresh).then(() => {
    loading.value = '';
  });
};

const onScroll = (scrollBottom: number) => {
  if (scrollBottom < 50) {
    onLoad();
  }
};

onMounted(() => {
  onLoad();
});

const currentValue = ref<TabValue>('1');
const tabList = [
  {
    value: '1',
    label: '待参加',
    panel: '内容区1',
    badgeProps: { dot: true, offset: [-4, 1] },
  },
  {
    value: '2',
    label: '已完成',
    panel: '内容区2',
    badgeProps: { count: 8, offset: [-8, 3] },
  },
  {
    value: '3',
    label: '全部活动',
    panel: '内容区3',
  },
];

const onChange = (value: TabValue) => {
  currentValue.value = value;
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
        border: 1px solid #000;
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
}
</style>
