<template>
  <div class="app">
    <button class="btn" @click="onClickOpenDialog" >打开对话框</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { createDialog } from './dialog';
import './dialog.css';
const showCount = ref(0);
const onClickOpenDialog = () => {
  showCount.value += 1;
  
  const dialog = createDialog({
    text: `温馨提示，这是第${showCount.value}次打开对话框`,
    onOk: () => {
      dialog.close();
    }
  });
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
.app .btn {
  font-size: 20px;
  padding: 0 10px;
  height: 32px;
  min-width: 80px;
  cursor: pointer;
} 
</style>