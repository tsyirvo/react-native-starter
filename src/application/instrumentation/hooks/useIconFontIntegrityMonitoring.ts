import { useEffect } from 'react';
import { addFontIntegrityListener } from 'react-native-nano-icons';

import { Logger } from '$infra/logger';

/*
 * Icons render blank when the installed icon font does not match the bundled
 * glyphmap, e.g. after an OTA update that changed the SVG icons.
 */
export const useIconFontIntegrityMonitoring = () => {
  useEffect(
    () =>
      addFontIntegrityListener((issue, status) => {
        if (status === 'found') {
          Logger.error({ error: issue, message: issue.message });
        }
      }),
    [],
  );
};
