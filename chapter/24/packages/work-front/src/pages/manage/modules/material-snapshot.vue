<template>
  <div class="module-material-snapshot">
    <div class="module-header">
      <div class="module-title">物料快照</div>
      <div>
        <Button type="primary" @click="onClickRefresh">刷新快照列表</Button>
      </div>
    </div>
    <div class="data-list">
      <div class="data-item data-header">
        <span class="data-id">快照ID</span>
        <span class="data-name">物料</span>
        <span class="data-name">版本号</span>
        <span class="data-version">操作人</span>
        <span class="data-time">时间</span>
      </div>
      <div
        class="data-item"
        v-for="(data, index) in dataList"
        v-bind:key="index"
      >
        <span class="data-id">{{ data.id }}</span>
        <span class="data-name">{{ data.materialName }}</span>
        <span class="data-name">{{ data.version }}</span>
        <span class="data-version data-value"> {{ data.username }}</span>
        <span class="data-time data-value"> {{ data.createTime }}</span>
      </div>
    </div>
    <Pagination
      :pageNum="dataPage.currentNum"
      :totalDataCount="dataPage.totalDataCount"
      :pageSize="dataPage.size"
      @changePage="onChangePage"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import { Button, Message } from '@my/components';
import dayjs from 'dayjs';
import type { MaterialSnapshotDetail } from '../types';
import Pagination from './pagination.vue';

const props = defineProps<{
  materialUuid: string;
}>();

const dataList = ref<MaterialSnapshotDetail[]>([]);
const dataPage = reactive<{
  currentNum: number;
  size: number;
  totalDataCount: number;
}>({
  currentNum: 1,
  size: 4,
  totalDataCount: 0
});

onMounted(() => {
  updateList({
    size: dataPage.size,
    pageNum: dataPage.currentNum,
    materialUuid: props.materialUuid
  });
});

const onChangePage = (data: { pageNum: number }) => {
  updateList({
    size: dataPage.size,
    pageNum: data.pageNum,
    materialUuid: props.materialUuid
  });
};

const onClickRefresh = () => {
  updateList({
    size: dataPage.size,
    pageNum: 1,
    materialUuid: props.materialUuid
  });
};

function updateList(params: {
  size: number;
  pageNum: number;
  materialUuid: string;
}) {
  const { size, pageNum, materialUuid } = params;
  fetch(
    `/api/get/material-snapshot/list?pageSize=${size}&pageNum=${pageNum}&materialUuid=${materialUuid}`
  )
    .then((res) => res.json())
    .then((result: any) => {
      dataList.value = result?.data?.list.map(
        (item: MaterialSnapshotDetail) => {
          return {
            ...item,
            createTime: dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
          };
        }
      );
      dataPage.currentNum = pageNum;
      dataPage.totalDataCount = result?.data.total;
    })
    .catch((err: Error) => {
      Message.open({
        type: 'error',
        text: `查询失败 [${err.toString()}]`,
        duration: 2000
      });
    });
}
</script>

<style lang="less">
.module-material-snapshot {
  padding: 20px;
  box-sizing: border-box;
  color: #333333;
  font-size: 14px;

  .module-header {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }

  .module-title {
    font-size: 22px;
    font-weight: 600;
  }

  .data-list {
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 20px;

    .data-item {
      position: relative;
      display: flex;
      flex-direction: row;
      padding: 8px 16px;
      border: 1px solid #00000029;
      border-bottom: none;
      justify-content: space-between;

      .data-id {
        width: 60px;
      }
      .data-name {
        width: 240px;
      }
      .data-version {
        width: 100px;
      }
      .data-time {
        width: 160px;
      }

      &.data-header {
        background: #f3f3f3;
      }

      > * {
        display: flex;
      }

      &:first-child {
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
      }
      &:last-child {
        border-bottom-right-radius: inherit;
        border-bottom-left-radius: inherit;
        border-bottom: 1px solid #00000029;
      }
    }

    .data-name,
    .data-action {
      cursor: pointer;

      &.data-value {
        color: #0d6efd;

        &:hover {
          color: #0d6efd;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
