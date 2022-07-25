import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FlexProps,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { FormEventHandler, useRef } from "react";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import { addTodo, TodoPriority } from "./todosSlice";

export const NewTodoInput = (props: FlexProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const name = inputRef.current!.value;

    dispatch(
      addTodo({
        name,
        priority: TodoPriority.Medium,
      })
    );

    inputRef.current!.value = "";
    inputRef.current!.focus();
  };

  return (
    <Flex {...props} as="form" onSubmit={handleSubmit as any} w="full">
      <InputGroup>
        <Input
          ref={inputRef}
          name="name"
          borderWidth={2}
          rounded="full"
          borderColor="teal"
          h={16}
          placeholder="Todo name"
          required
          autoComplete="off"
          pr={24}
        />
        <InputRightElement width="auto" h="full">
          <Button
            leftIcon={<AddIcon />}
            h="full"
            colorScheme="teal"
            borderStartRadius={0}
            borderEndRadius="full"
            type="submit"
          >
            Add
          </Button>
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};
