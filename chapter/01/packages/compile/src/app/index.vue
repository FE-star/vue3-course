<template>
  <div class="v-counter">
    <VText :text="num" />
    <button class="v-btn" @click="click">点击加1</button>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import VText from './text.vue';
  const num = ref(0);
  const click = () => {
    num.value += 1;
  }
</script>

<style>
  .v-counter {
    width: 200px;
    margin: 20px auto;
    padding: 10px;
    color: #666666;
    box-shadow: 0px 0px 9px #00000066;
    text-align: center;
  }
  .v-counter .v-text {
    font-size: 28px;
    font-weight: bolder;
  }
  .v-counter .v-btn {
    font-size: 20px;
    padding: 0 10px;
    height: 32px;
    cursor: pointer;
  }
</style>

