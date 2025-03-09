import { createSlice } from "@reduxjs/toolkit";
import { ISku } from "../../shared/models/Sku";

interface SkuState {
  skus: ISku[];
}

const initialState: SkuState = {
  skus: [],
};

const skuSlice = createSlice({
  name: "sku",
  initialState,
  reducers: {
    setSkuData: (state, action) => {
      state.skus = action.payload;
    },
    addSku: (state, action) => {
      state.skus.push(action.payload);
    },
    removeSku: (state, action) => {
      state.skus = state.skus.filter((sku: ISku) => sku.id != action.payload);
    },
    updateSku: (state, action) => {
      const index: number = state.skus.findIndex(
        (sku: ISku) => sku.id === action.payload.id
      );
      if (index !== -1) {
        state.skus[index] = action.payload;
      }
    },
  },
});

export const { setSkuData, addSku, removeSku, updateSku } = skuSlice.actions;
export default skuSlice.reducer;
