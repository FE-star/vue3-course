<template>
  <h1>这是一个非受控表单组件</h1>
  <form @submit="onSubmit">
    <div>
      <span>用户名称：</span>
      <input ref="inputUserName" name="username" type="text" />
    </div>
    <div>
      <span>密码：</span>
      <input ref="inputPassword" name="password" type="password" />
    </div>
    <div>
      <span>确认密码：</span>
      <input
        ref="inputConfirmPassword"
        name="confirmPassword"
        type="password"
      />
    </div>
    <div>
      <button>提交注册</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const inputUserName = ref<HTMLInputElement>();
const inputPassword = ref<HTMLInputElement>();
const inputConfirmPassword = ref<HTMLInputElement>();

const onSubmit = (e: Event) => {
  e.preventDefault();
  const formData = {
    userName: inputUserName?.value?.value,
    password: inputPassword?.value?.value,
    confirmPassword: inputConfirmPassword?.value?.value
  };
  window.alert(`提交数据：${JSON.stringify(formData)}`);
};
</script>

<style></style>
