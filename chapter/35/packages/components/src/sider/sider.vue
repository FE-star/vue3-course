<template>
  <aside :class="{ [className]: true }">
    <slot v-if="$slots.default"></slot>
  </aside>
</template>
<script lang="ts" setup>
import { prefixName } from '../theme';
const className = `${prefixName}-sider`;
</script>
