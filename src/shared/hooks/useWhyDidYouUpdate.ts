import isEqual from 'lodash/isEqual';
import { useEffect, useRef } from 'react';

type Props = {
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
};

type ChangeObj = Record<
  string,
  {
    from: unknown;
    to: unknown;
    isDeepEqual: boolean;
    changedKeys?: string[];
  }
>;

export const useWhyDidYouUpdate = (
  name: string,
  props: Record<string, unknown>,
  { onChangeFound, onNoChangeFound }: Props = {},
) => {
  const latestProps = useRef(props);

  useEffect(() => {
    if (!__DEV__) return;

    const allKeys = Object.keys({ ...latestProps.current, ...props });

    const changesObj: ChangeObj = {};

    allKeys.forEach((key) => {
      if (latestProps.current[key] !== props[key]) {
        changesObj[key] = {
          from: latestProps.current[key],
          to: props[key],
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
          isDeepEqual: isEqual(latestProps.current[key], props[key]),
        };
      }
    });

    if (Object.keys(changesObj).length) {
      if (onChangeFound) {
        onChangeFound({ changesObj });
      } else {
        console.log('[why-did-you-update]', name, {
          props: { from: latestProps.current, to: props },
        });
      }
    } else if (onNoChangeFound) {
      onNoChangeFound();
    }

    latestProps.current = props;
  });
};
