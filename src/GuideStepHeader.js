import React from 'react';
import {
  Box,
  Stack,
  Text,
} from '@chakra-ui/react';

const GuideStepHeader = ({
  number, title, ...rest
}) => (
  <Stack isInline align="center" spacing={4} {...rest}>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="50%"
      width={12}
      height={12}
      border="2px solid"
      borderColor="gray.200"
      textAlign="center"
      lineHeight="100%"
      fontWeight="bold"
      color="gray.500"
      flexGrow={0}
      flexShrink={0}
    >
      {number}
    </Box>
    <Text fontSize="lg" fontWeight="medium">
      {title}
    </Text>
  </Stack>
);

export default GuideStepHeader;