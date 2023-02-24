<template>
  <DynamicForm
    class="sign-up-form"
    :model="model"
    :fieldList="fieldList"
    @finish="onFinish"
    @finishFail="onFinishFail"
  >
    <div class="btn-groups">
      <Button type="primary">登录</Button>
      <a href="/page/sign-up">去注册 >></a>
    </div>
  </DynamicForm>
</template>

<script setup lang="ts">
import { DynamicForm, Button, Message } from '@my/components';
import type { DynamicFormField } from '@my/components';
import md5 from 'md5';

interface SignInFormData {
  username: string;
  password: string;
}

const model: SignInFormData = {
  username: 'admin001',
  password: '88888888'
};

const fieldList: DynamicFormField[] = [
  {
    label: '用户名称',
    name: 'username',
    fieldType: 'Input',
    rule: {
      validator: (val: unknown) => {
        const hasError = (val as string)?.length === 0;
        return {
          hasError,
          message: hasError ? '登录名不能为空' : ''
        };
      }
    }
  },
  {
    label: '密码',
    name: 'password',
    fieldType: 'InputPassword',
    rule: {
      validator: (val: unknown) => {
        const hasError = (val as string)?.length === 0;
        return {
          hasError,
          message: hasError ? '密码不能为空' : ''
        };
      }
    }
  }
];

const onFinish = (e: SignInFormData) => {
  fetch('/api/post/account/sign-in', {
    body: JSON.stringify({
      username: e.username,
      password: md5(e.password)
    }),
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
          window.location.href = '/page/manage';
        }, 2000);
      }
    })
    .catch((err: Error) => {
      Message.open({
        type: 'error',
        text: `注册失败 [${err.toString()}]`,
        duration: 2000
      });
    });
};

const onFinishFail = (e: unknown) => {
  // eslint-disable-next-line no-console
  console.log('fail =', e);
};
</script>

<style lang="less">
.sign-up-form {
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

    > a {
      font-size: 16px;
      color: #1890ff;
    }
  }
}
</style>
