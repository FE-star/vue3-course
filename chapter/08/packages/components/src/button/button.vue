<template>
  <button :class="{ [`${prefixName}-button`]: true }">
    <slot v-if="$slots.default"></slot>
  </button>
</template>

<script setup lang="ts">
import { prefixName } from '../theme/index';
</script>
