import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/store";
import { TodoPriority, TodoStatus } from "./todosSlice";

export type FilterableTodoKey = "status" | "priority";

const initialState = {
  status: [] as TodoStatus[],
  priority: [] as TodoPriority[],
} as const;

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilter: (
      state,
      {
        payload: [key, values],
      }: PayloadAction<[FilterableTodoKey, (TodoStatus | TodoPriority)[]]>
    ) => {
      state[key] = values;
    },
    clearFilter: (state, { payload }: PayloadAction<FilterableTodoKey>) => {
      state[payload] = initialState[payload];
    },
  },
});

export const { changeFilter, clearFilter } = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;

export const selectFilterProp = (state: RootState, prop: FilterableTodoKey) =>
  state.filter[prop];

export const { reducer: filterReducer } = filterSlice;
