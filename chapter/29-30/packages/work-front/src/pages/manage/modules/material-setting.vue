<template>
  <div class="module-material-setting">
    <div class="tab-name-list">
      <div class="tab-label">可配置属性：</div>
      <div
        v-for="(item, i) in propsFormsData?.formList"
        class="tab-name-item"
        :class="{ active: item.key === propsFormsData.activeKey }"
        :key="i"
        @click="onClickTab(item.key)"
      >
        <span class="tab-name-text">{{ item.title }}</span>
      </div>
      <div class="tab-name-item btn-groups">
        <Button type="primary" @click="onClickSubmit">{{
          props.submitButtonText || '重新渲染'
        }}</Button>
        <Button
          v-if="showCancelButton"
          type="primary"
          variant="outlined"
          @click="onClickCancel"
          >取消</Button
        >
      </div>
    </div>
    <div class="tab-content">
      <div
        class="tab-content-item"
        v-for="(item, i) in propsFormsData?.formList"
        :class="{ active: item.key === propsFormsData.activeKey }"
        :key="i"
      >
        <div class="tab-content-desc">{{ item.description }}</div>
        <DynamicForm
          :fieldList="item.fields"
          :model="propsFormsData.dataList[i]"
        >
          <Button
            v-if="item.isArray"
            type="primary"
            variant="outlined"
            @click="onClickToAppendFields(i)"
          >
            添加数据
          </Button>
        </DynamicForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, toRaw, onMounted } from 'vue';
import { Button, DynamicForm } from '@my/components';
import {
  loadMaterialPropsSchema,
  parseMaterialPropSchemaToFields,
  appendMaterialPropFields,
  parsePropsDataListToData
} from '../utils/material';
const props = defineProps<{
  name: string;
  version: string;
  submitButtonText?: string;
  showCancelButton?: boolean;
}>();
const emits = defineEmits<{
  (event: 'submitData', e: any): void;
  (event: 'cancel'): void;
}>();

const materialPropsSchema = ref<any>(null);

const propsFormsData = reactive<{
  activeKey: string | null;
  formList: {
    key: string;
    title: string;
    description: string;
    fields: any[];
    schema: any;
    isArray: boolean;
  }[];
  dataList: any[];
}>({
  activeKey: null,
  formList: [],
  dataList: []
});

const onClickSubmit = () => {
  const dataList = toRaw(propsFormsData.dataList);
  const result = parsePropsDataListToData(dataList);
  emits('submitData', result);
};

const onClickCancel = () => {
  emits('cancel');
};

const onClickToAppendFields = (index: number) => {
  const { fields, data } = appendMaterialPropFields(
    toRaw(propsFormsData.formList[index].key),
    toRaw(propsFormsData.formList[index].schema),
    {
      fields: propsFormsData.formList[index].fields,
      data: propsFormsData.dataList[index]
    }
  );
  propsFormsData.formList[index].fields = fields;
  propsFormsData.dataList[index] = data;
};

async function reset(name: string, version: string) {
  const schema = await loadMaterialPropsSchema({
    name,
    version
  });
  materialPropsSchema.value = schema;
  if (schema?.properties) {
    Object.keys(schema.properties).forEach((key: string, i) => {
      if (i === 0) {
        propsFormsData.activeKey = key;
      }
      const itemSchema = schema?.properties?.[key];
      const { fields, data, isArray } = parseMaterialPropSchemaToFields(
        key,
        itemSchema
      );

      const item: {
        key: string;
        title: string;
        description: string;
        fields: any[];
        isArray: boolean;
        schema: any;
      } = {
        key,
        title: itemSchema?.title || '',
        description: itemSchema?.description || '',
        fields,
        isArray,
        schema: itemSchema
      };
      propsFormsData.formList.push(item);
      propsFormsData.dataList.push(data);
    });
  }
}

onMounted(() => {
  if (props.name && props.version) {
    reset(props.name, props.version);
  }
});

watch(
  [() => props.name, () => props.version],
  async ([newName, newVersion]) => {
    reset(newName, newVersion);
  }
);

const onClickTab = (key: string) => {
  propsFormsData.activeKey = key;
};
</script>

<style lang="less">
.module-material-setting {
  .tab-name-list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    box-sizing: border-box;
    border: 1px #aaaaaa solid;
    border-top: none;
    border-left: none;
    border-right: none;
  }
  .tab-label {
    display: flex;
    padding: 8px 16px;
    height: 36px;
    box-sizing: border-box;
    font-size: 16px;
    color: #666666;
    font-weight: 400;
  }
  .tab-name-item {
    display: flex;
    box-sizing: border-box;

    padding: 8px 16px;
    height: 36px;
    border: 1px solid #ffffff;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom: none;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    cursor: pointer;

    .tab-name-text {
      color: #495057;
      font-size: 16px;
    }
    &.active {
      position: relative;
      border-color: #aaaaaa;
      cursor: auto;

      &::after {
        display: block;
        position: absolute;
        content: '';
        background: #ffffff;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 1px;
      }
      .tab-name-text {
        color: #0d6efd;
      }
    }
  }

  .tab-content {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  .tab-content-item {
    display: none;
    &.active {
      display: block;
    }

    .tab-content-desc {
      font-size: 16px;
      color: #999999;
      padding: 10px 0;
    }
  }

  .btn-groups {
    > button {
      margin: 0 10px;
    }
  }
}
</style>
