import {
  init,
  reset,
  setUserId as _setUserId,
  setSessionId,
  Identify,
  identify,
  track,
  revenue,
  Revenue,
} from '@amplitude/analytics-react-native';

import { config } from '$core/constants';
import { Logger } from '$core/logger';

import type {
  AnalyticsValidPropertyType,
  SupportedEventNames,
  SupportedProductIds,
  SupportedPropertyNames,
  SupportedRevenueTypes,
} from './types/analytics.types';

const identifyObj = new Identify();

class AnalyticsClass {
  /* ***** *****  Setup  ***** ***** */

  async init() {
    try {
      await init(config.amplitudeApiKey, undefined, {
        appVersion: config.version,
        serverZone: 'EU',
      }).promise;

      this.trackEvent('app-start');
      this.incrementUserProperty('session-count', 1);
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
    propertyName: SupportedPropertyNames,
    propertyValue: AnalyticsValidPropertyType,
  ) {
    identifyObj.set(propertyName, propertyValue);

    identify(identifyObj);
  }

  unsetUserProperty(propertyName: SupportedPropertyNames) {
    identifyObj.unset(propertyName);

    identify(identifyObj);
  }

  incrementUserProperty(
    propertyName: SupportedPropertyNames,
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
    productId: SupportedProductIds;
    price: number;
    revenueType: SupportedRevenueTypes;
  }) {
    const event = new Revenue()
      .setProductId(productId)
      .setPrice(price)
      .setRevenueType(revenueType);

    revenue(event);
  }

  /* ***** *****  Events  ***** ***** */

  trackEvent(
    eventName: SupportedEventNames,
    properties?: Record<string, unknown>,
  ) {
    track(eventName, properties);
  }
}

export const Analytics = new AnalyticsClass();
