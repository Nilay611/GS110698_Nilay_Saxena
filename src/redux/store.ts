import { configureStore } from "@reduxjs/toolkit";
import storeSlice from "./store/storeSlice";
import skuSlice from "./sku/skuSlice";
import calendarSlice from "./calendar/calendarSlice";
import planningSlice from "./planning/planningSlice";

export const store = configureStore({
  reducer: {
    store: storeSlice,
    sku: skuSlice,
    calendar: calendarSlice,
    planning: planningSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
