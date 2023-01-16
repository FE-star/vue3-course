<template>
  <div class="view-page-list">
    <div class="view-header">
      <div class="view-title">页面列表</div>
      <div>
        <Button type="primary" @click="onClickToCreate">创建页面</Button>
      </div>
    </div>
    <div class="data-list">
      <div class="data-item data-header">
        <span class="data-name">页面名称</span>
        <span class="data-version">当前版本</span>
        <span class="data-time">创建时间</span>
        <span class="data-time">最后修改</span>
        <span class="data-action">操作</span>
      </div>
      <div
        class="data-item"
        v-for="(data, index) in dataList"
        v-bind:key="index"
      >
        <span class="data-name data-value" @click="onClickToEdit(data)">{{
          data.name
        }}</span>
        <span class="data-version data-value">
          {{ data.currentVersion }}
          <span class="data-tip" v-if="data?.info?.revertFrom">
            (来源自 {{ data?.info?.revertFrom }})
          </span>
        </span>
        <span class="data-time data-value"> {{ data.createTime }}</span>
        <span class="data-time data-value"> {{ data.modifyTime }}</span>
        <span class="data-action">
          <!-- <a
            class="data-value"
            href="javascript:void(0);"
            @click="onPreview('bundle', data)"
          >
            预览Bundle
          </a>
          <a
            class="data-value"
            href="javascript:void(0);"
            @click="onPreview('esm', data)"
          >
            预览ESM
          </a>
          <a
            class="data-value"
            href="javascript:void(0);"
            @click="onPreview('amd', data)"
          >
            预览AMD
          </a> -->
          <span class="data-value" @click="onClickToEdit(data)"> 编辑 </span>
          <span class="data-value" @click="onClickToPublish(data)"> 发布 </span>
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
import { Button, Message } from '@my/components';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import type { MaterialInfo } from '../types';
import Pagination from '../modules/pagination.vue';

const dataList = ref<MaterialInfo[]>([]);
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

// const onPreview = (type: 'bundle' | 'esm' | 'amd', data: any) => {
//   if (data?.info?.[type] !== true) {
//     Message.open({
//       type: 'error',
//       text: '请重新编辑发布'
//     });
//     return;
//   }
//   window.open(`/preview/${data.uuid}/${data.currentVersion}/${type}`);
// };

const onClickToPublish = (data: any) => {
  router.push({
    path: '/page-publish',
    query: { uuid: data.uuid }
  });
};

function updateList(params: { size: number; pageNum: number }) {
  const { size, pageNum } = params;
  fetch(`/api/get/page-info/list?pageSize=${size}&pageNum=${pageNum}`)
    .then((res) => res.json())
    .then((result: any) => {
      Message.open({
        type: result.success ? 'success' : 'error',
        text: result.message,
        duration: 2000
      });

      dataList.value = result?.data?.list.map((item: MaterialInfo) => {
        if (item.info) {
          try {
            item.info = JSON.parse(item?.info as unknown as string);
          } catch (err) {
            // eslint-disable-next-line no-console
            console.warn(err);
          }
        }
        return {
          ...item,
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

const router = useRouter();
const onClickToEdit = (data?: any) => {
  router.push({ path: '/page', query: { uuid: data?.uuid } });
};
const onClickToCreate = () => {
  router.push('/page');
};
</script>

<style lang="less">
.view-page-list {
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
        width: 200px;
      }
      .data-version {
        width: 200px;
        .data-tip {
          margin: 0 2px;
          color: #666666;
        }
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
