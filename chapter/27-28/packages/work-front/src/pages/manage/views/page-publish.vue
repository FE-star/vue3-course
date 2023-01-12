<template>
  <div class="view-page-progress">
    <div class="view-header">
      <div class="view-title">
        <span>页面发布：</span>
      </div>
    </div>
    <div class="view-content">
      <PageProgress
        :stage="pageStage"
        :uuid="pageUuid"
        @publish="onPublish"
        :version="pageCurrentVersion"
      />
      <div :style="{ marginTop: 20 }"></div>
      <PageSnapshotList ref="refSnapshot" :pageUuid="pageUuid" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Message } from '@my/components';
import PageProgress from '../modules/page-progress.vue';
import PageSnapshotList from '../modules/page-snapshot.vue';
import type { PageStage, MyAPIResult } from '../types';
const refSnapshot = ref<{ refreshSnapshot: () => void }>();

const route = useRoute();
const pageUuid = ref<string>(route?.query?.uuid as string);
const pageCurrentVersion = ref<string>('');
const pageStage = ref<PageStage | null>(null);

const onPublish = (data: { stage: PageStage; result: MyAPIResult | Error }) => {
  const result = data.result as MyAPIResult;
  Message.open({
    type: result?.success ? 'success' : 'error',
    text: result.message || result.toString(),
    duration: 2000
  });
  if (result?.success) {
    refreshPageStage();
    refSnapshot?.value?.refreshSnapshot?.();
  }
};

function refreshPageStage() {
  fetch(`/api/get/page-info-ready/data?uuid=${route.query.uuid}`)
    .then((res) => res.json())
    .then((result) => {
      if (result.success !== true) {
        Message.open({
          type: 'error',
          text: result.message,
          duration: 2000
        });
      }
      if (result.data) {
        const data = result.data;
        const info = JSON.parse(data.info);
        pageCurrentVersion.value = data.currentVersion;
        pageStage.value = info.stage || 'ready';
      }
    })
    .catch((err: Error) => {
      Message.open({
        type: 'error',
        text: `获取信息 [${err.toString()}]`,
        duration: 5000
      });
    });
}

onMounted(() => {
  if (route.query.uuid) {
    refreshPageStage();
  }
});
</script>

<style lang="less">
.view-page-progress {
  padding: 20px;
  width: 1100px;
  margin: 0 auto;
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

  .preview-iframe {
    border: 1px solid #999999;
    height: 400px;
    margin-bottom: 10px;
  }
}
</style>
