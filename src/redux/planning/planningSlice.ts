import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPlanning } from "../../shared/models/Planning";
import * as XLSX from "xlsx";

interface PlanningState {
  planning: IPlanning[];
  loading?: boolean;
}

interface RawPlanningData {
  Store: string;
  SKU: string;
  Week: string;
  "Sales Units": number;
}

const initialState: PlanningState = {
  planning: [],
  loading: false,
};

const planningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {
    setPlanningData: (state, action) => {
      state.planning = action.payload;
    },
    updateSalesUnits: (state, action) => {
      const { rowIndex, value, week } = action.payload;
      state.planning.sort(
        (a, b) =>
          Number(b["w01-salesUnits"] ?? 0) - Number(a["w01-salesUnits"] ?? 0)
      );

      if (state.planning[rowIndex]) {
        state.planning[rowIndex][`${week.toLowerCase()}-salesUnits`] = value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlanningData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlanningData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchPlanningData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setPlanningData, updateSalesUnits } = planningSlice.actions;
export default planningSlice.reducer;

// Async Thunk for Importing XLSX Data
export const fetchPlanningData = createAsyncThunk(
  "store/fetchStoresData",
  async (filePath: string, { dispatch }) => {
    try {
      const response = await fetch(filePath);
      const arrayBuffer = await response.arrayBuffer();

      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      const sheetName = "Planning";
      const worksheet = workbook.Sheets[sheetName];

      // Convert to JSON
      const rawData: RawPlanningData[] = XLSX.utils.sheet_to_json(worksheet);
      const transformedData = rawData.map((item) => ({
        store: item["Store"] || "",
        sku: item["SKU"] || "",
        week: item["Week"].toLowerCase() || "",
        salesUnits: item["Sales Units"] || 0,
      }));

      const groupedData: {
        [key: string]: {
          store: string;
          sku: string;
          [key: string]: number | string;
        };
      } = {};

      transformedData.forEach(({ store, sku, week, salesUnits }) => {
        const key = `${store}-${sku}`;

        if (!groupedData[key]) {
          groupedData[key] = { store, sku };
        }

        groupedData[key][`${week}-salesUnits`] = salesUnits;
      });

      dispatch(setPlanningData(Object.values(groupedData)));
    } catch (error) {
      console.error("Error reading Excel file:", error);
    }
  }
);
