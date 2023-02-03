<template>
  <div
    :class="{ [baseClassName]: true, ['is-horizontal']: props.horizontal }"
    @dragstart="onDragStart"
    @dragover="onDragOver"
    @dragend="onDragEnd"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { reactive, provide, toRaw } from 'vue';
import {
  DRAG_CONTEXT_KEY,
  getElementIndex,
  getDraggingElement
} from './common';
import { prefixName } from '../theme/index';
import type { DragContext } from './common';
const baseClassName = `${prefixName}-drag-layout`;

const props = defineProps<{ horizontal?: boolean }>();

const emits = defineEmits<{
  (event: 'dragStart', e: { activeIndex: number; dragToIndex: number }): void;
  (event: 'dragOver', e: { activeIndex: number; dragToIndex: number }): void;
  (event: 'dragEnd', e: { activeIndex: number; dragToIndex: number }): void;
}>();

const dragContext = reactive<DragContext>({
  activeIndex: -1,
  dragToIndex: -1
});

provide(DRAG_CONTEXT_KEY, dragContext);

const onDragStart = () => {
  emits('dragStart', {
    activeIndex: toRaw(dragContext.activeIndex),
    dragToIndex: toRaw(dragContext.dragToIndex)
  });
};

const onDragOver = (e: DragEvent) => {
  e.preventDefault();
  const target: HTMLElement | null = getDraggingElement(
    e?.target as HTMLElement
  );
  const dragToIndex = getElementIndex(target);
  dragContext.dragToIndex = dragToIndex;
  emits('dragOver', {
    activeIndex: toRaw(dragContext.activeIndex),
    dragToIndex: toRaw(dragContext.dragToIndex)
  });
};

const onDragEnd = () => {
  dragContext.activeIndex = -1;
  dragContext.dragToIndex = -1;
  emits('dragEnd', {
    activeIndex: toRaw(dragContext.activeIndex),
    dragToIndex: toRaw(dragContext.dragToIndex)
  });
};
</script>
