export const hasActiveEntitlements = (
  activeEntitlements: Record<string, unknown>,
): boolean => Object.keys(activeEntitlements).length > 0;
