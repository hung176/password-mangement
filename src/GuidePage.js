import React from 'react';
import { useParams} from 'react-router-dom';
import { Box, Stack } from '@chakra-ui/react';

import GuideStepHeader from './GuideStepHeader';

const GuidePage = () => {
  const params = useParams();
  console.log('params', params)
  return (
    <Box
      p={{ base: 4, md: 6 }}
      width={{ base: '90%', md: '70%' }}
      borderWidth={2}
      borderRadius={5}
      borderColor="gray.200"
      position="relative"
      boxShadow="5px 6px 0px rgba(0, 0, 0, 0.05)"
      mt={4}
      m="20px auto"
    >
      <Stack spacing={4}>
        <GuideStepHeader number="1" title="Go to the Config" />
        <GuideStepHeader number="2" title="Go to the System and ..." />
      </Stack>
    </Box>
  );
}

export default GuidePage;