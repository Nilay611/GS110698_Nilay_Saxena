import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISku } from "../../shared/models/Sku";
import * as XLSX from "xlsx";

interface SkuState {
  skus: ISku[];
  loading?: boolean;
}

interface RawSkuData {
  ID: string;
  Label: string;
  Class: string;
  Department: string;
  Price: number;
  Cost: number;
}

const initialState: SkuState = {
  skus: [],
  loading: false,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkusData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSkusData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchSkusData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSkuData, addSku, removeSku, updateSku } = skuSlice.actions;
export default skuSlice.reducer;

// Async Thunk for Importing XLSX Data
export const fetchSkusData = createAsyncThunk(
  "store/fetchStoresData",
  async (filePath: string, { dispatch }) => {
    try {
      const response = await fetch(filePath);
      const arrayBuffer = await response.arrayBuffer();

      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      const sheetName = "SKUs";
      const worksheet = workbook.Sheets[sheetName];

      // Convert to JSON
      const rawData: RawSkuData[] = XLSX.utils.sheet_to_json(worksheet);
      const transformedData: ISku[] = rawData.map((item) => ({
        id: item["ID"] || "",
        label: item["Label"] || "",
        class: item["Class"] || "",
        department: item["Department"] || "",
        price: parseFloat((item["Price"] || 0).toFixed(2)), // Format to 2 decimal places
        cost: parseFloat((item["Cost"] || 0).toFixed(2)), // Format to 2 decimal places
      }));

      dispatch(setSkuData(transformedData));
    } catch (error) {
      console.error("Error reading Excel file:", error);
    }
  }
);
