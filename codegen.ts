import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://graphqlzero.almansi.me/api',
  documents: 'src/**/*.tsx',
  generates: {
    // 'src/gql/generated/types.ts': {
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
    'src/gql/generated/': {
      preset: 'client',
    },
    'src/gql/generated/hooks.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
      config: {
        reactQueryVersion: 5,
        exposeQueryKeys: true,
        exposeFetcher: true,
        fetcher: '../../core/api/request#request',
      },
    },
    'src/gql/graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
  hooks: {
    afterAllFileWrite: [
      "eslint ./src/gql --ext .ts,.json --fix && yarn prettier --write './src/gql/**/*.ts'",
    ],
  },
};

export default config;
