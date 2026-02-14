import { useCallback, useEffect, useMemo, useState } from 'react';
import { PurchasesOffering } from 'react-native-purchases';

import { hasActiveEntitlements } from '$domain/subscription';
import { OfferingFlagType, useGetRemoteConfigSync } from '$infra/featureFlags';
import { Logger } from '$infra/logger';
import { Purchase } from '$infra/purchase';
import { useRunOnMount } from '$shared/hooks';

import { useAuthContext } from '../authContext';

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

  const { user } = useAuthContext();

  const { getFlagPayloadSync } = useGetRemoteConfigSync();

  useEffect(() => {
    const fetchIsPayingUser = async () => {
      if (!user) {
        setIsPayingUser(false);

        return;
      }

      try {
        await Purchase.setUser(user);
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
  }, [user]);

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

  const handleSetIsPayingUser = useCallback((value: boolean) => {
    setIsPayingUser(value);
  }, []);

  const value = useMemo(
    () => ({
      isPayingUser,
      offeringToDisplay,
      handleSetIsPayingUser,
    }),
    [isPayingUser, offeringToDisplay, handleSetIsPayingUser],
  );

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
