interface Material {
  name: string;
  version: string;
}

interface Column {
  uuid: string;
  materialName: string;
}

interface Row {
  columns: Column[];
}

interface Layout {
  rows: Row[];
}

interface Material {
  name: string;
  version: string;
}

export interface Page {
  layout: Layout;
  materialMap: {
    [materialName: string]: Material;
  };
  materialDataMap: {
    [uuid: string]: Record<string, any>;
  };
}

export const pageData: Page = {
  layout: {
    rows: [
      {
        columns: [
          { uuid: '0000-0000', materialName: '@my/material-banner-slides' },
          { uuid: '0000-0001', materialName: '@my/material-banner-slides' }
        ]
      },
      {
        columns: [
          { uuid: '0001-0000', materialName: '@my/material-product-list' }
        ]
      },
      {
        columns: [
          { uuid: '0002-0000', materialName: '@my/material-product-list' }
        ]
      }
    ]
  },
  materialMap: {
    '@my/material-banner-slides': {
      name: '@my/material-banner-slides',
      version: '0.9.0'
    },
    '@my/material-product-list': {
      name: '@my/material-product-list',
      version: '0.9.0'
    }
  },
  materialDataMap: {
    '0000-0001': {},
    '0000-0002': {},
    '0001-0000': {},
    '0002-0000': {}
  }
};
