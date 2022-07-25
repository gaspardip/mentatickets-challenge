import { Box, BoxProps, VStack } from "@chakra-ui/react";
import { useAppSelector } from "~/hooks/useAppDispatch";
import { selectPaginatedTodos } from "./paginationSlice";
import { Todo } from "./Todo";

export const TodoList = (props: BoxProps) => {
  const todos = useAppSelector(selectPaginatedTodos);

  return (
    <>
      {todos.length > 0 ? (
        <VStack {...props} spacing={3} align="stretch">
          {todos.map((todo) => (
            <Todo {...todo} key={todo.id} />
          ))}
        </VStack>
      ) : (
        <NoTodos {...props} />
      )}
    </>
  );
};

const NoTodos = (props: BoxProps) => {
  return (
    <Box {...props} as="span" color="whiteAlpha.700" mx="auto">
      Todos will appear here
    </Box>
  );
};
