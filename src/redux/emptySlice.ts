import { Slice, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
interface StateType {
  loading: boolean;
}

interface ActionType {
  action: boolean;
}

const initialState: StateType = {
  loading: false,
};

export const emptySlice: Slice = createSlice({
  name: "emptyTf",
  initialState,
  reducers: {
    emptyFn: (state: any, action: PayloadAction<ActionType>): void => {
      state.loading = action.payload;
    },
  },
});
export const { emptyFn } = emptySlice.actions;
export const selectEmpty = (state: RootState) => state.emptySlice.loading;
export default emptySlice.reducer;
