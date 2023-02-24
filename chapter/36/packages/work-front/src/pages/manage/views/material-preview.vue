<template>
  <div class="view-material-preview">
    <div class="view-header">
      <div class="view-title">
        <span>预览物料：</span>
        <span>{{ model.name }} {{ model.currentVersion }}</span>
      </div>
    </div>
    <div class="view-content">
      <iframe class="preview-iframe" :srcdoc="iframeSrcDoc"></iframe>

      <MaterialSetting
        :name="model.name"
        :version="model.currentVersion"
        @submitData="onSubmitData"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Message } from '@my/components';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { createIframeDocument } from '../utils/srcdoc';
import MaterialSetting from '../modules/material-setting.vue';

const route = useRoute();
const iframeSrcDoc = ref<string>('');

interface MaterialData {
  uuid: string;
  name: string;
  currentVersion: string;
  info: string;
  extend: string;
  createTime?: string;
  modifyTime?: string;
}
const model = reactive<MaterialData>({
  uuid: '',
  name: '',
  currentVersion: '',
  info: '',
  extend: ''
});

const onSubmitData = (data: any) => {
  if (Object.keys(data).length <= 0) {
    Message.open({ type: 'error', text: '配置数据不能为空' });
    return;
  }
  iframeSrcDoc.value = createIframeDocument({
    name: model.name,
    version: model.currentVersion,
    props: data
  });
};

onMounted(() => {
  fetch(`/api/get/material/data?uuid=${route.query?.uuid}`)
    .then((res) => res.json())
    .then((result) => {
      Message.open({
        type: result.success ? 'success' : 'error',
        text: result.message,
        duration: 2000
      });
      if (result.data) {
        const data = result.data;
        model.uuid = data?.uuid;
        model.name = data?.name;
        model.currentVersion = data?.currentVersion;
        model.info = data?.info;
        model.extend = data?.extend;
      }
      iframeSrcDoc.value = createIframeDocument({
        name: model.name,
        version: model.currentVersion,
        props: {}
      });
    })
    .catch((err: Error) => {
      Message.open({
        type: 'error',
        text: `获取信息 [${err.toString()}]`,
        duration: 5000
      });
    });
});
</script>

<style lang="less">
.view-material-preview {
  padding: 20px;
  width: 1000px;
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
