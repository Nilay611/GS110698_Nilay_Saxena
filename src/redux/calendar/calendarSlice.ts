import { createSlice } from "@reduxjs/toolkit";
import { ICalendar } from "../../shared/models/Calendar";

interface CalendarState {
  calendar: ICalendar[];
}

const initialState: CalendarState = {
  calendar: [],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCalendarData: (state, action) => {
      state.calendar = action.payload;
    },
  },
});

export const { setCalendarData } = calendarSlice.actions;
export default calendarSlice.reducer;
