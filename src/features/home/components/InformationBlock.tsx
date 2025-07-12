import { Box, Text } from '$shared/uiKit';

interface InformationBlockProps {
  title: string;
  content: string;
}

export const InformationBlock = ({ title, content }: InformationBlockProps) => {
  return (
    <Box gap="spacing_8">
      <Text variant="large">{title}</Text>

      <Text>{content}</Text>
    </Box>
  );
};
