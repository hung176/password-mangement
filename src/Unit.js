import React from 'react';
// import firebase from './firebase';
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
import { HamburgerIcon } from '@chakra-ui/icons';
import FormAddPassword from './FormAddPassword';

const Unit = ({ unit, onAddPassword }) => {
  const properties = Object.keys(unit).filter(p => p !== 'id');

  const handleAddPassword = (id, newProperties) => {
    onAddPassword(id, newProperties);
  };

  return (
    <Stack spacing={6}>
      <Flex mb={2} justify="space-between" align="center">
        <Heading fontSize="2xl">{unit.id}</Heading>
        <FormAddPassword onChange={handleAddPassword} unitId={unit.id} />
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
            <Input type="text" value={unit[p]} onChange={() => console.log('test')} />
          </FormControl>
        ))}
      </Stack>
    </Stack>
  );
}

export default Unit;