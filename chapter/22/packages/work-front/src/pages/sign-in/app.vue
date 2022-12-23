<template>
  <div class="login-page">
    <div class="title">欢迎使用</div>
    <div class="login-app">
      <SigIn />
    </div>
  </div>
</template>

<script setup lang="ts">
import SigIn from './sign-in.vue';
</script>

<style lang="less">
.login-page {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #e1eaf3;
}
.login-app {
  display: flex;
  width: 500px;
  height: 300px;
  border: 1px solid #4d98c7;
  background: #ffffff;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
