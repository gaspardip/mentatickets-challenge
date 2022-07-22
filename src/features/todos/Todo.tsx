import {
  ArrowDownIcon,
  ArrowForwardIcon,
  ArrowUpIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import {
  Checkbox,
  Flex,
  IconButton,
  IconButtonProps,
  Text,
  useToken,
} from "@chakra-ui/react";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import {
  removeTodo,
  Todo as TodoType,
  TodoPriority,
  TodoStatus,
  toggleTodoPriority,
  toggleTodoStatus,
} from "./todosSlice";

interface TodoProps extends TodoType {}

export const Todo = ({ id, name, status, priority }: TodoProps) => {
  const dispatch = useAppDispatch();
  const transitionProperty = useToken("transition.property", "colors");
  const transitionDuration = useToken("transition.duration", "normal");
  const transitionTimingFunction = useToken("transition.easing", "ease-in-out");

  const isDone = status === TodoStatus.Done;

  const statusProps = statusesProps[status];

  const handleCheckboxChange = () => {
    dispatch(toggleTodoStatus(id));
  };

  const handleDeleteClick = () => {
    dispatch(removeTodo(id));
  };

  const handlePriorityClick = () => {
    dispatch(toggleTodoPriority(id));
  };

  return (
    <Flex
      {...statusProps.container}
      px={4}
      py={2}
      borderWidth={2}
      rounded="full"
      justify="space-between"
      cursor="pointer"
      transitionProperty={transitionProperty}
      transitionDuration={transitionDuration}
      transitionTimingFunction={transitionTimingFunction}
    >
      <Flex alignItems="center">
        <Checkbox
          isChecked={isDone}
          mr={4}
          onChange={handleCheckboxChange}
          rounded="full"
          colorScheme="teal"
        />
        <Text {...statusProps.text}>{name}</Text>
      </Flex>
      <Flex>
        <TodoPriorityIcon priority={priority} onClick={handlePriorityClick} />
        <IconButton
          icon={<DeleteIcon />}
          aria-label="Remove todo"
          variant="ghost"
          colorScheme="red"
          rounded="full"
          onClick={handleDeleteClick}
        />
      </Flex>
    </Flex>
  );
};

const statusesProps = {
  [TodoStatus.New]: {
    container: {
      _hover: {
        borderColor: "teal.500",
      },
    },
    text: {},
  },
  [TodoStatus.InProgress]: {
    container: {},
    text: {},
  },
  [TodoStatus.Done]: {
    container: {
      borderStyle: "dashed",
    },
    text: {
      decoration: "line-through",
    },
  },
};

type TodoPriorityIconProps = Pick<TodoType, "priority"> &
  Omit<IconButtonProps, "aria-label">;

const TodoPriorityIcon = ({ priority, ...props }: TodoPriorityIconProps) => {
  const { icon, color } = priorities[priority];

  return (
    <IconButton
      {...props}
      color={color}
      icon={icon}
      _hover={{
        bg: color,
        color: "white",
      }}
      aria-label="Todo priority"
      variant="ghost"
      rounded="full"
      mr={2}
    />
  );
};

const priorities = {
  [TodoPriority.High]: {
    icon: <ArrowUpIcon />,
    color: "red.500",
  },
  [TodoPriority.Medium]: {
    icon: <ArrowForwardIcon />,
    color: "yellow.500",
  },
  [TodoPriority.Low]: {
    icon: <ArrowDownIcon />,
    color: "green.500",
  },
};
