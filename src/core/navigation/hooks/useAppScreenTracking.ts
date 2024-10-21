import { useGlobalSearchParams, usePathname } from 'expo-router';
import { useEffect } from 'react';

import { Analytics } from '$core/analytics';

import { convertStringToKebabCase } from '../utils/navigation.utils';

export const useAppScreenTracking = () => {
  const pathname = usePathname();
  const params = useGlobalSearchParams();

  useEffect(() => {
    if (pathname === '/') {
      Analytics.trackEvent(`home-screen-viewed` as 'XXX-screen-viewed');
    } else if (pathname.includes('/blogPost')) {
      Analytics.trackEvent(`blog-post-screen-viewed` as 'XXX-screen-viewed');
      // Add other specific tracking key for screens that need it
    } else {
      const pathNameWithoutSlash = pathname
        .replace('/', '')
        .replaceAll('/', '-');

      Analytics.trackEvent(
        `${convertStringToKebabCase(pathNameWithoutSlash)}-screen-viewed` as 'XXX-screen-viewed',
      );
    }
  }, [pathname, params]);
};
