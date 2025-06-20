import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://graphqlzero.almansi.me/api',
  documents: 'src/**/*.tsx',
  generates: {
    // 'src/infra/gql/generated/types.ts': {
    //   plugins: ['typescript'],
    //   config: {
    //     enumsAsTypes: true,
    //     disableDescriptions: true,
    //     strictScalars: true,
    //     defaultScalarType: 'unknown',
    //     scalars: {
    //       Date: 'string',
    //       DateTime: 'string',
    //     },
    //   },
    // },
    'src/infra/gql/generated/': {
      preset: 'client',
    },
    'src/infra/gql/generated/hooks.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
      config: {
        reactQueryVersion: 5,
        exposeQueryKeys: true,
        exposeFetcher: true,
        fetcher: '../../api/request#request',
      },
    },
    'src/infra/gql/graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
  hooks: {
    afterAllFileWrite: [
      'eslint ./src/infra/gql/generated --ext .ts,.json --fix',
      "yarn prettier --write './src/infra/gql/**/*.ts'",
    ],
  },
};

export default config;
