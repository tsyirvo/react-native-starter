import { productTrackingClient } from '$core/productTracking';

import type { AnalyticsType } from './analytics.types';

class AnalyticsClass {
  private _getCurrentUserId() {
    return productTrackingClient.getDistinctId();
  }
  /* ***** *****  User related  ***** ***** */

  // TODO(prod): Add user properties
  setUser(user: { id: string }) {
    productTrackingClient.identify(user.id);
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

  /* ***** *****  Revenue  ***** ***** */

  trackRevenue(revenueData: {
    productId: AnalyticsType.ProductIds;
    price: number;
    revenueType: AnalyticsType.RevenueTypes;
  }) {
    this.trackEvent('purchase', revenueData);
  }

  /* ***** *****  Events  ***** ***** */

  trackEvent(
    eventName: AnalyticsType.EventNames,
    properties?: Record<string, unknown>,
  ) {
    productTrackingClient.capture(eventName, properties);
  }
}

export const Analytics = new AnalyticsClass();
