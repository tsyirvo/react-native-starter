// eslint-disable-next-line @typescript-eslint/no-namespace
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
    | 'deep-link-opened';

  export type ProductIds =
    | 'monthly-subscription'
    | 'monthly-subscription-30-off'
    | 'monthly-subscription-50-off'
    | 'yearly-subscription'
    | 'yearly-subscription-30-off'
    | 'yearly-subscription-50-off';

  export type RevenueTypes = 'purchase';
}
