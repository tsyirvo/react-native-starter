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
    screenTitleShowcase: {
      cta: 'Ouvrir la démo',
      description:
        'Voir le composant ScreenTitle en action avec un grand titre qui se replie et un bouton de toolbar natif.',
      title: 'Titre de page natif',
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
  screenTitleShowcaseScreen: {
    alert: {
      description:
        'Cette alerte a été déclenchée par le bouton de toolbar affiché dans le header natif.',
      title: 'Bouton de toolbar pressé',
    },
    sections: {
      largeTitle: {
        content:
          'Le titre s\'affiche en grand sous le header puis se replie dans la barre de navigation au scroll, comme dans les apps natives. Il suffit que la ScrollView ait "contentInsetAdjustmentBehavior" à "automatic" pour que le système gère la transition.',
        title: 'Grand titre repliable',
      },
      nativeFeel: {
        content:
          "Tout est rendu par le header natif : aucune vue custom n'est dessinée par dessus l'écran, donc le flou, le matériau Liquid Glass sur iOS 26 et le geste de retour continuent de fonctionner.",
        title: 'Header 100% natif',
      },
      scrollForMore: {
        content:
          'Continuez à scroller pour voir le grand titre se replier, puis remontez pour le voir se déployer à nouveau. Le bouton de toolbar reste accessible en permanence.',
        title: 'À essayer',
      },
      toolbar: {
        content:
          "La prop toolbar accepte une liste d'items, chacun rendu comme un bouton natif du header. Sur iOS un SF Symbol peut servir d'icône, tandis qu'Android retombe sur le label. Appuyez sur le bouton en haut à droite pour déclencher une alerte.",
        title: 'Boutons de toolbar natifs',
      },
    },
    title: 'Titre de page',
    toolbarButton: 'À propos',
  },
  tabs: {
    features: 'Fonctionnalités',
    home: 'Accueil',
    profile: 'Profil',
  },
};
