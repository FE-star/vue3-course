<template>
  <Box class="example">
    <div :style="{ padding: 10, fontSize: 24 }">这是一个主题演示案例</div>
    <button @click="onClick">点击换主题色</button>
  </Box>
</template>

<script setup lang="ts">
import { Box } from '../src';
import { prefixName } from '../src/theme/index';

const onClick = () => {
  // console.log('Hello World');
  const darkThemeName = `${prefixName}-theme-dark`;
  const html = document.querySelector('html');
  if (html?.classList.contains(darkThemeName)) {
    html?.classList.remove(darkThemeName);
  } else {
    html?.classList.add(darkThemeName);
  }
};
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
}
.example {
  height: 100%;
  padding: 100px;
  box-sizing: border-box;
  text-align: center;
}
</style>
