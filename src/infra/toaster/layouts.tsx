import type { BaseToastProps } from 'react-native-toast-message';
import { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create((theme) => ({
  container: {
    paddingHorizontal: theme.spacing.spacing_16,
  },
  error: {
    borderLeftColor: theme.colors.negative,
  },
  info: {
    borderLeftColor: theme.colors.neutral,
  },
  // Scoped styles
  success: {
    borderLeftColor: theme.colors.positive,
  },
  text1: {
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSizes.medium,
    fontWeight: '600',
    lineHeight: theme.lineHeight.medium,
  },
  text2: {
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSizes.regular,
    lineHeight: theme.lineHeight.regular,
  },
  // Global styles
  wrapper: {
    height: 'auto',
    paddingVertical: theme.spacing.spacing_8,
    width: '90%',
  },
}));

export const toastConfig = {
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
};
