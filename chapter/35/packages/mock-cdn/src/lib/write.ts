import path from 'node:path';
import {
  writeMaterialFile,
  writePkgFile,
  writePageFile,
  writeSvgFile
} from '../lib/util';
import type {
  MockCDNMaterialData,
  MockCDNPageData,
  MockCDNPkgData,
  MockCDNSvgData
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
  if (data.propsSchema) {
    fileList.push({
      filePath: path.join(name, version, 'props.schema.json'),
      text: data.propsSchema || '{}'
    });
  }
  for (const item of fileList) {
    writeMaterialFile(item.filePath, item.text);
  }
}

export function pushPageToCDN(opts: {
  uuid: string;
  version: string;
  data: MockCDNPageData;
  stage: 'pre' | 'test' | 'prod';
}) {
  const { uuid, version, data, stage } = opts;
  const fileList: { filePath: string; text: string }[] = [];
  if (data.bundleCss) {
    fileList.push({
      filePath: path.join(uuid, version, 'bundle.css'),
      text: data.bundleCss || ''
    });
  }
  if (data.bundleJs) {
    fileList.push({
      filePath: path.join(uuid, version, 'bundle.js'),
      text: data.bundleJs || ''
    });
  }
  if (data.esm) {
    fileList.push({
      filePath: path.join(uuid, version, 'index.esm.js'),
      text: data.esm || ''
    });
  }
  for (const item of fileList) {
    writePageFile(item.filePath, item.text, stage);
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

export function pushSvgToCDN(opts: { data: MockCDNSvgData }) {
  const { data } = opts;
  if (Array.isArray(data?.files)) {
    for (const item of data.files) {
      const filePath = path.join(item.fileName);
      if (typeof item.text === 'string') {
        writeSvgFile(filePath, item.text);
      }
    }
  }
}
