import storeReducer from "./storeSlice";

describe("Store Slice", () => {
  it("should return the initial state", () => {
    const initialState = { stores: [] };
    expect(storeReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });
});
