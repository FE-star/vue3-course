import ts from 'typescript';
import glob from 'fast-glob';
import { resolvePackagePath, readFile } from './util';
import { pushPkgToCDN } from '../packages/mock-cdn/src';
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

async function build() {
  await buildNodeCode();
  await buildMockCDNPkgCode();
}

build();
