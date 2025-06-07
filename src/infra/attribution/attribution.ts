import type { InAppPurchase } from 'react-native-appsflyer';
import appsFlyer from 'react-native-appsflyer';

import { config } from '$domain/constants';
import { Analytics } from '$infra/analytics';
import { Logger } from '$infra/logger';

import type { AttributionType } from './attribution.types';

class AttributionClass {
  /* ***** *****  Setup  ***** ***** */

  async init() {
    if (config.isDebug) return;

    try {
      this.listenForDeepLink();
      this.handleInstallAttribution();

      await appsFlyer.initSdk({
        devKey: config.appsflyerDevKey,
        isDebug: config.isDebug,
        appId: config.appsflyerAppId,
        onDeepLinkListener: true,
      });
    } catch (error) {
      Logger.error({
        error,
        message: 'Failed to initialize AppsFlyer',
      });
    }
  }

  /* ***** *****  Deep linking  ***** ***** */

  // Must be called before initSdk
  listenForDeepLink() {
    appsFlyer.onDeepLink((res) => {
      if (res.deepLinkStatus !== 'NOT_FOUND') {
        const DLValue = res.data.deep_link_value;
        const mediaSrc = res.data.media_source;
        const deepLinkSub1 = res.data.deep_link_sub1 ?? 'unknown';

        Analytics.trackEvent('deep-link-opened', {
          DLValue,
          mediaSrc,
          deepLinkSub1,
        });

        // TODO(prod): Handle deep links

        Logger.dev(JSON.stringify(res.data, null, 2));
      }
    });
  }

  /* ***** *****  Attribution  ***** ***** */

  // Must be called before initSdk
  handleInstallAttribution() {
    appsFlyer.onInstallConversionData((res) => {
      if (JSON.parse(res.data.is_first_launch) === true) {
        if (res.data.af_status === 'Non-organic') {
          const mediaSource = res.data.media_source;
          const campaign = res.data.campaign;

          Analytics.trackEvent('non-organic-install', {
            campaign,
            mediaSource,
          });
        } else {
          Analytics.trackEvent('organic-install');
        }
      } else {
        Logger.dev('Not the first app launch');
      }
    });
  }

  /* ***** *****  Invites  ***** ***** */

  setInviteId(inviteId: string) {
    appsFlyer.setAppInviteOneLinkID(inviteId);
  }

  getInviteLink(): string | null {
    let inviteLink: string | null = null;

    appsFlyer.generateInviteLink(
      {
        channel: 'reddit',
        campaign: 'myCampaignName',
        customerID: '1234',
        userParams: {
          deep_link_value: 'value',
          deep_link_sub1: 'sub1',
          custom_param: 'custom',
          brandDomain: 'rnstarter.com',
        },
      },
      (link) => {
        inviteLink = link as string;
      },
      (error) => {
        Logger.error({
          error,
          message: 'Failed to get invite link from AppsFlyer',
        });
      },
    );

    return inviteLink;
  }

  /* ***** *****  Events  ***** ***** */

  async trackEvent({
    eventName,
    properties,
  }: {
    eventName: AttributionType.EventNames;
    properties: Record<string, unknown>;
  }) {
    await appsFlyer.logEvent(eventName, properties);
  }

  /* ***** *****  Revenue  ***** ***** */

  async trackRevenue(purchaseInfo: InAppPurchase) {
    await appsFlyer.validateAndLogInAppPurchase(
      purchaseInfo,
      () => {
        Logger.dev('AppsFlyer tracked revenue');
      },
      (error) => {
        Logger.error({
          error,
          message: 'AppsFlyer failed to track revenue',
        });
      },
    );
  }
}

export const Attribution = new AttributionClass();
