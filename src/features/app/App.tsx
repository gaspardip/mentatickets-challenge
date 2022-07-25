import { Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import { Card } from "~/components/card/Card";
import { Filters } from "../todos/Filters";
import { NewTodoInput } from "../todos/NewTodoInput";
import { OrderPills } from "../todos/OrderPills";
import { Pagination } from "../todos/Pagination";
import { Search } from "../todos/Search";
import { TodoList } from "../todos/TodoList";
import { TodoStats } from "../todos/TodoStats";

export const App = () => {
  return (
    <Flex
      align="center"
      direction="column"
      w="full"
      maxW="5xl"
      py={10}
      px={{ base: 10, md: 0 }}
    >
      <Heading as="h1" size="2xl" mb={4} color="teal.300">
        TODO MANAGER
      </Heading>
      <NewTodoInput mb={4} maxW="lg" />
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }}
        gap={{ base: 4, md: 10 }}
        w="full"
      >
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Card mb={4}>
            <Search mb={4} />
            <Filters mb={4} />
            <OrderPills />
          </Card>
          <Card>
            <TodoStats />
          </Card>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 3 }}>
          <Card>
            <TodoList />
            <Pagination mt={4} />
          </Card>
        </GridItem>
      </Grid>
    </Flex>
  );
};
