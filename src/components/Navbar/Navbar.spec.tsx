import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import Navbar from "./Navbar";
import authReducer from "../../redux/auth/authSlice";
import { Provider } from "react-redux";

describe("Navbar Component", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          username: "user",
          isLoggedIn: true,
        },
      },
    });
  });

  it("should render the Navbar correctly", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );
    const element = getByTestId("navbar");
    expect(element).toBeInTheDocument();
  });

  it("should display the GSynergy logo", () => {
    const { getByAltText } = render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );
    const element = getByAltText("GSynergy Logo");
    expect(element).toBeInTheDocument();
  });
});
