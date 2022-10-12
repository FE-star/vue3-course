<template>
  <div class="v-list">
    <div class="v-list-item" v-for="(item, index) in myStore.list" :key="index">
      <span class="text">{{ item.name }}</span>
      <span class="text">单价: {{ item.price }}</span>
      <button class="btn" v-on:click="myStore.decrease(index)">-</button>
      <span class="count"> {{ item.count }}</span>
      <button class="btn" v-on:click="myStore.increase(index)">+</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MyStore } from '../types';
import { useMyStore } from '../store';
const myStore: MyStore = useMyStore();
</script>

<style>
.v-list {
  width: 400px;
  margin: 20px auto;
  padding: 10px;
  box-shadow: 0px 0px 16px 0px #00000038;
  border: 1px solid #d6d5d5;
  font-size: 20px;
  color: #222222;
  background: #2196f34d;
  font-size: 16px;
}
.v-list .v-list-item {
  border-bottom: 1px solid #7aafe29c;
  line-height: 32px;
  padding: 4px 0;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-list .v-list-item .text {
  width: 120px;
  display: inline-block;
  text-align: center;
}
.v-list .v-list-item .count {
  min-width: 50px;
  display: inline-block;
  text-align: center;
  font-size: 24px;
  font-weight: 800;
  color: #026181;
}
.v-list .v-list-item .btn {
  display: inline-block;
  width: 40px;
  height: 40px;
  font-size: 30px;
  cursor: pointer;
  box-sizing: border-box;
}
</style>