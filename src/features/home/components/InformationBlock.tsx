import { Stack, Text } from '$shared/uiKit';

interface InformationBlockProps {
  content: string;
  title: string;
}

export const InformationBlock = ({ title, content }: InformationBlockProps) => (
  <Stack gap="spacing_8">
    <Text variant="large">{title}</Text>

    <Text>{content}</Text>
  </Stack>
);
