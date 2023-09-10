import { Mixpanel, MixpanelProperties } from 'mixpanel-react-native';

import { config } from '$core/constants';
import Logger from '$core/logger';
import { errors } from '$core/monitoring/constants';

const shouldTrackAutomaticEvents = true;
const mixpanel = new Mixpanel(config.mixpanelToken, shouldTrackAutomaticEvents);

class AnalyticsClass {
  /* ***** *****  Setup  ***** ***** */

  async init() {
    try {
      await mixpanel.init();
    } catch (error) {
      Logger.error({
        error,
        type: errors.sdk,
        message: 'Failed to initialize Analytics',
      });
    }
  }

  reset() {
    mixpanel.reset();
  }

  /* ***** *****  User related  ***** ***** */

  async setUser(id: string) {
    try {
      await mixpanel.identify(id);
    } catch (error) {
      Logger.error({
        error,
        type: errors.sdk,
        message: 'Failed to set user to mixpanel',
      });
    }
  }

  aliasUser(currentId: string, aliasIs: string) {
    mixpanel.alias(aliasIs, currentId);
  }

  setUserProperty(name: string, value: string) {
    mixpanel.getPeople().set(name, value);
  }

  incrementProperty(name: string, incrementCount: number) {
    mixpanel.getPeople().increment(name, incrementCount);
  }

  chargeUser(amount: number, properties: MixpanelProperties) {
    mixpanel.getPeople().trackCharge(amount, properties);
  }

  /* ***** *****  Properties  ***** ***** */

  setGlobalProperties(properties: MixpanelProperties) {
    mixpanel.registerSuperProperties(properties);
  }

  setPropertiesOnce(properties: MixpanelProperties) {
    mixpanel.registerSuperPropertiesOnce(properties);
  }

  async getProperties() {
    return mixpanel.getSuperProperties();
  }

  removeProperty(propertyName: string) {
    mixpanel.unregisterSuperProperty(propertyName);
  }

  clearProperties() {
    mixpanel.clearSuperProperties();
  }

  /* ***** *****  Events  ***** ***** */

  track(eventName: string, properties?: MixpanelProperties) {
    mixpanel.track(eventName, properties);
  }

  timeEvent(eventName: string) {
    mixpanel.timeEvent(eventName);
  }
}

const Analytics = new AnalyticsClass();

export default Analytics;
