import { render, screen } from "@testing-library/react";
import { GridDeleteButton } from "./GridDeleteButton";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { IStore } from "../../../shared/models/Store";
import storeReducer from "../../../redux/store/storeSlice";

describe("GridDeleteButton component", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        store: storeReducer,
      },
      preloadedState: {
        store: {
          stores: [] as IStore[],
        },
      },
    });
  });

  it("renders the button successfully", () => {
    render(
      <Provider store={store}>
        <GridDeleteButton id="test" />
      </Provider>
    );
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });
});
