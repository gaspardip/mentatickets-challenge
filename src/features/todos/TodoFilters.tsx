import {
  CloseIcon,
  SearchIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Tag,
  useToken,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { useAppSelector } from "~/hooks/useAppDispatch";
import { selectOrderProp, toggleOrder } from "./orderSlice";
import { changeSearch, clearSearch } from "./searchSlice";
import { TodoPriority, TodoProp, TodoStatus } from "./todosSlice";

export const TodoFilters = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useDebouncedCallback(
    () => dispatch(changeSearch(inputRef.current!.value)),
    500
  );

  const handleClearSearch = () => {
    inputRef.current!.value = "";
    dispatch(clearSearch());
  };

  return (
    <Flex mb={4} direction="column" w="full">
      <InputGroup mb={4}>
        <InputLeftElement
          pointerEvents="none"
          alignItems="center"
          h="full"
          children={<SearchIcon color="gray.500" boxSize={4} />}
        />
        <Input
          ref={inputRef}
          placeholder="Search..."
          rounded="full"
          size="lg"
          onChange={handleChange}
        />
        <InputRightElement
          h="full"
          pr={2}
          children={
            <IconButton
              icon={<CloseIcon />}
              aria-label="Clear search"
              colorScheme="red"
              onClick={handleClearSearch}
              size="xs"
              rounded="full"
              variant="ghost"
            />
          }
        />
      </InputGroup>
      <Flex justifyContent="space-between">
        <Filters />
        <OrderPills />
      </Flex>
    </Flex>
  );
};

const Filters = () => {
  return (
    <Flex>
      <Select placeholder="Select status" rounded="full" mr={4} size="sm">
        <option value={TodoStatus.New}>New</option>
        <option value={TodoStatus.InProgress}>In Progress</option>
        <option value={TodoStatus.Done}>Done</option>
      </Select>
      <Select placeholder="Select priority" rounded="full" size="sm">
        <option value={TodoPriority.Low}>Low</option>
        <option value={TodoPriority.Medium}>Medium</option>
        <option value={TodoPriority.High}>High</option>
      </Select>
    </Flex>
  );
};

const OrderPills = () => {
  return (
    <HStack spacing={4}>
      {sortingProps.map((prop) => (
        <OrderPill key={prop} prop={prop} />
      ))}
    </HStack>
  );
};

interface OrderPillProps {
  prop: TodoProp;
}

const OrderPill = ({ prop }: OrderPillProps) => {
  const dispatch = useDispatch();
  const order = useAppSelector((state) => selectOrderProp(state, prop));
  const transitionProperty = useToken("transition.property", "colors");
  const transitionDuration = useToken("transition.duration", "normal");
  const transitionTimingFunction = useToken("transition.easing", "ease-in-out");

  const handleClick = () => {
    dispatch(toggleOrder(prop));
  };

  const Icon = order === "asc" ? TriangleUpIcon : TriangleDownIcon;

  const props = order
    ? { variant: "solid", colorScheme: "teal", borderColor: "teal.700" }
    : {
        variant: "ghost",
        colorScheme: "gray",
        borderStyle: "dashed",
      };

  return (
    <Tag
      {...props}
      as="button"
      size="lg"
      key={prop}
      rounded="full"
      onClick={handleClick}
      borderWidth={1}
      transitionProperty={transitionProperty}
      transitionDuration={transitionDuration}
      transitionTimingFunction={transitionTimingFunction}
    >
      <Icon mr={2} />{" "}
      <Box as="span" textTransform="capitalize">
        {prop}
      </Box>
    </Tag>
  );
};

const sortingProps = ["status", "priority"] as TodoProp[];
