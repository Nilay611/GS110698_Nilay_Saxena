import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Skus from "./Skus";
import { ISku } from "../../shared/models/Sku";
import skuReducer from "../../redux/sku/skuSlice";

describe("SKU Component", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        sku: skuReducer,
      },
      preloadedState: {
        sku: {
          skus: [
            {
              id: "1",
              label: "SKU 1",
              class: "Class 1",
              department: "Dept 1",
              price: 20,
              cost: 10,
            },
            {
              id: "2",
              label: "SKU 2",
              class: "Class 2",
              department: "Dept 2",
              price: 10,
              cost: 5,
            },
          ] as ISku[],
          loading: false,
        },
      },
    });
  });

  it("should render the component correctly", () => {
    render(
      <Provider store={store}>
        <Skus />
      </Provider>
    );

    expect(screen.getByTestId("skus-section")).toBeInTheDocument();
  });

  it("should render New SKU button", () => {
    render(
      <Provider store={store}>
        <Skus />
      </Provider>
    );
    const newSkuButton = screen.getByTestId("new-sku-button");
    expect(newSkuButton).toBeInTheDocument();
  });
});
