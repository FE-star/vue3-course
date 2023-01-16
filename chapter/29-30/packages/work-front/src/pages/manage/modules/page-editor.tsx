/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineComponent, onMounted, ref, h, reactive, toRaw } from 'vue';
import * as Vue from 'vue';
import { Drag } from '@my/business';
import { Button, Dialog } from '@my/components';
import FillMaterialForm from './page-editor-fill-form.vue';
import MaterialDataForm from './page-editor-data-form.vue';
import { loadMaterialStyle } from '../utils/material';
import { loadScript } from '../utils/script';
import type { DefineComponent } from 'vue';
import type { PageRuntimeData, LayoutColumn } from '../types';
import './page-editor.less';

async function initAMDEnv(params: {
  materialName: string;
  materialVersion: string;
}) {
  const { materialName, materialVersion } = params;
  // @ts-ignore
  if (!window.requirejs) {
    await loadScript('/public/cdn/pkg/requirejs/2.3.6/require.js');
  }
  const paths: Record<string, string> = {};
  // @ts-ignore
  window.define('vue', [], () => Vue);
  paths[
    materialName
  ] = `/public/cdn/material/${materialName}/${materialVersion}/index.amd`;

  // @ts-ignore
  window.requirejs.config({
    paths
  });
}

function createEditModule(params: {
  uuid: string;
  name?: string;
  width: number | string;
  materialName?: string;
  materialVersion?: string;
  materialData?: any;
  onFillMaterial: (data: {
    name: string;
    materialName: string;
    materialVersion: string;
  }) => void;
  onEditMaterialData: (data: { uuid: string; dataSource: any }) => void;
}) {
  const {
    uuid,
    width,
    name,
    materialName,
    materialVersion,
    materialData,
    onFillMaterial,
    onEditMaterialData
  } = params;
  const EditModule: DefineComponent = defineComponent({
    setup() {
      const container = ref<HTMLElement>();
      let canEditProps = false;
      if (materialName && materialVersion) {
        canEditProps = true;
      }

      onMounted(async () => {
        if (!(materialName && materialVersion)) {
          return;
        }
        const params = {
          name: materialName,
          version: materialVersion
        };

        await initAMDEnv({ materialName, materialVersion });
        await loadMaterialStyle(params);
        window.require(
          ['vue', materialName],
          // @ts-ignore
          (Vue: any, MaterialComponent: any) => {
            const App = Vue.h(MaterialComponent, materialData || {});
            const app = Vue.createApp(App, {});
            app.mount(container.value);
          }
        );
      });

      const onClickFillMaterial = () => {
        const dialog = Dialog.createDialog({
          Content: h(FillMaterialForm, {
            onOk: (data) => {
              onFillMaterial(data);
              dialog.close();
            },
            onCancel: () => {
              dialog.close();
            }
          }),
          hideFooter: true
        });
      };

      const onClickEditMaterialData = () => {
        const dialog = Dialog.createDialog({
          Content: h(MaterialDataForm, {
            name: materialName as string,
            version: materialVersion as string,
            onSubmit: (data: any) => {
              onEditMaterialData({
                uuid,
                dataSource: data
              });
              dialog.close();
            },
            onCancel: () => {
              dialog.close();
            }
          }),
          hideFooter: true
        });
      };

      return () => {
        return (
          <div style={{ width }} class="module-page-edit-module">
            <div class="page-edit-module-header">
              <div class="module-header-title">
                <span>
                  {name} ({materialName || '暂无填充物料'})
                </span>
              </div>
              <div class="module-header-control">
                {canEditProps === true ? (
                  <Button
                    type="primary"
                    variant="outlined"
                    onClick={() => {
                      onClickEditMaterialData();
                    }}
                  >
                    数据源
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    variant="outlined"
                    onClick={() => {
                      onClickFillMaterial();
                    }}
                  >
                    填充
                  </Button>
                )}
              </div>
            </div>
            <div class="page-edit-module-content" ref={container}></div>
          </div>
        );
      };
    }
  });
  return EditModule;
}

const PageEditor: DefineComponent = defineComponent({
  props: {
    pageRuntimeData: Object
  },

  components: {
    Drag
  },

  setup(props: any) {
    const pageRuntimeData = props.pageRuntimeData as PageRuntimeData;

    const deleteRow = (index: number) => {
      if (pageRuntimeData?.layout?.rows?.length > 0) {
        pageRuntimeData.layout.rows.splice(index, 1);
        pageRuntimeData.timestamp = Date.now();
      }
    };

    const moveUpRow = (index: number) => {
      if (index === 0) {
        return;
      }
      if (pageRuntimeData?.layout?.rows?.length > 0) {
        const target = toRaw(pageRuntimeData.layout.rows[index]);
        const targetPrev = toRaw(pageRuntimeData.layout.rows[index - 1]);
        pageRuntimeData.layout.rows[index] = targetPrev;
        pageRuntimeData.layout.rows[index - 1] = target;
        pageRuntimeData.timestamp = Date.now();
      }
    };

    const moveDownRow = (index: number) => {
      if (index + 1 >= pageRuntimeData?.layout?.rows?.length) {
        return;
      }
      if (pageRuntimeData?.layout?.rows?.length > 0) {
        const target = toRaw(pageRuntimeData.layout.rows[index]);
        const targetNext = toRaw(pageRuntimeData.layout.rows[index + 1]);
        pageRuntimeData.layout.rows[index] = targetNext;
        pageRuntimeData.layout.rows[index + 1] = target;
        pageRuntimeData.timestamp = Date.now();
      }
    };

    return () => {
      return (
        <div class="module-page-editor" key={pageRuntimeData.timestamp}>
          {pageRuntimeData && (
            <div>
              {pageRuntimeData.layout.rows.map((row, rowIdx) => {
                const componentMap: any = {};
                const layoutList = row.columns.map((column) => {
                  const module = pageRuntimeData.moduleMap[column.uuid];
                  componentMap[column.uuid] = createEditModule({
                    uuid: column.uuid,
                    name: column.name,
                    width: column.width,
                    materialName: module?.materialName,
                    materialVersion: module?.materialVersion,
                    materialData: module?.materialData,
                    onFillMaterial: (data) => {
                      const { name, materialName, materialVersion } = data;

                      pageRuntimeData.moduleMap[column.uuid] = reactive({
                        materialName,
                        materialVersion,
                        materialData: {}
                      });
                      pageRuntimeData?.layout?.rows?.forEach(
                        (row, rowIndex) => {
                          row?.columns?.forEach((col, columnIdx) => {
                            if (col.uuid === column.uuid) {
                              col.name = name;
                              pageRuntimeData.layout.rows[rowIndex].columns[
                                columnIdx
                              ].name = name;
                            }
                          });
                        }
                      );
                      pageRuntimeData.timestamp = Date.now();
                    },
                    onEditMaterialData: (data) => {
                      const { uuid, dataSource = {} } = data;
                      if (pageRuntimeData.moduleMap[uuid]) {
                        pageRuntimeData.moduleMap[uuid].materialData =
                          dataSource;
                      }
                      pageRuntimeData.timestamp = Date.now();
                    }
                  });
                  return {
                    name: column.name,
                    componentName: column.uuid
                  };
                });
                return (
                  <div class="page-editor-row">
                    <Drag
                      horizontal={true}
                      componentMap={componentMap}
                      layoutList={layoutList}
                      onChange={(values: {
                        layoutList: { componentName: string }[];
                      }) => {
                        const columnMap: Record<string, LayoutColumn> = {};
                        pageRuntimeData.layout.rows[rowIdx].columns.forEach(
                          (col) => {
                            columnMap[col.uuid] = toRaw(col);
                          }
                        );
                        const newColumns: LayoutColumn[] = [];
                        values.layoutList.forEach((item) => {
                          newColumns.push(columnMap[item.componentName]);
                        });
                        pageRuntimeData.layout.rows[rowIdx].columns =
                          newColumns;
                      }}
                    ></Drag>
                    <div class="editor-row-control">
                      <Button
                        type="success"
                        variant="outlined"
                        disabled={rowIdx === 0}
                        onClick={() => {
                          moveUpRow(rowIdx);
                        }}
                      >
                        上移
                      </Button>
                      <Button
                        type="success"
                        variant="outlined"
                        disabled={
                          rowIdx + 1 === pageRuntimeData?.layout?.rows?.length
                        }
                        onClick={() => {
                          moveDownRow(rowIdx);
                        }}
                      >
                        下移
                      </Button>
                      <Button
                        type="danger"
                        variant="outlined"
                        onClick={() => {
                          deleteRow(rowIdx);
                        }}
                      >
                        删除
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    };
  }
});

export default PageEditor;
