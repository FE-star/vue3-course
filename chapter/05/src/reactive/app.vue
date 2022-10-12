<template>
  <div class="app">
    <div class="text">Count: {{state.count}}</div>
    <button class="btn" @click="onClick">Add</button>
  </div>
</template>

<script setup>
  import { reactive } from 'vue';
  const state = reactive({
    count: 0
  });
  const onClick = () => {
    state.count ++;
  }
</script>

<style>
.app {
  width: 200px;
  padding: 10px;
  margin: 10px auto;
  box-shadow: 0px 0px 9px #00000066;
  text-align: center;
}
.app .text {
  font-size: 28px;
  font-weight: bolder;
  color: #666666;
}
.app .btn {
  font-size: 20px;
  padding: 0 10px;
  height: 32px;
  min-width: 80px;
  cursor: pointer;
} 
</style>