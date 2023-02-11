<template>
  <div class="view-page-flow">
    <div class="view-header">
      <div class="view-title">页面流量（近24小时）</div>
    </div>
    <div class="view-sub-title">上游数据</div>
    <div class="data-list">
      <div class="data-item data-header">
        <span class="data-name">上游链接</span>
        <span class="data-time">次数</span>
      </div>
      <div
        class="data-item"
        v-for="(data, index) in prevDataList"
        v-bind:key="index"
      >
        <span class="data-name">{{ data.pageUrl }}</span>
        <span class="data-time">{{ data.count }}</span>
      </div>
    </div>

    <div class="view-sub-title">下游数据</div>
    <div class="data-list">
      <div class="data-item data-header">
        <span class="data-name">下游链接</span>
        <span class="data-time">次数</span>
      </div>
      <div
        class="data-item"
        v-for="(data, index) in nextDataList"
        v-bind:key="index"
      >
        <span class="data-name">{{ data.pageUrl }}</span>
        <span class="data-time">{{ data.count }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, toRaw } from 'vue';
import { Message } from '@my/components';
import { useRoute } from 'vue-router';

interface PageFlowItem {
  pageUrl: string;
  count: number;
}

const route = useRoute();
const prevDataList = ref<PageFlowItem[]>([]);
const nextDataList = ref<PageFlowItem[]>([]);
const prevDataMap = ref<Record<string, number>>({});
const nextDataMap = ref<Record<string, number>>({});

function updateList(params: { pagePath: string; nearTimestamp: number }) {
  const { pagePath, nearTimestamp } = params;
  fetch(
    `/api/get/log/page-track?pagePath=${pagePath}&nearTimestamp=${nearTimestamp}`
  )
    .then((res) => res.json())
    .then((result: any) => {
      Message.open({
        type: result.success ? 'success' : 'error',
        text: result.message,
        duration: 2000
      });

      if (result?.data?.list) {
        result?.data?.list.forEach((item: any) => {
          if (item?.type === 'portal-front' && typeof item.info === 'string') {
            try {
              const info: any = JSON.parse(item.info);
              if (info.type === 'track') {
                if (typeof info.trackPrevLink === 'string') {
                  if (prevDataMap.value[info.trackPrevLink] >= 1) {
                    prevDataMap.value[info.trackPrevLink] += 1;
                  } else {
                    prevDataMap.value[info.trackPrevLink] = 1;
                  }
                } else if (typeof info.trackNextLink === 'string') {
                  if (nextDataMap.value[info.trackNextLink] >= 1) {
                    nextDataMap.value[info.trackNextLink] += 1;
                  } else {
                    nextDataMap.value[info.trackNextLink] = 1;
                  }
                }
              }
            } catch (err) {
              // eslint-disable-next-line no-console
              console.log(err);
            }
          }
        });
      }

      const prevMap = toRaw(prevDataMap.value);
      const nextMap = toRaw(nextDataMap.value);

      Object.keys(prevMap).forEach((key: string) => {
        prevDataList.value.push({
          pageUrl: key,
          count: prevMap[key]
        });
      });
      Object.keys(nextMap).forEach((key: string) => {
        nextDataList.value.push({
          pageUrl: key,
          count: nextMap[key]
        });
      });
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
    pagePath: `/p/${route.query.uuid}`,
    nearTimestamp: 1000 * 60 * 24 * 60
  });
});
</script>

<style lang="less">
.view-page-flow {
  padding: 20px;
  box-sizing: border-box;
  color: #333333;
  font-size: 14px;

  .view-header {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }

  .view-title {
    font-size: 22px;
    font-weight: 600;
  }

  .view-sub-title {
    font-size: 18px;
    font-weight: 500;
    margin: 10px 0;
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
        width: 1000px;
      }
      .data-time {
        width: 130px;
        font-size: 12px;
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
      width: 300px;
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
