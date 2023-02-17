<template>
  <div class="view-log-list">
    <div class="view-header">
      <div class="view-title">日志列表</div>
      <div class="btn-groups">
        <Button type="primary" @click="onClickToClean('portal-front')">
          清洗 前台-前端 日志
        </Button>
        <!-- <Button type="primary"  @click="onClickToClean('work-front')">清洗后台日志 </Button> -->
      </div>
    </div>
    <div class="data-list">
      <div class="data-item data-header">
        <span class="data-name">日志信息</span>
        <span class="data-type">场景类型</span>
        <span class="data-type">日志类型</span>
        <span class="data-time">记录时间</span>
        <!-- <span class="data-action">操作</span> -->
      </div>
      <div
        class="data-item"
        v-for="(data, index) in dataList"
        v-bind:key="index"
      >
        <span class="data-name data-value">
          {{ data?.info }}
        </span>
        <span class="data-type data-value"> {{ data.type }}</span>
        <span class="data-type data-value">
          {{ (data?.info as LogInfoData)?.type }}
        </span>
        <span class="data-time data-value">
          {{ (data?.info as LogInfoData)?.__time__ }}
        </span>
        <!-- <span class="data-action data-value" @click="onClickToEdit(data)">
          查看
        </span> -->
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
import dayjs from 'dayjs';
import { Button, Message } from '@my/components';
import type { LogInfo, LogInfoData, LogType } from '../types';
import Pagination from '../modules/pagination.vue';

const dataList = ref<LogInfo[]>([]);
const dataPage = reactive<{
  currentNum: number;
  size: number;
  totalDataCount: number;
}>({
  currentNum: 1,
  size: 4,
  totalDataCount: 0
});

const onChangePage = (data: { pageNum: number }) => {
  updateList({
    size: dataPage.size,
    pageNum: data.pageNum
  });
};

function updateList(params: { size: number; pageNum: number }) {
  const { size, pageNum } = params;
  fetch(`/api/get/log/list?pageSize=${size}&pageNum=${pageNum}`)
    .then((res) => res.json())
    .then((result: any) => {
      Message.open({
        type: result.success ? 'success' : 'error',
        text: result.message,
        duration: 2000
      });
      dataList.value = result?.data?.list.map((item: LogInfo) => {
        let infoData: LogInfoData = {};
        try {
          if (typeof item.info === 'string') {
            infoData = JSON.parse(item.info);
            infoData.__time__ = dayjs(infoData.__time__).format(
              'YYYY-MM-DD HH:mm:ss'
            );
          }
        } catch (err) {
          // eslint-disable-next-line no-console
          console.warn(err);
        }
        return {
          ...item,
          info: infoData,
          createTime: dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
          modifyTime: dayjs(item.modifyTime).format('YYYY-MM-DD HH:mm:ss')
        };
      });
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

onMounted(() => {
  updateList({
    size: dataPage.size,
    pageNum: 1
  });
});

const onClickToClean = (type: LogType) => {
  fetch('/api/post/log/clean', {
    body: JSON.stringify({ type }),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST'
  })
    .then((res) => res.json())
    .then((result) => {
      Message.open({
        type: result.success ? 'success' : 'error',
        text: result.message,
        duration: 2000
      });
      result.success &&
        updateList({
          size: dataPage.size,
          pageNum: 1
        });
    })
    .catch((err: Error) => {
      Message.open({
        type: 'error',
        text: `清洗失败 [${err.toString()}]`,
        duration: 2000
      });
    });
};
</script>

<style lang="less">
.view-log-list {
  padding: 20px;
  box-sizing: border-box;
  color: #333333;
  font-size: 14px;

  .view-header {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;

    .btn-groups {
      > button {
        margin: 0 10px;
      }
    }
  }

  .view-title {
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

      .data-name {
        width: 400px;
        word-break: break-all;
      }
      .data-type {
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

    // .data-name,
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
