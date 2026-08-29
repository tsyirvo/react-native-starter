export const DateFormats = {
  /** Sunday (US) | dimanche (FR) */
  DAY: 'dddd',
  /** January 11, 2026 (US) | 11 janvier 2026 (FR) */
  LONG_DATE: 'LL',
  /** January 11, 2026 3:30 PM (US) | 11 janvier 2026 15:30 (FR) */
  LONG_DATE_WITH_TIME: 'LLL',
  /** Jan 11, 2026 (US) | 11 janv. 2026 (FR) */
  MEDIUM_DATE: 'll',
  /** January (US) | janvier (FR) */
  MONTH: 'MMMM',
  /** January 2026 (US) | janvier 2026 (FR) */
  MONTH_YEAR: 'MMMM YYYY',
  /** 01/11/2026 (US) | 11/01/2026 (FR) */
  SHORT_DATE: 'L',
  /** 1/11/26 - 3:30 PM (US) | 11/1/26 - 15:30 (FR) */
  SHORT_DATE_WITH_TIME: 'l - LT',
  /** 3:30 PM (US) | 15:30 (FR) */
  TIME: 'LT',
} as const;

export type DateFormat = (typeof DateFormats)[keyof typeof DateFormats];
