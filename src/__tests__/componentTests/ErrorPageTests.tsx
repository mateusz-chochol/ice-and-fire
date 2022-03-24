import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ErrorPage from "components/misc/ErrorPage";

describe("ErrorPage", () => {
  it("Displays proper error message", async () => {
    render(<ErrorPage />);

    expect(screen.getByTestId("description")).toHaveTextContent(
      "Oops... Something went wrong"
    );
  });
});
