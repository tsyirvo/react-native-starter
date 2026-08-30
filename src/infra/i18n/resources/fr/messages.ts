import type { MessagesTypes } from '../en/messages';

export const messages: MessagesTypes = {
  appConfig: {
    changeLocale: {
      failure: "La langue n'a pas pu être changée",
      success: 'La langue a bien été changée',
    },
    networkStateCheck: {
      message:
        "Vérifiez la connexion internet. L'app peut ne pas fonctionner correctement sans connexion internet.",
      title: 'Pas de connexion internet',
    },
    permissions: {
      notAvailable: "Cette permission n'est pas disponible sur cet appareil",
      notGranted: 'Vous avez refusé cette demande de permission',
    },
  },
  appUpdateNedeed: {
    cta: 'Mettre à jour',
    description:
      'Merci de la mettre à jour pour utiliser les dernières fonctionnalités',
    title: 'Votre app est trop vieille',
  },
  common: {
    back: 'Retour',
    cancel: 'Annuler',
    next: 'Suivant',
  },
  errorBoundary: {
    cta: "Relancer l'app",
    description:
      "Une erreur est survenue. Si l'erreur persiste, contacter un administrateur.",
    title: 'Erreur',
  },
  featuresScreen: {
    notificationsPermission: {
      alreadyGranted: 'La permission a déjà été accordée',
      cta: 'Demander',
      success: 'La permission a bien été accordée',
      title: 'Demander les permissions de Notification',
    },
  },
  forms: {
    optional: 'Optionnel',
  },
  homeScreen: {
    formatting: {
      content: 'Le code est vérifié avec ESLint, Prettier et TypeScript',
      title: 'Formatage & type checking',
    },
    motivation: {
      content:
        "Le but de ce starter kit est de fournir une base pour créer des applications React Native. Il n'est pas conçu pour fournir des tonnes de fonctionnalités, composants UI, ou autres librairies, mais d'inclure les outils et librairies que j'utilise dans la plupart des projets sur lesquels je travaille.",
      title: 'Explications',
    },
    storybook: {
      content:
        "Accéder à un Storybook d'exemple exposant les composants les plus utilisés; il suffit de lancer le packager avec 'bun run start:storybook'",
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
    whatIsInside: "Qu'est-ce qui est fourni ?",
  },
  loginForm: {
    emailField: {
      label: 'Email',
      placeholder: 'test@example.com',
      validation: {
        invalid: 'Email invalide',
        required: "L'email est requis",
      },
    },
    passwordField: {
      label: 'Mot de passe',
      placeholder: 'Entrer votre mot de passe',
      validation: {
        maxLength: 'Le mot de passe doit faire au plus 255 caractères',
        minLength: 'Le mot de passe doit faire au moins 6 caractères',
      },
    },
    submitButton: 'Se connecter',
  },
  loginScreen: {
    title: 'React Native Template',
  },
  maintenanceMode: {
    description: 'Elle sera de nouveau fonctionnelle au plus vite',
    title: "L'app est en maintenance",
  },
  newStoreVersionAvailable: {
    cta: 'Mettre à jour maintenant',
    title: 'Une mise à jour est disponible sur les stores',
  },
  profileScreen: {
    logout: 'Se déconnecter',
    title: 'Profil',
  },
  tabs: {
    features: 'Fonctionnalités',
    home: 'Accueil',
    profile: 'Profil',
  },
};
