<template>
  <button
    :class="{
      [baseClassName]: true,
      [btnClassName]: true,
      [disabledClassName]: props.disabled
    }"
  >
    <slot v-if="$slots.default"></slot>
  </button>
</template>

<script setup lang="ts">
import { prefixName } from '../theme/index';

type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger';

type ButtonVariant = 'contained' | 'outlined';

const props = withDefaults(
  defineProps<{
    type?: ButtonType;
    variant?: ButtonVariant;
    disabled?: boolean;
  }>(),
  {
    type: 'default',
    variant: 'contained',
    disabled: false
  }
);

const baseClassName = `${prefixName}-button`;
const btnClassName = `${baseClassName}-${props.type}-${props.variant}`;
const disabledClassName = `${baseClassName}-disabled`;
</script>
