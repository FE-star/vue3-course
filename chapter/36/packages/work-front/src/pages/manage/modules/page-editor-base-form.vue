<template>
  <div class="module-page-editor-base-form">
    <DynamicForm :model="props.pageBaseData" :fieldList="fieldList" />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { DynamicForm } from '@my/components';
import type { DynamicFormField } from '@my/components';

const props = defineProps<{
  pageBaseData: {
    name: string;
    currentVersion: string;
  };
}>();

const fieldList = reactive<DynamicFormField[]>([
  {
    label: '页面名称',
    name: 'name',
    fieldType: 'Input',
    rule: {
      validator: (val: unknown) => {
        const hasError = (val as string)?.length === 0;
        return {
          hasError,
          message: hasError ? '页面名称不能为空' : ''
        };
      }
    }
  },
  {
    label: '页面版本号',
    name: 'currentVersion',
    fieldType: 'Input',
    rule: {
      validator: (val: unknown) => {
        const hasError = (val as string)?.length === 0;
        return {
          hasError,
          message: hasError ? '页面版本号不能为空' : ''
        };
      }
    }
  }
]);
</script>

<style lang="less">
.module-page-editor-base-form {
  width: 800px;
  margin: 0 auto;
  font-size: 14px;
  box-sizing: border-box;

  .my-vue-dynamic-form {
    margin: 0;
    .my-vue-form {
      margin: 0;
      flex-direction: row;
      display: flex;
    }
  }
}
</style>
