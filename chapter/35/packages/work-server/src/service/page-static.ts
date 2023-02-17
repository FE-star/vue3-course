/* eslint-disable @typescript-eslint/ban-ts-comment */
import path from 'node:path';
// @ts-ignore
import { build } from 'vite';
// @ts-ignore
import type { InlineConfig } from 'vite';
import { readFileFromCDN, pushPageToCDN } from '@my/mock-cdn';
import type { PageLayoutData, MyAPIResult, PageStage } from '../types';
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

const PAGE_TEST_DIR = 'page-test';
const PAGE_PRE_DIR = 'page-pre';
const PAGE_PROD_DIR = 'page';
const pageDirMap = {
  test: PAGE_TEST_DIR,
  pre: PAGE_PRE_DIR,
  prod: PAGE_PROD_DIR
};

export async function buildFullPage(params: {
  uuid: string;
  version: string;
  pageLayoutData: PageLayoutData;
  stage: 'test' | 'pre' | 'prod';
}) {
  const { uuid, version, pageLayoutData, stage } = params;
  const pageDir = pageDirMap[stage || 'test'] || pageDirMap['test'];
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
  const filePath = path.join('cdn', pageDir, uuid, version, 'index.esm.js');
  writePublicFile(filePath, pageCode);

  const entryESTree = transformToPageEntryESTree(pageLayoutData);
  const entryCode = transformESTreeToJS(entryESTree);
  const entryFilePath = path.join(
    'cdn',
    pageDir,
    uuid,
    version,
    'entry.esm.js'
  );
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
  pushFullPageStage({ uuid, version, stage });
}

export function copyPageFiles(params: {
  uuid: string;
  version: string;
  from: PageStage;
  to: PageStage;
}) {
  const { uuid, version, from, to } = params;

  if (['pre', 'prod'].includes(to) !== true) {
    return;
  }
  const esm = readPublicFile(
    `cdn/${pageDirMap[from]}/${uuid}/${version}/index.esm.js`
  );
  if (esm) {
    writePublicFile(
      `cdn/${pageDirMap[to]}/${uuid}/${version}/index.esm.js`,
      esm
    );
  }

  const bundleJs = readPublicFile(
    `cdn/${pageDirMap[from]}/${uuid}/${version}/bundle.js`
  );
  if (bundleJs) {
    writePublicFile(
      `cdn/${pageDirMap[to]}/${uuid}/${version}/bundle.js`,
      bundleJs
    );
  }

  const bundleCss = readPublicFile(
    `cdn/${pageDirMap[from]}/${uuid}/${version}/bundle.css`
  );
  if (bundleCss) {
    writePublicFile(
      `cdn/${pageDirMap[to]}/${uuid}/${version}/bundle.css`,
      bundleCss
    );
  }
}

export async function pushFullPageStage(params: {
  uuid: string;
  version: string;
  stage: PageStage;
}): Promise<MyAPIResult> {
  const { uuid, version, stage } = params;
  const pageDir = pageDirMap[stage || 'test'] || pageDirMap['test'];
  const result: MyAPIResult = {
    data: { stage, uuid, version },
    success: false,
    message: '发布失败'
  };
  try {
    const copyParams = { uuid, version, from: 'test' as PageStage, to: stage };
    if (stage === 'prod') {
      copyParams.from = 'pre';
    }
    copyPageFiles(copyParams);
    await pushPageToCDN({
      stage,
      uuid,
      version,
      data: {
        esm: readPublicFile(`cdn/${pageDir}/${uuid}/${version}/index.esm.js`),
        bundleCss: readPublicFile(
          `cdn/${pageDir}/${uuid}/${version}/bundle.css`
        ),
        bundleJs: readPublicFile(`cdn/${pageDir}/${uuid}/${version}/bundle.js`)
      }
    });
    result.success = true;
    result.message = '发布成功';
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
  return result;
}
