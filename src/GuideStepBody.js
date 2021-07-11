import React from 'react';
import { Stack, Textarea } from '@chakra-ui/react';

const GuideStepBody = ({ step, isEditHeader, value, onBodyChange }) => {
  const handleTextareaChange = (e) => {
    const body = {
      [e.target.name]: e.target.value,
    };

    onBodyChange(step, body);
  };
  return (
    <Stack>
      <Textarea
        name="body"
        value={value.body}
        onChange={handleTextareaChange}
        placeholder="explain more for detail"
        size="sm"
        fontSize="lg"
        borderStyle={isEditHeader ? '' : 'hidden'}
        disabled={!isEditHeader}
      />
    </Stack>
  );
};

export default GuideStepBody;