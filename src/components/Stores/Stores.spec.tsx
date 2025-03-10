import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Stores from "./Stores";
import { IStore } from "../../shared/models/Store";
import storeReducer from "../../redux/store/storeSlice";

describe("Stores Component", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        store: storeReducer,
      },
      preloadedState: {
        store: {
          stores: [
            {
              id: "1",
              sqNo: 1,
              label: "Store 1",
              city: "City 1",
              state: "State 1",
            },
            {
              id: "2",
              sqNo: 2,
              label: "Store 2",
              city: "City 2",
              state: "State 2",
            },
          ] as IStore[],
          loading: false,
        },
      },
    });
  });

  it("should render the component correctly", () => {
    render(
      <Provider store={store}>
        <Stores />
      </Provider>
    );

    expect(screen.getByTestId("stores-section")).toBeInTheDocument();
  });

  it("should render New Store button", () => {
    render(
      <Provider store={store}>
        <Stores />
      </Provider>
    );
    const newStoreButton = screen.getByTestId("new-store-button");
    expect(newStoreButton).toBeInTheDocument();
  });
});
