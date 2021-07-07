import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box
      p={4}
      borderBottomWidth={2}
      borderBottomColor="gray.200"
      >
      <Text fontSize="2xl" fontWeight="thin">Password Management</Text>
    </Box>
  );
};
export default Header;