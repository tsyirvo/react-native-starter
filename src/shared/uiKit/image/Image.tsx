import type { ImageProps as ExpoImageProps } from 'expo-image';
import { Image as ExpoImage } from 'expo-image';

type ImageProps = Omit<ExpoImageProps, 'accessibilityLabel' | 'alt'> &
  (
    | { accessibilityLabel: string; isDecorative?: never }
    | { accessibilityLabel?: never; isDecorative: true }
  );

export const Image = ({
  accessibilityLabel,
  isDecorative,
  ...props
}: ImageProps) => (
  <ExpoImage
    accessibilityLabel={accessibilityLabel}
    accessibilityRole={isDecorative ? undefined : 'image'}
    accessible={!isDecorative}
    {...props}
  />
);
