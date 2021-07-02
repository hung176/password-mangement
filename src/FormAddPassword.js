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
    <Stack spacing={4}>
      <FormControl>
        <FormLabel>Properties name</FormLabel>
        <Input
          onChange={handleChange}
          name="properties"
          value={propertiesName}
        />
      </FormControl>
  
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          onChange={handleChange}
          name="password"
          value={password}
        />
      </FormControl>

      <ButtonGroup d="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          // isDisabled
          colorScheme="blue"
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
        // closeOnBlur={false}
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
        <PopoverContent p={5}>
          <PopoverCloseButton />
          <Form onCancel={onClose} unitId={unitId} onChange={onChange} />
        </PopoverContent>
      </Popover>
    </>
  )
};

export default FormAddPassword;

