import React from 'react';
import {
  Box,
  Stack,
  InputGroup,
  InputRightElement,
  Input,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const GuideStepHeader = ({
  number, value, isEditHeader,
}) => {
  return (
    <Stack isInline align="center" spacing={4}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="50%"
        width={10}
        height={10}
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

      <InputGroup>
        <Input
          fontSize="lg"
          borderStyle={isEditHeader ? '' : 'hidden'}
          disabled={!isEditHeader}
          value={value.heading}
        />
        <InputRightElement
          children={<CheckIcon color="green.500" />}
          display={ isEditHeader ? 'flex' : 'none'}
          // onClick={handleCheck}
        />
      </InputGroup>
    </Stack>
  );
};

export default GuideStepHeader;