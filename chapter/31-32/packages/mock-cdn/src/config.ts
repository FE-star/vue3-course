import path from 'node:path';

export const PUBLIC_DIR = path.join(__dirname, '..', 'public');

export const PUBLIC_MATERIAL_DIR = path.join(PUBLIC_DIR, 'material');

export const PUBLIC_PAGE_DIR = path.join(PUBLIC_DIR, 'page');

export const PUBLIC_PAGE_TEST_DIR = path.join(PUBLIC_DIR, 'page-test');

export const PUBLIC_PAGE_PRE_DIR = path.join(PUBLIC_DIR, 'page-pre');

export const PUBLIC_PKG_DIR = path.join(PUBLIC_DIR, 'pkg');

export const PUBLIC_SVG_DIR = path.join(PUBLIC_DIR, 'svg');
