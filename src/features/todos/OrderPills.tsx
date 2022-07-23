import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Box, HStack, StackProps, Tag, useToken } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "~/hooks/useAppDispatch";
import { selectOrderProp, toggleOrder } from "./orderSlice";
import { TodoProp } from "./todosSlice";

export const OrderPills = (props: StackProps) => {
  return (
    <HStack {...props} spacing={4}>
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
      width={`${(1 / sortingProps.length) * 100}%`}
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

const sortingProps = ["status", "priority"] as TodoProp[];
