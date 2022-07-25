import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useCallbackRef } from "use-callback-ref";
import { useAppDispatch } from "~/hooks/useAppDispatch";

import { Todo, TodoPriority, TodoStatus, updateTodo } from "./todosSlice";

type TodoDetailModalProps = Omit<ModalProps, "children"> & Todo;

export const TodoDetailModal = ({
  id,
  name,
  description,
  status,
  priority,
  ...props
}: TodoDetailModalProps) => {
  const dispatch = useAppDispatch();

  const {
    register,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { name, description, status, priority },
  });

  const { ref: nameRef, ...restName } = register("name", registerOptions);

  const nameCallbackRef = useCallbackRef<HTMLInputElement | null>(
    null,
    (ref) => {
      if (ref) {
        nameRef(ref);
        ref.focus();
      }
    }
  );

  const onSubmit = handleSubmit(({ name, description, status, priority }) => {
    dispatch(
      updateTodo({
        id,
        name,
        description,
        status: Number(status),
        priority: Number(priority),
      })
    );

    props.onClose();
  });

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>Edit todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl pb={4} isInvalid={Boolean(errors.name)}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input {...restName} ref={nameCallbackRef} id="name" />
              {errors.name && (
                <FormErrorMessage>{errors.name.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl pb={4} isInvalid={Boolean(errors.description)}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                {...register("description", registerOptions)}
                id="description"
              />
              {errors.description && (
                <FormErrorMessage>
                  {errors.description.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl pb={4} isInvalid={Boolean(errors.status)}>
              <FormLabel htmlFor="status">Status</FormLabel>
              <Select {...register("status")} id="status">
                <option value={TodoStatus.New}>New</option>
                <option value={TodoStatus.InProgress}>In Progress</option>
                <option value={TodoStatus.Done}>Done</option>
              </Select>
              {errors.status && (
                <FormErrorMessage>{errors.status.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl pb={4} isInvalid={Boolean(errors.priority)}>
              <FormLabel htmlFor="priority">Priority</FormLabel>
              <Select {...register("priority")} id="priority">
                <option value={TodoPriority.Low}>Low</option>
                <option value={TodoPriority.Medium}>Medium</option>
                <option value={TodoPriority.High}>High</option>
              </Select>
              {errors.priority && (
                <FormErrorMessage>{errors.priority.message}</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter flexDirection={{ base: "column-reverse", md: "row" }}>
            <Button
              colorScheme="red"
              rounded="full"
              mr={{ base: 0, md: 4 }}
              w={{ base: "full", md: "auto" }}
              onClick={props.onClose}
            >
              Cancel
            </Button>
            <Button
              colorScheme="teal"
              rounded="full"
              w={{ base: "full", md: "auto" }}
              mb={{ base: 4, md: 0 }}
              type="submit"
            >
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

const registerOptions = {
  required: "This field is required",
};
