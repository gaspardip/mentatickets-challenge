import { SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { ClearButton } from "~/components/button/ClearButton";
import { changeSearch, clearSearch } from "./searchSlice";

export const Search = (props: InputGroupProps) => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useDebouncedCallback(
    () => dispatch(changeSearch(inputRef.current!.value)),
    300
  );

  const handleClearSearch = () => {
    inputRef.current!.value = "";
    dispatch(clearSearch());
  };

  return (
    <InputGroup {...props}>
      <InputLeftElement pointerEvents="none" alignItems="center" h="full">
        <SearchIcon color="gray.500" boxSize={4} />
      </InputLeftElement>
      <Input
        ref={inputRef}
        placeholder="Search..."
        rounded="full"
        size="lg"
        onChange={handleChange}
      />
      <InputRightElement h="full">
        <ClearButton aria-label="Clear search" onClick={handleClearSearch} />
      </InputRightElement>
    </InputGroup>
  );
};
