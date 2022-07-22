import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/store";
import { TodoProp } from "./todosSlice";

const initialState = { status: undefined, priority: undefined } as Record<
  TodoProp,
  "asc" | "desc" | undefined
>;

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    toggleOrder: (state, action: PayloadAction<TodoProp>) => {
      const order = state[action.payload];

      if (!order) {
        state[action.payload] = "asc";
        return;
      }

      state[action.payload] = order === "asc" ? "desc" : undefined;
    },
  },
});

export const { toggleOrder } = orderSlice.actions;

export const selectOrder = (state: RootState) => state.order;

export const selectOrderProp = (state: RootState, prop: TodoProp) =>
  state.order[prop];

export const { reducer: orderReducer } = orderSlice;
