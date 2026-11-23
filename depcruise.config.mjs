/** @type {import('dependency-cruiser').IConfiguration} */
const config = {
  extends: './depcruise.base.mjs',
  options: {
    tsConfig: { fileName: 'tsconfig.json' },
  },
};

export default config;
