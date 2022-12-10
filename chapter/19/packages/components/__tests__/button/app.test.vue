<template>
  <div class="display-text">当前数值={{ num }}</div>
  <Button class="btn-add" @click="onClick">点击加1</Button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '../../src/index';
const num = ref<number>(123);
const onClick = () => {
  num.value++;
};
</script>
