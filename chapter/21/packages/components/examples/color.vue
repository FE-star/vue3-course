<template>
  <div class="list">
    <div
      class="item"
      v-for="(color, index) in colorList"
      v-bind:key="index"
      :style="{ background: color }"
    >
      {{ color.toUpperCase() }}
    </div>
  </div>
  <div class="text-list">
    <div
      class="text"
      v-for="(color, index) in colorList"
      v-bind:key="index"
      :data-color="color"
    >
      {{ colorName + '-' + (index + 1) }}
    </div>
  </div>
  <div
    class="demo"
    :style="{ fontSize: 20, background: colorList[1], color: colorList[10] }"
  >
    <div>背景颜色是{{ colorName }}-1 ({{ colorList[0].toUpperCase() }})</div>
    <div>字体颜色是{{ colorName }}-10 ({{ colorList[9].toUpperCase() }})</div>
  </div>
</template>

<script lang="ts" setup>
const colorList = [
  '#f5f5f5',
  '#f0f0f0',
  '#d9d9d9',
  '#bfbfbf',
  '#8c8c8c',
  '#595959',
  '#434343',
  '#262626',
  '#1f1f1f',
  '#141414'
];
const colorName = 'gray';
</script>

<style lang="less">
// @gray-1: #f5f5f5;
// @gray-2: #f0f0f0;
// @gray-3: #d9d9d9;
// @gray-4: #bfbfbf;
// @gray-5: #8c8c8c;
// @gray-6: #595959;
// @gray-7: #434343;
// @gray-8: #262626;
// @gray-9: #1f1f1f;
// @gray-10: #141414;
.list {
  display: flex;
  flex-direction: row;
  width: 800px;
  height: 80px;
  margin: 20px auto;
  margin-bottom: 10px;

  .item {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    border: 1px #000000 solid;
    border-right: none;
    font-weight: 500;
    color: #000000;

    &:nth-child(6),
    &:nth-child(7),
    &:nth-child(8),
    &:nth-child(9),
    &:nth-child(10) {
      color: #ffffff;
    }
  }
}

.text-list {
  display: flex;
  flex-direction: row;
  width: 800px;
  height: 30px;
  margin: 0 auto;

  .text {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;
    color: #000000;
  }
}
.demo {
  display: flex;
  width: 800px;
  height: 100px;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  flex-direction: column;
}
</style>
