import React from 'react';
import {
  Box,
  Stack,
  InputGroup,
  Input,
} from '@chakra-ui/react';

const GuideStepHeader = ({
  step, value, isEditHeader, onHeadingChange,
}) => {

  const handleChange = (e) => {
    const heading = {
      [e.target.name]: e.target.value,
    };

    onHeadingChange(step, heading);
  };

  return (
    <Stack isInline align="center" spacing={4} w="100%">
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
        {step}
      </Box>

      <InputGroup>
        <Input
          fontSize="lg"
          borderStyle={isEditHeader ? '' : 'hidden'}
          disabled={!isEditHeader}
          name="heading"
          value={value.heading}
          onChange={handleChange}
        />
      </InputGroup>
    </Stack>
  );
};

export default GuideStepHeader;