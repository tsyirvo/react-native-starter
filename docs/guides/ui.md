# UI

This guide covers styles, icons, images, translations and Storybook.

## Styles and themes

The app uses [Unistyles](https://www.unistyl.es/) for styles and themes. The
theme is in `src/shared/theme/`. Reusable UI components are in
`src/shared/uiKit/` and `src/shared/components/`.

## Icons

SVG icons are in `src/shared/icons/svgs/`.
[react-native-nano-icons](https://github.com/software-mansion-labs/react-native-nano-icons)
compiles them into a typed icon font. Each icon renders as one native view
through the `Icon` component.

To add an icon:

1. Add the `.svg` file to `src/shared/icons/svgs/`.
2. Run `bun run generate:icons`.
3. Make a new development build. The icon font is a native asset, so an OTA
   update cannot deliver it.

Do not edit the generated files in `src/shared/icons/font/`.

## Images and media

Images and other media are in `src/assets/`. Code uses them only through the
`Assets` entry point from `$assets`, for example
`Assets.images.<group>.<name>`. Do not import the files directly.

- Register each asset with a lazy getter. Use the same folder structure as the
  code (`components`, `screens`, `shared`).
- Read the value in the component that renders it.
- Remove the entry when you remove an asset.

SVG icons do not go through `Assets`. Read [Icons](#icons).

## Translations

The app uses [i18next](https://www.i18next.com/). The translation files are in
`src/infra/i18n/resources/`.

English is the default language. French is also included. Each language uses
the type of the English messages (`MessagesTypes`), so the type check fails if
a language does not have all the English keys. This makes sure that no screen
has a missing translation.

## Storybook

The app includes an on-device
[React Native Storybook](https://github.com/storybookjs/react-native).
It has the controls, backgrounds and actions addons. Stories are next to the
components that they show.

To open Storybook:

1. Start the packager with Storybook enabled: `bun run start:storybook`.
2. Open the development app.
3. Go to the `/storybook` route.

Storybook runs inside the app through Expo Router. Stories can use all the
app providers.

### Configuration

The configuration is in `.rnstorybook/`:

| File          | Purpose                                                  |
| ------------- | -------------------------------------------------------- |
| `main.ts`     | Finds the `src/**/*.stories.*` files and adds the addons |
| `preview.tsx` | Sets the global decorators and parameters                |
| `index.ts`    | Creates the Storybook UI and keeps the last selection    |

Metro generates `storybook.requires.ts` when Storybook is enabled. After a
configuration change, you can also run `bun run storybook:generate`.

`metro.config.cjs` uses the in-app wrapper from
`@storybook/react-native/metro/withStorybook`. This is intentional. The newer
`@storybook/react-native/withStorybook` wrapper replaces the app entry point,
and the Router layout and its providers would not load.

### When Storybook is enabled

Storybook is enabled only when `APP_ENV=development` **and**
`STORYBOOK_ENABLED=true`. In staging and production, it stays disabled even if
the flag is set.

When Storybook is disabled, Metro replaces `.rnstorybook/` and the Storybook
packages with empty modules. This removes the stories from the production
bundle. The route guard alone does not remove them, and `devDependencies` do
not stop Metro from bundling imported code. Do not export stories from runtime
`index.ts` files.
