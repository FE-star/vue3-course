import path from 'node:path';
import fs from 'node:fs';
import {
  PUBLIC_MATERIAL_DIR,
  PUBLIC_PAGE_DIR,
  PUBLIC_PAGE_TEST_DIR,
  PUBLIC_PAGE_PRE_DIR,
  PUBLIC_PKG_DIR,
  PUBLIC_SVG_DIR
} from '../config';

const pageDirMap = {
  prod: PUBLIC_PAGE_DIR,
  test: PUBLIC_PAGE_TEST_DIR,
  pre: PUBLIC_PAGE_PRE_DIR
};

export function writeMaterialFile(filePath: string, text: string) {
  const fullPath = path.join(PUBLIC_MATERIAL_DIR, filePath);
  const baseDir = path.dirname(fullPath);
  if (!(fs.existsSync(baseDir) && fs.statSync(baseDir).isDirectory())) {
    fs.mkdirSync(baseDir, { recursive: true });
  }
  fs.writeFileSync(fullPath, text);
}

export function writePageFile(
  filePath: string,
  text: string,
  stage: 'pre' | 'test' | 'prod'
) {
  const pageDir = pageDirMap[stage] || PUBLIC_PAGE_TEST_DIR;
  const fullPath = path.join(pageDir, filePath);
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

export function writeSvgFile(filePath: string, text: string) {
  const fullPath = path.join(PUBLIC_SVG_DIR, filePath);
  const baseDir = path.dirname(fullPath);
  if (!(fs.existsSync(baseDir) && fs.statSync(baseDir).isDirectory())) {
    fs.mkdirSync(baseDir, { recursive: true });
  }
  fs.writeFileSync(fullPath, text);
}
