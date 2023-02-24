/* eslint-disable @typescript-eslint/ban-ts-comment */
import { parse as babelParser } from '@babel/parser';
import babelGenerator from '@babel/generator';
import type { PageLayoutData } from '../types';
import {
  bodyESTree,
  importESTree,
  constObjESTree,
  importMaterialESTree,
  importMaterialCssFileESTree,
  importFileESTree,
  constMaterialMapESTree
} from './estree';

function parseMaterialDefineName(name: string): string {
  return name
    .replace(/-(\w)/g, function (match, letter) {
      return letter.toUpperCase();
    })
    .replace(/@(\w)/g, function (match, letter) {
      return letter.toUpperCase();
    })
    .replace(/\/(\w)/g, function (match, letter) {
      return letter.toUpperCase();
    });
}

function transformCodeToESTree(code: string) {
  const estree = babelParser(code, {
    sourceType: 'module',
    plugins: []
  });
  return estree;
}

export function transformMaterialList(pageLayoutData: PageLayoutData) {
  const materialMap: Record<
    string,
    { name: string; version: string; defineName: string }
  > = {};
  const materialList: Array<{
    name: string;
    version: string;
    defineName: string;
  }> = [];
  Object.keys(pageLayoutData.moduleMap).forEach((uuid: string) => {
    const module = pageLayoutData.moduleMap[uuid];
    const { materialName, materialVersion } = module;
    if (!materialMap[materialName]) {
      materialMap[materialName] = {
        name: materialName,
        version: materialVersion,
        defineName: parseMaterialDefineName(materialName)
      };
      materialList.push(materialMap[materialName]);
    }
  });
  return materialList;
}

export function transformToFullPageESTree(pageLayoutData: PageLayoutData): any {
  const pageLayoutDataVar = 'pageLayoutData';
  const pageLayoutDataProgram = transformCodeToESTree(
    `const ${pageLayoutDataVar} = ${JSON.stringify(pageLayoutData)}`
  );
  const materialList = transformMaterialList(pageLayoutData);

  const mainRunCode = `const moduleComponentMap = {};
  Object.keys(pageLayoutData.moduleMap).forEach((uuid) => {
    const materialName = pageLayoutData.moduleMap[uuid].materialName;
    moduleComponentMap[uuid] = materialDeps[materialName];
  });
  
  const App = defineComponent({
    setup() {
      const Rows = pageLayoutData.layout.rows.map(
        (row, rowIndex) => {
          const Columns = row.columns.map((col, colIndex) => {
            const Material = moduleComponentMap[col.uuid];
            const props = pageLayoutData.moduleMap[col.uuid]?.materialData || {};
            const Mod = h(Material || 'div', props);
            return h(
              'div',
              {
                style: { width: col.width, display: 'flex' },
                'data-col': colIndex
              },
              Mod
            );
          });
          return h(
            'div',
            {
              style: {
                width: row.width,
                margin: '10px 0',
                display: 'flex',
                flexDirection: 'row'
              },
              'data-row': rowIndex
            },
            Columns
          );
        }
      );
      return () => {
        return h(
          'div',
          { style: { width: pageLayoutData.layout.width, margin: '0 auto' } },
          Rows
        );
      };
    }
  });
  const app = createApp(App);
  app.mount('#app');
  `;
  const mainRunProgram = transformCodeToESTree(mainRunCode);
  const estree = bodyESTree([
    importESTree('Vue', 'vue'),
    ...materialList.map((item) => {
      return importMaterialESTree(item.defineName, item.name, item.version);
    }),
    constObjESTree('Vue', ['h', 'createApp', 'defineComponent']),
    constMaterialMapESTree('materialDeps', materialList),
    ...pageLayoutDataProgram.program.body,
    ...mainRunProgram.program.body
  ]);

  return estree;
}

export function transformToPageEntryESTree(
  pageLayoutData: PageLayoutData
): any {
  const materialMap: Record<
    string,
    { name: string; version: string; defineName: string }
  > = {};
  const materialList: Array<{
    name: string;
    version: string;
    defineName: string;
  }> = [];
  Object.keys(pageLayoutData.moduleMap).forEach((uuid: string) => {
    const module = pageLayoutData.moduleMap[uuid];
    const { materialName, materialVersion } = module;
    if (!materialMap[materialName]) {
      materialMap[materialName] = {
        name: materialName,
        version: materialVersion,
        defineName: parseMaterialDefineName(materialName)
      };
      materialList.push(materialMap[materialName]);
    }
  });

  const estree = bodyESTree([
    importFileESTree('./index.esm.js'),
    ...materialList.map((item) => {
      return importMaterialCssFileESTree(item.name, item.version);
    })
  ]);

  return estree;
}

export function transformESTreeToJS(estree: any): string {
  // @ts-ignore
  const generator = babelGenerator?.default || babelGenerator;
  const result = generator(estree);
  const jsCode = result.code;
  return jsCode;
}
