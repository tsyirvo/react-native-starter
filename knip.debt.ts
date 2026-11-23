import type { IssueType } from 'knip';

interface KnipDebt {
  ignoreBinaries: string[];
  ignoreDependencies: string[];
  ignoreIssues: Record<string, IssueType[]>;
}

export const debt: KnipDebt = {
  ignoreBinaries: [],
  ignoreDependencies: ['@legendapp/list', 'expo-store-review', 'expo-system-ui'],
  ignoreIssues: {
    'env.js': ['exports'],
    'src/features/storeRating/hooks/index.ts': ['files'],
    'src/features/storeRating/hooks/useAppStoreReview.ts': ['files'],
    'src/features/storeRating/index.ts': ['files'],
    'src/infra/api/hooks/useRefreshOnFocus.ts': ['exports'],
    'src/infra/date/date.ts': ['exports'],
    'src/infra/date/date.types.ts': ['exports'],
    'src/infra/date/hooks/index.ts': ['files'],
    'src/infra/date/hooks/useDates.ts': ['files'],
    'src/infra/date/index.ts': ['types'],
    'src/infra/featureFlags/featureFlags.ts': ['files'],
    'src/infra/featureFlags/hooks/index.ts': ['exports'],
    'src/infra/featureFlags/hooks/useGetFeatureFlag.ts': ['exports'],
    'src/infra/featureFlags/hooks/useGetRemoteConfig.ts': ['exports'],
    'src/infra/haptics/haptics.ts': ['exports', 'types'],
    'src/infra/i18n/i18n.ts': ['exports'],
    'src/infra/i18n/utils/getCurrentLocale.ts': ['files'],
    'src/infra/i18n/utils/languageDetector.ts': ['exports'],
    'src/infra/i18n/utils/languageSwitcher.ts': ['exports'],
    'src/infra/logger/logger.types.ts': ['types'],
    'src/infra/monitoring/performanceMonitoring.ts': ['exports'],
    'src/infra/purchase/index.ts': ['types'],
    'src/infra/purchase/purchase.types.ts': ['types'],
    'src/infra/store/app/index.ts': ['types'],
    'src/shared/a11y/index.ts': ['exports', 'types'],
    'src/shared/components/navigation/components/HeaderBackground.tsx': ['exports'],
    'src/shared/components/navigation/components/HeaderLeft.tsx': ['exports'],
    'src/shared/hooks/useKeyboard.ts': ['exports'],
    'src/shared/hooks/usePreviousState.ts': ['exports'],
    'src/shared/hooks/useWhyDidYouUpdate.ts': ['exports'],
    'src/shared/icons/drawables/index.ts': ['types'],
    'src/shared/theme/types.ts': ['types'],
    'src/shared/uiKit/constants/dimensions.ts': ['exports'],
    'src/shared/uiKit/image/preloadImages.ts': ['exports'],
    'src/shared/uiKit/primitives/types/primitiveLayout.types.ts': ['types'],
  },
};
