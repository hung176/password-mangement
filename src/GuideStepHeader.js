import React from 'react';
import {
  Box,
  Flex,
  Textarea,
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
    <Flex align="flex-start" spacing={4} w="100%">
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

      <Box w="100%">
        <Textarea
          size="xs"
          fontSize="lg"
          fontWeight="bold"
          variant="outline"
          maxH="fit-content"
          borderStyle={isEditHeader ? '' : 'hidden'}
          disabled={!isEditHeader}
          name="heading"
          value={value.heading}
          onChange={handleChange}
        />
      </Box>

    </Flex>
  );
};

export default GuideStepHeader;