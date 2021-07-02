import React from 'react';
import firebase from './firebase';
import {
  Stack,
  Flex,
  Heading,
  Input,
  FormControl,
  FormLabel,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons';
import FormAddPassword from './FormAddPassword';

const Unit = ({ unit, onAddPassword }) => {
  const properties = Object.keys(unit).filter(p => p !== 'id');

  const handleAddPassword = (unitId) => {
    onAddPassword(unitId);
  };

  return (
    <Stack spacing={6}>
      <Flex mb={2} justify="space-between" align="center">
        <Heading fontSize="2xl">{unit.id}</Heading>
        <FormAddPassword onChage={handleAddPassword} />
      </Flex>

      <Stack isInline spacing={10}>
        {properties.map(p => (
          <FormControl id={p} key={p} w="150px">
            <FormLabel w="100%">
              <Flex justify="space-between" align="center">
                <Text fontWeight="semibold">{p}</Text>
                <IconButton 
                  icon={<HamburgerIcon />}
                  size="xs"
                  variant="ghost"
                />
              </Flex>
            </FormLabel>
            <Input type="text" value={unit[p]} />
          </FormControl>
        ))}
      </Stack>
    </Stack>
  );
}

export default Unit;