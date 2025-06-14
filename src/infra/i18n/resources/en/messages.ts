export const messages = {
  common: {
    back: 'Back',
    cancel: 'Cancel',
    next: 'Next',
  },
  tabs: {
    home: 'Home',
    features: 'Features',
    profile: 'Profile',
  },
  appConfig: {
    networkStateCheck: {
      message:
        'Please check your internet connection. The app might not work properly without it.',
      title: 'No internet connection',
    },
  },
  homeScreen: {
    formatting: {
      content: 'The code is checked with ESLint, Prettier and TypeScript',
      title: 'Formatting & type checking',
    },
    navigation: {
      content: 'Press to navigate',
      screenTitle: 'Home',
      title: 'Navigate to another page',
    },
    storybook: {
      content:
        'Access Storybook by running the packager with "yarn start:storybook"',
      title: 'Storybook',
    },
    tests: {
      content: 'You can run tests with Jest or Maestro',
      title: 'Tests',
    },
    updateCheck: {
      isEmbeddedLaunch: 'The app is running from an OTA update',
    },
  },
  miscScreens: {
    appUpdate: {
      description:
        'Please go update the application to access the latest features',
      title: 'Your app is outdated',
    },
    newStoreVersion: {
      title: 'An update is available on the stores',
      cta: 'Go update now',
    },
    errorBoundary: {
      cta: 'Relaunch the app',
      description:
        'An unknown error occured. If the error persist, contact an administrator.',
      title: 'Error',
    },
    maintenanceMode: {
      description: 'It will be available online as soon as possible',
      title: 'The app is in maintenance',
    },
    notifications: {
      cta: 'Request',
      title: 'Request Notification permission',
    },
  },
  otherScreen: {
    graphql: {
      cta: 'Navigate',
      title: 'API call example',
    },
  },
  settings: {
    changeLocale: {
      failure: 'The language could not be changed',
      success: 'The language has been changed',
    },
    permissions: {
      notAvailable: 'This permission is not available on this device',
      notGranted: 'You rejected this permission request',
    },
    updateAvailable: {
      banner: {
        compareVersions:
          'Version {{storeVersion}} of the app is now available. You are currently on version {{currentVersion}}.',
        defaultTitle: 'A new version of the app is available.',
        updateCta: 'Update now',
      },
      nativePrompt: {
        message: 'A new version is available. Do you want to update now?',
        title: 'Update available',
        updateCta: 'Update',
      },
    },
  },
  forms: {
    optional: 'Optional',
  },
  loginForm: {
    emailField: {
      label: 'Email',
      placeholder: 'test@example.com',
      validation: {
        required: 'Email is required',
        invalid: 'Please enter a valid email',
        minLength: 'Email must be at least 2 characters long',
        maxLength: 'Email must be at most 255 characters long',
      },
    },
    passwordField: {
      label: 'Password',
      placeholder: 'Enter your password',
      validation: {
        minLength: 'Password must be at least 6 characters long',
        maxLength: 'Password must be at most 255 characters long',
      },
    },
    submitButton: 'Login',
  },
  loginScreen: {
    title: 'Login',
  },
  blogPostScreen: {
    title: 'Blog post',
    description: 'Blog post fetched with GraphQL',
  },
  profileScreen: {
    title: 'Profile',
    logout: 'Logout',
  },
};

export type MessagesTypes = typeof messages;
