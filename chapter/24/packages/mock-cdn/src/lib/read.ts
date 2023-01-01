import path from 'node:path';
import fs from 'node:fs';
import { PUBLIC_DIR, PUBLIC_MATERIAL_DIR } from '../config';
import { isVersion } from './util';

export function readFileFromCDN(filePath: string): string | null {
  const fullPath = path.join(PUBLIC_DIR, filePath);
  let result: string | null = null;
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
    result = fs.readFileSync(fullPath, { encoding: 'utf8' });
  }
  return result;
}

export function readMaterialVersionsFromCDN(params: {
  name: string;
}): string[] {
  const result: string[] = [];
  const { name } = params;
  const fullPath = path.join(PUBLIC_MATERIAL_DIR, name);
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
    const list = fs.readdirSync(fullPath);
    list.forEach((item) => {
      if (isVersion(item)) {
        result.push(item);
      }
    });
  }
  return result;
}
