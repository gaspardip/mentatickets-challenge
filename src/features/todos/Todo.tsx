import {
  ArrowDownIcon,
  ArrowForwardIcon,
  ArrowUpIcon,
  CheckIcon,
  DeleteIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  IconButtonProps,
  Text,
  useDisclosure,
  useToken,
} from "@chakra-ui/react";
import { KeyboardEvent, MouseEvent, SyntheticEvent } from "react";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import { TodoDetailModal } from "./TodoDetailModal";
import {
  removeTodo,
  Todo as TodoType,
  TodoPriority,
  TodoStatus,
  toggleTodoPriority,
  toggleTodoStatus,
} from "./todosSlice";

interface TodoProps extends TodoType {}

export const Todo = (props: TodoProps) => {
  const { id, name, status, priority } = props;

  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const transitionProperty = useToken("transition.property", "colors");
  const transitionDuration = useToken("transition.duration", "normal");
  const transitionTimingFunction = useToken("transition.easing", "ease-in-out");

  const isDone = status === TodoStatus.Done;

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      onOpen();
    }
  };

  const handleCheckboxChange = (e: MouseEvent<HTMLButtonElement>) => {
    stopPropagation(e);
    dispatch(toggleTodoStatus(id));
  };

  const handleDeleteClick = (e: MouseEvent<HTMLButtonElement>) => {
    stopPropagation(e);
    dispatch(removeTodo(id));
  };

  const handlePriorityClick = (e: MouseEvent<HTMLButtonElement>) => {
    stopPropagation(e);
    dispatch(toggleTodoPriority(id));
  };

  return (
    <>
      <Flex
        px={4}
        py={2}
        borderWidth={2}
        borderStyle={isDone ? "dashed" : "solid"}
        rounded="full"
        justify="space-between"
        transitionProperty={transitionProperty}
        transitionDuration={transitionDuration}
        transitionTimingFunction={transitionTimingFunction}
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={handleKeyDown}
        _hover={{
          borderColor: "teal.500",
        }}
      >
        <Flex align="center" overflow="hidden">
          <TodoStatusIcon status={status} onClick={handleCheckboxChange} />
          <Text
            textDecoration={isDone ? "line-through" : "none"}
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {name}
          </Text>
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
      <TodoDetailModal {...props} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

const stopPropagation = (e: SyntheticEvent) => {
  e.stopPropagation();
};

type TodoStatusIconProps = Pick<TodoType, "status"> &
  Omit<IconButtonProps, "aria-label">;

const TodoStatusIcon = ({ status, ...props }: TodoStatusIconProps) => {
  const iconProps = statusesIconProps[status];

  return (
    <IconButton
      {...props}
      {...iconProps}
      size="sm"
      variant="outline"
      rounded="full"
      borderWidth={2}
      mr={4}
    />
  );
};

const statusesIconProps = {
  [TodoStatus.New]: {
    "aria-label": "New todo",
  },
  [TodoStatus.InProgress]: {
    colorScheme: "yellow",
    icon: <TimeIcon />,
    "aria-label": "In Progress",
  },
  [TodoStatus.Done]: {
    colorScheme: "teal",
    icon: <CheckIcon />,
    "aria-label": "Done",
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
