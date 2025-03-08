import { configureStore } from "@reduxjs/toolkit";
import storeSlice from "./store/storeSlice";

export const store = configureStore({
  reducer: {
    store: storeSlice,
  },
});

export type RootState = ReturnType<typeof store.dispatch>;
export type AppDispatch = typeof store.dispatch;
