export function bodyESTree(estreeList: any[]) {
  return {
    type: 'File',
    errors: [],
    program: {
      type: 'Program',
      sourceType: 'module',
      interpreter: null,
      body: [...estreeList],
      directives: []
    },
    comments: []
  };
}

export function importESTree(name: string, value: string) {
  return {
    type: 'ImportDeclaration',
    specifiers: [
      {
        type: 'ImportDefaultSpecifier',
        local: {
          type: 'Identifier',
          name: name
        }
      }
    ],
    importKind: 'value',
    source: {
      type: 'StringLiteral',
      value: value
    },
    assertions: []
  };
}

export function importMaterialCssFileESTree(name: string, version: string) {
  return {
    type: 'ImportDeclaration',
    specifiers: [],
    source: {
      type: 'StringLiteral',
      value: `../../../material/${name}/${version}/index.css`
    },
    assertions: []
  };
}

export function importFileESTree(filePath: string) {
  return {
    type: 'ImportDeclaration',
    specifiers: [],
    source: {
      type: 'StringLiteral',
      value: filePath
    },
    assertions: []
  };
}

export function importMaterialESTree(
  defineName: string,
  name: string,
  version: string
) {
  return importESTree(
    defineName,
    `../../../material/${name}/${version}/index.esm.js`
  );
}

export function constObjESTree(idName: string, propNames: string[]) {
  return {
    type: 'VariableDeclaration',
    declarations: [
      {
        type: 'VariableDeclarator',
        id: {
          type: 'ObjectPattern',
          properties: [
            ...propNames.map((name: string) => {
              return {
                type: 'ObjectProperty',
                key: {
                  type: 'Identifier',
                  name: name
                },
                computed: false,
                method: false,
                shorthand: true,
                value: {
                  type: 'Identifier',
                  name: name
                }
              };
            })
          ]
        },
        init: {
          type: 'Identifier',
          name: idName
        }
      }
    ],
    kind: 'const'
  };
}

export function constDefineObjESTree(name: string) {
  return {
    type: 'VariableDeclaration',
    declarations: [
      {
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: name
        },
        init: {
          type: 'ObjectExpression',
          properties: [
            {
              type: 'ObjectProperty',
              method: false,
              key: {
                type: 'Identifier',
                name: 'a'
              },
              computed: false,
              shorthand: false,
              value: {
                type: 'NumericLiteral',
                value: 1
              }
            }
          ]
        }
      }
    ],
    kind: 'const'
  };
}

export function constMaterialMapESTree(
  defineName: string,
  materials: { name: string; defineName: string }[]
) {
  return {
    type: 'VariableDeclaration',
    declarations: [
      {
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: defineName
        },
        init: {
          type: 'ObjectExpression',
          properties: materials.map((item) => {
            return {
              type: 'ObjectProperty',
              method: false,
              key: {
                type: 'StringLiteral',
                value: item.name
              },
              computed: false,
              shorthand: false,
              value: {
                type: 'Identifier',
                name: item.defineName
              }
            };
          })
        }
      }
    ],
    kind: 'const'
  };
}
