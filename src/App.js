import React, { useEffect, useState } from 'react';
import firebase from "./firebase";
import {
  Stack,
  Box,
  Text,
  Flex,
  Button,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverBody,
  ButtonGroup,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons'
import Unit from './Unit';

const db = firebase.firestore();

function App() {
  const [units, setUnits] = useState([]);
  const [newUnit, setNewUnit] = useState({ id: '' });

  const { onOpen, onClose, isOpen } = useDisclosure()

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
    console.log(newUnit)
    setUnits([ ...units, newUnit ]);

    db.collection('passwords').doc(newUnit.id).set(newUnit);

    setNewUnit('');
    onClose();
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

  const handleDeleteProperty = (newUnit) => {
    const newUnits = units.map(unit => (unit.id === newUnit.id ? newUnit : unit));
    setUnits(newUnits);

    db.collection('passwords').doc(newUnit.id).set(newUnit);
  };

  const handleUpdateProperty = (newUnit) => {
    const newUnits = units.map(unit => (unit.id === newUnit.id ? newUnit : unit));
    setUnits(newUnits);

    db.collection('passwords').doc(newUnit.id).set(newUnit);
  };

  const handleDeleteUnit = (unitId) => {
    const newUnits = units.filter(unit => unit.id !== unitId);
    setUnits(newUnits);

    db.collection('passwords').doc(unitId).delete();
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

          <Popover
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
          >
            <PopoverTrigger>
              <Button
                leftIcon={<AddIcon />}
                variant="outline"
                colorScheme="blue"
              >
                New Unit
              </Button>
            </PopoverTrigger>
            <PopoverContent _focus={{ outline: 'none' }} maxW="250px">
              <PopoverCloseButton />
              <PopoverBody>
                <Stack spacing={2}>
                  <Text>Add a unit to list</Text>
                  <Input
                    type="text"
                    size="sm"
                    fontWeight="semibold"
                    onChange={(e) => setNewUnit({ id: e.target.value })}
                  />
                  <ButtonGroup d="flex" justifyContent="flex-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                      onClose();
                      setNewUnit('');
                    }}>
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={handleAddUnit}
                    >
                      Save
                    </Button>
                  </ButtonGroup>
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          </Box>

          <Stack spacing={4} borderWidth={1} borderColor="gray.200" rounded={6}>
            {units.map(unit => (
              <Box key={unit.id} p={4} borderBottomWidth={1} borderBottomColor="gray.200">
                <Unit
                  unit={unit}
                  onAddPassword={handleAddPassword}
                  onDelete={handleDeleteProperty}
                  onUpdate={handleUpdateProperty}
                  onDeleteUnit={handleDeleteUnit}
                />
              </Box>
            ))}
          </Stack>
        </Box>
      </Flex>
    </Stack>
  );
}

export default App;
