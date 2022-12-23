export interface MockCDNMaterialData {
  css?: string | null;
  esm?: string | null;
  cjs?: string | null;
  amd?: string | null;
  iife?: string | null;
}

export interface MockCDNPageData {
  css?: string | null;
  js?: string | null;
}

export interface MockCDNPkgData {
  files: Array<{
    fileName: string;
    text: string | null;
  }>;
}
