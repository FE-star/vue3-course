<template>
  <div class="module-page-snapshot">
    <div class="module-header">
      <div class="module-title">页面上线快照</div>
      <div>
        <Button type="primary" @click="onClickRefresh">刷新快照列表</Button>
      </div>
    </div>
    <div class="data-list">
      <div class="data-item data-header">
        <span class="data-name">页面</span>
        <span class="data-version">版本号</span>
        <span class="data-name">操作人</span>
        <span class="data-time">时间</span>
        <span class="data-action">回滚</span>
      </div>
      <div
        class="data-item"
        v-for="(data, index) in dataList"
        v-bind:key="index"
      >
        <span class="data-name">{{ data.pageName }}</span>
        <span class="data-version">
          {{ data.version }}
          <span class="data-tip" v-if="data?.pageData?.info?.revertFrom">
            (来源自 {{ data?.pageData?.info?.revertFrom }})
          </span>
        </span>
        <span class="data-name data-value">{{ data.username }}</span>
        <span class="data-time data-value"> {{ data.createTime }}</span>
        <span class="data-action">
          <span class="data-value" @click="onClickToRevert(data.version)">
            回滚该版本 {{ data.version }}
          </span>
        </span>
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
import { useRouter } from 'vue-router';
import { Button, Message } from '@my/components';
import dayjs from 'dayjs';
import type { PageSnapshotDetail, PageSnapshotDisplayDetail } from '../types';
import Pagination from './pagination.vue';

const router = useRouter();
const props = defineProps<{
  pageUuid: string;
}>();

const dataList = ref<PageSnapshotDisplayDetail[]>([]);
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
    pageUuid: props.pageUuid
  });
});

const onChangePage = (data: { pageNum: number }) => {
  updateList({
    size: dataPage.size,
    pageNum: data.pageNum,
    pageUuid: props.pageUuid
  });
};

const onClickRefresh = () => {
  updateList({
    size: dataPage.size,
    pageNum: 1,
    pageUuid: props.pageUuid
  });
};

function updateList(params: {
  size: number;
  pageNum: number;
  pageUuid: string;
}) {
  const { size, pageNum, pageUuid } = params;
  fetch(
    `/api/get/page-snapshot/list?pageSize=${size}&pageNum=${pageNum}&pageUuid=${pageUuid}`
  )
    .then((res) => res.json())
    .then((result: any) => {
      dataList.value = result?.data?.list.map((item: PageSnapshotDetail) => {
        const pageData = JSON.parse(item.pageData);
        pageData.info = JSON.parse(pageData.info);
        return {
          ...item,
          createTime: dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
          pageData
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

defineExpose({
  refreshSnapshot: onClickRefresh
});

const onClickToRevert = (snapshotVersion: string) => {
  fetch('/api/post/page-revert/revert', {
    body: JSON.stringify({ uuid: props.pageUuid, snapshotVersion }),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST'
  })
    .then((res) => res.json())
    .then((result: any) => {
      Message.open({
        type: result.success ? 'success' : 'error',
        text: result.message,
        duration: 2000
      });
      setTimeout(() => {
        router.push({
          path: '/page',
          query: {
            uuid: props.pageUuid
          }
        });
      }, 1000);
    })
    .catch((err: Error) => {
      Message.open({
        type: 'error',
        text: `更新失败 [${err.toString()}]`,
        duration: 2000
      });
    });
};
</script>

<style lang="less">
.module-page-snapshot {
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
        width: 200px;
        .data-tip {
          margin: 0 2px;
          color: #666666;
        }
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

    .data-name {
      width: 120px;
    }
    .data-action {
      width: 120px;
      .data-value {
        color: #0d6efd;
        cursor: pointer;
        padding: 0 4px;
        border-right: 1px solid #999999;

        &:last-child {
          border-right: none;
        }

        &:hover {
          color: #0d6efd;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
