import { Flex, FlexProps } from "@chakra-ui/react";

export const Card = (props: FlexProps) => {
  return (
    <Flex
      bg="whiteAlpha.50"
      direction="column"
      p={4}
      rounded="xl"
      w="full"
      {...props}
    />
  );
};
