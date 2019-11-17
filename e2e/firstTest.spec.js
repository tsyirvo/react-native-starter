const { device, expect, element, by } = require('detox');

describe('Home test', () => {
  beforeAll(async () => {
    await device.reloadReactNative();
  });

  it('should have home welcome text', async () => {
    await expect(element(by.id('home_title'))).toBeVisible();
  });

  it('should show the details page after tap', async () => {
    await element(by.id('goto_details')).tap();
    await expect(element(by.id('details_title'))).toBeVisible();
  });

  it('should show home screen after tap', async () => {
    await element(by.id('back_button')).tap();
    await expect(element(by.id('home_title'))).toBeVisible();
  });
});
