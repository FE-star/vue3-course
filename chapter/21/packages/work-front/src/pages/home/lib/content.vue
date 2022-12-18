<template>
  <main class="content">
    <div class="center">
      <h1 class="title">运营搭建平台</h1>
      <h1 class="name">欢迎使用运营搭建平台</h1>
      <p class="info">高效、快速搭建生产高质量的前端页面</p>
      <div>
        <Button class="btn" type="primary">开始使用</Button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { Button } from '@my/components';
</script>

<style lang="less">
.content {
  height: 500px;
  background: linear-gradient(45deg, #020031, #335a6d);
  overflow: hidden;
  color: #ffffff;

  .center {
    width: 1000px;
    margin: 0 auto;
    text-align: center;
  }

  .title {
    font-size: 80px;
    font-weight: 800;
    line-height: 1;
    margin: 20px auto;
    margin-top: 60px;
  }

  .name {
    font-size: 30px;
    font-weight: 600;
    line-height: 40px;
    opacity: 0.8;
  }

  .info {
    color: #ffffff;
    font-size: 30px;
    opacity: 0.6;
  }

  .btn {
    height: 50px;
    font-size: 24px;
    font-weight: 600;
    padding: 0 100px;
  }
}
</style>
