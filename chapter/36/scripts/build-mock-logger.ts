import ts from 'typescript';
import glob from 'fast-glob';
import { resolvePackagePath } from './util';

function buildNodeCode() {
  const dirName = 'mock-logger';
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

async function build() {
  await buildNodeCode();
}

build();
