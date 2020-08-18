import { device, expect, element, by } from 'detox';

describe('Basic test', () => {
  beforeAll(async () => {
    await device.reloadReactNative();
  });

  it('should have home welcome text', async () => {
    await expect(element(by.id('home_title'))).toBeVisible();
  });

  it('should show the other page after tap', async () => {
    await element(by.id('goto_otherPage')).tap();
    await expect(element(by.id('otherPage_title'))).toBeVisible();
  });

  it('should show home screen after tap', async () => {
    await element(by.id('back_button')).tap();
    await expect(element(by.id('home_title'))).toBeVisible();
  });
});
