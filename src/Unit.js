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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { HamburgerIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import FormAddPassword from './FormAddPassword';
import omit from 'lodash.omit';

const Unit = ({ unit, onAddPassword, onDelete }) => {
  const properties = Object.keys(unit).filter(p => p !== 'id');

  const handleAddPassword = (id, newProperties) => {
    onAddPassword(id, newProperties);
  };

  const handleDeleteProperty = (p) => {
    const newUnit = omit(unit, p)
    onDelete(newUnit);
  };

  return (
    <Stack spacing={6}>
      <Flex mb={2} justify="space-between" align="center">
        <Heading fontSize="2xl">{unit.id}</Heading>
        <FormAddPassword onChange={handleAddPassword} unitId={unit.id} />
      </Flex>

      <Flex flexWrap="wrap" justify="space-between">
        {properties.map(p => (
          <FormControl id={p} key={p} w="120px" mt={{ base: '20px', md: 'none' }}>
            <FormLabel w="100%">
              <Flex justify="space-between" align="center">
                <Text fontWeight="semibold">{p}</Text>

                <Menu>
                  <MenuButton>
                    <IconButton 
                      icon={<HamburgerIcon />}
                      size="xs"
                      variant="ghost"
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <Button
                        leftIcon={<DeleteIcon />}
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteProperty(p)}
                      >
                        Delete
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        leftIcon={<EditIcon />}
                        size="sm"
                        variant="ghost"
                      >
                        Edit
                      </Button>
                    </MenuItem>
                  </MenuList>
                </Menu>

              </Flex>
            </FormLabel>
            <Input type="text" value={unit[p]} onChange={() => console.log('test')} />
          </FormControl>
        ))}
      </Flex>
    </Stack>
  );
}

export default Unit;