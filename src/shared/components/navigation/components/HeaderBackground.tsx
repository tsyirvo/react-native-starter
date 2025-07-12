import { Box } from '$shared/uiKit';

export const HeaderBackground = () => {
  return (
    <Box width="100%" height="100%" bg="bg_base">
      <Box
        bg="border_default"
        height={1}
        width="100%"
        position="absolute"
        bottom={0}
        left={0}
      />
    </Box>
  );
};
