<template>
  <div class="view-material-create">
    <div class="view-header">
      <div class="view-title">注册物料</div>
    </div>
    <div class="view-content">
      <DynamicForm
        class="material-data-form"
        :model="model"
        :fieldList="fieldList"
        @finish="onFinish"
      >
        <div class="btn-groups">
          <Button type="primary">确定提交</Button>
        </div>
      </DynamicForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { DynamicForm, Button, Message } from '@my/components';
import type { DynamicFormField } from '@my/components';

interface MaterialData {
  uuid?: string;
  name: string;
  version: string;
}

const router = useRouter();

const model: MaterialData = {
  name: '@my/material-xxxxx',
  version: '0.0.0'
};

const fieldList: DynamicFormField[] = [
  {
    label: '组件名称',
    name: 'name',
    fieldType: 'Input',
    rule: {
      validator: (val: unknown) => {
        const hasError = (val as string)?.length === 0;
        return {
          hasError,
          message: hasError ? '物料组件名称不能为空' : ''
        };
      }
    }
  },
  {
    label: '版本号',
    name: 'version',
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
  fetch('/api/post/material/create', {
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
      if (result.success) {
        setTimeout(() => {
          router.push({ path: '/material-list' });
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
</script>

<style lang="less">
.view-material-create {
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
