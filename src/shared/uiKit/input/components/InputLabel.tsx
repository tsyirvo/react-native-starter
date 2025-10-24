import { useTranslation } from 'react-i18next';

import { Row, Text } from '$shared/uiKit/primitives';

interface InputLabelProps {
  label?: string;
  isOptional?: boolean;
  testID?: string;
}

export const InputLabel = ({
  label,
  isOptional,
  testID = 'InputLabel',
}: InputLabelProps) => {
  const { t } = useTranslation();

  if (!label) return null;

  return (
    <Row gap="spacing_4" testID={testID}>
      <Text color="content_primary">{label}</Text>

      {isOptional ? (
        <Text color="content_tertiary">({t('forms.optional')})</Text>
      ) : null}
    </Row>
  );
};
