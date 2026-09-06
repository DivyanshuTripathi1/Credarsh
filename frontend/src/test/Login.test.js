import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import Login from "../landing_page/signup/Login";
import { setSession } from "../utils/auth";

jest.mock("axios");
jest.mock("../utils/auth", () => ({
  setSession: jest.fn(),
}));

describe("Login Component", () => {
  const originalLocation = window.location;

  beforeEach(() => {
    jest.clearAllMocks();
    delete window.location;
    window.location = { href: "" };
  });

  afterAll(() => {
    window.location = originalLocation;
  });

  test("renders all login form elements properly", () => {
    render(<Login />);

    // Header & Tagline
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Secure login to your account")).toBeInTheDocument();

    // Input fields & labels
    expect(screen.getByLabelText(/user id \/ email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your user ID or email")).toBeInTheDocument();

    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your password")).toBeInTheDocument();

    // Submit button
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();

    // Footer note
    expect(
      screen.getByText(/by continuing, you agree to our terms and privacy policy/i)
    ).toBeInTheDocument();
  });

  test("updates email and password inputs on change", () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText("Your user ID or email");
    const passwordInput = screen.getByPlaceholderText("Your password");

    fireEvent.change(emailInput, { target: { value: "trader@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "secretPass" } });

    expect(emailInput.value).toBe("trader@example.com");
    expect(passwordInput.value).toBe("secretPass");
  });

  test("submits form successfully and saves session and redirects", async () => {
    const mockResponse = {
      data: {
        success: true,
        sessionId: "sess-abc-789",
        user: { id: "u123", username: "trader1", email: "trader@example.com" },
      },
    };
    axios.post.mockResolvedValueOnce(mockResponse);

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Your user ID or email"), {
      target: { value: "trader@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Your password"), {
      target: { value: "secretPass" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    });

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3002/login",
      {
        email: "trader@example.com",
        password: "secretPass",
      },
      { withCredentials: true }
    );

    expect(setSession).toHaveBeenCalledWith("sess-abc-789", mockResponse.data.user);
    expect(window.location.href).toBe("/");
  });

  test("displays error message when login response success is false", async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        success: false,
        message: "Invalid credentials",
      },
    });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Your user ID or email"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Your password"), {
      target: { value: "wrongPassword" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    });

    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    expect(setSession).not.toHaveBeenCalled();
    expect(window.location.href).toBe("");
  });

  test("displays error message when API call rejects with server error response", async () => {
    axios.post.mockRejectedValueOnce({
      response: {
        data: {
          message: "Account not found",
        },
      },
    });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Your user ID or email"), {
      target: { value: "notfound@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Your password"), {
      target: { value: "mypassword" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    });

    expect(screen.getByText("Account not found")).toBeInTheDocument();
    expect(setSession).not.toHaveBeenCalled();
  });

  test("displays default fallback error message when network error occurs without response message", async () => {
    axios.post.mockRejectedValueOnce(new Error("Network Error"));

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Your user ID or email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Your password"), {
      target: { value: "mypassword" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    });

    expect(
      screen.getByText("Login failed. Please try again.")
    ).toBeInTheDocument();
  });

  test("shows loading state and disables submit button during submission", async () => {
    let resolvePromise;
    const pendingPromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    axios.post.mockReturnValueOnce(pendingPromise);

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Your user ID or email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Your password"), {
      target: { value: "password123" },
    });

    const submitButton = screen.getByRole("button", { name: /sign in/i });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(screen.getByText("Signing in...")).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    await act(async () => {
      resolvePromise({ data: { success: true, sessionId: "sess-1", user: {} } });
    });
  });
});
