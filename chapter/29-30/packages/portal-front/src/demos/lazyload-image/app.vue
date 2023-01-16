<template>
  <div class="main" v-lazy-container>
    <ImageList :imageList="imageList" />
  </div>
</template>

<script lang="ts" setup>
import ImageList from './image-list.vue';
const imageList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => {
  return {
    imageUrl: `/public/cdn/svg/image-${i}.svg`,
    title: `第${i + 1}张图片`
  };
});
</script>

<style lang="less">
.main {
  box-shadow: 1px 1px 20px #3938385c;
  border-radius: 10px;
  margin: 10px auto;
  margin-top: 50px;
  width: 360px;
  height: 320px;
  overflow: auto;
}
</style>
