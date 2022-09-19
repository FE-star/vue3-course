<template>
  <div class="counter">
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
.counter {
  padding: 10px;
  margin: 10px auto;
  text-align: center;
}
.counter .text {
  font-size: 28px;
  font-weight: bolder;
  color: #666666;
}
.counter .btn {
  font-size: 20px;
  padding: 0 10px;
  height: 32px;
  min-width: 80px;
  cursor: pointer;
} 
</style>