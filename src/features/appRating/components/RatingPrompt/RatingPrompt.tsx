import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Box, Button, Text } from '$shared/uiKit';

import { useRatingPrompt } from '../../hooks';

export const RatingPrompt = () => {
  const { t } = useTranslation();

  const { handleYesPress, handleNoPress } = useRatingPrompt();

  return (
    <View style={styles.container}>
      <Box px="spacing_16" py="spacing_24">
        <Text variant="xLarge" style={styles.title}>
          {t('ratingPrompt.title')}
        </Text>

        <Text variant="large" style={styles.question}>
          {t('ratingPrompt.question')}
        </Text>

        <Box mt="spacing_24" gap="spacing_12">
          <Button.Text variant="primary" onPress={handleYesPress}>
            {t('ratingPrompt.yes')}
          </Button.Text>

          <Button.Text variant="outline" onPress={handleNoPress}>
            {t('ratingPrompt.no')}
          </Button.Text>
        </Box>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing.spacing_16,
  },
  question: {
    textAlign: 'center',
  },
}));
