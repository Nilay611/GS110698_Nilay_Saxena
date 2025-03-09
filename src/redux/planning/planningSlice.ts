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
    updateSalesUnits: (state, action) => {
      const { rowIndex, value, week } = action.payload;
      if (state.planning[rowIndex]) {
        state.planning[rowIndex][`${week.toLowerCase()}-salesUnits`] = value;
      }
    },
  },
});

export const { setPlanningData, updateSalesUnits } = planningSlice.actions;
export default planningSlice.reducer;
