<template>
  <section
    :class="{
      [className]: true,
      [hasSiderClassName]: props.hasSider
    }"
  >
    <slot v-if="$slots.default"></slot>
  </section>
</template>
<script lang="ts" setup>
import { prefixName } from '../theme';
const props = defineProps<{ hasSider?: boolean }>();
const className = `${prefixName}-layout`;
const hasSiderClassName = `${className}-has-sider`;
</script>
