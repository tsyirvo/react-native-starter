import { useNavigationContainerRef } from 'expo-router';

import { routingInstrumentation } from '$infra/monitoring';
import { renderHook } from '$testing';

import { useRoutingInstrumentation } from '../useRoutingInstrumentation';

jest.mock('expo-router', () => ({ useNavigationContainerRef: jest.fn() }));
jest.mock('$infra/monitoring', () => ({
  routingInstrumentation: { registerNavigationContainer: jest.fn() },
}));

describe('useRoutingInstrumentation', () => {
  it('registers the navigation container once on mount', () => {
    const navigationRef = { current: null } as unknown as ReturnType<
      typeof useNavigationContainerRef
    >;
    jest.mocked(useNavigationContainerRef).mockReturnValue(navigationRef);

    const { rerender } = renderHook(useRoutingInstrumentation);
    rerender({});

    expect(
      routingInstrumentation.registerNavigationContainer,
    ).toHaveBeenCalledTimes(1);
    expect(
      routingInstrumentation.registerNavigationContainer,
    ).toHaveBeenCalledWith(navigationRef);
  });
});
