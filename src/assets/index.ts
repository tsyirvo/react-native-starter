/**
 * The single entry point for runtime UI assets. Getters defer each asset
 * module's evaluation to the component that reads it; Metro resolves the
 * static require paths at build time and makes later reads cache hits.
 */
export const Assets = {
  images: {
    /** Assets for specific components, organized like the components folders. */
    components: {
      home: {
        get header(): ImageRequireSource {
          return require('./images/components/home/header.jpeg');
        },
      },
    },
    /** Assets for specific screens, organized like the src/app/ routes. */
    screens: {},
    /** Assets shared across components and screens, such as branding. */
    shared: {
      logos: {
        get logoDark(): ImageRequireSource {
          return require('./images/shared/logos/logo-dark.png');
        },
      },
    },
  },
};

/**
 * Metro resolves image requires to its asset registry key, which consumers
 * accept through `ImageSourcePropType` (React Native) and `ImageSource`
 * (Expo Image).
 */
type ImageRequireSource = number;
