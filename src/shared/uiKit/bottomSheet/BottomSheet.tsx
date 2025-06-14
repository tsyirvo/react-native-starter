import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { forwardRef } from 'react';
import { SharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DEVICE_HEIGHT } from '$domain/constants';
import { makeAppStyles, useAppTheme } from '$domain/theme';

import { Box } from '../primitives';

import { AnimatedBottomSheetBackdrop } from './components';

interface BottomSheetProps {
  children: React.ReactNode;
  modalKey?: string;
  snapPoints?: (string | number)[] | SharedValue<(string | number)[]>;
  disableHorizontalPadding?: boolean;
  disableTopPadding?: boolean;
  isScrollable?: boolean;
  onDismiss?: () => void;
  onChange?: (index: number) => void;
  renderBackdrop?: (props: BottomSheetBackdropProps) => React.ReactNode;
}

export const BottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  (
    {
      children,
      modalKey,
      snapPoints,
      disableHorizontalPadding = false,
      disableTopPadding = false,
      isScrollable = true,
      onDismiss,
      onChange,
      renderBackdrop = renderDefaultBackdrop,
    },
    ref,
  ) => {
    const { bottom: bottomInset, top: topInset } = useSafeAreaInsets();

    const { spacing } = useAppTheme();
    const styles = useStyles();

    const snapPointsToUse = snapPoints ?? [
      DEVICE_HEIGHT - topInset - spacing.spacing_32,
    ];

    return (
      <BottomSheetModal
        ref={ref}
        name={modalKey}
        snapPoints={snapPointsToUse}
        backgroundStyle={styles.modalStyle}
        handleIndicatorStyle={styles.handleStyle}
        backdropComponent={renderBackdrop}
        onDismiss={onDismiss}
        onChange={onChange}
      >
        {isScrollable ? (
          <BottomSheetScrollView style={styles.scrollViewStyle}>
            <Box
              flex={1}
              px={disableHorizontalPadding ? undefined : 'spacing_16'}
              pt={disableTopPadding ? undefined : 'spacing_24'}
            >
              {children}
            </Box>
          </BottomSheetScrollView>
        ) : (
          <Box
            flex={1}
            px={disableHorizontalPadding ? undefined : 'spacing_16'}
            pt={disableTopPadding ? undefined : 'spacing_24'}
            style={{ marginBottom: bottomInset }}
          >
            {children}
          </Box>
        )}
      </BottomSheetModal>
    );
  },
);

const renderDefaultBackdrop = ({
  animatedIndex,
  animatedPosition,
}: BottomSheetBackdropProps) => (
  <AnimatedBottomSheetBackdrop
    animatedIndex={animatedIndex}
    animatedPosition={animatedPosition}
  />
);

const useStyles = makeAppStyles(({ colors, spacing }) => ({
  modalStyle: {
    backgroundColor: colors.bg_base,
  },
  handleStyle: {
    backgroundColor: colors.border_default,
    width: 50,
  },
  scrollViewStyle: {
    marginBottom: spacing.spacing_24,
  },
}));
