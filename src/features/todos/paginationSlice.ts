import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/store";
import { selectTodos } from "./todosSlice";

const initialState = {
  page: 1,
  pageSize: 5,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    previousPage: (state) => {
      state.page = state.page - 1;
    },
    nextPage: (state) => {
      state.page = state.page + 1;
    },
    changePageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
  },
});

export const { previousPage, nextPage, changePageSize } =
  paginationSlice.actions;

export const selectPagination = (state: RootState) => {
  const todos = selectTodos(state);
  const pages = Math.ceil(todos.length / state.pagination.pageSize);

  return {
    ...state.pagination,
    pages,
    hasPreviousPage: state.pagination.page > initialState.page,
    hasNextPage: state.pagination.page < pages,
  };
};

export const selectPaginatedTodos = createSelector(
  selectTodos,
  selectPagination,
  (todos, pagination) =>
    todos.slice(
      (pagination.page - 1) * pagination.pageSize,
      pagination.page * pagination.pageSize
    )
);

export const { reducer: paginationReducer } = paginationSlice;
