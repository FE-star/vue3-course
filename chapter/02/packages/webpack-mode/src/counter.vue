<template>
    <div class="v-counter">
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
  .v-counter {
    width: 200px;
    padding: 10px;
    box-shadow: 0px 0px 9px #00000066;
    text-align: center;
  }
  .v-counter .text {
    font-size: 28px;
    font-weight: bolder;
    color: #666666;
  }
  .v-counter .btn {
    font-size: 20px;
    padding: 0 10px;
    height: 32px;
    min-width: 80px;
    cursor: pointer;
  } 
  </style>