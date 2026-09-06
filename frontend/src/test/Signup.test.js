import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import Signup from "../landing_page/signup/Signup";
import { setSession } from "../utils/auth";

jest.mock("axios");
jest.mock("../utils/auth", () => ({
  setSession: jest.fn(),
}));

describe("Signup Component", () => {
  const originalLocation = window.location;

  beforeEach(() => {
    jest.clearAllMocks();
    delete window.location;
    window.location = { href: "" };
  });

  afterAll(() => {
    window.location = originalLocation;
  });

  test("renders all signup form elements properly", () => {
    render(<Signup />);

    // Header & Tagline
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Create your account")).toBeInTheDocument();

    // Input fields & labels
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your email address")).toBeInTheDocument();

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Choose a username")).toBeInTheDocument();

    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Create a password")).toBeInTheDocument();

    // Submit button
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();

    // Login link
    const loginLink = screen.getByRole("link", { name: /sign in/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  test("updates input values on user input", () => {
    render(<Signup />);

    const emailInput = screen.getByPlaceholderText("Your email address");
    const usernameInput = screen.getByPlaceholderText("Choose a username");
    const passwordInput = screen.getByPlaceholderText("Create a password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(usernameInput.value).toBe("testuser");
    expect(passwordInput.value).toBe("password123");
  });

  test("submits form successfully and triggers session storage and redirect", async () => {
    jest.useFakeTimers();

    const mockResponse = {
      data: {
        success: true,
        sessionId: "sess-12345",
        user: { id: "1", username: "testuser", email: "test@example.com" },
      },
    };
    axios.post.mockResolvedValueOnce(mockResponse);

    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText("Your email address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Choose a username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Create a password"), {
      target: { value: "password123" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
    });

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3002/signup",
      {
        email: "test@example.com",
        username: "testuser",
        password: "password123",
      },
      { withCredentials: true }
    );

    expect(
      screen.getByText("Signup successful! Redirecting...")
    ).toBeInTheDocument();
    expect(setSession).toHaveBeenCalledWith("sess-12345", mockResponse.data.user);

    // Fast-forward timeout for redirect
    act(() => {
      jest.advanceTimersByTime(1200);
    });

    expect(window.location.href).toBe("/");

    jest.useRealTimers();
  });

  test("displays error message when signup API returns success false", async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        success: false,
        message: "Username already taken",
      },
    });

    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText("Your email address"), {
      target: { value: "existing@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Choose a username"), {
      target: { value: "existinguser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Create a password"), {
      target: { value: "password123" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
    });

    expect(screen.getByText("Username already taken")).toBeInTheDocument();
    expect(setSession).not.toHaveBeenCalled();
  });

  test("displays error message when API call fails with server error response", async () => {
    axios.post.mockRejectedValueOnce({
      response: {
        data: {
          message: "Email already registered",
        },
      },
    });

    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText("Your email address"), {
      target: { value: "duplicate@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Choose a username"), {
      target: { value: "newuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Create a password"), {
      target: { value: "password123" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
    });

    expect(screen.getByText("Email already registered")).toBeInTheDocument();
  });

  test("displays default fallback error message when network error occurs without response message", async () => {
    axios.post.mockRejectedValueOnce(new Error("Network Error"));

    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText("Your email address"), {
      target: { value: "error@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Choose a username"), {
      target: { value: "erroruser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Create a password"), {
      target: { value: "password123" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
    });

    expect(
      screen.getByText("Signup failed. Please try again.")
    ).toBeInTheDocument();
  });

  test("shows loading indicator and disables submit button while submitting", async () => {
    let resolvePromise;
    const pendingPromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    axios.post.mockReturnValueOnce(pendingPromise);

    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText("Your email address"), {
      target: { value: "load@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Choose a username"), {
      target: { value: "loaduser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Create a password"), {
      target: { value: "password123" },
    });

    const submitButton = screen.getByRole("button", { name: /sign up/i });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Should immediately show loading text and be disabled
    expect(screen.getByText("Creating account...")).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    // Resolve promise to clean up
    await act(async () => {
      resolvePromise({ data: { success: true, sessionId: "123", user: {} } });
    });
  });
});
