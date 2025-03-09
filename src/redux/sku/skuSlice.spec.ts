import skuReducer, { addSku, removeSku, updateSku } from "./skuSlice";
import { ISku } from "../../shared/models/Sku";

describe("Sku Slice", () => {
  it("should return the initial state", () => {
    const initialState = { skus: [] };
    expect(skuReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("should add a sku to the skus state", () => {
    const initialState = { skus: [] };
    const newSku: ISku = {
      id: "SK00269",
      label: "Faux Leather Leggings",
      class: "Tops",
      department: "Footwear",
      price: 9.99,
      cost: 18.28341,
    };

    const nextState = skuReducer(initialState, addSku(newSku));
    expect(nextState.skus).toEqual([newSku]);
  });

  it("should remove a sku from the skus state", () => {
    const initialState = {
      skus: [
        {
          id: "SK00269",
          label: "Faux Leather Leggings",
          class: "Tops",
          department: "Footwear",
          price: 9.99,
          cost: 18.28341,
        },
      ],
    };

    const nextState = skuReducer(initialState, removeSku("SK00269"));
    expect(nextState.skus).toEqual([]);
  });

  it("should update the skus in the skus state", () => {
    const initialState = {
      skus: [
        {
          id: "SK00269",
          label: "Faux Leather Leggings",
          class: "Tops",
          department: "Footwear",
          price: 9.99,
          cost: 18.28341,
        },
      ],
    };
    const updatedSku = {
      id: "SK00269",
      label: "Cotton Polo Shirt",
      class: "Tops",
      department: "Footwear",
      price: 139.99,
      cost: 10.78,
    };

    const nextState = skuReducer(initialState, updateSku(updatedSku));
    expect(nextState.skus).toEqual([updatedSku]);
  });
});
