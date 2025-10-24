/* eslint-disable react/jsx-props-no-spreading */

import type { BaseToastProps } from 'react-native-toast-message';
import { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create((theme) => ({
  // Global styles
  wrapper: {
    height: 'auto',
    width: '90%',
    paddingVertical: theme.spacing.spacing_8,
  },
  container: {
    paddingHorizontal: theme.spacing.spacing_16,
  },
  text1: {
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSizes.medium,
    lineHeight: theme.lineHeight.medium,
    fontWeight: '600',
  },
  text2: {
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSizes.regular,
    lineHeight: theme.lineHeight.regular,
  },
  // Scoped styles
  success: {
    borderLeftColor: theme.colors.positive,
  },
  error: {
    borderLeftColor: theme.colors.negative,
  },
  info: {
    borderLeftColor: theme.colors.neutral,
  },
}));

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
