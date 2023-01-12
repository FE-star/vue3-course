<template>
  <div class="app">
    <header class="header">
      <RouterLink to="/page-list">页面管理</RouterLink>
      <RouterLink to="/material-list">物料管理</RouterLink>
    </header>
    <main class="content">
      <div class="content-view">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
.app {
  height: 100%;
  width: 100%;
  background: #f5f5f5;
  .header {
    list-style: none;
    margin: 0;
    padding: 0 10px;
    flex-direction: row;
    display: flex;
    background: #001529;

    a {
      display: inline-block;
      padding: 10px 20px;
      font-size: 18px;
      color: #ffffff;
      text-decoration: none;

      &.active {
        background: #ffffff;
        color: #001529;
      }
    }
  }
  .content {
    padding: 20px 40px;
    box-sizing: border-box;

    .content-view {
      min-height: 400px;
      min-width: 1000px;
      max-width: 1200px;
      margin: 0 auto;
      background: #ffffff;
      box-shadow: 0px 0px 16px #0000001c;
    }
  }
}
</style>
