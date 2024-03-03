import { configureStore } from "@reduxjs/toolkit";
import urlSlice from "./urlSlice";
import loadingSlice from "./loadingSlice";
import emptySlice from "./emptySlice";
const store = configureStore({
  reducer: {
    urlSlice: urlSlice,
    loadingSlice: loadingSlice,
    emptySlice: emptySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
