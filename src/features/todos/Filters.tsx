import { Flex, FlexProps } from "@chakra-ui/react";
import { MultiValue } from "chakra-react-select";
import { useDispatch } from "react-redux";
import { Select } from "~/components/select/Select";
import { changeFilter, clearFilter, FilterableTodoKey } from "./filterSlice";
import { TodoPriority, TodoStatus } from "./todosSlice";

export const Filters = (props: FlexProps) => {
  const dispatch = useDispatch();

  const createHandleChange =
    (prop: FilterableTodoKey) =>
    (
      values: MultiValue<{ value: TodoStatus | TodoPriority; label: string }>
    ) => {
      const action =
        values.length > 0
          ? changeFilter([prop, values.map(({ value }) => value)])
          : clearFilter(prop);

      dispatch(action);
    };

  const handleStatusChange = createHandleChange("status");
  const handlePriorityChange = createHandleChange("priority");

  return (
    <Flex {...props} position="relative" direction="column">
      <Select
        placeholder="Select status"
        options={statusOptions}
        onChange={handleStatusChange}
      />
      <Select
        placeholder="Select priority"
        options={priorityOptions}
        onChange={handlePriorityChange}
      />
    </Flex>
  );
};

const statusOptions = [
  { value: TodoStatus.New, label: "New" },
  { value: TodoStatus.InProgress, label: "In Progress" },
  { value: TodoStatus.Done, label: "Done" },
];

const priorityOptions = [
  { value: TodoPriority.Low, label: "Low" },
  { value: TodoPriority.Medium, label: "Medium" },
  { value: TodoPriority.High, label: "High" },
];
