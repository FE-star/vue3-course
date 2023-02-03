<template>
  <div :class="{ [className]: true }">
    <slot v-if="$slots.default"></slot>
  </div>
</template>
<script lang="ts" setup>
import { prefixName } from '../theme';
const className = `${prefixName}-row`;
</script>
