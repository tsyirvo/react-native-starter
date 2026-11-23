const TEST_FILE = '[.](?:spec|test)[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$';
const CONFIG_FILE = '(^|/)[^/]+[.]config[.](?:js|cjs|mjs|ts|cts|mts)$';
// Supabase functions run on Deno. Their imports resolve through a Deno import map.
const DENO = '^supabase/functions/';
const DEV_ONLY = [
  TEST_FILE,
  CONFIG_FILE,
  '[.]stories[.](?:js|jsx|ts|tsx)$',
  '(^|/)(?:__tests__|__mocks__|__fixtures__|testing|test-utils|mocks|fixtures|e2e)/',
];

// A repo rule or option with the same name replaces the whole object. An override spreads these lists.
export const EXCLUDE = [
  '^(?:docs|specs)/',
  // The lookahead keeps npm packages whose entry is in a build/ or dist/ folder.
  '^(?!.*node_modules/).*(?:^|/)(?:[.](?!rnstorybook/|storybook/)[^/]+|dist|build|coverage|ios|android)/',
];

export const ORPHAN_PATH_NOT = [
  '(^|/)[.][^/]+[.](?:js|cjs|mjs|ts|cts|mts|json)$',
  '[.]d[.]ts$',
  '(^|/)tsconfig[^/]*[.]json$',
  CONFIG_FILE,
  '(^|/)depcruise[.]base[.]mjs$',
  '(^|/)__mocks__/',
  // The generate:icons script passes these files to the svgr CLI.
  '(^|/)icons/svgs/config/',
  '(^|/)[.](?:rn)?storybook/main[.](?:js|ts)$',
];

/** @type {import('dependency-cruiser').IConfiguration} */
const config = {
  forbidden: [
    {
      name: 'no-circular',
      comment:
        'This module is part of an import cycle. Move the shared part into its own module, or invert one dependency.',
      severity: 'error',
      from: {},
      to: { circular: true },
    },
    {
      name: 'no-orphans',
      comment:
        'Nothing imports this module, and it imports nothing. Use it or remove it. When a tool loads it by name, add it to the no-orphans pathNot in depcruise.config.mjs.',
      severity: 'error',
      from: { orphan: true, pathNot: ORPHAN_PATH_NOT },
      to: {},
    },
    {
      name: 'not-to-unresolvable',
      comment:
        'This import does not resolve to a file. Add the package to the nearest package.json, or fix the path.',
      severity: 'error',
      from: { pathNot: DENO },
      to: { couldNotResolve: true },
    },
    {
      name: 'no-non-package-json',
      comment:
        'This package is not in the nearest package.json. Add it to the dependencies of the workspace that imports it.',
      severity: 'error',
      from: { pathNot: DENO },
      to: { dependencyTypes: ['npm-no-pkg', 'npm-unknown'] },
    },
    {
      name: 'not-to-dev-dep',
      comment:
        'App code imports a package from devDependencies, so the build may not have it. Move the package to dependencies, or import only its types.',
      severity: 'error',
      from: { path: '(^|/)src/|^convex/', pathNot: DEV_ONLY },
      to: {
        dependencyTypes: ['npm-dev'],
        dependencyTypesNot: ['type-only'],
        pathNot: ['node_modules/@types/'],
      },
    },
    {
      name: 'no-duplicate-dep-types',
      comment:
        'This package is in more than one dependency field of package.json. Keep it in one field only.',
      severity: 'error',
      from: {},
      to: { moreThanOneDependencyType: true },
    },
    {
      name: 'not-to-spec',
      comment:
        'This module imports a test file. Move the shared code into a helper that both can import.',
      severity: 'error',
      from: {},
      to: { path: TEST_FILE },
    },
    {
      name: 'not-to-deprecated',
      comment: 'This package version is deprecated. Upgrade it or replace it.',
      severity: 'error',
      from: {},
      to: { dependencyTypes: ['deprecated'] },
    },
    {
      name: 'no-deprecated-core',
      comment: 'This Node core module is deprecated. Use its replacement.',
      severity: 'error',
      from: {},
      to: {
        dependencyTypes: ['core'],
        path: [
          '^v8/tools/',
          '^node-inspect/lib/',
          '^(?:node:)?punycode$',
          '^(?:node:)?domain$',
          '^(?:node:)?constants$',
          '^(?:node:)?sys$',
          '^(?:node:)?_linklist$',
          '^(?:node:)?_stream_wrap$',
        ],
      },
    },
    {
      name: 'peer-deps-used',
      comment:
        'This package is only a peer dependency here. An app installs what it imports: add it to dependencies.',
      severity: 'error',
      from: {},
      to: { dependencyTypes: ['npm-peer'] },
    },
    {
      name: 'optional-deps-used',
      comment:
        'This package is an optional dependency, so an install can skip it. Add it to dependencies.',
      severity: 'error',
      from: {},
      to: { dependencyTypes: ['npm-optional'] },
    },
  ],
  options: {
    doNotFollow: { path: ['node_modules'] },
    exclude: { path: EXCLUDE },
    detectProcessBuiltinModuleCalls: true,
    tsPreCompilationDeps: true,
    skipAnalysisNotInRules: true,
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['react-native', 'import', 'require', 'node', 'default', 'types'],
      mainFields: ['react-native', 'module', 'main', 'types', 'typings'],
      // Metro tries each extension of Expo's sourceExts with its platform variants, then the next one.
      // The graph follows the iOS file, and .d.ts comes last so a generated .js wins.
      extensions: [
        '.ios.ts',
        '.native.ts',
        '.ts',
        '.ios.tsx',
        '.native.tsx',
        '.tsx',
        '.ios.mjs',
        '.native.mjs',
        '.mjs',
        '.ios.js',
        '.native.js',
        '.js',
        '.ios.jsx',
        '.native.jsx',
        '.jsx',
        '.json',
        '.cjs',
        '.d.ts',
      ],
    },
  },
};

export default config;
