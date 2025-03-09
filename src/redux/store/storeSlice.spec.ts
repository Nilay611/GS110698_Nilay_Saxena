import storeReducer, { addStore, removeStore, updateStore } from "./storeSlice";
import { IStore } from "../../shared/models/Store";

describe("Store Slice", () => {
  it("should return the initial state", () => {
    const initialState = { stores: [] };
    expect(storeReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("should add a store to the stores state", () => {
    const initialState = { stores: [] };
    const newStore: IStore = {
      sqNo: 1,
      id: "ST035",
      label: "San Francisco Bay Trends",
      city: "San Francisco",
      state: "CA",
    };

    const nextState = storeReducer(initialState, addStore(newStore));
    expect(nextState.stores).toEqual([newStore]);
  });

  it("should remove a store from the stores state", () => {
    const initialState = {
      stores: [
        {
          sqNo: 1,
          id: "ST035",
          label: "San Francisco Bay Trends",
          city: "San Francisco",
          state: "CA",
        },
      ],
    };

    const nextState = storeReducer(initialState, removeStore("ST035"));
    expect(nextState.stores).toEqual([]);
  });

  it("should update the store in the stores state", () => {
    const initialState = {
      stores: [
        {
          sqNo: 1,
          id: "ST035",
          label: "San Francisco Bay Trends",
          city: "San Francisco",
          state: "CA",
        },
      ],
    };
    const updatedStore = {
      sqNo: 1,
      id: "ST035",
      label: "Phoenix Sunwear",
      city: "Phoenix",
      state: "AZ",
    };

    const nextState = storeReducer(initialState, updateStore(updatedStore));
    expect(nextState.stores).toEqual([updatedStore]);
  });
});
