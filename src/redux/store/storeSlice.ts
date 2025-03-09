import { createSlice } from "@reduxjs/toolkit";
import { IStore } from "../../shared/models/Store";

interface StoreState {
  stores: IStore[];
}

const initialState: StoreState = {
  stores: [],
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setStoreData: (state, action) => {
      state.stores = action.payload;
    },
    addStore: (state, action) => {
      state.stores.push(action.payload);
    },
    removeStore: (state, action) => {
      state.stores = state.stores.filter(
        (store: IStore) => store.id != action.payload
      );

      state.stores.forEach((item, index) => {
        item.sqNo = index + 1;
      });
    },
    updateStore: (state, action) => {
      const index: number = state.stores.findIndex(
        (store: IStore) => store.id === action.payload.id
      );
      if (index !== -1) {
        state.stores[index] = action.payload;
      }

      // Ensuring that the stores are sorted by `sqNo` after update
      state.stores.sort((a, b) => a.sqNo - b.sqNo);
    },
  },
});

export const { setStoreData, addStore, removeStore, updateStore } =
  storeSlice.actions;
export default storeSlice.reducer;
