import { configureStore } from "@reduxjs/toolkit";
import storeSlice from "./store/storeSlice";
import skuSlice from "./sku/skuSlice";

export const store = configureStore({
  reducer: {
    store: storeSlice,
    sku: skuSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
