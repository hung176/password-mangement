import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Stack, IconButton, Text } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import GuideStepHeader from './GuideStepHeader';

import firebase from './firebase';

const db = firebase.firestore();

const GuideDetail = () => {
  const { unitId, property } = useParams();
  const [passwords, setPasswords] = useState({});
  const [guidelines, setGuidelines] = useState({});
  const [isEditHeader, setIsEditHeader] = useState(false);

  useEffect(() => {
    const getPasswordsData = async() => {
      const data = await db.collection('passwords').doc(unitId).get();
      setPasswords(data.data());
    };

    getPasswordsData();
  }, [unitId]);

  useEffect(() => {
    const getGuidelinesData = async() => {
      const data = await db.collection('guidelines').doc(unitId).get();
      setGuidelines(data.data());
    };

    getGuidelinesData();
  }, [unitId]);

  return (
    <Box
      p={{ base: 6, md: 8 }}
      width={{ base: '95%', md: '80%' }}
      borderWidth={2}
      borderRadius={5}
      borderColor="gray.200"
      position="relative"
      boxShadow="5px 6px 0px rgba(0, 0, 0, 0.05)"
      mt={4}
      m="20px auto"
    >
      <Stack spacing={0} mb={6}>
        <Text fontSize="6xl" fontWeight="extrabold" >{unitId}</Text>
        <Stack isInline spacing={2}>
          <Text fontSize="2xl">{property}:</Text>
          <Text fontSize="2xl">{passwords[property]}</Text>
        </Stack>
      </Stack>
      <Stack spacing={4}>
        <GuideStepHeader
          number="1"
          value={guidelines['step1'] || {}}
          isEditHeader={isEditHeader}
        />
        <GuideStepHeader
          number="2"
          value={guidelines['step1'] || {}}
          isEditHeader={isEditHeader}
        />
      </Stack>

      <IconButton
        icon={<EditIcon />}
        fontSize="30px"
        p={2}
        variant="ghost"
        position="absolute"
        top={2}
        right={2}
        onClick={() => setIsEditHeader(true)}
      />

    </Box>
  );
};

export default GuideDetail;
