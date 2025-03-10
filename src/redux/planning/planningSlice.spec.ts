import planningReducer, { setPlanningData } from "./planningSlice";
import { IPlanning } from "../../shared/models/Planning";

describe("Planning Slice", () => {
  it("should return the initial state", () => {
    const initialState = { planning: [], loading: false };
    expect(planningReducer(undefined, { type: "@@INIT" })).toEqual(
      initialState
    );
  });

  it("should set the value of planning state", () => {
    const initialState = { planning: [], loading: false };
    const newPlanning: IPlanning[] = [
      {
        store: "ST035",
        sku: "SK0156",
        price: 110,
        cost: 20,
      },
      {
        store: "ST036",
        sku: "SK0160",
        price: 144.99,
        cost: 49.99,
      },
    ];

    const nextState = planningReducer(
      initialState,
      setPlanningData(newPlanning)
    );
    expect(nextState.planning).toEqual(newPlanning);
  });
});
