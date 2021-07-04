import React from 'react';
import { useParams} from 'react-router-dom';
import { Box } from '@chakra-ui/react';

const GuidePage = () => {
  const params = useParams();
  console.log('params', params)
  return (
    <Box>{`This is ${params.unitId} guide page`}</Box>
  );
}

export default GuidePage;