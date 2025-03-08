import { createSlice } from "@reduxjs/toolkit";

interface Store {
  sqNo: number;
  id: string;
  label: string;
  city: string;
  state: string;
}

interface StoreState {
  stores: Store[];
}

const initialState: StoreState = {
  stores: [],
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    addStore: (state, action) => {
      state.stores.push(action.payload);
    },
    removeStore: (state, action) => {
      state.stores.filter((store: Store) => store.id !== action.payload.id);
    },
    updateStore: (state, action) => {
      const index: number = state.stores.findIndex(
        (store: Store) => store.id === action.payload.id,
      );
      if (index !== -1) {
        state.stores[index] = action.payload;
      }
    },
  },
});

export const { addStore, removeStore, updateStore } = storeSlice.actions;
export default storeSlice.reducer;
