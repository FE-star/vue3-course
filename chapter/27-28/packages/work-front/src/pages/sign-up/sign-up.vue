<template>
  <DynamicForm
    class="sign-up-form"
    :model="model"
    :fieldList="fieldList"
    @finish="onFinish"
    @finishFail="onFinishFail"
  >
    <div class="btn-groups">
      <Button type="primary">注册</Button>
      <a href="/page/sign-in">去登录 >></a>
    </div>
  </DynamicForm>
</template>

<script setup lang="ts">
import { DynamicForm, Button, Message } from '@my/components';
import md5 from 'md5';
import type { DynamicFormField } from '@my/components';

interface SignUpFormData {
  username: string;
  password: string;
  confirmPassword: string;
}

const model: SignUpFormData = {
  username: 'admin001',
  password: '123456',
  confirmPassword: '123456'
};

const fieldList: DynamicFormField[] = [
  {
    label: '用户名称',
    name: 'username',
    fieldType: 'Input',
    rule: {
      validator: (val: unknown) => {
        const hasError = /^[0-9a-z\-._]{4,16}$/.test(`${val || ''}`) !== true;
        return {
          hasError,
          message: hasError ? '必须是4~16位的0-9a-z和.-_的组合' : ''
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
        const hasError = /^[0-9a-zA-Z]{6,16}$/gi.test(`${val || ''}`) !== true;
        return {
          hasError,
          message: hasError ? '密码必须是6~16位的数字和字母组合' : ''
        };
      }
    }
  },
  {
    label: '确认密码',
    name: 'confirmPassword',
    fieldType: 'InputPassword',
    rule: {
      validator: (val: unknown) => {
        const hasError = /^[0-9a-zA-Z]{6,16}$/gi.test(`${val || ''}`) !== true;
        return {
          hasError,
          message: hasError ? '密码必须是6~16位的数字和字母组合' : ''
        };
      }
    }
  }
];

const onFinish = (e: SignUpFormData) => {
  if (e.password !== e.confirmPassword) {
    Message.open({
      type: 'error',
      text: '两次密码不一致',
      duration: 2000
    });
    return;
  }
  fetch('/api/post/account/sign-up', {
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
          window.location.href = '/page/sign-in';
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
