import { configureStore } from "@reduxjs/toolkit";
import { orderReducer } from "./features/todos/orderSlice";
import { searchReducer } from "./features/todos/searchSlice";
import { todosReducer } from "./features/todos/todosSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    search: searchReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
