import type { User } from '$domain/entities';
import { productTrackingClient } from '$infra/productTracking';

import type { AnalyticsType } from './analytics.types';

class AnalyticsClass {
  private _getCurrentUserId() {
    return productTrackingClient.getDistinctId();
  }
  /* ***** *****  User related  ***** ***** */

  setUser(user: User) {
    productTrackingClient.identify(user.id, {
      email: user.email,
    });
  }

  reset() {
    productTrackingClient.reset();
  }

  /* ***** *****  Properties  ***** ***** */

  setUserProperty(
    propertyName: AnalyticsType.PropertyNames,
    propertyValue: AnalyticsType.ValidPropertyType,
  ) {
    const userId = this._getCurrentUserId();

    productTrackingClient.identify(userId, {
      [propertyName]: propertyValue,
    });
  }

  unsetUserProperty(propertyName: AnalyticsType.PropertyNames) {
    const userId = this._getCurrentUserId();

    productTrackingClient.identify(userId, {
      [propertyName]: null,
    });
  }

  /* ***** *****  Events  ***** ***** */

  trackEvent(
    eventName: AnalyticsType.EventNames,
    properties?: Record<string, AnalyticsType.JsonType>,
  ) {
    productTrackingClient.capture(eventName, properties);
  }
}

export const Analytics = new AnalyticsClass();
