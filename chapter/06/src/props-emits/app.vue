<template>
  <div class="app">
    <v-info v-bind:text="state.text"  v-bind:list="state.list" />
    <v-text v-bind:text="state.text" v-on:updateText="updateText" /> 
    <v-list
      v-bind:list="state.list" 
      v-on:increase="increase"
      v-on:decrease="decrease"
    />
  </div>
</template>

<script setup >
import { reactive } from 'vue';
import VInfo from './components/info.vue'
import VText from './components/text.vue'
import VList from './components/list.vue';
const state = reactive({
  text: '环城东路888号',
  list: [
    { name: '苹果', price: 20, count: 0 },
    { name: '香蕉', price: 12, count: 0 },
    { name: '梨子', price: 15, count: 0 },
  ]
});
const updateText = (text) => {
  state.text = text;
}
const increase = (index) => {
  state.list[index].count += 1;
}
const decrease = (index) => {
  if (state.list[index].count > 0) {
    state.list[index].count -= 1;
  }
}
</script>

<style>
.app {
  width: 600px;
  padding: 10px;
  margin: 10px auto;
  box-shadow: 0px 0px 9px #00000066;
  text-align: center;
}
</style>