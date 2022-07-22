import { Card } from "~/components/card/Card";
import { useAppSelector } from "~/hooks/useAppDispatch";
import { Todo } from "./Todo";
import { selectTodosWithFilters } from "./todosSlice";

export const TodoList = () => {
  const todos = useAppSelector(selectTodosWithFilters);

  return (
    <>
      {todos.length > 0 ? (
        <Card display="grid" gridGap={4}>
          {todos.map((todo) => {
            return <Todo {...todo} key={todo.id} />;
          })}
        </Card>
      ) : (
        <NoTodos />
      )}
    </>
  );
};

const NoTodos = () => {
  return (
    <Card color="whiteAlpha.700" textAlign="center">
      Todos will appear here
    </Card>
  );
};
