import { Slice, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
interface StateType {
  detailUrl: string;
  evolutionUrl: string;
  infoUrl: string;
  typeUrl: string;
  listUrlFront: string;
  listUrlBack: string;
  listUrlBackForSearch: string;
}

interface ActionType {
  action: any;
}

const initialState: StateType = {
  detailUrl: "pokemon-species/",
  evolutionUrl: "evolution-chain/",
  infoUrl: "pokemon/",
  typeUrl: "type/",
  listUrlFront: "pokemon/?offset=",
  listUrlBack: "&limit=20",
  listUrlBackForSearch: "&limit=1",
};

export const urlSlice: Slice = createSlice({
  name: "url",
  initialState,
  reducers: {
    urlFn: (state: any, action: PayloadAction<ActionType>): void => {
      state.value = action.payload;
    },
  },
});

export const selectUrl = (state: RootState) => state.urlSlice;
export default urlSlice.reducer;
