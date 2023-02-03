import { v4 } from 'uuid';
import type { PageLayoutData, PageRuntimeData } from '../types';

export function createDefaultPageLayoutData(): PageLayoutData {
  const row0 = v4();
  const row1 = v4();
  const row2 = v4();
  const row0column0 = v4();
  const row1column0 = v4();
  const row1column1 = v4();
  const row2column0 = v4();
  return {
    layout: {
      width: 1000,
      rows: [
        {
          uuid: row0,
          columns: [
            {
              width: 1000,
              name: '首屏广告',
              uuid: row0column0
            }
          ]
        },
        {
          uuid: row1,
          columns: [
            {
              width: 600,
              name: '其它广告位1',
              uuid: row1column0
            },
            {
              width: 400,
              // name: '其它广告位2',
              uuid: row1column1
            }
          ]
        },
        {
          uuid: row2,
          columns: [
            {
              width: 1000,
              name: '促销商品',
              uuid: row2column0
            }
          ]
        }
      ]
    },
    moduleMap: {
      [row0column0]: {
        materialName: '@my/material-banner-slides',
        materialVersion: '0.9.0',
        materialData: {}
      },
      [row1column0]: {
        materialName: '@my/material-banner-slides',
        materialVersion: '0.9.0',
        materialData: {}
      },
      // [row1column1]: {
      //   materialName: '@my/material-banner-slides',
      //   materialVersion: '0.9.0',
      //   materialData: {}
      // },
      [row2column0]: {
        materialName: '@my/material-product-list',
        materialVersion: '0.9.0',
        materialData: {}
      }
    }
  };
}

export function parseToPageRuntimeData(
  pageData: PageLayoutData
): PageRuntimeData {
  const pageRuntimeData: PageRuntimeData = {
    ...pageData,
    ...{
      timestamp: Date.now()
    }
  };
  return pageRuntimeData;
}
