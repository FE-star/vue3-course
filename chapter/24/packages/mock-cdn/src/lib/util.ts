import path from 'node:path';
import fs from 'node:fs';
import {
  PUBLIC_MATERIAL_DIR,
  PUBLIC_PAGE_DIR,
  PUBLIC_PKG_DIR
} from '../config';

export function writeMaterialFile(filePath: string, text: string) {
  const fullPath = path.join(PUBLIC_MATERIAL_DIR, filePath);
  const baseDir = path.dirname(fullPath);
  if (!(fs.existsSync(baseDir) && fs.statSync(baseDir).isDirectory())) {
    fs.mkdirSync(baseDir, { recursive: true });
  }
  fs.writeFileSync(fullPath, text);
}

export function writePageFile(filePath: string, text: string) {
  const fullPath = path.join(PUBLIC_PAGE_DIR, filePath);
  const baseDir = path.dirname(fullPath);
  if (!(fs.existsSync(baseDir) && fs.statSync(baseDir).isDirectory())) {
    fs.mkdirSync(baseDir, { recursive: true });
  }
  fs.writeFileSync(fullPath, text);
}

export function writePkgFile(filePath: string, text: string) {
  const fullPath = path.join(PUBLIC_PKG_DIR, filePath);
  const baseDir = path.dirname(fullPath);
  if (!(fs.existsSync(baseDir) && fs.statSync(baseDir).isDirectory())) {
    fs.mkdirSync(baseDir, { recursive: true });
  }
  fs.writeFileSync(fullPath, text);
}

export function isVersion(str: string) {
  return /^[0-9]+\.[0-9]+\.[0-9]+$/.test(str);
}
