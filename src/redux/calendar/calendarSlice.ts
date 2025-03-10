import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICalendar } from "../../shared/models/Calendar";
import * as XLSX from "xlsx";

interface CalendarState {
  calendar: ICalendar[];
  loading?: boolean;
}

interface RawCalendarData {
  "Seq No.": number;
  Week: string;
  "Week Label": string;
  Month: string;
  "Month Label": string;
}

const initialState: CalendarState = {
  calendar: [],
  loading: false,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCalendarData: (state, action) => {
      state.calendar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalendarData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCalendarData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchCalendarData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setCalendarData } = calendarSlice.actions;
export default calendarSlice.reducer;

// Async Thunk for Importing XLSX Data
export const fetchCalendarData = createAsyncThunk(
  "store/fetchStoresData",
  async (filePath: string, { dispatch }) => {
    try {
      const response = await fetch(filePath);
      const arrayBuffer = await response.arrayBuffer();

      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      const sheetName = "Calendar";
      const worksheet = workbook.Sheets[sheetName];

      // Convert to JSON
      const rawData: RawCalendarData[] = XLSX.utils.sheet_to_json(worksheet);
      const transformedData: ICalendar[] = rawData.map((item) => ({
        sqNo: item["Seq No."] || 0,
        week: item["Week"] || "",
        weekLabel: item["Week Label"] || "",
        month: item["Month"] || "",
        monthLabel: item["Month Label"] || "",
      }));

      dispatch(setCalendarData(transformedData));
    } catch (error) {
      console.error("Error reading Excel file:", error);
    }
  }
);
