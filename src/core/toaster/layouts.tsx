/* eslint-disable react/jsx-props-no-spreading */

import { StyleSheet } from 'react-native';
import type { BaseToastProps } from 'react-native-toast-message';
import { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';

import { colors, textVariants, spacing } from '$core/theme';

const styles = StyleSheet.create({
  // Global styles
  wrapper: {
    height: 'auto',
    width: '90%',
    paddingVertical: spacing.global_8,
  },
  container: {
    paddingHorizontal: spacing.global_16,
  },
  text1: {
    ...textVariants.medium,
    fontWeight: '600',
  },
  text2: {
    ...textVariants.regular,
  },
  // Scoped styles
  success: {
    borderLeftColor: colors.green,
  },
  error: {
    borderLeftColor: colors.red,
  },
  info: {
    borderLeftColor: colors.blue,
  },
});

export const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      contentContainerStyle={styles.container}
      style={[styles.wrapper, styles.success]}
      text1Style={styles.text1}
      text2NumberOfLines={2}
      text2Style={styles.text2}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      contentContainerStyle={styles.container}
      style={[styles.wrapper, styles.error]}
      text1Style={styles.text1}
      text2NumberOfLines={2}
      text2Style={styles.text2}
    />
  ),
  info: (props: BaseToastProps) => (
    <InfoToast
      {...props}
      contentContainerStyle={styles.container}
      style={[styles.wrapper, styles.info]}
      text1Style={styles.text1}
      text2NumberOfLines={2}
      text2Style={styles.text2}
    />
  ),
};
