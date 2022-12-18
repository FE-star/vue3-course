<template>
  <h1>这是一个受控表单组件</h1>
  <form @submit="onSubmit">
    <div>
      <span>用户名称：</span>
      <input v-model="state.userName" type="text" />
    </div>
    <div>
      <span>密码：</span>
      <input v-model="state.password" type="password" />
    </div>
    <div>
      <span>确认密码：</span>
      <input v-model="state.confirmPassword" type="password" />
    </div>
    <div>
      <button>提交注册</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, toRaw } from 'vue';
const state = reactive({
  userName: '',
  password: '',
  confirmPassword: ''
});

const onSubmit = (e: Event) => {
  e.preventDefault();
  const formData = toRaw(state);
  window.alert(`提交数据：${JSON.stringify(formData)}`);
};
</script>

<style></style>
