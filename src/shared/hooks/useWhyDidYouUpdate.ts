import isEqual from 'lodash.isequal';
import { useEffect, useRef } from 'react';

import { Logger } from '$infra/logger';

interface Props {
  onChangeFound?: (data: {
    changesObj: Record<
      string,
      {
        from: unknown;
        to: unknown;
        isDeepEqual: boolean;
        changedKeys?: string[];
      }
    >;
  }) => void;
  onNoChangeFound?: () => void;
}

type ChangeObj = Record<
  string,
  {
    from: unknown;
    to: unknown;
    isDeepEqual: boolean;
    changedKeys?: string[];
  }
>;

const NO_OBJECTS = 0;

export const useWhyDidYouUpdate = (
  name: string,
  props: Record<string, unknown>,
  { onChangeFound, onNoChangeFound }: Props = {},
) => {
  const latestProps = useRef(props);

  useEffect(() => {
    if (!__DEV__) {
      return;
    }

    const allKeys = Object.keys({ ...latestProps.current, ...props });

    const changesObj: ChangeObj = {};

    for (const key of allKeys) {
      if (latestProps.current[key] !== props[key]) {
        changesObj[key] = {
          changedKeys:
            props[key] && typeof props[key] === 'object'
              ? // @ts-expect-error: can't properly type this
                Object.keys(latestProps.current[key])
                  .map((k) =>
                    // @ts-expect-error: can't properly type this
                    latestProps.current[key][k] === props[key][k] ? '' : k,
                  )
                  .filter(Boolean)
              : undefined,
          from: latestProps.current[key],
          isDeepEqual: isEqual(latestProps.current[key], props[key]),
          to: props[key],
        };
      }
    }

    if (Object.keys(changesObj).length > NO_OBJECTS) {
      if (onChangeFound) {
        onChangeFound({ changesObj });
      } else {
        Logger.dev('[why-did-you-update]', name, {
          props: { from: latestProps.current, to: props },
        });
      }
    } else if (onNoChangeFound) {
      onNoChangeFound();
    }

    latestProps.current = props;
  });
};
