/* eslint-disable react/jsx-props-no-spreading */

import { StyleSheet } from 'react-native';
import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
  InfoToast,
} from 'react-native-toast-message';

import { colors, textVariants, spacing } from '$styles';

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

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={[styles.wrapper, styles.success]}
      contentContainerStyle={styles.container}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text2NumberOfLines={2}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={[styles.wrapper, styles.error]}
      contentContainerStyle={styles.container}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text2NumberOfLines={2}
    />
  ),
  info: (props: BaseToastProps) => (
    <InfoToast
      {...props}
      style={[styles.wrapper, styles.info]}
      contentContainerStyle={styles.container}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text2NumberOfLines={2}
    />
  ),
};

export default toastConfig;
