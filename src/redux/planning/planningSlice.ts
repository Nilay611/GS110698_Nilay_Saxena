import { createSlice } from "@reduxjs/toolkit";
import { IPlanning } from "../../shared/models/Planning";

interface PlanningState {
  planning: IPlanning[];
}

const initialState: PlanningState = {
  planning: [],
};

const planningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {
    setPlanningData: (state, action) => {
      state.planning = action.payload;
    },
  },
});

export const { setPlanningData } = planningSlice.actions;
export default planningSlice.reducer;
