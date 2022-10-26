<template>
  <Row :class="{ [baseClassName]: true }">
    <Row :class="labelClassName">
      <Col :span="labelCol">
        <span>{{ props.label }}</span>
      </Col>
      <Col :span="wrapperCol"><slot /></Col>
    </Row>
    <Row :class="wrapperClassName" v-if="props.name">
      <Col :span="labelCol"></Col>
      <Col :span="wrapperCol">
        <span v-if="errorTip">{{ errorTip }}</span>
      </Col>
    </Row>
  </Row>
</template>

<script lang="ts" setup>
import { inject, onMounted, ref, toRaw, watch } from 'vue';
import Col from '../col';
import Row from '../row';
import { prefixName } from '../theme';
import { FORM_CONTEXT_KEY } from './common';
import type { FormContext, ValidateRule, ValidateResult } from './common';

const labelCol = 4;
const wrapperCol = 20;

const baseClassName = `${prefixName}-form-item`;
const labelClassName = `${baseClassName}-label`;
const wrapperClassName = `${baseClassName}-wrapper`;

const errorTip = ref<string>('');

const formContext: FormContext | undefined =
  inject<FormContext>(FORM_CONTEXT_KEY);

const props = defineProps<{
  name?: string;
  label?: string;
  rule?: ValidateRule;
}>();

const resetField = () => {
  if (formContext?.model && props.name && formContext?.model?.[props?.name]) {
    formContext.model[props?.name] = undefined;
  }
};

async function validateFieldValue(val: unknown): Promise<ValidateResult> {
  if (props.rule?.validator) {
    const result = await props.rule?.validator?.(val);
    if (result.hasError && result.message) {
      errorTip.value = result.message;
    } else {
      errorTip.value = '';
    }
    return { ...result, ...{ name: props.name, value: toRaw(val) } };
  }
  return {
    hasError: false
  };
}

async function validateField(): Promise<ValidateResult> {
  if (props.rule?.validator && props.name) {
    const result = await validateFieldValue(formContext?.model?.[props?.name]);
    if (result.hasError && result.message) {
      errorTip.value = result.message;
    } else {
      errorTip.value;
    }
    return result;
  }
  return {
    hasError: false
  };
}

onMounted(() => {
  if (formContext?.model && props.name && formContext?.model?.[props?.name]) {
    formContext?.addField({
      name: props.name,
      rule: props.rule,
      resetField,
      validateField
    });

    watch([() => formContext?.model?.[props.name as string]], ([newValue]) => {
      validateFieldValue(newValue);
    });
  }
});

defineExpose({
  resetField,
  validateField
});
</script>
