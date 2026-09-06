import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Apps from "./Apps";

describe("Apps Component", () => {
  test("renders the Apps header and summary counters", () => {
    render(<Apps />);
    expect(screen.getByText("Apps & Integrations")).toBeInTheDocument();
    expect(
      screen.getByText(/explore and connect specialized trading/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Total Apps")).toBeInTheDocument();
    expect(screen.getAllByText("Connected").length).toBeGreaterThan(0);
  });

  test("renders initial app cards", () => {
    render(<Apps />);
    expect(screen.getByText("Market Screener")).toBeInTheDocument();
    expect(screen.getByText("Strategy Lab")).toBeInTheDocument();
    expect(screen.getByText("SIP & Stock Baskets")).toBeInTheDocument();
    expect(screen.getByText("Tax & P&L Insights")).toBeInTheDocument();
  });

  test("filters app cards by category pill", () => {
    render(<Apps />);
    const devPill = screen.getByRole("button", { name: /^developer$/i });
    fireEvent.click(devPill);

    expect(screen.getByText("Developer Trading API")).toBeInTheDocument();
    expect(screen.queryByText("Market Screener")).not.toBeInTheDocument();
  });

  test("filters app cards via search input", () => {
    render(<Apps />);
    const searchInput = screen.getByPlaceholderText("Search tools & apps...");
    fireEvent.change(searchInput, { target: { value: "tax" } });

    expect(screen.getByText("Tax & P&L Insights")).toBeInTheDocument();
    expect(screen.queryByText("Market Screener")).not.toBeInTheDocument();
  });

  test("toggles connect and disconnect status on action button click", () => {
    render(<Apps />);
    const disconnectButtons = screen.getAllByRole("button", { name: /disconnect/i });
    expect(disconnectButtons.length).toBeGreaterThan(0);

    fireEvent.click(disconnectButtons[0]);
    expect(screen.getByText(/disconnected/i)).toBeInTheDocument();
  });
});
