<template>
  <div :class="baseClassName">
    <DragLayout
      :horizontal="horizontal"
      @dragOver="onDragOver"
      @dragEnd="onDragEnd"
    >
      <DragItem v-for="(item, index) in viewData.list" :key="index">
        <!-- <div>{{ item.name }}</div> -->
        <component
          v-if="item?.componentName"
          :is="componentMap?.[item.componentName]"
        ></component>
      </DragItem>
    </DragLayout>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw, watch } from 'vue';
import DragLayout from './drag-layout.vue';
import DragItem from './drag-item.vue';
import { prefixName } from '../theme/index';
import type { Component } from 'vue';
import type { DragContext } from './common';
const baseClassName = `${prefixName}-drag`;

const props = defineProps<{
  horizontal?: boolean;
  componentMap: { [name: string]: Component };
  layoutList: { name: string; componentName: string }[];
}>();

const layoutList = ref<{ name: string; componentName: string }[]>(
  toRaw(props.layoutList)
);
let componentMap = toRaw(props.componentMap);
const horizontal = ref<boolean>(props.horizontal === true);

watch(
  [() => props.layoutList, () => props.componentMap, () => props.horizontal],
  ([newLayoutList, newComponentMap, newHorizontal]) => {
    layoutList.value = toRaw(newLayoutList);
    componentMap = toRaw(newComponentMap);
    horizontal.value = newHorizontal === true;
  }
);

const emits = defineEmits<{
  (
    event: 'change',
    e: { layoutList: { name: string; componentName: string }[] }
  ): void;
}>();

const prevContext: DragContext = {
  activeIndex: -1,
  dragToIndex: -1
};

// TODO
const clone = (data: unknown) => {
  return JSON.parse(JSON.stringify(data));
};

const viewData = reactive<{
  list: { name: string; componentName: string }[];
}>({
  list: clone(toRaw(layoutList.value))
});

function resetLayoutList(context: DragContext) {
  const { activeIndex, dragToIndex } = context;
  const tempList: { name: string; componentName: string }[] = clone(
    layoutList.value
  );
  if (
    prevContext.activeIndex === activeIndex &&
    prevContext.dragToIndex === dragToIndex
  ) {
    return;
  }

  if (activeIndex >= 0 && dragToIndex >= 0) {
    const [target] = tempList.splice(activeIndex, 1);
    if (dragToIndex === 0) {
      tempList.unshift(target);
    } else if (dragToIndex >= tempList.length) {
      tempList.push(target);
    } else {
      tempList.splice(dragToIndex, 0, target);
    }
    viewData.list = tempList;
  }

  prevContext.activeIndex = activeIndex;
  prevContext.dragToIndex = dragToIndex;
}

const onDragOver = (ctx: DragContext) => {
  resetLayoutList(ctx);
};

const onDragEnd = () => {
  layoutList.value = toRaw(viewData.list);
  emits('change', { layoutList: toRaw(layoutList.value) });
};
</script>
