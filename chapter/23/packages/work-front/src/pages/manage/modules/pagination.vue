<template>
  <div class="pagination">
    <div class="page-list">
      <span
        class="page-item"
        :class="{ active: item.active, disabled: item.disabled }"
        v-for="(item, index) in state.pageItemList"
        :key="index"
        @click="onClickPageItem(item)"
        :data-page-num="item.num"
      >
        {{ item.text }}
      </span>
    </div>
    <span class="page-info">
      ( 共{{ state.pageCount }}页， 共{{ props.totalDataCount }}条数据 )
    </span>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, watch } from 'vue';

interface PageItem {
  num: number;
  text: string;
  active: boolean;
  disabled: boolean;
}

const props = defineProps<{
  pageNum: number;
  pageSize: number;
  totalDataCount: number;
}>();

const emits = defineEmits<{
  (event: 'changePage', e: { pageNum: number }): void;
}>();

const state = reactive<{
  pageItemList: PageItem[];
  pageCount: number;
}>({
  pageItemList: [],
  pageCount: 0
});

// 挂载时候进行页码计算和渲染
onMounted(() => {
  updatePagination({
    size: props.pageSize,
    pageNum: props.pageNum,
    total: props.totalDataCount
  });
});

watch(
  [() => props.pageSize, () => props.pageNum, () => props.totalDataCount],
  ([pageSize, pageNum, totalDataCount]) => {
    // 监听数据变化时候，进行页码重新计算和渲染
    updatePagination({
      size: pageSize,
      pageNum: pageNum,
      total: totalDataCount
    });
  }
);

// 点击页码的事件
const onClickPageItem = (item: PageItem) => {
  if (item.active || item.disabled) {
    return;
  }
  updatePagination({
    size: props.pageSize,
    pageNum: item.num,
    total: props.totalDataCount
  });
  emits('changePage', { pageNum: item.num });
};

// 页码数据的统一更新方法
function updatePagination(params: {
  size: number;
  pageNum: number;
  total: number;
}) {
  const { total, size } = params;
  const pageItemList = parsePagination(params);
  state.pageItemList = pageItemList;
  state.pageCount = Math.ceil(total / size);
}

// 页码的计算方法
function parsePagination(params: {
  size: number;
  total: number;
  pageNum: number;
}) {
  const { size, total, pageNum } = params;
  const pageItemList: PageItem[] = [];
  const pageCount = Math.ceil(total / size);
  const pageStartNum: number = Math.max(1, pageNum - 2);
  const pageEndNum: number = Math.min(pageCount, pageNum + 2);

  for (let i = pageStartNum; i <= pageEndNum; i++) {
    pageItemList.push({
      num: i,
      text: `${i}`,
      active: i === pageNum,
      disabled: false
    });
  }
  pageItemList.unshift({
    num: pageNum - 1,
    text: '上一页',
    active: false,
    disabled: pageNum - 1 < pageStartNum
  });
  pageItemList.push({
    num: pageNum + 1,
    text: '下一页',
    active: false,
    disabled: pageNum + 1 > pageEndNum
  });
  return pageItemList;
}
</script>

<style lang="less">
.pagination {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  padding-left: 0;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #333333;

  .page-info {
    padding: 0 10px;
  }

  .page-list {
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    padding-left: 0;
    align-items: center;
    justify-content: center;
  }

  .page-item {
    display: inline-block;
    padding: 6px 12px;
    border: 1px solid #00000029;
    border-right: none;
    cursor: pointer;

    &.active {
      color: #ffffff;
      background: #0d6efd;
      cursor: auto;
      &:hover {
        color: #ffffff;
        background: #0d6efd;
      }
    }
    &.disabled {
      color: #999999;
      background: #ffffff;
      cursor: not-allowed;
      &:hover {
        color: #999999;
        background: #ffffff;
      }
    }

    &:hover {
      color: #0d6efd;
    }

    &:first-child {
      border-top-left-radius: inherit;
      border-bottom-left-radius: inherit;
    }
    &:last-child {
      border-top-right-radius: inherit;
      border-bottom-right-radius: inherit;
      border-right: 1px solid #00000029;
    }
  }
}
</style>
