<template>
  <span
    v-for="(option, index) in props.options"
    v-bind:key="index"
    :class="baseClassName"
  >
    <input
      type="radio"
      :id="option.value"
      :value="option.value"
      :checked="internalValue === option.value"
      @change="onRadioChange({ value: option.value })"
    />
    <label :for="option.value">{{ option.name }}</label>
  </span>
</template>

<script setup lang="ts">
import { ref, toRaw, watch } from 'vue';
import { prefixName } from '../theme/index';
const baseClassName = `${prefixName}-radio-list`;
const props = defineProps<{
  value: string;
  options: Array<{ name: string; value: string }>;
}>();
const emits = defineEmits<{
  (e: 'change', value: string): void;
}>();

const internalValue = ref<string>(toRaw(props.value));

const onRadioChange = (data: { value: string }) => {
  emits('change', data.value);
};

watch([() => props.value], ([newValue]) => {
  internalValue.value = toRaw(newValue);
});
</script>
