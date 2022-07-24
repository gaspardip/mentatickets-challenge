import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Box,
  SimpleGrid,
  SimpleGridProps,
  Tag,
  useToken,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "~/hooks/useAppDispatch";
import { selectOrderProp, toggleOrder } from "./orderSlice";
import { TodoProp } from "./todosSlice";

export const OrderPills = (props: SimpleGridProps) => {
  return (
    <SimpleGrid {...props} columns={2} spacing={4}>
      {sortingProps.map((prop) => (
        <OrderPill key={prop} prop={prop} />
      ))}
    </SimpleGrid>
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

  const Icon = order === "desc" ? TriangleDownIcon : TriangleUpIcon;

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
      key={prop}
      as="button"
      size="lg"
      rounded="full"
      onClick={handleClick}
      borderWidth={1}
      width="full"
      transitionProperty={transitionProperty}
      transitionDuration={transitionDuration}
      transitionTimingFunction={transitionTimingFunction}
      justifyContent="center"
    >
      <Icon mr={2} />{" "}
      <Box as="span" textTransform="capitalize">
        {prop}
      </Box>
    </Tag>
  );
};

const sortingProps = [
  "name",
  "description",
  "status",
  "priority",
] as TodoProp[];
