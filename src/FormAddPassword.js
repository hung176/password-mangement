import React, { useState } from 'react';
import {
  Stack,
  Input,
  IconButton,
  ButtonGroup,
  Button,
  FormControl,
  FormLabel,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';


const Form = ({ unitId, onCancel, onChange }) => {
  const [propertiesName, setPropertiesName] = useState('');
  const [password, setPassword] = useState('');

  const isDisabled = propertiesName === '' || password === '';

  const handleChange = (e) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;
  
    if (targetName === 'properties') {
      setPropertiesName(targetValue);
    }

    if (targetName === 'password') {
      setPassword(targetValue);
    }
  };

  return (
    <Stack spacing={4} w="200px">
      <FormControl>
        <FormLabel>Properties name</FormLabel>
        <Input
          name="properties"
          value={propertiesName}
          onChange={handleChange}
          size="sm"
        />
      </FormControl>
  
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          name="password"
          value={password}
          onChange={handleChange}
          size="sm"
        />
      </FormControl>

      <ButtonGroup d="flex" justifyContent="flex-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
          onCancel();
          setPropertiesName('');
          setPassword('');
        }}>
          Cancel
        </Button>
        <Button
          size="sm"
          colorScheme="blue"
          isDisabled={isDisabled}
          onClick={() => {
            const newValue = { [propertiesName]: password };
            onChange(unitId, newValue);
            onCancel();
            setPropertiesName('');
            setPassword('');
          }}
        >
          Save
        </Button>
      </ButtonGroup>
    </Stack>
  )
};

const FormAddPassword = ({ unitId, onChange }) => {
  const { onOpen, onClose, isOpen } = useDisclosure()

  return (
    <>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="auto"
      >
        <PopoverTrigger>
          <IconButton
            variant="ghost"
            colorScheme="blue"
            aria-label="Add properties"
            size="md"
            rounded
            icon={<AddIcon />}
          />
        </PopoverTrigger>
        <PopoverContent
          p={5}
          _focus={{ outline: 'none' }}
          w="fit-content"
        >
          <PopoverCloseButton />
          <Form onCancel={onClose} unitId={unitId} onChange={onChange} />
        </PopoverContent>
      </Popover>
    </>
  )
};

export default FormAddPassword;

