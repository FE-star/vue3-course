import path from 'node:path';
import { writeMaterialFile, writePkgFile, writePageFile } from '../lib/util';
import type {
  MockCDNMaterialData,
  MockCDNPageData,
  MockCDNPkgData
} from './types';

export function pushMaterialToCDN(opts: {
  name: string;
  version: string;
  data: MockCDNMaterialData;
}) {
  const { name, version, data } = opts;
  const fileList: { filePath: string; text: string }[] = [];
  if (data.esm) {
    fileList.push({
      filePath: path.join(name, version, 'index.esm.js'),
      text: data.esm || ''
    });
  }
  if (data.cjs) {
    fileList.push({
      filePath: path.join(name, version, 'index.cjs.js'),
      text: data.cjs || ''
    });
  }
  if (data.amd) {
    fileList.push({
      filePath: path.join(name, version, 'index.amd.js'),
      text: data.amd || ''
    });
  }

  if (data.iife) {
    fileList.push({
      filePath: path.join(name, version, 'index.iife.js'),
      text: data.iife || ''
    });
  }
  if (data.css) {
    fileList.push({
      filePath: path.join(name, version, 'index.css'),
      text: data.css || ''
    });
  }
  for (const item of fileList) {
    writeMaterialFile(item.filePath, item.text);
  }
}

export function pushPageToCDN(opts: {
  name: string;
  version: string;
  data: MockCDNPageData;
}) {
  const { name, version, data } = opts;
  const fileList: { filePath: string; text: string }[] = [];
  if (data.js) {
    fileList.push({
      filePath: path.join(name, version, 'index.js'),
      text: data.js || ''
    });
  }
  if (data.css) {
    fileList.push({
      filePath: path.join(name, version, 'index.css'),
      text: data.css || ''
    });
  }
  for (const item of fileList) {
    writePageFile(item.filePath, item.text);
  }
}

export function pushPkgToCDN(opts: {
  name: string;
  version: string;
  data: MockCDNPkgData;
}) {
  const { name, version, data } = opts;
  if (Array.isArray(data?.files)) {
    for (const item of data.files) {
      const filePath = path.join(name, version, item.fileName);
      if (typeof item.text === 'string') {
        writePkgFile(filePath, item.text);
      }
    }
  }
}
