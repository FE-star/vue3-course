import path from 'node:path';
import { build } from 'vite';
import type { InlineConfig } from 'vite';
import { readFileFromCDN, pushPageToCDN } from '@my/mock-cdn';
import type { PageLayoutData } from '../types';
import {
  writePublicFile,
  readPublicFile,
  checkExistPublicFile,
  getPublicFilePath
} from '../util/file';
import {
  transformToFullPageESTree,
  transformToPageEntryESTree,
  transformESTreeToJS,
  transformMaterialList
} from '../util/transform';

export async function buildFullPage(params: {
  uuid: string;
  version: string;
  pageLayoutData: PageLayoutData;
}) {
  const { uuid, version, pageLayoutData } = params;
  const materialList = transformMaterialList(pageLayoutData);
  for (const item of materialList) {
    const { name, version } = item;
    const esmPath = `material/${name}/${version}/index.esm.js`;
    const cssPath = `material/${name}/${version}/index.css`;
    const esmCDNPath = `cdn/${esmPath}`;
    const cssCDNPath = `cdn/${cssPath}`;
    if (checkExistPublicFile(esmCDNPath) !== true) {
      const text = await readFileFromCDN(esmPath);
      if (text) {
        writePublicFile(esmCDNPath, text);
      }
    }
    if (checkExistPublicFile(cssCDNPath) !== true) {
      const text = await readFileFromCDN(cssPath);
      if (text) {
        writePublicFile(cssCDNPath, text);
      }
    }
  }

  const pageESTree = transformToFullPageESTree(pageLayoutData);
  const pageCode = transformESTreeToJS(pageESTree);
  const filePath = path.join('cdn', 'page', uuid, version, 'index.esm.js');
  writePublicFile(filePath, pageCode);

  const entryESTree = transformToPageEntryESTree(pageLayoutData);
  const entryCode = transformESTreeToJS(entryESTree);
  const entryFilePath = path.join('cdn', 'page', uuid, version, 'entry.esm.js');
  writePublicFile(entryFilePath, entryCode);

  const fullEntryFilePath = getPublicFilePath(entryFilePath);
  const config: InlineConfig = {
    build: {
      emptyOutDir: false,
      outDir: path.dirname(fullEntryFilePath),
      lib: {
        name: 'MyBundle',
        entry: fullEntryFilePath,
        formats: ['iife'],
        fileName: () => {
          return 'bundle.js';
        }
      },
      rollupOptions: {
        preserveEntrySignatures: 'strict',
        external: ['vue', '@vue/components'],
        output: {
          globals: {
            vue: 'Vue',
            '@vue/components': 'MyVueComponents'
          },
          assetFileNames: 'bundle[extname]'
        }
      }
    }
  };
  await build(config);
  await pushPageToCDN({
    uuid,
    version,
    data: {
      esm: pageCode,
      bundleCss: readPublicFile(`cdn/page/${uuid}/${version}/bundle.css`),
      bundleJs: readPublicFile(`cdn/page/${uuid}/${version}/bundle.js`)
    }
  });
}
