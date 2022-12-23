<template>
  <footer class="footer">
    <div class="center">
      <div class="info">
        <p>Vue.js 3.x从0到1开发运营搭建平台</p>
        <p>打造企业级项目的实战练习</p>
      </div>
      <div class="list">
        <div class="item">Vue.js 3.x自研组件库的开发</div>
        <div class="item">Node.js全栈项目开发</div>
        <div class="item">Vue.js 3.x页面搭建</div>
      </div>
      <div class="list">
        <div class="item">Vue.js 3.x自研组件库的开发</div>
        <div class="item">Node.js全栈项目开发</div>
        <div class="item">Vue.js 3.x页面搭建</div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style lang="less">
.footer {
  height: 280px;
  padding: 40px;
  box-sizing: border-box;
  width: 100%;

  .center {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .info {
    width: 200px;
    color: #3c6587;
    font-size: 18px;
    width: 300px;
    border-right: 1px #aaaaaa solid;
    line-height: 40px;
  }

  .list {
    padding: 0 20px;
    font-size: 16px;
    width: 200px;
    color: #555555;

    .item {
      height: 36px;
      line-height: 36px;
    }
  }
}
</style>
