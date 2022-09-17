export enum DateFormats {
  /** 8:02 PM */
  TIME = 'LT',
  /** 08/16/2018 */
  SHORT_DATE = 'L',
  /** Aug 16, 2018 */
  MEDIUM_DATE = 'll',
  /** August 16, 2018 */
  LONG_DATE = 'LL',
  /** August 16, 2018 8:02 PM */
  LONG_DATE_WITH_TIME = 'LLL',
  /** Sunday-Saturday */
  DAY = 'dddd',
  /** January-December */
  MONTH = 'MMMM',
  /** 16 Aout 2018 */
  DATE_FR = 'DD MMMM YYYY',
  /** August 16, 2018 */
  DATE_EN = 'MMM Do, YYYY',
  /** August 2018 */
  DATE_WITHOUT_DAY = 'MMMM YYYY',
}
