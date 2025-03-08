// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AttributionType {
  export type EventNames =
    // App lifecycle
    | 'app-start'
    | 'app-put-in-background'
    | 'app-put-in-foreground'
    // Attribution
    | 'deep-link-opened'
    // In-app purchase
    | 'in-app-purchase-restored'
    | 'in-app-purchase-failed'
    | 'in-app-purchase-cancelled'
    | 'in-app-purchase-completed';
}
