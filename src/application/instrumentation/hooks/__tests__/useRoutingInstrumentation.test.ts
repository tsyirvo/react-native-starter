import { useNavigationContainerRef } from 'expo-router';

import { routingInstrumentation } from '$infra/monitoring';
import { renderHook } from '$testing';

import { useRoutingInstrumentation } from '../useRoutingInstrumentation';

jest.mock('expo-router', () => ({ useNavigationContainerRef: jest.fn() }));
jest.mock('$infra/monitoring', () => ({
  routingInstrumentation: { registerNavigationContainer: jest.fn() },
}));

describe('useRoutingInstrumentation', () => {
  it('registers the navigation container once on mount', async () => {
    const navigationRef = { current: null } as unknown as ReturnType<
      typeof useNavigationContainerRef
    >;
    jest.mocked(useNavigationContainerRef).mockReturnValue(navigationRef);

    const { rerender } = await renderHook(useRoutingInstrumentation);
    await rerender({});

    expect(
      routingInstrumentation.registerNavigationContainer,
    ).toHaveBeenCalledTimes(1);
    expect(
      routingInstrumentation.registerNavigationContainer,
    ).toHaveBeenCalledWith(navigationRef);
  });
});
