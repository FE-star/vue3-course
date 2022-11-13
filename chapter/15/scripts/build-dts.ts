/* eslint-disable no-console */
import process from 'node:process';
import path from 'node:path';
import fs from 'node:fs';
import * as vueCompiler from 'vue/compiler-sfc';
import glob from 'fast-glob';
import { Project } from 'ts-morph';
import type { CompilerOptions, SourceFile } from 'ts-morph';
import { resolveProjectPath, resolvePackagePath } from './util';

const tsWebBuildConfigPath = resolveProjectPath('tsconfig.web.build.json');

// 检查项目的类型是否正确
function checkPackageType(project: Project) {
  const diagnostics = project.getPreEmitDiagnostics();
  if (diagnostics.length > 0) {
    console.error(project.formatDiagnosticsWithColorAndContext(diagnostics));
    const err = new Error('TypeScript类型描述文件构建失败！');
    console.error(err);
    throw err;
  }
}

// 将*.d.ts文件复制到指定格式模块目录里
async function copyDts(pkgDirName: string) {
  const dtsPaths = await glob(['**/*.d.ts'], {
    cwd: resolveProjectPath('dist', 'types', 'packages', pkgDirName, 'src'),
    absolute: false,
    onlyFiles: true
  });

  dtsPaths.forEach((dts: string) => {
    const dtsPath = resolveProjectPath(
      'dist',
      'types',
      'packages',
      pkgDirName,
      'src',
      dts
    );
    const cjsPath = resolvePackagePath(pkgDirName, 'dist', 'cjs', dts);
    const esmPath = resolvePackagePath(pkgDirName, 'dist', 'esm', dts);
    const content = fs.readFileSync(dtsPath, { encoding: 'utf8' });
    fs.writeFileSync(cjsPath, content);
    fs.writeFileSync(esmPath, content);
  });
}

// 添加源文件到项目里
async function addSourceFiles(project: Project, pkgSrcDir: string) {
  project.addSourceFileAtPath(resolveProjectPath('env.d.ts'));

  const globSourceFile = '**/*.{js?(x),ts?(x),vue}';
  const filePaths = await glob([globSourceFile], {
    cwd: pkgSrcDir,
    absolute: true,
    onlyFiles: true
  });

  const sourceFiles: SourceFile[] = [];
  await Promise.all([
    ...filePaths.map(async (file) => {
      if (file.endsWith('.vue')) {
        const content = fs.readFileSync(file, { encoding: 'utf8' });
        const hasTsNoCheck = content.includes('@ts-nocheck');

        const sfc = vueCompiler.parse(content);
        const { script, scriptSetup } = sfc.descriptor;
        if (script || scriptSetup) {
          let content =
            (hasTsNoCheck ? '// @ts-nocheck\n' : '') + (script?.content ?? '');

          if (scriptSetup) {
            const compiled = vueCompiler.compileScript(sfc.descriptor, {
              id: 'temp'
            });
            content += compiled.content;
          }

          const lang = scriptSetup?.lang || script?.lang || 'js';
          const sourceFile = project.createSourceFile(
            `${path.relative(process.cwd(), file)}.${lang}`,
            content
          );
          sourceFiles.push(sourceFile);
        }
      } else {
        const sourceFile = project.addSourceFileAtPath(file);
        sourceFiles.push(sourceFile);
      }
    })
  ]);

  return sourceFiles;
}

// 生产Typescript类型描述文件
async function generateTypesDefinitions(
  pkgDir: string,
  pkgSrcDir: string,
  outDir: string
) {
  const compilerOptions: CompilerOptions = {
    emitDeclarationOnly: true,
    outDir
  };
  const project = new Project({
    compilerOptions,
    tsConfigFilePath: tsWebBuildConfigPath
  });

  const sourceFiles = await addSourceFiles(project, pkgSrcDir);
  checkPackageType(project);
  await project.emit({
    emitOnlyDtsFiles: true
  });

  const tasks = sourceFiles.map(async (sourceFile) => {
    const relativePath = path.relative(pkgDir, sourceFile.getFilePath());

    const emitOutput = sourceFile.getEmitOutput();
    const emitFiles = emitOutput.getOutputFiles();
    if (emitFiles.length === 0) {
      throw new Error(`异常文件: ${relativePath}`);
    }

    const subTasks = emitFiles.map(async (outputFile) => {
      const filepath = outputFile.getFilePath();
      fs.mkdirSync(path.dirname(filepath), {
        recursive: true
      });
    });

    await Promise.all(subTasks);
  });
  await Promise.all(tasks);
}

async function build(pkgDirName: string) {
  const outDir = resolveProjectPath('dist', 'types');
  const pkgDir = resolvePackagePath(pkgDirName);
  const pkgSrcDir = resolvePackagePath(pkgDirName, 'src');
  await generateTypesDefinitions(pkgDir, pkgSrcDir, outDir);
  await copyDts(pkgDirName);
}

console.log('[Dts] 开始编译d.ts文件···');
await build('components');
await build('business');
console.log('[Dts] 编译d.ts文件成功！');
