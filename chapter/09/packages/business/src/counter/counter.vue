<template>
  <Box class="my-biz-counter">
    <Box class="num-value">{{ num }}</Box>
    <Button @click="onClick">点击减1</Button>
  </Box>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Button from '@my/components/esm/button';
import Box from '@my/components/esm/box';
const num = ref<number>(100);
const onClick = () => {
  num.value += 1;
};
</script>
