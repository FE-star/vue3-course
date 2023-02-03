import {
  pushMaterialToCDN,
  pushPageToCDN,
  pushPkgToCDN,
  pushSvgToCDN
} from './lib/write';
import { readFileFromCDN, readMaterialVersionsFromCDN } from './lib/read';

export {
  pushMaterialToCDN,
  pushPageToCDN,
  pushPkgToCDN,
  pushSvgToCDN,
  readFileFromCDN,
  readMaterialVersionsFromCDN
};
export * from './lib/types';
