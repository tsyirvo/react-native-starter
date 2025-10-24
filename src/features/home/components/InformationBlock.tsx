import { Stack, Text } from '$shared/uiKit';

interface InformationBlockProps {
  title: string;
  content: string;
}

export const InformationBlock = ({ title, content }: InformationBlockProps) => {
  return (
    <Stack gap="spacing_8">
      <Text variant="large">{title}</Text>

      <Text>{content}</Text>
    </Stack>
  );
};
