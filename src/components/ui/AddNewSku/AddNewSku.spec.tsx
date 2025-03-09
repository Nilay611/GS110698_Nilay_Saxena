import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { AddNewSku } from "./AddNewSku";
import { ISku } from "../../../shared/models/Sku";
import skuReducer from "../../../redux/sku/skuSlice";

describe("AddNewSku Component", () => {
  let store: ReturnType<typeof configureStore>;
  let setAddNewSku: jest.Mock;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        sku: skuReducer,
      },
      preloadedState: {
        sku: {
          skus: [] as ISku[],
        },
      },
    });

    setAddNewSku = jest.fn();
  });

  it("should render the component correctly", () => {
    render(
      <Provider store={store}>
        <AddNewSku addNewSku={true} setAddNewSku={setAddNewSku} />
      </Provider>
    );

    expect(screen.getByTestId("add-dialog-header")).toBeInTheDocument();
    expect(screen.getByLabelText("ID:")).toBeInTheDocument();
    expect(screen.getByLabelText("SKU:")).toBeInTheDocument();
    expect(screen.getByLabelText("Class:")).toBeInTheDocument();
    expect(screen.getByLabelText("Department:")).toBeInTheDocument();
    expect(screen.getByLabelText("Price:")).toBeInTheDocument();
    expect(screen.getByLabelText("Cost:")).toBeInTheDocument();
    expect(screen.getByTestId("add-dialog-button")).toBeInTheDocument();
  });

  it("should show error message when fields are empty", () => {
    render(
      <Provider store={store}>
        <AddNewSku addNewSku={true} setAddNewSku={setAddNewSku} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("add-dialog-button"));
    expect(screen.getByText("* All fields are mandatory")).toBeVisible();
  });

  it("should call setAddNewSku with false when close button is clicked", () => {
    render(
      <Provider store={store}>
        <AddNewSku addNewSku={true} setAddNewSku={setAddNewSku} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("close-dialog-button"));
    expect(setAddNewSku).toHaveBeenCalledWith(false);
  });
});
