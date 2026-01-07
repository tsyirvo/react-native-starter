import { useMemo, useState } from 'react';
import { PurchasesOffering } from 'react-native-purchases';

import { hasActiveEntitlements } from '$domain/subscription';
import { OfferingFlagType, useGetRemoteConfigSync } from '$infra/featureFlags';
import { Logger } from '$infra/logger';
import { Purchase } from '$infra/purchase';
import { useRunOnMount } from '$shared/hooks';

import SubscriptionContext from './SubscriptionContext';

interface SubscriptionContextProviderProps {
  children: React.ReactNode;
}

export const SubscriptionContextProvider = ({
  children,
}: SubscriptionContextProviderProps) => {
  const [isPayingUser, setIsPayingUser] = useState<boolean | null>(null);
  const [offeringToDisplay, setOfferingToDisplay] =
    useState<PurchasesOffering | null>(null);

  const { getFlagPayloadSync } = useGetRemoteConfigSync();

  useRunOnMount(() => {
    const fetchIsPayingUser = async () => {
      try {
        const isPayingUser = await Purchase.isPayingUser();

        setIsPayingUser(isPayingUser);
      } catch (error) {
        Logger.error({
          error,
          level: 'warning',
          message: 'Failed to fetch user subscription status',
        });

        setIsPayingUser(false);
      }
    };

    void fetchIsPayingUser();
  });

  useRunOnMount(() => {
    return Purchase.customerListener((customerInfo) => {
      setIsPayingUser(hasActiveEntitlements(customerInfo));
    });
  });

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

  const value = useMemo(
    () => ({
      isPayingUser,
      offeringToDisplay,
    }),
    [isPayingUser, offeringToDisplay],
  );

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
