<template>
  <div class="app">
    <Header />
    <Content />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from './lib/header.vue';
import Content from './lib/content.vue';
import Footer from './lib/footer.vue';
</script>

<style lang="less">
.app {
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
}
</style>
