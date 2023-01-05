<template>
  <div class="login-page">
    <div class="title">欢迎注册</div>
    <div class="login-app">
      <SigUp />
    </div>
  </div>
</template>

<script setup lang="ts">
import SigUp from './sign-up.vue';
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

  .title {
    color: #0d68bb;
    font-size: 30px;
    font-weight: 600;
  }
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
