import { isAndroidTest, packagerUrl, START_DELAY } from './constants';

export const sleep = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const startApp = async (config?: Detox.DeviceLaunchAppConfig) => {
  await device.launchApp({
    newInstance: true,
    url: isAndroidTest && packagerUrl,
    ...config,
  });

  await sleep(START_DELAY);
};
