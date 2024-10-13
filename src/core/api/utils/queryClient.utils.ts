/* eslint-disable @typescript-eslint/no-magic-numbers */

const ONE_SECOND = 1_000;
const ONE_MINUTE = ONE_SECOND * 60;
const MAX_RETRY_DELAY = 30 * ONE_SECOND;
const FIVE_MINUTES = 5 * ONE_MINUTE;
const TWENTY_FOUR_HOURS = ONE_MINUTE * 60 * 24;

export const THIRTY_DAYS = 30 * TWENTY_FOUR_HOURS;

export const retryDelay = (attemptIndex: number) =>
  Math.min(ONE_SECOND * 2 ** attemptIndex, MAX_RETRY_DELAY);

export const STALE_TIME = FIVE_MINUTES;
export const GC_TIME = TWENTY_FOUR_HOURS;
