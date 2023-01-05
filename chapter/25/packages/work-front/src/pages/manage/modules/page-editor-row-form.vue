<template>
  <div class="module-page-editor-row-form">
    <div v-if="isEdit" class="editor-row-form">
      <DynamicForm :fieldList="fieldList" :model="model" @finish="onSubmit">
        <div class="form-btn-groups">
          <Button type="primary" variant="outlined" @click="onClickAddColumn"
            >新增一列</Button
          >
          <Button type="primary">确定</Button>
          <Button variant="outlined" @click="reset()">取消</Button>
        </div>
      </DynamicForm>
    </div>
    <div v-else class="editor-row-form">
      <Button type="primary" variant="outlined" @click="onClickToCreate"
        >新增一行</Button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { Button, DynamicForm, Message } from '@my/components';
import type { DynamicFormField } from '@my/components';

const props = withDefaults(
  defineProps<{
    limitWidth?: number;
  }>(),
  {
    limitWidth: 1000
  }
);
const emits = defineEmits<{
  (event: 'submit', data: { widthList: number[] }): void;
}>();

const createColumnFieldName = (index: number) => `column-width-${index}`;

const model = reactive<Record<string, string>>({
  [createColumnFieldName(0)]: '500'
});

const fieldList = reactive<DynamicFormField[]>([
  {
    label: '第1列宽度',
    name: createColumnFieldName(0),
    fieldType: 'Input',
    rule: {
      validator: (val: unknown) => {
        const hasError = /^[0-9]{1,}$/gi.test(`${val || ''}`) !== true;
        return {
          hasError,
          message: hasError ? '仅支持0-9的数字' : ''
        };
      }
    }
  }
]);

const isEdit = ref<boolean>(false);
const onClickToCreate = () => {
  isEdit.value = true;
};
const reset = () => {
  isEdit.value = false;
  while (fieldList.length > 0) {
    fieldList.pop();
  }
  for (const name in model) {
    delete model[name];
  }

  fieldList.push({
    label: '第1列宽度',
    name: createColumnFieldName(0),
    fieldType: 'Input',
    rule: {
      validator: (val: unknown) => {
        const hasError = /^[0-9]{1,}$/gi.test(`${val || ''}`) !== true;
        return {
          hasError,
          message: hasError ? '仅支持0-9的数字' : ''
        };
      }
    }
  });
  model[createColumnFieldName(0)] = '500';
};
const onClickAddColumn = (e: MouseEvent) => {
  e.preventDefault();
  const index = fieldList.length;
  fieldList.push({
    label: `第${index + 1}列宽度`,
    name: createColumnFieldName(index),
    fieldType: 'Input',
    rule: {
      validator: (val: unknown) => {
        const hasError = /^[0-9]{1,}$/gi.test(`${val || ''}`) !== true;
        return {
          hasError,
          message: hasError ? '仅支持0-9的数字' : ''
        };
      }
    }
  });
  model[createColumnFieldName(index)] = '0';
};

const onSubmit = (values: any) => {
  let totalWidth = 0;
  const widthList: number[] = [];
  for (const key in values) {
    totalWidth += parseInt(values[key]);
    widthList.push(parseInt(values[key]));
  }
  if (!(totalWidth <= props.limitWidth)) {
    Message.open({
      type: 'error',
      text: `所有列宽度综合必须小于或等于${props.limitWidth}`,
      duration: 5000
    });
    return;
  }
  emits('submit', { widthList });
  reset();
};
</script>

<style lang="less">
.module-page-editor-row-form {
  display: flex;
  width: 900px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  margin: 10px auto;
  padding: 10px;
  border: 1px solid #afafaf;

  .editor-row-form {
    width: 800px;
    display: block;
  }

  .form-btn-groups {
    text-align: center;
    > button {
      margin: 0 10px;
    }
  }
}
</style>
