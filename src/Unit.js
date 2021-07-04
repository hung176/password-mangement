import React, { useState, useEffect } from 'react';
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
  Box,
} from '@chakra-ui/react';
import { HamburgerIcon, DeleteIcon, EditIcon, CheckIcon } from '@chakra-ui/icons';
import FormAddPassword from './FormAddPassword';
import AlertDelete from './AlertDelete';
import omit from 'lodash.omit';

const Unit = ({ unit, onAddPassword, onDelete, onUpdate, onDeleteUnit, onChangeInput }) => {
  const properties = Object.keys(unit).filter(p => p !== 'id');

  const [isDisableInput, setIsDisableInput] = useState(true);


  const handleAddPassword = (id, newProperties) => {
    onAddPassword(id, newProperties);
  };

  const handleDeleteProperty = (p) => {
    const newUnit = omit(unit, p)
    onDelete(newUnit);
  };

  const handleInputChange = (e) => {
    const nextUnit = {
      ...unit,
      [e.target.name]: e.target.value,
    };
    onChangeInput(nextUnit);
  };

  const handleEditProperty = () => {
    setIsDisableInput(false);
  }

  const handleCheck = () => {
    setIsDisableInput(true);
    onUpdate(unit);
  }

  return (
    <Stack spacing={6}>
      <Flex mb={2} justify="space-between" align="center">
        <Heading fontSize="2xl">{unit.id}</Heading>
        <Stack isInline>
          {!isDisableInput && (
            <IconButton
              icon={<CheckIcon />}
              colorScheme="green"
              size="md" 
              variant="ghost"
              onClick={handleCheck}
            />
          )}
          <IconButton
            leftIcon={<EditIcon />}
            colorScheme="blue"
            size="md"
            variant="ghost"
            onClick={() => handleEditProperty()}
          />
          <FormAddPassword onChange={handleAddPassword} unitId={unit.id} />
          <AlertDelete unit={unit} onDeleteUnit={onDeleteUnit} />
        </Stack>
      </Flex>

      <Flex flexWrap="wrap" justify="space-between">
        {properties.map(p => (
          <FormControl key={p} w="120px" mt={{ base: '20px', md: 'none' }}>
            <FormLabel w="100%">
              <Flex justify="space-between" align="center">
                <Text fontWeight="semibold">{p}</Text>
                <Box>
                  <Menu>
                    <MenuButton>
                      <IconButton 
                        icon={<HamburgerIcon />}
                        size="xs"
                        variant="ghost"
                      />
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => handleDeleteProperty(p)}>
                        <Button
                          leftIcon={<DeleteIcon />}
                          size="sm"
                          variant="ghost"
                        >
                          Delete
                        </Button>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>

              </Flex>
            </FormLabel>

            <Input
              type="text"
              variant="filled"
              value={unit[p]}
              name={p}
              isDisabled={isDisableInput}
              onChange={handleInputChange}
            />
          </FormControl>
        ))}
      </Flex>
    </Stack>
  );
}

export default Unit;