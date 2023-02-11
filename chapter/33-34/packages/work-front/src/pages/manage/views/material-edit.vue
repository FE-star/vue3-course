<template>
  <div class="view-material">
    <div class="view-header">
      <div class="view-title">
        <span>编辑物料：</span>
        <span>{{ model.name }}</span>
      </div>
    </div>
    <div class="view-content">
      <DynamicForm
        class="material-data-form"
        :model="model"
        :fieldList="fieldList"
        @finish="onFinish"
      >
        <div class="btn-groups">
          <Button type="primary">确定</Button>
          <Button type="primary" variant="outlined" @click="onClickToPreview"
            >预览</Button
          >
        </div>
      </DynamicForm>
    </div>
  </div>
  <MaterialSnapshot v-bind:materialUuid="(route.query?.uuid as string)" />
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { DynamicForm, Button, Message } from '@my/components';
import type { DynamicFormField } from '@my/components';
import MaterialSnapshot from '../modules/material-snapshot.vue';

const route = useRoute();
const router = useRouter();

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
    })
    .catch((err: Error) => {
      Message.open({
        type: 'error',
        text: `获取信息 [${err.toString()}]`,
        duration: 5000
      });
    });
});

const fieldList: DynamicFormField[] = [
  {
    label: '版本号',
    name: 'currentVersion',
    fieldType: 'Input',
    rule: {
      validator: (val: unknown) => {
        const hasError = !/^[0-9]+\.[0-9]+\.[0-9]+$/.test(`${val}`);
        return {
          hasError,
          message: hasError ? '版本号应为x.y.z的版本格式' : ''
        };
      }
    }
  }
];

const onFinish = (data: { name: string; version: string }) => {
  fetch('/api/post/material/update', {
    body: JSON.stringify(data),
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
    })
    .catch((err: Error) => {
      Message.open({
        type: 'error',
        text: `更新失败 [${err.toString()}]`,
        duration: 2000
      });
    });
};

const onClickToPreview = (e: MouseEvent) => {
  e.preventDefault();
  router.push({
    path: '/material-preview',
    query: { uuid: route.query?.uuid }
  });
};
</script>

<style lang="less">
.view-material {
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

  .material-data-form {
    width: 420px;
    padding: 16px;
    padding-bottom: 0;
    box-sizing: border-box;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    .btn-groups {
      margin-top: 10px;
      width: 100%;
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;
      > button {
        margin: 0 10px;
        padding: 0 40;
      }
    }
  }
}
</style>
