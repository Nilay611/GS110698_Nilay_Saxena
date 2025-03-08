import storeReducer, { StoreState } from "./storeSlice";

describe("Store Slice", () => {
  it("should return the initial state", () => {
    const initialState: StoreState = { stores: [] };
    expect(storeReducer(initialState)).toEqual(initialState);
  });
});
