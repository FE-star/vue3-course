<template>
  <div class="display-text">当前数值={{ num }}</div>
  <Button class="btn-add" @click="onClick">点击加1</Button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '../../src';
const props = defineProps<{ num: number }>();
const num = ref<number>(props.num);
const onClick = () => {
  num.value++;
};
</script>
