import {
  Flex,
  Heading,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { useAppSelector } from "~/hooks/useAppDispatch";
import { selectTodosStats } from "./todosSlice";

export const TodoStats = () => {
  const {
    low,
    medium,
    high,
    new: newCount,
    inProgress,
    done,
    total,
  } = useAppSelector(selectTodosStats);

  return (
    <Flex direction="column" textAlign="center">
      <Heading mb={4}>{total} todos</Heading>
      <StatGroup>
        <Stat>
          <StatLabel>New</StatLabel>
          <StatNumber>{newCount}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>In Progress</StatLabel>
          <StatNumber>{inProgress}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Done</StatLabel>
          <StatNumber>{done}</StatNumber>
        </Stat>
      </StatGroup>
      <StatGroup>
        <Stat>
          <StatLabel>Low</StatLabel>
          <StatNumber>{low}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Medium</StatLabel>
          <StatNumber>{medium}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>High</StatLabel>
          <StatNumber>{high}</StatNumber>
        </Stat>
      </StatGroup>
    </Flex>
  );
};
