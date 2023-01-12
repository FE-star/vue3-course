<template>
  <div class="module-page-editor-fill-form">
    <div class="editor-fill-form-header">填充物料</div>
    <DynamicForm :model="model" :fieldList="fieldList" @finish="onSubmit">
      <div class="form-btn-groups">
        <Button type="primary">确定</Button>
        <Button type="primary" variant="outlined" @click="onClickCancel"
          >取消</Button
        >
      </div>
    </DynamicForm>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { Button, DynamicForm, Message } from '@my/components';
import type { DynamicFormField } from '@my/components';
import type { MyAPIResult } from '../types';
const emits = defineEmits<{
  (
    event: 'ok',
    data: {
      name: string;
      materialName: string;
      materialVersion: string;
    }
  ): void;
  (event: 'cancel'): void;
}>();

const model = reactive<{
  name: string;
  materialName: string;
  materialVersion: string;
}>({
  name: '广告位置xxx',
  materialName: '@my/material-banner-slides',
  materialVersion: '0.9.0'
});
const fieldList = reactive<DynamicFormField[]>([
  {
    label: '位置名称',
    name: 'name',
    fieldType: 'Input',
    rule: {
      validator: (val: unknown) => {
        const hasError = (val as string)?.length === 0;
        return {
          hasError,
          message: hasError ? '位置名称不能为空' : ''
        };
      }
    }
  },
  {
    label: '物料名称',
    name: 'materialName',
    fieldType: 'Input',
    rule: {
      validator: (val: unknown) => {
        const hasError = (val as string)?.length === 0;
        return {
          hasError,
          message: hasError ? '物料名称不能为空' : ''
        };
      }
    }
  },
  {
    label: '物料版本号',
    name: 'materialVersion',
    fieldType: 'Input',
    rule: {
      validator: (val: unknown) => {
        const hasError = (val as string)?.length === 0;
        return {
          hasError,
          message: hasError ? '物料版本号不能为空' : ''
        };
      }
    }
  }
]);

const onSubmit = (data: {
  name: string;
  materialName: string;
  materialVersion: string;
}) => {
  const { name, materialName, materialVersion } = data;
  fetch(
    `/api/get/material/check-exist?name=${materialName}&currentVersion=${materialVersion}`
  )
    .then((res) => res.json())
    .then((result: MyAPIResult) => {
      Message.open({
        type: result.success === true ? 'success' : 'error',
        text: result.message || '填充物料失败'
      });
      if (result.success === true) {
        emits('ok', { name, materialName, materialVersion });
      }
    })
    .catch((err: any) => {
      // eslint-disable-next-line no-console
      console.warn(err);
      Message.open({
        type: 'error',
        text: '填充物料出错'
      });
    });
};

const onClickCancel = (e: MouseEvent) => {
  e.preventDefault();
  emits('cancel');
};
</script>

<style lang="less">
.module-page-editor-fill-form {
  width: 600px;
  font-size: 14px;
  padding: 20px;
  box-sizing: border-box;

  .editor-fill-form-header {
    color: #333333;
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 10px;
  }

  .form-btn-groups {
    width: 100%;
    text-align: center;
    > button {
      margin: 0 10px;
    }
  }
}
</style>
