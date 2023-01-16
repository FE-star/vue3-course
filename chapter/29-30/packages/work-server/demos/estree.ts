// import generator from '@babel/generator';
// const estree1 = {
//   type: 'VariableDeclaration',
//   declarations: [
//     {
//       type: 'VariableDeclarator',
//       id: {
//         type: 'Identifier',
//         name: 'a'
//       },
//       init: {
//         type: 'NumericLiteral',
//         value: 1
//       }
//     }
//   ],
//   kind: 'const'
// };

// const estreeProgram: any = {
//   type: 'File',
//   errors: [],
//   program: {
//     type: 'Program',
//     sourceType: 'module',
//     interpreter: null,
//     body: [],
//     directives: [estree1]
//   },
//   comments: []
// };
// const result = generator(estreeProgram);
// console.log(result.code); // 输出代码 const a = 1;

import path from 'node:path';
import { build } from 'vite';
import type { InlineConfig } from 'vite';

// 动态编译入口文件的方法
async function buildEntryFile(fullEntryFilePath: string) {
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
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue'
          },
          assetFileNames: 'bundle[extname]'
        }
      }
    }
  };
  await build(config);
}
