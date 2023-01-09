/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
import { build } from 'vite';
import pluginVue from '@vitejs/plugin-vue';
import pluginVueJsx from '@vitejs/plugin-vue-jsx';
import { resolvePackagePath, readFile, wirteFile } from './util';
import { pushMaterialToCDN } from '../packages/mock-cdn';
import type { InlineConfig } from 'vite';
import * as TJS from 'typescript-json-schema';

function buildTypeSchema(opts: { dirName: string }) {
  const { dirName } = opts;
  const basePath = resolvePackagePath(dirName);
  const filePath = resolvePackagePath(dirName, 'src', 'types.ts');
  const distPath = resolvePackagePath(dirName, 'dist', 'props.schema.json');
  const settings: TJS.PartialArgs = {
    // required: true,
    // titles: true
  };
  const compilerOptions: TJS.CompilerOptions = {
    strictNullChecks: true
  };
  const program = TJS.getProgramFromFiles(
    [filePath],
    compilerOptions,
    basePath
  );
  const schema = TJS.generateSchema(program, 'MaterialProps', settings);
  const schemaStr = JSON.stringify(schema, null, 2);
  wirteFile(distPath, schemaStr);
}

function getBuildConfig(opts: {
  name: string;
  version: string;
  dirName: string;
  libName: string;
}): InlineConfig {
  const { dirName, libName } = opts;
  const config: InlineConfig = {
    plugins: [pluginVue(), pluginVueJsx()],
    build: {
      target: 'esnext',
      minify: false,
      emptyOutDir: true,
      outDir: resolvePackagePath(dirName, 'dist'),
      lib: {
        name: libName,
        entry: resolvePackagePath(dirName, 'src', 'index.ts'),
        formats: ['es', 'cjs', 'iife'],
        fileName: (format) => {
          if (format === 'es') {
            format = 'esm';
          }
          return `index.${format}.js`;
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
          assetFileNames: 'index[extname]'
        }
      }
    }
  };
  return config;
}

function getBuildAMDConfig(opts: {
  name: string;
  version: string;
  dirName: string;
  libName: string;
}): InlineConfig {
  const { dirName, name, libName } = opts;
  const config: InlineConfig = {
    plugins: [pluginVue(), pluginVueJsx()],
    build: {
      // target: 'esnext',
      minify: false,
      emptyOutDir: false,
      outDir: resolvePackagePath(dirName, 'dist'),
      lib: {
        name: libName,
        entry: resolvePackagePath(dirName, 'src', 'index.ts'),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        formats: ['amd'],
        fileName: () => {
          return 'index.amd.js';
        }
      },
      rollupOptions: {
        preserveEntrySignatures: 'strict',
        external: ['vue', '@vue/components'],
        output: {
          name: name,
          format: 'amd',
          amd: {
            id: name
          },
          globals: {
            vue: 'vue',
            '@vue/components': '@vue/components'
          },
          assetFileNames: 'index.amd[extname]'
        }
      }
    }
  };
  return config;
}

function readMaterialInfo(materialDirName: string) {
  const pkgFile = resolvePackagePath(materialDirName, 'package.json');
  const pkg = require(pkgFile);
  const cssFile = resolvePackagePath(materialDirName, 'dist', 'index.css');
  const esmFile = resolvePackagePath(materialDirName, 'dist', 'index.esm.js');
  const cjsFile = resolvePackagePath(materialDirName, 'dist', 'index.cjs.js');
  const iifeFile = resolvePackagePath(materialDirName, 'dist', 'index.iife.js');
  const amdFile = resolvePackagePath(materialDirName, 'dist', 'index.amd.js');
  const propsSchemaFile = resolvePackagePath(
    materialDirName,
    'dist',
    'props.schema.json'
  );

  const css = readFile(cssFile);
  const esm = readFile(esmFile);
  const cjs = readFile(cjsFile);
  const amd = readFile(amdFile);
  const iife = readFile(iifeFile);
  const propsSchema = readFile(propsSchemaFile);
  const name: string = pkg?.name || '';
  const version: string = pkg?.version || '';
  return {
    name,
    version,
    data: { css, esm, cjs, amd, iife, propsSchema }
  };
}

async function main() {
  console.log('执行物料编译...');
  const materialList = [
    {
      name: require('../packages/material-product-list/package.json').name,
      version: require('../packages/material-product-list/package.json')
        .version,
      dirName: 'material-product-list',
      libName: 'MyMaterialProdcutList'
    },
    {
      name: require('../packages/material-banner-slides/package.json').name,
      version: require('../packages/material-banner-slides/package.json')
        .version,
      dirName: 'material-banner-slides',
      libName: 'MyMaterialBannerSlides'
    }
  ];

  for (const opts of materialList) {
    console.log(`开始编译物料 ${opts.dirName}  版本v${opts.version}`);
    const config = getBuildConfig(opts);
    const configAMD = getBuildAMDConfig(opts);
    await build(config);
    await build(configAMD);
    await buildTypeSchema({ dirName: opts.dirName });
    console.log(`推送物料${opts.dirName} 版本v${opts.version}到模拟CDN...`);
    const info = readMaterialInfo(opts.dirName);
    await pushMaterialToCDN(info);

    // 模拟推送多个版本的物料
    const mockVersions = [
      '0.2.0',
      '0.3.0',
      '0.4.0',
      '0.5.0',
      '0.6.0',
      '0.7.0',
      '0.8.0',
      '0.9.0',
      '0.10.0',
      '1.0.0',
      '1.1.0',
      '1.2.0'
    ];
    for (const version of mockVersions) {
      const mockInfo = { ...info, ...{ version } };
      console.log(
        `推送物料${opts.dirName} 版本v${mockInfo.version}到模拟CDN...`
      );
      await pushMaterialToCDN(mockInfo);
    }
  }
}

main();
