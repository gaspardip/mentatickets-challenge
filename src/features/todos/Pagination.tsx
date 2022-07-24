import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { HStack, IconButton, StackProps, Tag } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "~/hooks/useAppDispatch";
import { nextPage, previousPage, selectPagination } from "./paginationSlice";
import { selectTodos } from "./todosSlice";

export const Pagination = (props: StackProps) => {
  const dispatch = useDispatch();
  const todos = useAppSelector(selectTodos);
  const { page, pages, hasPreviousPage, hasNextPage } =
    useAppSelector(selectPagination);

  const handlePreviousClick = () => {
    dispatch(previousPage());
  };

  const handleNextClick = () => {
    dispatch(nextPage());
  };

  if (todos.length === 0) {
    return null;
  }

  return (
    <HStack {...props} mt={4} spacing={4}>
      <IconButton
        icon={<ArrowLeftIcon />}
        aria-label="Previous page"
        onClick={handlePreviousClick}
        disabled={!hasPreviousPage}
      />
      <Tag h={10} justifyContent="center" fontSize="medium">
        {page} / {pages}
      </Tag>
      <IconButton
        icon={<ArrowRightIcon />}
        aria-label="Previous page"
        onClick={handleNextClick}
        disabled={!hasNextPage}
      />
    </HStack>
  );
};
