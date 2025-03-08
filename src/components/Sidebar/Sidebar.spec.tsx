import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "./Sidebar";

describe("Sidebar Component", () => {
  it("should be rendered correctly", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );
    const element = getByTestId("sidebar");
    expect(element).toBeInTheDocument();
  });

  it("should have the Store button", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );
    const element = getByTestId("store-button");
    expect(element).toBeInTheDocument();
  });

  it("should have the Sku button", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );
    const element = getByTestId("sku-button");
    expect(element).toBeInTheDocument();
  });

  it("should have the Planning button", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );
    const element = getByTestId("planning-button");
    expect(element).toBeInTheDocument();
  });

  it("should have the Charts button", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );
    const element = getByTestId("charts-button");
    expect(element).toBeInTheDocument();
  });
});
