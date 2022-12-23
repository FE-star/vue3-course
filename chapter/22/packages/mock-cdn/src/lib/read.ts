import path from 'node:path';
import fs from 'node:fs';
import { PUBLIC_DIR } from '../config';

export function readFileFromCDN(filePath: string): string | null {
  const fullPath = path.join(PUBLIC_DIR, filePath);
  let result: string | null = null;
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
    result = fs.readFileSync(fullPath, { encoding: 'utf8' });
  }
  return result;
}
