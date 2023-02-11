export interface MockCDNMaterialData {
  css?: string | null;
  esm?: string | null;
  cjs?: string | null;
  amd?: string | null;
  iife?: string | null;
  propsSchema?: string | null;
}

export interface MockCDNPageData {
  bundleCss?: string | null;
  bundleJs?: string | null;
  esm?: string | null;
}

export interface MockCDNPkgData {
  files: Array<{
    fileName: string;
    text: string | null;
  }>;
}

export interface MockCDNSvgData {
  files: Array<{
    fileName: string;
    text: string | null;
  }>;
}
