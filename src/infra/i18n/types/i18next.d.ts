import 'react-i18next';

import type { MessagesTypes } from '../resources/en/messages';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'messages';
    resources: {
      messages: MessagesTypes;
    };
  }
}
