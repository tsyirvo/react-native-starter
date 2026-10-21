import { execFileSync } from 'node:child_process';

interface ModuleResolution {
  filePath?: string;
  type: 'empty' | 'sourceFile';
}

const resolveModules = (appEnv: string, flag: string): ModuleResolution[][] =>
  JSON.parse(
    execFileSync(
      'node',
      [
        '-e',
        `
        const assert = require('node:assert/strict');
        const path = require('node:path');
        const config = require('./metro.config.cjs');
        const modules = [
          '@storybook/react-native',
          '@storybook/addon-ondevice-controls',
          'storybook/preview-api',
          '.rnstorybook/index.ts',
          '.rnstorybook/storybook.requires.ts',
          'src/shared/uiKit/button/ButtonWithText.tsx',
        ];
        const context = {
          resolveRequest: (_, name) => ({
            type: 'sourceFile',
            filePath: path.resolve(name),
          }),
        };
        const resolutions = ['ios', 'android'].map(platform =>
          modules.map(name => config.resolver.resolveRequest(context, name, platform))
        );
        assert.equal(typeof config.serializer.customSerializer, 'function');
        console.log(JSON.stringify(resolutions));
        `,
      ],
      {
        encoding: 'utf8',
        env: {
          ...process.env,
          APP_ENV: appEnv,
          STORYBOOK_DISABLE_TELEMETRY: '1',
          STORYBOOK_ENABLED: flag,
          STORYBOOK_SERVER: 'false',
          STORYBOOK_WS_HOST: '',
        },
      },
    ),
  );

describe('Storybook Metro integration', () => {
  it.each([
    ['production', 'true'],
    ['staging', 'true'],
    ['', 'true'],
    ['development', 'false'],
    ['development', ''],
  ])(
    'strips Storybook for APP_ENV=%s and STORYBOOK_ENABLED=%s',
    (env, flag) => {
      const platformResolutions = resolveModules(env, flag);

      for (const resolutions of platformResolutions) {
        expect(resolutions.slice(0, 3)).toEqual([
          { type: 'empty' },
          { type: 'empty' },
          { type: 'empty' },
        ]);
        expect(resolutions[3]).toEqual({
          filePath: expect.stringContaining(
            '@storybook/react-native/dist/stub.js',
          ),
          type: 'sourceFile',
        });
        expect(resolutions[4]).toEqual({ type: 'empty' });
        expect(resolutions[5]).toEqual({
          filePath: expect.stringContaining(
            'src/shared/uiKit/button/ButtonWithText.tsx',
          ),
          type: 'sourceFile',
        });
      }
    },
  );

  it('keeps Storybook and its story registry when explicitly enabled in development', () => {
    const platformResolutions = resolveModules('development', 'true');

    for (const resolutions of platformResolutions) {
      expect(resolutions[0]).toEqual({
        filePath: expect.stringContaining('@storybook/react-native'),
        type: 'sourceFile',
      });
      expect(resolutions[3]).toEqual({
        filePath: expect.stringContaining('.rnstorybook/index.ts'),
        type: 'sourceFile',
      });
      expect(resolutions[4]).toEqual({
        filePath: expect.stringContaining('.rnstorybook/storybook.requires.ts'),
        type: 'sourceFile',
      });
    }
  });
});
