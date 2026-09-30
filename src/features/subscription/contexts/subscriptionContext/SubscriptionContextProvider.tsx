import { useCallback, useEffect, useMemo, useState } from 'react';
import type { PurchasesOffering } from 'react-native-purchases';

import { useAuthContext } from '$application/auth';
import type { User } from '$domain/entities';
import { hasActiveEntitlements } from '$domain/subscription';
import {
  type OfferingFlagType,
  useGetRemoteConfigSync,
} from '$infra/featureFlags';
import { Logger } from '$infra/logger';
import { Purchase } from '$infra/purchase';
import { useRunOnMount } from '$shared/hooks';

import SubscriptionContext from './SubscriptionContext';

interface SubscriptionStatus {
  isPayingUser: boolean;
  user: User;
}

interface SubscriptionContextProviderProps {
  children: React.ReactNode;
}

export const SubscriptionContextProvider = ({
  children,
}: SubscriptionContextProviderProps) => {
  const [subscriptionStatus, setSubscriptionStatus] =
    useState<SubscriptionStatus | null>(null);
  const [offeringToDisplay, setOfferingToDisplay] =
    useState<PurchasesOffering | null>(null);

  const { user, isPurchaseUserReady } = useAuthContext();

  const { getFlagPayloadSync } = useGetRemoteConfigSync();

  useEffect(() => {
    if (!(user && isPurchaseUserReady)) {
      return;
    }

    let isActive = true;
    const unsubscribe = Purchase.customerListener((customerInfo) => {
      if (isActive) {
        setSubscriptionStatus({
          isPayingUser: hasActiveEntitlements(customerInfo.entitlements.active),
          user,
        });
      }
    });

    const fetchIsPayingUser = async () => {
      try {
        const userIsPaying = await Purchase.isPayingUser();

        if (isActive) {
          setSubscriptionStatus({ isPayingUser: userIsPaying, user });
        }
      } catch (error) {
        Logger.error({
          error,
          level: 'warning',
          message: 'Failed to fetch user subscription status',
        });

        if (isActive) {
          setSubscriptionStatus({ isPayingUser: false, user });
        }
      }
    };

    void fetchIsPayingUser();

    return () => {
      isActive = false;
      unsubscribe();
    };
  }, [user, isPurchaseUserReady]);

  useRunOnMount(() => {
    const fetchOfferingToDisplay = async () => {
      try {
        const offering = await Purchase.getOfferings();
        const payload = getFlagPayloadSync<OfferingFlagType>(
          'offering-to-display',
        );

        if (payload?.type === 'offering' && payload.offering) {
          const remotelySelectedOffering = offering.all[payload.offering];

          if (remotelySelectedOffering) {
            setOfferingToDisplay(remotelySelectedOffering);
          } else {
            setOfferingToDisplay(offering.current);
          }
        } else {
          setOfferingToDisplay(offering.current);
        }
      } catch (error) {
        Logger.error({
          error,
          level: 'warning',
          message: 'Failed to fetch offering to display',
        });

        setOfferingToDisplay(null);
      }
    };

    void fetchOfferingToDisplay();
  });

  const handleSetIsPayingUser = useCallback(
    (newIsPayingUser: boolean) => {
      if (user && isPurchaseUserReady) {
        setSubscriptionStatus({ isPayingUser: newIsPayingUser, user });
      }
    },
    [user, isPurchaseUserReady],
  );

  let isPayingUser: boolean | null = null;

  if (!user) {
    isPayingUser = false;
  } else if (isPurchaseUserReady && subscriptionStatus?.user === user) {
    ({ isPayingUser } = subscriptionStatus);
  }

  const value = useMemo(
    () => ({
      handleSetIsPayingUser,
      isPayingUser,
      offeringToDisplay,
    }),
    [isPayingUser, offeringToDisplay, handleSetIsPayingUser],
  );

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
