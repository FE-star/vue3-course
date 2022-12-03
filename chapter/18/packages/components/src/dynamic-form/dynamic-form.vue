<template>
  <div :class="{ [baseClassName]: true }">
    <Form>
      <Form
        ref="formRef"
        :model="internalModel"
        @finish="onFinish"
        @finishFail="onFinishFail"
      >
        <FormItem
          v-for="(field, index) in fieldList"
          :key="index"
          :label="field.label"
          :name="field.name"
          :rule="field.rule"
        >
          <component
            :is="registerComponentMap[field.fieldType]"
            :value="internalModel[field.name]"
            :options="field.options || []"
            @change="(value: unknown) => { onFieldChange({ name: field.name, value }) }"
          />
        </FormItem>
        <Row v-if="$slots.default">
          <slot></slot>
        </Row>
      </Form>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { prefixName } from '../theme';
import Row from '../row';
import Form from '../form';
import Input from '../input';
import RadioList from '../radio-list';
import type { Component } from 'vue';
import type { DynamicFormField } from './common';

// 内置支持的表单数据组件
const registerComponentMap: { [key: string]: Component } = {
  Input: Input,
  RadioList: RadioList
};

const props = withDefaults(
  defineProps<{
    fieldList?: DynamicFormField[];
    model?: { [name: string]: unknown };
  }>(),
  {}
);

const internalModel = reactive<{ [name: string]: unknown }>(props?.model || {});
const FormItem = Form.FormItem;
const baseClassName = `${prefixName}-dynamic-form`;

const onFieldChange = (event: { name: string; value: string | unknown }) => {
  internalModel[event.name] = event.value;
};

const emits = defineEmits<{
  (event: 'finish', e: unknown): void;
  (event: 'finishFail', e: unknown): void;
}>();

const onFinish = (e: unknown) => {
  emits('finish', e);
};

const onFinishFail = (e: unknown) => {
  emits('finishFail', e);
};

// 注册自定义表单数据组件方法
const registerFieldComponent = (name: string, component: Component) => {
  registerComponentMap[name] = component;
};

// 暴露可以注册自定义表单数据组件
defineExpose({
  registerFieldComponent
});
</script>
