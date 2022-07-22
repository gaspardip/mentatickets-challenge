import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { TodoPriority } from "./todosSlice";

export const NewTodoModal = () => {
  return (
    <Modal isOpen={false} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New todo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl pb={4}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" />
          </FormControl>
          <FormControl pb={4}>
            <FormLabel>Description</FormLabel>
            <Textarea name="description" />
          </FormControl>
          <FormControl pb={4}>
            <FormLabel>Priority</FormLabel>
            <Select placeholder="Select option" name="priority">
              <option value={TodoPriority.High}>High</option>
              <option value={TodoPriority.Medium}>Medium</option>
              <option value={TodoPriority.Low}>Low</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            leftIcon={<AddIcon />}
            onClick={() => {}}
            variant="outline"
            colorScheme="teal"
            rounded="xl"
          >
            Add todo
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
