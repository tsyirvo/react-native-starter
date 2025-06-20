import type { MessagesTypes } from '../en/messages';

export const messages: MessagesTypes = {
  common: {
    back: 'Retour',
    cancel: 'Annuler',
    next: 'Suivant',
  },
  tabs: {
    home: 'Accueil',
    features: 'Fonctionnalités',
    profile: 'Profil',
  },
  appConfig: {
    networkStateCheck: {
      message:
        "Vérifiez la connexion internet. L'app peut ne pas fonctionner correctement sans connexion internet.",
      title: 'Pas de connexion internet',
    },
    permissions: {
      notAvailable: "Cette permission n'est pas disponible sur cet appareil",
      notGranted: 'Vous avez refusé cette demande de permission',
    },
    changeLocale: {
      failure: "La langue n'a pas pu être changée",
      success: 'La langue a bien été changée',
    },
  },
  appUpdateNedeed: {
    title: 'Votre app est trop vieille',
    description:
      'Merci de la mettre à jour pour utiliser les dernières fonctionnalités',
    cta: 'Mettre à jour',
  },
  newStoreVersionAvailable: {
    title: 'Une mise à jour est disponible sur les stores',
    cta: 'Mettre à jour maintenant',
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
  homeScreen: {
    formatting: {
      content: 'Le code est vérifié avec ESLint, Prettier and TypeScript',
      title: 'Formatage & type checking',
    },
    storybook: {
      content:
        'Accéder au Storybook en lançant le packager avec "yarn start:storybook"',
      title: 'Storybook',
    },
    tests: {
      content: 'Vous pouvez faire tourner les tests avec Jest ou Maestro',
      title: 'Tests',
    },
    updateCheck: {
      isEmbeddedLaunch: "L'app tourne depuis une MAJ OTA",
    },
  },
  forms: {
    optional: 'Optionnel',
  },
  loginForm: {
    emailField: {
      label: 'Email',
      placeholder: 'test@example.com',
      validation: {
        required: "L'email est requis",
        invalid: 'Email invalide',
        minLength: "L'email doit faire au moins 2 caractères",
        maxLength: "L'email doit faire au plus 255 caractères",
      },
    },
    passwordField: {
      label: 'Mot de passe',
      placeholder: 'Entrer votre mot de passe',
      validation: {
        minLength: 'Le mot de passe doit faire au moins 6 caractères',
        maxLength: 'Le mot de passe doit faire au plus 255 caractères',
      },
    },
    submitButton: 'Se connecter',
  },
  loginScreen: {
    title: 'React Native Template',
  },
  blogPostScreen: {
    title: 'Article de blog',
    description: 'Article récupéré avec GraphQL',
  },
  profileScreen: {
    title: 'Profil',
    logout: 'Se déconnecter',
  },
  featuresScreen: {
    notificationsPermission: {
      title: 'Demander les permissions de Notification',
      cta: 'Demander',
    },
    blogPost: {
      title: "Example d'appel API",
      cta: 'Naviguer',
    },
  },
};
