import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { AddNewStore } from "./AddNewStore";
import { IStore } from "../../../shared/models/Store";
import storeReducer from "../../../redux/store/storeSlice";

describe("AddNewStore Component", () => {
  let store: ReturnType<typeof configureStore>;
  let setAddNewStore: jest.Mock;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        store: storeReducer,
      },
      preloadedState: {
        store: {
          stores: [] as IStore[],
          loading: false,
        },
      },
    });

    setAddNewStore = jest.fn();
  });

  it("should render the component correctly", () => {
    render(
      <Provider store={store}>
        <AddNewStore addNewStore={true} setAddNewStore={setAddNewStore} />
      </Provider>
    );

    expect(screen.getByTestId("add-dialog-header")).toBeInTheDocument();
    expect(screen.getByLabelText("ID:")).toBeInTheDocument();
    expect(screen.getByLabelText("Store:")).toBeInTheDocument();
    expect(screen.getByLabelText("City:")).toBeInTheDocument();
    expect(screen.getByLabelText("State:")).toBeInTheDocument();
    expect(screen.getByTestId("add-dialog-button")).toBeInTheDocument();
  });

  it("should show error message when fields are empty", () => {
    render(
      <Provider store={store}>
        <AddNewStore addNewStore={true} setAddNewStore={setAddNewStore} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("add-dialog-button"));
    expect(screen.getByText("* All fields are mandatory")).toBeVisible();
  });

  it("should call setAddNewStore with false when close button is clicked", () => {
    render(
      <Provider store={store}>
        <AddNewStore addNewStore={true} setAddNewStore={setAddNewStore} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("close-dialog-button"));
    expect(setAddNewStore).toHaveBeenCalledWith(false);
  });
});
