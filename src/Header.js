import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();
  return (
    <Box
      p={4}
      borderBottomWidth={2}
      borderBottomColor="gray.200"
      >
      <Text
        fontSize="2xl"
        fontWeight="thin"
        cursor="pointer"
        onClick={() => history.push("/")}
        display="inline-block"
      >
        Password Management
      </Text>
    </Box>
  );
};
export default Header;