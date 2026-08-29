import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
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
      config: {
        exposeFetcher: true,
        exposeQueryKeys: true,
        fetcher: '../../api/request#request',
        reactQueryVersion: 5,
      },
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
    },
    'src/infra/gql/graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
  overwrite: true,
  schema: 'https://graphqlzero.almansi.me/api',
};

export default config;
