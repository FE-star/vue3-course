<template>
  <Transition :name="fadeClassName">
    <div v-if="show" :class="{ [baseClassName]: true, [typeClassName]: true }">
      <div>{{ props.text }}</div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { prefixName } from '../theme/index';
import type { MessageType } from './types';

const show = ref<boolean>(false);

onMounted(() => {
  show.value = true;
});

const props = withDefaults(
  defineProps<{
    text?: string;
    type?: MessageType;
  }>(),
  {
    type: 'info'
  }
);

const closeMessage = () => {
  show.value = false;
};

defineExpose({ closeMessage: closeMessage });

const baseClassName = `${prefixName}-message`;
const typeClassName = `${baseClassName}-${props.type}`;
const fadeClassName = `${baseClassName}-fade`;
</script>
