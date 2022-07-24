import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Fuse from "fuse.js";
import { orderBy } from "lodash";
import { RootState } from "../../store";
import { FilterableTodoKey, selectFilter } from "./filterSlice";
import { selectOrder } from "./orderSlice";
import { selectSearch } from "./searchSlice";

export enum TodoPriority {
  Low,
  Medium,
  High,
}

export enum TodoStatus {
  New,
  InProgress,
  Done,
}

export interface Todo {
  id: string;
  name: string;
  description: string;
  priority: TodoPriority;
  status: TodoStatus;
}

export type TodoProp = keyof Todo;

const initialState = [] as Todo[];

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Omit<Todo, "id" | "status">>) => {
      const newTodo = {
        ...action.payload,
        id: Date.now().toString(),
        status: TodoStatus.New,
      };

      state.push(newTodo);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const todo = state.find((todo) => todo.id === action.payload.id);

      if (!todo) return;

      todo.name = action.payload.name;
      todo.description = action.payload.description;
      todo.priority = action.payload.priority;
      todo.status = action.payload.status;
    },
    toggleTodoStatus: (state, action: PayloadAction<string>) => {
      const todo = state.find((todo) => todo.id === action.payload);

      if (!todo) return;

      todo.status =
        todo.status === TodoStatus.New ? TodoStatus.Done : TodoStatus.New;
    },
    toggleTodoPriority: (state, action: PayloadAction<string>) => {
      const todo = state.find((todo) => todo.id === action.payload);

      if (!todo) return;

      todo.priority =
        todo.priority === TodoPriority.Low
          ? TodoPriority.Medium
          : todo.priority === TodoPriority.Medium
          ? TodoPriority.High
          : TodoPriority.Low;
    },
  },
});

export const {
  addTodo,
  removeTodo,
  updateTodo,
  toggleTodoStatus,
  toggleTodoPriority,
} = todosSlice.actions;

export const selectAllTodos = (state: RootState) => state.todos;

export const selectTodos = createSelector(
  selectAllTodos,
  selectSearch,
  selectFilter,
  selectOrder,
  (todos, search, filter, order) => {
    let results = todos;

    if (search) {
      const fuse = new Fuse(todos, {
        shouldSort: true,
        threshold: 0.25,
        keys: ["name", "description"],
      });

      results = fuse.search(search).map((result) => result.item);
    }

    const filterEntries = Object.entries(filter).filter(
      ([, values]) => values.length > 0
    );

    if (filterEntries.length) {
      results = results.filter((todo) =>
        filterEntries.every(([key, values]) => {
          const value = todo[key as FilterableTodoKey];

          return values.includes(value);
        })
      );
    }

    const orderEntries = Object.entries(order).filter(
      ([, value]) => value !== undefined
    );

    if (orderEntries.length) {
      const [orderKeys, orderValues] = orderEntries.reduce(
        (acc, [key, value]) => {
          const [keys, values] = acc;

          if (value) {
            keys.push(key as TodoProp);
            values.push(value);
          }

          return acc;
        },
        [[], []] as [TodoProp[], ("asc" | "desc")[]]
      );

      results = orderBy(results, orderKeys, orderValues);
    }

    return results;
  }
);

export const selectTodosStats = createSelector(selectTodos, (todos) => {
  const stats = todos.reduce(
    (acc, { priority, status }) => {
      switch (priority) {
        case TodoPriority.Low:
          acc.low++;
          break;
        case TodoPriority.Medium:
          acc.medium++;
          break;
        case TodoPriority.High:
          acc.high++;
          break;
      }

      switch (status) {
        case TodoStatus.New:
          acc.new++;
          break;
        case TodoStatus.InProgress:
          acc.inProgress++;
          break;
        case TodoStatus.Done:
          acc.done++;
          break;
      }

      return acc;
    },
    { low: 0, medium: 0, high: 0, new: 0, inProgress: 0, done: 0 }
  );

  return { ...stats, total: todos.length };
});

export const { reducer: todosReducer } = todosSlice;
