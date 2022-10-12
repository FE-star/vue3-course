<template>
  <div class="app">
    <v-info />
    <v-text />
    <v-list />
  </div>
</template>

<script setup lang="ts">
import VInfo from './components/v-info.vue';
import VText from './components/v-text.vue';
import VList from './components/v-list.vue';
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