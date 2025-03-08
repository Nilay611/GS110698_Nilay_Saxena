import { render } from "@testing-library/react";
import Navbar from "./Navbar";

describe("Navbar Component", () => {
  it("should render the Navbar correctly", () => {
    const { getByTestId } = render(<Navbar />);
    const element = getByTestId("navbar");
    expect(element).toBeInTheDocument();
  });

  it("should display the GSynergy logo", () => {
    const { getByAltText } = render(<Navbar />);
    const element = getByAltText("GSynergy Logo");
    expect(element).toBeInTheDocument();
  });
});
