import calendarReducer, { setCalendarData } from "./calendarSlice";
import { ICalendar } from "../../shared/models/Calendar";

describe("Calendar Slice", () => {
  it("should return the initial state", () => {
    const initialState = { calendar: [], loading: false };
    expect(calendarReducer(undefined, { type: "@@INIT" })).toEqual(
      initialState
    );
  });

  it("should set the value of calendar state", () => {
    const initialState = { calendar: [], loading: false };
    const newCalendar: ICalendar[] = [
      {
        sqNo: 1,
        week: "W01",
        weekLabel: "Week 01",
        month: "M01",
        monthLabel: "Feb",
      },
      {
        sqNo: 2,
        week: "W02",
        weekLabel: "Week 02",
        month: "M01",
        monthLabel: "Feb",
      },
    ];

    const nextState = calendarReducer(
      initialState,
      setCalendarData(newCalendar)
    );
    expect(nextState.calendar).toEqual(newCalendar);
  });
});
