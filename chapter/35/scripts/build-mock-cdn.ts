import ts from 'typescript';
import glob from 'fast-glob';
import { resolvePackagePath, readFile } from './util';
import { pushPkgToCDN, pushSvgToCDN } from '../packages/mock-cdn/src';
import type { MockCDNPkgData } from '../packages/mock-cdn/src';

function buildNodeCode() {
  const dirName = 'mock-cdn';
  const pattern = '**/*.ts';
  const cwd = resolvePackagePath(dirName, 'src');
  const files = glob.sync(pattern, { cwd });

  const targetFiles = files.map((file) => {
    return resolvePackagePath(dirName, 'src', file);
  });

  const compilerOptions: any = {
    target: ts.ScriptTarget.ES5,
    // module: 'NodeNext',
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    strict: true,
    jsx: 'preserve',
    sourceMap: true,
    resolveJsonModule: true,
    esModuleInterop: true,
    lib: ['ES6', 'DOM'],
    importHelpers: true,
    allowJs: true,
    composite: true,
    declaration: true,
    outDir: resolvePackagePath(dirName, 'dist'),
    rootDir: resolvePackagePath(dirName, 'src')
  };

  const program = ts.createProgram(targetFiles, compilerOptions);
  program.emit();
}

async function buildMockCDNPkgCode() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pkg = require('../packages/mock-cdn/package.json');
  const pkgConfigList = [
    {
      name: 'vue',
      version: pkg.dependencies.vue,
      fileNames: [
        'dist/vue.esm-browser.js',
        'dist/vue.esm-browser.prod.js',
        'dist/vue.esm-bundler.js',
        'dist/vue.global.js',
        'dist/vue.global.prod.js',
        'dist/vue.runtime.esm-browser.js',
        'dist/vue.runtime.esm-browser.prod.js',
        'dist/vue.runtime.esm-bundler.js',
        'dist/vue.runtime.global.js',
        'dist/vue.runtime.global.prod.js'
      ]
    },
    {
      name: 'vue-router',
      version: pkg.dependencies['vue-router'],
      fileNames: [
        'dist/vue-router.esm-browser.js',
        'dist/vue-router.esm-bundler.js',
        'dist/vue-router.global.js',
        'dist/vue-router.global.prod.js',
        'dist/vue-router.mjs'
      ]
    },
    {
      name: 'requirejs',
      version: pkg.dependencies['requirejs'],
      fileNames: ['require.js']
    }
  ];
  for (const conf of pkgConfigList) {
    const files: MockCDNPkgData['files'] = [];
    conf.fileNames.forEach((fileName) => {
      const fullPath = resolvePackagePath(
        'mock-cdn',
        'node_modules',
        conf.name,
        fileName
      );
      const text = readFile(fullPath);
      files.push({
        fileName,
        text
      });
    });
    pushPkgToCDN({ name: conf.name, version: conf.version, data: { files } });
  }
}

async function buildMockCDNSvgCode() {
  const createSvgCode = (color: string) => {
    return `<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200" fill="${color}"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792z m0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2z"></path><path d="M304 456c48.6 0 88-39.4 88-88s-39.4-88-88-88-88 39.4-88 88 39.4 88 88 88z m0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28z"></path></svg>`;
  };
  const colors = [
    '#ff5722',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#ff5722',
    '#9e9e9e',
    '#607d8b'
  ];
  const data = {
    files: colors.map((color, i) => {
      return {
        fileName: `image-${i}.svg`,
        text: createSvgCode(color)
      };
    })
  };
  await pushSvgToCDN({ data });
}

async function build() {
  await buildNodeCode();
  await buildMockCDNPkgCode();
  await buildMockCDNSvgCode();
}

build();
