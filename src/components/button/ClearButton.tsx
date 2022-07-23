import { CloseIcon } from "@chakra-ui/icons";
import { IconButton, IconButtonProps } from "@chakra-ui/react";

export const ClearButton = (props: IconButtonProps) => {
  return (
    <IconButton
      {...props}
      icon={<CloseIcon />}
      colorScheme="red"
      size="xs"
      rounded="full"
      variant="ghost"
      mr={2}
    />
  );
};
