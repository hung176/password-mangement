import React from 'react';
import { Stack, Textarea, Box } from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons'

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
      <label className="filelabel">
        <Box w="50px">
          <PlusSquareIcon w="100%" h="100%" className="fa" />
        </Box>
        <input className="FileUpload1" id="FileInput" name="booking_attachment" type="file"/>
      </label>
    </Stack>
  );
};

export default GuideStepBody;