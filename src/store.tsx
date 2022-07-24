import { configureStore } from "@reduxjs/toolkit";
import { filterReducer } from "./features/todos/filterSlice";
import { orderReducer } from "./features/todos/orderSlice";
import { paginationReducer } from "./features/todos/paginationSlice";
import { searchReducer } from "./features/todos/searchSlice";
import { todosReducer } from "./features/todos/todosSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    search: searchReducer,
    order: orderReducer,
    filter: filterReducer,
    pagination: paginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
