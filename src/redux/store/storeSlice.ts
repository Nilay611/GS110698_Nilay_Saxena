import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IStore } from "../../shared/models/Store";
import * as XLSX from "xlsx";

interface StoreState {
  stores: IStore[];
  loading: boolean;
}

interface RawStoreData {
  "Seq No.": number;
  ID: string;
  Label: string;
  City: string;
  State: string;
}

const initialState: StoreState = {
  stores: [],
  loading: false,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoresData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStoresData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchStoresData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setStoreData, addStore, removeStore, updateStore } =
  storeSlice.actions;
export default storeSlice.reducer;

// Async Thunk for Importing XLSX Data
export const fetchStoresData = createAsyncThunk(
  "store/fetchStoresData",
  async (filePath: string, { dispatch }) => {
    try {
      const response = await fetch(filePath);
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      const sheetName = "Stores";
      const worksheet = workbook.Sheets[sheetName];

      // Convert to JSON
      const rawData: RawStoreData[] = XLSX.utils.sheet_to_json(worksheet);
      const transformedData: IStore[] = rawData.map((item, index) => ({
        sqNo: index + 1,
        id: item["ID"] || "",
        label: item["Label"] || "",
        city: item["City"] || "",
        state: item["State"] || "",
      }));

      dispatch(setStoreData(transformedData));
    } catch (error) {
      console.error("Error reading Excel file:", error);
    }
  }
);
