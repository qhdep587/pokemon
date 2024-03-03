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

export const loadingSlice: Slice = createSlice({
  name: "loadingTf",
  initialState,
  reducers: {
    loadingFn: (state: any, action: PayloadAction<ActionType>): void => {
      state.loading = action.payload;
    },
  },
});
export const { loadingFn } = loadingSlice.actions;
export const selectLoading = (state: RootState) => state.loadingSlice.loading;
export default loadingSlice.reducer;
