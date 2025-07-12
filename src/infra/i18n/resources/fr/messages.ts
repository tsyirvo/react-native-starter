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
    whatIsInside: "Qu'est-ce qui est fourni ?",
    motivation: {
      content:
        "Le but de ce starter kit est de fournir une base pour créer des applications React Native. Il n'est pas conçu pour fournir des tonnes de fonctionnalités, composants UI, ou autres librairies, mais d'inclure les outils et librairies que j'utilise dans la plupart des projets sur lesquels je travaille.",
      title: 'Explications',
    },
    formatting: {
      content: 'Le code est vérifié avec ESLint, Prettier et TypeScript',
      title: 'Formatage & type checking',
    },
    storybook: {
      content:
        "Accéder à un Storybook d'exemple exposant les composants les plus utilisés; il suffit de lancer le packager avec 'yarn start:storybook'",
      title: 'Storybook',
    },
    tests: {
      content:
        "Une stack de test est mise en place avec des tests unitaires, des tests d'intégration et des tests E2E avec Jest, React Native Testing Library et Maestro",
      title: 'Tests',
    },
    tools: {
      content:
        "L'app est déjà configurée avec certains outils comme: des analytics, du crash reporting, du tracking d'erreurs, les achats in-app, les notifications, des feature flags, etc.\nIl y a aussi des utilitaires préconfigurés comme: formatage des dates, i18n, une logique de notation sur l'appstore, la validation des formulaires, la gestion du clavier, etc.",
      title: 'Outils',
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
      success: 'La permission a bien été accordée',
      alreadyGranted: 'La permission a déjà été accordée',
    },
    blogPost: {
      title: "Exemple d'appel API GraphQL",
      cta: 'Naviguer',
    },
  },
};
