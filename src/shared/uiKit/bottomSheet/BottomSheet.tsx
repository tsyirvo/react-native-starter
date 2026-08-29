import {
  type BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import type { RefObject } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { DEVICE_HEIGHT } from '$domain/constants';

import { Box } from '../primitives';

import { AnimatedBottomSheetBackdrop } from './components';

interface BottomSheetProps {
  children: React.ReactNode;
  disableHorizontalPadding?: boolean;
  disableTopPadding?: boolean;
  isScrollable?: boolean;
  modalKey?: string;
  onChange?: (index: number) => void;
  onDismiss?: () => void;
  ref?: RefObject<BottomSheetModal | null>;
  renderBackdrop?: (props: BottomSheetBackdropProps) => React.ReactNode;
  snapPoints?: (string | number)[] | SharedValue<(string | number)[]>;
}

export const BottomSheet = ({
  ref,
  children,
  modalKey,
  snapPoints,
  disableHorizontalPadding = false,
  disableTopPadding = false,
  isScrollable = true,
  onDismiss,
  onChange,
  renderBackdrop = renderDefaultBackdrop,
}: BottomSheetProps) => {
  const { top: topInset } = useSafeAreaInsets();

  const { theme } = useUnistyles();

  const snapPointsToUse = snapPoints ?? [
    DEVICE_HEIGHT - topInset - theme.spacing.spacing_32,
  ];

  return (
    <BottomSheetModal
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.modalStyle}
      handleIndicatorStyle={styles.handleStyle}
      name={modalKey}
      onChange={onChange}
      onDismiss={onDismiss}
      ref={ref}
      snapPoints={snapPointsToUse}
    >
      {isScrollable ? (
        <BottomSheetScrollView style={styles.bottomSheetWrapper}>
          <Box
            pt={disableTopPadding ? undefined : 'spacing_24'}
            px={disableHorizontalPadding ? undefined : 'spacing_16'}
          >
            {children}
          </Box>
        </BottomSheetScrollView>
      ) : (
        <BottomSheetView style={styles.bottomSheetWrapper}>
          <Box
            pt={disableTopPadding ? undefined : 'spacing_24'}
            px={disableHorizontalPadding ? undefined : 'spacing_16'}
            style={styles.viewWrapper}
          >
            {children}
          </Box>
        </BottomSheetView>
      )}
    </BottomSheetModal>
  );
};

const renderDefaultBackdrop = ({
  animatedIndex,
  animatedPosition,
}: BottomSheetBackdropProps) => (
  <AnimatedBottomSheetBackdrop
    animatedIndex={animatedIndex}
    animatedPosition={animatedPosition}
  />
);

const styles = StyleSheet.create((theme, rt) => ({
  bottomSheetWrapper: {
    marginBottom: theme.spacing.spacing_24,
  },
  handleStyle: {
    backgroundColor: theme.colors.border_default,
    width: 50,
  },
  modalStyle: {
    backgroundColor: theme.colors.bg_base,
  },
  viewWrapper: {
    marginBottom: rt.insets.bottom,
  },
}));
