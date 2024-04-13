/* eslint-disable @typescript-eslint/no-magic-numbers */

const ONE_SECOND = 1_000;
const MAX_RETRY_DELAY = 30_000;
const FIVE_MINUTES = 1000 * 60 * 5;
const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24;

export const THIRTY_DAYS = 30 * TWENTY_FOUR_HOURS;

export const retryDelay = (attemptIndex: number) =>
  Math.min(ONE_SECOND * 2 ** attemptIndex, MAX_RETRY_DELAY);

export const STALE_TIME = FIVE_MINUTES;
export const GC_TIME = TWENTY_FOUR_HOURS;
