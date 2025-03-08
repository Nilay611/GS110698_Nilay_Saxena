import { render } from "@testing-library/react";
import { Sidebar } from "./Sidebar";

describe("Sidebar Component", () => {
  it("should be rendered correctly", () => {
    const { getByTestId } = render(<Sidebar />);
    const element = getByTestId("sidebar");
    expect(element).toBeInTheDocument();
  });

  it("should have the Stores button", () => {
    const { getByTestId } = render(<Sidebar />);
    const element = getByTestId("stores-button");
    expect(element).toBeInTheDocument();
  });

  it("should have the SKU button", () => {
    const { getByTestId } = render(<Sidebar />);
    const element = getByTestId("sku-button");
    expect(element).toBeInTheDocument();
  });

  it("should have the Planning button", () => {
    const { getByTestId } = render(<Sidebar />);
    const element = getByTestId("planning-button");
    expect(element).toBeInTheDocument();
  });

  it("should have the Charts button", () => {
    const { getByTestId } = render(<Sidebar />);
    const element = getByTestId("charts-button");
    expect(element).toBeInTheDocument();
  });
});
