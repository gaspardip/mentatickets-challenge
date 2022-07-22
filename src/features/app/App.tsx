import { Flex, Heading } from "@chakra-ui/react";
import { NewTodoInput } from "../todos/NewTodoInput";
import { NewTodoModal } from "../todos/NewTodoModal";
import { TodoFilters } from "../todos/TodoFilters";
import { TodoList } from "../todos/TodoList";
import { TodoStats } from "../todos/TodoStats";

export const App = () => {
  return (
    <Flex alignItems="center" direction="column" w="full" maxW="xl" py={10}>
      <Heading as="h1" size="xl" mb={4} color="teal.300">
        TODO
      </Heading>
      <NewTodoInput />
      <TodoFilters />
      <TodoStats />
      <TodoList />
      <NewTodoModal />
    </Flex>
  );
};
