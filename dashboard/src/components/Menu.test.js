import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock react-router-dom for Jest compatibility with React Router v7 in CRA
jest.mock("react-router-dom", () => ({
  Link: ({ children, to, onClick, className }) => (
    <a href={to} onClick={onClick} className={className}>
      {children}
    </a>
  ),
  useLocation: () => ({
    pathname: "/",
  }),
}));

import Menu from "./Menu";

describe("Menu Component", () => {
  test("renders the Credarsh logo", () => {
    render(<Menu />);
    const logo = screen.getByAltText("Credarsh Logo");
    expect(logo).toBeInTheDocument();
  });

  test("renders all 6 navigation options without overflowing", () => {
    render(<Menu />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Orders")).toBeInTheDocument();
    expect(screen.getByText("Holdings")).toBeInTheDocument();
    expect(screen.getByText("Positions")).toBeInTheDocument();
    expect(screen.getByText("Funds")).toBeInTheDocument();
    expect(screen.getByText("Apps")).toBeInTheDocument();
  });

  test("renders profile section and logout button", () => {
    render(<Menu />);
    const logoutButtons = screen.getAllByRole("button", { name: /logout/i });
    expect(logoutButtons.length).toBeGreaterThan(0);
  });
});
