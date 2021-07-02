import React from 'react';
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
import FocusLock from "react-focus-lock";
import { AddIcon } from '@chakra-ui/icons';


const TextInput = React.forwardRef((props, ref) => {
  const handleChange = (e) => {
    console.log(e.target.value);
  }
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input
        ref={ref}
        id={props.id}
        {...props}
        onChange={handleChange}
      />
    </FormControl>
  )
});

const Form = ({ firstFieldRef, onCancel }) => {
  return (
    <Stack spacing={4}>
      <TextInput
        label="Properties name"
        name=""
        type="text"
        id="properties-name"
        ref={firstFieldRef}
      />
      <TextInput
        label="Password"
        id="password"
        type="text"
      />
      <ButtonGroup d="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          isDisabled
          colorScheme="blue"
        >
          Save
        </Button>
      </ButtonGroup>
    </Stack>
  )
};

const FormAddPassword = () => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const firstFieldRef = React.useRef(null)

  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="auto"
        closeOnBlur={false}
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
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverCloseButton />
            <Form firstFieldRef={firstFieldRef} onCancel={onClose} />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  )
};

export default FormAddPassword;

