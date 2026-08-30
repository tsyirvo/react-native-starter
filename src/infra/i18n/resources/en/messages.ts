export const messages = {
  appConfig: {
    changeLocale: {
      failure: 'The language could not be changed',
      success: 'The language has been changed',
    },
    networkStateCheck: {
      message:
        'Please check your internet connection. The app might not work properly without it.',
      title: 'No internet connection',
    },
    permissions: {
      notAvailable: 'This permission is not available on this device',
      notGranted: 'You rejected this permission request',
    },
  },
  appUpdateNedeed: {
    cta: 'Update now',
    description:
      'Please go update the application to access the latest features',
    title: 'Your app is outdated',
  },
  common: {
    back: 'Back',
    cancel: 'Cancel',
    next: 'Next',
  },
  errorBoundary: {
    cta: 'Relaunch the app',
    description:
      'An unknown error occured. If the error persist, contact an administrator.',
    title: 'Error',
  },
  featuresScreen: {
    notificationsPermission: {
      alreadyGranted: 'The permission has already been granted',
      cta: 'Request',
      success: 'The permission has been granted',
      title: 'Request Notification permission',
    },
  },
  forms: {
    optional: 'Optional',
  },
  homeScreen: {
    formatting: {
      content: 'The code is fully checked with ESLint, Prettier and TypeScript',
      title: 'Formatting & type checking',
    },
    motivation: {
      content:
        'The goal of the starter kit is to provide a foundation for building React Native applications. It is not meant to provide tons of features, UI components, or other libraries, but to include the recurrent tools and libraries I use in most of the projects I work on.',
      title: 'Motivation',
    },
    storybook: {
      content:
        'Access a Storybook example exposing the most used components; you only need to run the packager with "bun run start:storybook"',
      title: 'Storybook',
    },
    tests: {
      content:
        'A test stack is set up with unit tests, integration tests and E2E tests with Jest, React Native Testing Library and Maestro',
      title: 'Tests',
    },
    tools: {
      content:
        'The app is already configured with some tools like: analytics, crash reporting, error tracking, in-app purchases, notifications, feature flags, etc.\nThere are also pre-configured utilities like: date formatting, i18n, store rating prompt, form validation, keyboard handling, etc.',
      title: 'Tools',
    },
    updateCheck: {
      isEmbeddedLaunch: 'The app is running from an OTA update',
    },
    whatIsInside: "What's inside ?",
  },
  loginForm: {
    emailField: {
      label: 'Email',
      placeholder: 'test@example.com',
      validation: {
        invalid: 'Please enter a valid email',
        required: 'Email is required',
      },
    },
    passwordField: {
      label: 'Password',
      placeholder: 'Enter your password',
      validation: {
        maxLength: 'Password must be at most 255 characters long',
        minLength: 'Password must be at least 6 characters long',
      },
    },
    submitButton: 'Login',
  },
  loginScreen: {
    title: 'React Native Template',
  },
  maintenanceMode: {
    description: 'It will be available online as soon as possible',
    title: 'The app is in maintenance',
  },
  newStoreVersionAvailable: {
    cta: 'Go update now',
    title: 'An update is available on the stores',
  },
  profileScreen: {
    logout: 'Logout',
    title: 'Profile',
  },
  tabs: {
    features: 'Features',
    home: 'Home',
    profile: 'Profile',
  },
};

export type MessagesTypes = typeof messages;
