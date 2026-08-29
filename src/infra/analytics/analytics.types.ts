// biome-ignore lint/style/noNamespace: deliberate type grouping for analytics events
export namespace AnalyticsType {
  export type ValidPropertyType =
    | number
    | string
    | boolean
    | (string | number)[]
    | {
        [key: string]: ValidPropertyType;
      };

  export type PropertyNames = 'session-count' | 'language';

  export type EventNames =
    // App lifecycle
    | 'app-start'
    | 'app-put-in-background'
    | 'app-put-in-foreground'
    // Navigation
    | 'XXX-screen-viewed'
    // Attribution
    | 'organic-install'
    | 'non-organic-install'
    | 'deep-link-opened'
    | 'purchase';

  export type JsonType =
    | string
    | number
    | boolean
    | null
    | {
        [key: string]: JsonType;
      }
    | JsonType[];
}
