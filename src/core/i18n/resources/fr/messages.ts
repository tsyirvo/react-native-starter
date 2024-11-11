import type { MessagesTypes } from '../en/messages';

export const messages: MessagesTypes = {
  common: {
    back: 'Retour',
    cancel: 'Annuler',
    next: 'Suivant',
  },
  appConfig: {
    networkStateCheck: {
      message:
        "Vérifiez la connexion internet. L'app peut ne pas fonctionner correctement sans connexion internet.",
      title: 'Pas de connexion internet',
    },
  },
  homeScreen: {
    formatting: {
      content: 'Le code est vérifié avec ESLint, Prettier and TypeScript',
      title: 'Formatage & type checking',
    },
    navigation: {
      content: 'Touchez pour naviguer',
      screenTitle: 'Accueil',
      title: 'Naviguer vers une autre page',
    },
    sandbox: {
      content: 'Accéder à la Sandbox depuis le menu de dev avec {{command}}',
      title: 'Sandbox',
    },
    tests: {
      content: 'Vous pouvez faire tourner les tests avec Jest ou Maestro',
      title: 'Tests',
    },
    updateCheck: {
      isEmbeddedLaunch: "L'app tourne depuis une MAJ OTA",
    },
  },
  miscScreens: {
    appUpdate: {
      description:
        'Merci de la mettre à jour pour utiliser les dernières fonctionnalités',
      title: 'Votre app est trop vieille',
    },
    blogPost: {
      screenTitle: 'Article de blog',
      title: 'Article récupéré avec GraphQL',
    },
    codepush: {
      cta: 'Installer maintenant',
      description:
        "Une mise à jour de l'application est requise pour fonctionner.",
      title: 'Mise à jour requise',
    },
    dummyForm: {
      form: {
        email: {
          label: 'Email',
          placeholder: 'Saisir un email',
          validation: {
            email: 'Il faut un email valide',
          },
        },
        firstName: {
          label: 'Prénom',
          placeholder: 'Martin',
          validation: {
            maxLength: 'Le prénom doit faire au plus 20 caractères',
            minLength: 'Le prénom doit faire au moins 2 caractères',
          },
        },
        lastName: {
          label: 'Nom',
          placeholder: 'Dupont',
          validation: {
            maxLength: 'Le nom doit faire au plus 30 caractères',
            minLength: 'Le nom doit faire au moins 2 caractères',
          },
        },
      },
      cta: 'Valider',
      screenTitle: 'Dummy form',
    },
    errorBoundary: {
      cta: "Relancer l'app",
      description:
        "Une erreur est survenue. Si l'erreur persiste, contacter un administrateur.",
      title: 'Erreur',
    },
    maintenanceMode: {
      description: 'Elle sera de nouveau fonctionnelle au plus vite',
      title: "L'app est en maintenance",
    },
    notifications: {
      cta: 'Demander',
      title: 'Demander les permissions de Notification',
    },
  },
  otherScreen: {
    form: {
      cta: 'Naviguer',
      title: 'Formulaire',
    },
    graphql: {
      cta: 'Naviguer',
      title: "Example d'appel API",
    },
    navigation: {
      title: 'Autre écran',
    },
  },
  settings: {
    changeLocale: {
      failure: "La langue n'a pas pu être changée",
      success: 'La langue a bien été changée',
    },
    permissions: {
      notAvailable: "Cette permission n'est pas disponible sur cet appareil",
      notGranted: 'Vous avez refusé cette demande de permission',
    },
    updateAvailable: {
      banner: {
        compareVersions:
          "La version {{storeVersion}} de l'app est maintenant disponible. Vous êtes actuellement sur la version {{currentVersion}}.",
        defaultTitle: "Une nouvelle version de l'app est disponible.",
        updateCta: 'Mettre à jour',
      },
      nativePrompt: {
        message:
          'Une nouvelle version est disponible. Voulez-vous mettre à jour maintenant?',
        title: 'Mise à jour disponible',
        updateCta: 'Mettre à jour',
      },
    },
  },
};
