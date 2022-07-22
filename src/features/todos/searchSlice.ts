import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/store";

const initialState = "";

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changeSearch: (_, action: PayloadAction<string>) => action.payload,
    clearSearch: () => initialState,
  },
});

export const { changeSearch, clearSearch } = searchSlice.actions;

export const selectSearch = (state: RootState) => state.search;

export const { reducer: searchReducer } = searchSlice;
