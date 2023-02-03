<template>
  <div class="image-list">
    <div
      class="image-item"
      v-for="(item, index) in props.imageList"
      v-bind:key="index"
    >
      <div class="image-preview">
        <img class="image-image" v-lazy-src="item?.imageUrl" />
      </div>
      <div class="image-info">
        <div class="image-title">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  imageList: {
    title: string;
    imageUrl: string;
  }[];
}>();
</script>

<style lang="less" scoped>
.image-list {
  overflow: hidden;

  .image-item {
    background: #f7f9fa;
    height: 120px;
    margin: 10px;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    color: #333333;
    font-size: 12px;
  }

  .image-preview {
    position: absolute;
    display: flex;
    width: 120px;
    top: 0;
    left: 0;
    bottom: 0;
    text-align: center;
    align-items: center;
    justify-content: center;

    .image-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      background: #dcdee0;
    }
  }

  .image-info {
    padding: 10px;
    padding-left: 130px;
    box-sizing: border-box;

    .image-title {
      color: #333333;
      font-size: 16px;
      line-height: 20px;
    }
  }
}
</style>
