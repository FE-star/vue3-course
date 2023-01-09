import { pushMaterialToCDN, pushPageToCDN, pushPkgToCDN } from './lib/write';
import { readFileFromCDN, readMaterialVersionsFromCDN } from './lib/read';

export {
  pushMaterialToCDN,
  pushPageToCDN,
  pushPkgToCDN,
  readFileFromCDN,
  readMaterialVersionsFromCDN
};
export * from './lib/types';
