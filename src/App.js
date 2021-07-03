import React, { useEffect, useState } from 'react';
import firebase from "./firebase";
import {
  Stack,
  Box,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons'
import Unit from './Unit';

const db = firebase.firestore();

function App() {
  const [units, setUnits] = useState([]);
  console.log(units)

  useEffect(() => {
    const fetchUnits = async() => {
      const data = await db.collection('passwords').get();
      const units = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setUnits(units);
    }

    fetchUnits();

  }, [])

  const handleAddUnit = () => {
    
  };

  const handleAddPassword = (unitId, newProperties) => {
    const unit = units.find(u => u.id === unitId);
    const newUnit = {
      ...unit,
      ...newProperties
    };

    const newUnits = units.map(unit => (unit.id === unitId ? { ...unit, ...newProperties } : unit));
    setUnits(newUnits);

    db.collection('passwords').doc(unitId).set(newUnit);
  };

  return (
    <Stack>
      <Box
        p={4}
        borderBottomWidth={2}
        borderBottomColor="gray.200"
      >
        <Text fontSize="2xl" fontWeight="thin">Password Management</Text>
      </Box>

      <Flex justify="center" p={4}>
        <Box w={{ base: '100%', md: '70%' }}>
          <Box d="flex" justifyContent="flex-end" my={4}>
            <Button
              leftIcon={<AddIcon />}
              variant="outline"
              colorScheme="blue"
              onClick={handleAddUnit}
            >
              New Unit
            </Button>
          </Box>

          <Stack spacing={4} borderWidth={1} borderColor="gray.200" rounded={6}>
            {units.map(unit => (
              <Box key={unit.id} p={4} borderBottomWidth={1} borderBottomColor="gray.200">
                <Unit unit={unit} onAddPassword={handleAddPassword} />
              </Box>
            ))}
          </Stack>
        </Box>
      </Flex>
    </Stack>
  );
}

export default App;
