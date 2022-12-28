<template>
  <div class="view-page-list">
    <div class="data-list">
      <div
        class="data-item"
        v-for="(data, index) in dataList"
        v-bind:key="index"
      >
        {{ data }}
      </div>
    </div>
    <div class="pagination">
      <span class="page-item">上一页</span>
      <span class="page-item">1</span>
      <span class="page-item">2</span>
      <span class="page-item">3</span>
      <span class="page-item">4</span>
      <span class="page-item">下一页</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const dataList = [0, 1, 2, 3, 4, 5, 6, 7];
</script>

<style lang="less">
.view-page-list {
  padding: 20px;
  box-sizing: border-box;
  color: #333333;
  font-size: 14px;

  .data-list {
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding-left: 0;

    .data-item {
      position: relative;
      display: block;
      padding: 8px 16px;
      border: 1px solid #00000029;
      border-bottom: none;

      &:first-child {
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
      }
      &:last-child {
        border-bottom-right-radius: inherit;
        border-bottom-left-radius: inherit;
        border-bottom: 1px solid #00000029;
      }
    }
  }

  .pagination {
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    padding-left: 0;

    .page-item {
      display: inline-block;
      padding: 6px 12px;
      border: 1px solid #00000029;
      border-right: none;
      cursor: pointer;

      &:hover {
        color: #0d6efd;
      }

      &:first-child {
        border-top-left-radius: inherit;
        border-bottom-left-radius: inherit;
      }
      &:last-child {
        border-top-right-radius: inherit;
        border-bottom-right-radius: inherit;
        border-right: 1px solid #00000029;
      }
    }
  }
}
</style>
