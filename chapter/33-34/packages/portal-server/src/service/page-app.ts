import { createSSRApp, defineComponent, h } from 'vue';
import type { Component } from 'vue';
import { renderToString } from 'vue/server-renderer';
import type { PageLayoutData } from '../types';
import { getMaterialCjsFilePath } from '../util/file';

export async function getPageSSRAppContent(params: {
  pageLayoutData: PageLayoutData;
}): Promise<string> {
  const { pageLayoutData } = params;
  let content = '';

  const materialComponentMap: Record<string, Component> = {};
  for (const uuid in pageLayoutData.moduleMap) {
    const module = pageLayoutData.moduleMap[uuid];
    const { materialName, materialVersion } = module;
    if (!materialComponentMap[materialName]) {
      const materialPath = await getMaterialCjsFilePath({
        name: materialName,
        version: materialVersion
      });
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const Material: Component = require(materialPath);
      materialComponentMap[materialName] = Material;
    }
  }

  const moduleComponentMap: Record<string, Component> = {};
  Object.keys(pageLayoutData.moduleMap).forEach((uuid) => {
    const materialName = pageLayoutData.moduleMap[uuid].materialName;
    moduleComponentMap[uuid] = materialComponentMap[materialName];
  });
  const App = defineComponent({
    setup() {
      const Rows = pageLayoutData.layout.rows.map((row, rowIndex) => {
        const Columns = row.columns.map((col, colIndex) => {
          const Material = moduleComponentMap[col.uuid];
          const props = pageLayoutData.moduleMap[col.uuid]?.materialData || {};

          // console.log('Material =====', Material);

          const Mod = h(Material || 'div', props);
          return h(
            'div',
            {
              style: {
                width: col.width,
                display: 'flex'
              },
              'data-col': colIndex
            },
            Mod
          );
        });
        return h(
          'div',
          {
            style: {
              margin: '10px 0',
              display: 'flex',
              flexDirection: 'row'
            },
            'data-row': rowIndex
          },
          Columns
        );
      });
      return () => {
        return h(
          'div',
          {
            style: {
              width: pageLayoutData.layout.width,
              margin: '0 auto'
            }
          },
          Rows
        );
      };
    }
  });
  const app = createSSRApp(App as Component);
  content = (await renderToString(app)) || '';
  return content;
}
