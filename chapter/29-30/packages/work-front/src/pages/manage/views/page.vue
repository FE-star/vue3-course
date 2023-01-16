<template>
  <div class="view-page">
    <div class="view-header">
      <div class="view-title">页面配置</div>
      <div>
        <Button type="primary" @click="onSubmitPage">提交页面</Button>
      </div>
    </div>
    <div class="view-content">
      <PageBaseForm :pageBaseData="pageBaseData" />
      <PageEditor v-if="pageRuntimeData" :pageRuntimeData="pageRuntimeData" />
      <PageEditorRowForm @submit="onSubmitAddRow" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, toRaw } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { v4 } from 'uuid';
import { Button, Message } from '@my/components';
import PageEditor from '../modules/page-editor';
import PageEditorRowForm from '../modules/page-editor-row-form.vue';
import PageBaseForm from '../modules/page-editor-base-form.vue';
import {
  createDefaultPageLayoutData,
  parseToPageRuntimeData
} from '../utils/page-data';
import type { PageRuntimeData, PageLayoutData, LayoutRow } from '../types';

const router = useRouter();
const route = useRoute();
const pageRuntimeData = ref<PageRuntimeData | null>(null);
const pageBaseData = reactive<{
  name: string;
  currentVersion: string;
  info: Record<string, any>;
}>({
  name: '',
  currentVersion: '',
  info: {}
});

onMounted(async () => {
  if (route.query.uuid) {
    fetch(`/api/get/page-info-ready/data?uuid=${route.query.uuid}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.data) {
          const data = result.data;
          pageBaseData.currentVersion = data.currentVersion;
          pageBaseData.name = data.name;
          pageBaseData.info = JSON.parse(data.info);
          const layoutData = JSON.parse(data.layout);
          pageRuntimeData.value = layoutData;
        } else {
          Message.open({
            type: result.success ? 'success' : 'error',
            text: result.message,
            duration: 2000
          });
        }
      })
      .catch((err: Error) => {
        Message.open({
          type: 'error',
          text: `获取信息 [${err.toString()}]`,
          duration: 5000
        });
      });
  } else {
    const pageData = reactive<PageLayoutData>(createDefaultPageLayoutData());
    pageRuntimeData.value = parseToPageRuntimeData(pageData);
    pageBaseData.currentVersion = '1.0.0';
    pageBaseData.name = '测试页面';
  }
});

const onSubmitPage = () => {
  if (!pageRuntimeData.value) {
    return;
  }
  const layout: PageLayoutData = {
    layout: toRaw(pageRuntimeData.value.layout),
    moduleMap: toRaw(pageRuntimeData.value.moduleMap)
  };
  const baseData = toRaw(pageBaseData);
  const params = {
    name: baseData.name,
    currentVersion: baseData.currentVersion,
    uuid: route.query.uuid,
    info: JSON.stringify(baseData.info),
    layout: JSON.stringify(layout)
  };

  const isEditStatus =
    typeof route.query.uuid === 'string' && route.query.uuid?.length > 0;
  fetch(
    isEditStatus
      ? '/api/post/page-info-ready/update'
      : '/api/post/page-info-ready/create',
    {
      body: JSON.stringify(params),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    }
  )
    .then((res) => res.json())
    .then((result: any) => {
      Message.open({
        type: result.success ? 'success' : 'error',
        text: result.message,
        duration: 2000
      });
      if (result.success) {
        setTimeout(() => {
          router.push({
            path: '/page-publish',
            query: { uuid: route.query.uuid || result.data?.uuid }
          });
        }, 1000);
      }
    })
    .catch((err: Error) => {
      Message.open({
        type: 'error',
        text: `创建失败 [${err.toString()}]`,
        duration: 2000
      });
    });
};

const onSubmitAddRow = (data: { widthList: number[] }) => {
  const row: LayoutRow = {
    uuid: v4(),
    columns: []
  };
  data?.widthList?.forEach?.((width: number) => {
    row.columns.push({
      uuid: v4(),
      width
    });
  });
  if (row.columns.length > 0) pageRuntimeData.value?.layout.rows.push(row);
};
</script>

<style lang="less">
.view-page {
  padding: 20px;
  box-sizing: border-box;
  color: #333333;
  font-size: 14px;

  .view-header {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;

    .view-title {
      font-size: 22px;
      font-weight: 600;
    }
  }

  .view-content {
    display: flex;
    flex-direction: column;
    font-size: 16px;
  }

  .btn-groups {
    margin: 10px 0;
    text-align: center;
  }
}
</style>
