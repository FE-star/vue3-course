<template>
  <Image
    src="/examples/public/image/vuejs.png"
    :width="150"
    :height="100"
    @load="onLoad"
    @error="onError"
  />
  <Image
    src="/examples/public/image/vuejs-xxxxx.png"
    :width="150"
    :height="100"
    @load="onLoad"
    @error="onError"
  />
</template>

<script setup lang="ts">
/* eslint-disable no-console */
import { Image } from '../src/index';
const onLoad = (e: Event) => {
  console.log('load success!', e);
};
const onError = (e: Event) => {
  console.log('load fail!', e);
};
</script>
