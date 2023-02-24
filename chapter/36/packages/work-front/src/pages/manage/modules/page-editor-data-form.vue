<template>
  <div class="module-page-editor-data-form">
    <div class="editor-data-form-header">物料数据源</div>
    <MaterialSetting
      :name="props.name"
      :version="props.version"
      :submitButtonText="'提交数据'"
      :showCancelButton="true"
      @submitData="onSubmitData"
      @cancel="onCancel"
    />
  </div>
</template>

<script lang="ts" setup>
import { Message } from '@my/components';
import MaterialSetting from './material-setting.vue';

const props = defineProps<{ name: string; version: string }>();
const emits = defineEmits<{
  (event: 'submit', data: any): void;
  (event: 'cancel'): void;
}>();

const onSubmitData = (data: any) => {
  if (Object.keys(data).length <= 0) {
    Message.open({ type: 'error', text: '配置数据不能为空' });
    return;
  }
  emits('submit', data);
};
const onCancel = () => {
  emits('cancel');
};
</script>

<style lang="less">
.module-page-editor-data-form {
  width: 1000px;
  height: 600px;
  overflow: auto;
  font-size: 14px;
  padding: 20px;
  box-sizing: border-box;

  .editor-data-form-header {
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
