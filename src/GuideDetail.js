import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Stack, IconButton, Text, Button, Flex } from '@chakra-ui/react';
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import GuideStepHeader from './GuideStepHeader';

import firebase from './firebase';
import pick from 'lodash.pick';
import { arrangeArray } from './utils/arrangeArray';

const db = firebase.firestore();

const GuideDetail = () => {
  const { unitId, property } = useParams();
  const [passwords, setPasswords] = useState({});
  const [isEditHeader, setIsEditHeader] = useState(false);

  const [steps, setSteps] = useState({});

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
      setSteps(data.data());
    };

    getGuidelinesData();
  }, [unitId]);

  return (
    <Stack
      spacing={4}
      p={{ base: 6, md: 8 }}
      width={{ base: '95%', md: '80%' }}
      borderWidth={2}
      borderRadius={5}
      borderColor="gray.200"
      position="relative"
      boxShadow="20px 22px 0px rgba(0, 0, 0, 0.05)"
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
        {Object.keys(steps).map(step => (
          <Stack isInline key={step}>
            <GuideStepHeader 
              number={step}
              value={steps[step] || {}}
              isEditHeader={isEditHeader}
            />
            <Flex justify="center" align="center">
              <IconButton
                icon={<CloseIcon />}
                variant="ghost"
                size="xs"
                onClick={() => {
                  const stepKeys = arrangeArray(Object.keys(steps).filter(key => key !== step));
                  const newSteps = pick(steps, stepKeys);

                  const newValues = Object.values(newSteps);
                  const nextSteps = Object.assign(...stepKeys.map((key, i) => ({ [key]: newValues[i]})));
                  console.log(stepKeys);

                  setSteps(nextSteps);

                  db.collection('guidelines').doc(unitId).set(newSteps);
                }}
              />
            </Flex>
            {/* <GuideStepBody /> */}
          </Stack>
        ))}
      </Stack>

      <IconButton
        icon={<EditIcon />}
        fontSize="30px"
        p={2}
        variant="ghost"
        position="absolute"
        top={4}
        right={2}
        onClick={() => setIsEditHeader(true)}
      />

      {isEditHeader && (
        <IconButton
          icon={<CheckIcon color="green.500" />}
          fontSize="30px"
          p={2}
          variant="ghost"
          position="absolute"
          top={4}
          right={14}
          onClick={() => setIsEditHeader(false)}
        />
      )}

      <Box>
        <Button
          variant="outline"
          onClick={() => {
            let nextStep;
            const stepKeys = Object.keys(steps);
            if (stepKeys.length > 0) {
              const nextKey = parseInt(stepKeys[stepKeys.length - 1]) + 1;
              nextStep = { [nextKey]: {} };
            } else {
              nextStep = { 1: {} };
            }
            setSteps({...steps, ...nextStep});

            db.collection('guidelines').doc(unitId).set({
              ...nextStep,
            }, { merge: true });
          }}
        >
          Add more step
        </Button>
      </Box>

    </Stack>
  );
};

export default GuideDetail;
