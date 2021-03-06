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
import pick from 'lodash.pick';

const db = firebase.firestore();

function MainPage() {
  const [units, setUnits] = useState([]);
  const [guidelines, setGuidelines] = useState([]);
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

  }, []);

  useEffect(() => {
    const fetchGuidelines = async() => {
      const data = await db.collection('guidelines').get();
      const guidelines = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setGuidelines(guidelines);
    }

    fetchGuidelines();

  }, [])

  const handleAddUnit = () => {
    setUnits([ ...units, newUnit ]);

    db.collection('passwords').doc(newUnit.id).set(newUnit);
    db.collection('guidelines').doc(newUnit.id).set({});

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

    const propertyKey = Object.keys(newProperties)[0];
    db.collection('guidelines').doc(unitId).set({
      [propertyKey]: {
        1: { heading: '', body: '' },
      },
    }, { merge: true });
  };

  const handleChangeProperty = (newUnit) => {
    const newUnits = units.map(unit => (unit.id === newUnit.id ? newUnit : unit));
    setUnits(newUnits);

    const newKeys = Object.keys(newUnit);
    const newGuideline = guidelines.find(guideline => guideline.id === newUnit.id);
    const nextGuideline = pick(newGuideline, newKeys);

    db.collection('passwords').doc(newUnit.id).set(newUnit);
    db.collection('guidelines').doc(newUnit.id).set(nextGuideline);
  };

  const handleDeleteUnit = (unitId) => {
    const newUnits = units.filter(unit => unit.id !== unitId);
    setUnits(newUnits);

    db.collection('passwords').doc(unitId).delete();

    db.collection('guidelines').doc(unitId).delete();
  };

  const handleChangeInput = (unit) => {
    const nextUnits = units.map(u => (u.id === unit.id ? unit : u));
    setUnits(nextUnits);
  };

  return (
    <Stack>

      <Flex justify="center" p={2}>
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

          <Stack spacing={0} borderWidth={1} borderColor="gray.200" rounded={6}>
            {units.map(unit => (
              <Box key={unit.id} p={6} borderBottomWidth={1} borderBottomColor="gray.200">
                <Unit
                  unit={unit}
                  onAddPassword={handleAddPassword}
                  onDelete={handleChangeProperty}
                  onUpdate={handleChangeProperty}
                  onDeleteUnit={handleDeleteUnit}
                  onChangeInput={handleChangeInput}
                />
              </Box>
            ))}
          </Stack>
        </Box>
      </Flex>
    </Stack>
  );
}

export default MainPage;
