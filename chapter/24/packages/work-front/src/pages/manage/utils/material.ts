import type { DynamicFormField } from '@my/components';

export async function loadMaterialPropsSchema(params: {
  name: string;
  version: string;
}) {
  const { name, version } = params;
  if (document.querySelector('style[data-material-id="${name}"]')) {
    return;
  }
  const url = `${origin}/public/cdn/material/${name}/${version}/props.schema.json`;
  const schema: any = await fetch(url).then((res) => res.json());
  return schema;
}

export function parseMaterialPropSchemaToFields(
  propKey: string,
  propSchema: any
): { fields: DynamicFormField[]; data: any; isArray: boolean } {
  const fields: DynamicFormField[] = [];
  const data: any = {};
  let isArray = false;
  if (
    ['string', 'number'].includes(propSchema.type) ||
    (Array.isArray(propSchema.type) &&
      (propSchema.type.includes('string') ||
        propSchema.type.includes('number')))
  ) {
    const fieldConfig: DynamicFormField = {
      label: `${propSchema.title}：`,
      name: propKey,
      fieldType: 'Input',
      rule: {
        validator: (val: unknown) => {
          const hasError = (val as string)?.length === 0;
          return {
            hasError,
            message: hasError ? propSchema.title + '不能为空' : ''
          };
        }
      }
    };
    fields.push(fieldConfig);
    data[propKey] = '';
  } else if (propSchema.type === 'array') {
    isArray = true;
    const index = 0;
    if (propSchema?.items?.type === 'object') {
      Object.keys(propSchema?.items?.properties).forEach((key: string) => {
        const targetSchema = propSchema?.items?.properties?.[key];
        const targetKey = `${propKey}[${index}].${key}`;
        data[targetKey] = '';
        const targetConfig = {
          label: `${targetSchema.title} [${index}]：`,
          name: targetKey,
          fieldType: 'Input',
          rule: {
            validator: (val: unknown) => {
              const hasError = (val as string)?.length === 0;
              return {
                hasError,
                message: hasError
                  ? `${targetSchema.title} [${index}]不能为空`
                  : ''
              };
            }
          }
        };
        fields.push(targetConfig);
      });
    }
  }
  return { fields, data, isArray };
}

export function appendMaterialPropFields(
  propKey: string,
  propSchema: any,
  opts: { fields: DynamicFormField[]; data: any }
): { fields: DynamicFormField[]; data: any; isArray: boolean } {
  const { fields, data } = opts;
  const isArray = true;
  const index =
    fields.length / Object.keys(propSchema?.items?.properties).length;
  if (propSchema?.items?.type === 'object') {
    Object.keys(propSchema?.items?.properties).forEach((key: string) => {
      const targetSchema = propSchema?.items?.properties?.[key];
      if (
        ['string', 'number'].includes(targetSchema.type) ||
        (Array.isArray(targetSchema.type) &&
          (targetSchema.type.includes('string') ||
            targetSchema.type.includes('number')))
      ) {
        const targetKey = `${propKey}[${index}].${key}`;
        data[targetKey] = '';
        const targetConfig = {
          label: `${targetSchema.title}[${index}]：`,
          name: targetKey,
          fieldType: 'Input',
          rule: {
            validator: (val: unknown) => {
              const hasError = (val as string)?.length === 0;
              return {
                hasError,
                message: hasError
                  ? `${targetSchema.title} [${index}]不能为空`
                  : ''
              };
            }
          }
        };
        fields.push(targetConfig);
      }
    });
  }
  return { fields, data, isArray };
}

function setValue(object: any, path: string, value: string | number) {
  function _parsePath(valPath: string) {
    return valPath.replace(/\[/g, '.').replace(/\]/g, '').split('.');
  }
  if (typeof object !== 'object') return object;
  _parsePath(path).reduce((obj, key, i, val) => {
    if (i === val.length - 1) {
      obj[key] = value;
      return null;
    } else if (key in obj) {
      return obj[key];
    } else {
      obj[key] = /^[0-9]{1,}$/.test(val[i + 1]) ? [] : {};
      return obj[key];
    }
  }, object);
  return object;
}

export function parsePropsDataListToData(dataList: any[]) {
  const result: any = {};
  if (Array.isArray(dataList)) {
    dataList.forEach((item) => {
      Object.keys(item).forEach((key: string) => {
        if (item[key]) {
          setValue(result, key, item[key]);
        }
      });
    });
  }
  return result;
}
