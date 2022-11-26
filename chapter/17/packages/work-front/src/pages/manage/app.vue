<template>
  <div class="app">
    <header class="header">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/list">List</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </header>
    <main class="content">
      <RouterView />
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
}
.app {
  .header {
    list-style: none;
    margin: 0;
    padding: 0 10px;
    flex-direction: row;
    display: flex;
    background: #3b889f;

    a {
      display: inline-block;
      padding: 10px 20px;
      font-size: 20px;
      color: #ffffff;
      text-decoration: none;

      &.active {
        background: #ffffff;
        color: #3b889f;
      }
    }
  }
  .content {
    padding: 20px;
  }
}
</style>
