import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  Grid,
  GridItem,
  HStack,
  IconButton,
  Select,
  StackProps,
  Tag,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "~/hooks/useAppDispatch";
import {
  changePageSize,
  nextPage,
  previousPage,
  selectPagination,
} from "./paginationSlice";
import { selectTodos } from "./todosSlice";

export const Pagination = (props: StackProps) => {
  const dispatch = useDispatch();
  const todos = useAppSelector(selectTodos);
  const { page, pages, hasPreviousPage, hasNextPage, pageSize } =
    useAppSelector(selectPagination);

  if (todos.length === 0) return null;

  const handlePreviousClick = () => {
    dispatch(previousPage());
  };

  const handleNextClick = () => {
    dispatch(nextPage());
  };

  const handlePageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(changePageSize(Number(e.target.value)));
  };

  return (
    <Grid
      {...props}
      templateRows={{ base: "repeat(2, 1fr)", md: "none" }}
      templateColumns="repeat(3, 1fr)"
      rowGap={4}
    >
      <GridItem colSpan={1} colStart={2} mx="auto">
        <HStack spacing={4}>
          <IconButton
            icon={<ArrowLeftIcon />}
            aria-label="Previous page"
            onClick={handlePreviousClick}
            disabled={!hasPreviousPage}
          />
          <Tag h={10} whiteSpace="nowrap" fontSize="medium">
            {page} / {pages}
          </Tag>
          <IconButton
            icon={<ArrowRightIcon />}
            aria-label="Previous page"
            onClick={handleNextClick}
            disabled={!hasNextPage}
          />
        </HStack>
      </GridItem>
      <GridItem
        rowStart={{ base: 2, md: "auto" }}
        colStart={{ base: 2, md: "auto" }}
        ml="auto"
        mr={{ base: "auto", md: 0 }}
      >
        <Select onChange={handlePageSizeChange} value={pageSize}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </Select>
      </GridItem>
    </Grid>
  );
};
