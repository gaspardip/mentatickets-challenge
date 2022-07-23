import { VStack } from "@chakra-ui/react";
import { Card } from "~/components/card/Card";
import { useAppSelector } from "~/hooks/useAppDispatch";
import { Todo } from "./Todo";
import { selectTodos } from "./todosSlice";

export const TodoList = () => {
  const todos = useAppSelector(selectTodos);

  return (
    <>
      {todos.length > 0 ? (
        <Card>
          <VStack spacing={4} align="stretch">
            {todos.map((todo) => {
              return <Todo {...todo} key={todo.id} />;
            })}
          </VStack>
        </Card>
      ) : (
        <NoTodos />
      )}
    </>
  );
};

const NoTodos = () => {
  return (
    <Card color="whiteAlpha.700" justify="center" align="center">
      Todos will appear here
    </Card>
  );
};
