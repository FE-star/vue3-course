<template>
  <div
    :class="baseClassName"
    :style="{
      width: props.width,
      height: props.height
    }"
  >
    <img
      :src="props.src"
      :style="{
        maxWidth: props.width,
        maxHeight: props.height
      }"
      @load="onLoad"
      @error="onError"
    />
  </div>
</template>

<script setup lang="ts">
import { prefixName } from '../theme/index';
const baseClassName = `${prefixName}-image`;
const props = withDefaults(
  defineProps<{
    src?: string;
    width?: number;
    height?: number;
  }>(),
  {
    width: 80,
    height: 80
  }
);

const emits = defineEmits<{
  (event: 'load', e: Event): void;
  (event: 'error', e: Event): void;
}>();

const onLoad = (e: Event) => {
  emits('load', e);
};

const onError = (e: Event) => {
  emits('error', e);
};
</script>
