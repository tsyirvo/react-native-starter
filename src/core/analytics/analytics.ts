import {
  Identify,
  Revenue,
  setUserId as _setUserId,
  identify,
  init,
  reset,
  revenue,
  setSessionId,
  track,
} from '@amplitude/analytics-react-native';

import { config } from '$core/constants';
import { Logger } from '$core/logger';

import type { AnalyticsType } from './analytics.types';

const ONE = 1;

const identifyObj = new Identify();

class AnalyticsClass {
  /* ***** *****  Setup  ***** ***** */

  async init() {
    try {
      await init(config.amplitudeApiKey, undefined, {
        appVersion: config.version,
      }).promise;

      this.trackEvent('app-start');
      this.incrementUserProperty('session-count', ONE);
    } catch (error) {
      Logger.error({
        error,
        message: 'Failed to initialize Amplitude',
      });
    }
  }

  reset() {
    reset();
  }

  /* ***** *****  User related  ***** ***** */

  setUserId(id: string) {
    _setUserId(id);
  }

  // TODO(prod): Add user properties
  setUser(user: { id: string }) {
    _setUserId(user.id);
    setSessionId(Date.now());

    identify(identifyObj);
  }

  /* ***** *****  Properties  ***** ***** */

  setUserProperty(
    propertyName: AnalyticsType.PropertyNames,
    propertyValue: AnalyticsType.ValidPropertyType,
  ) {
    identifyObj.set(propertyName, propertyValue);

    identify(identifyObj);
  }

  unsetUserProperty(propertyName: AnalyticsType.PropertyNames) {
    identifyObj.unset(propertyName);

    identify(identifyObj);
  }

  incrementUserProperty(
    propertyName: AnalyticsType.PropertyNames,
    incrementCount: number,
  ) {
    identifyObj.add(propertyName, incrementCount);
  }

  /* ***** *****  Revenue  ***** ***** */

  trackRevenue({
    productId,
    price,
    revenueType,
  }: {
    productId: AnalyticsType.ProductIds;
    price: number;
    revenueType: AnalyticsType.RevenueTypes;
  }) {
    const event = new Revenue()
      .setProductId(productId)
      .setPrice(price)
      .setRevenueType(revenueType);

    revenue(event);
  }

  /* ***** *****  Events  ***** ***** */

  trackEvent(
    eventName: AnalyticsType.EventNames,
    properties?: Record<string, unknown>,
  ) {
    track(eventName, properties);
  }
}

export const Analytics = new AnalyticsClass();
