import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../hooks/useAuth";
import Login from "../../pages/Login";

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe("Login Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("renders login form", () => {
    renderLogin();

    expect(screen.getByText("Welcome!")).toBeInTheDocument();
    expect(screen.getByText("Enter details to login.")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("LOG IN")).toBeInTheDocument();
  });

  test("shows password when SHOW button is clicked", () => {
    renderLogin();

    const passwordInput = screen.getByPlaceholderText("Password");
    const showButton = screen.getByText("SHOW");

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(showButton);

    expect(passwordInput).toHaveAttribute("type", "text");
    expect(screen.getByText("HIDE")).toBeInTheDocument();
  });

  test("displays error message for invalid email format", async () => {
    renderLogin();

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByText("LOG IN");

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid email address")
      ).toBeInTheDocument();
    });
  });

  test("displays error message for short password", async () => {
    renderLogin();

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByText("LOG IN");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(
        screen.getByText("Password must be at least 8 characters long")
      ).toBeInTheDocument();
    });
  });

  test("successfully logs in with valid credentials", async () => {
    renderLogin();

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByText("LOG IN");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  test("form validation requires email and password", async () => {
    renderLogin();

    const loginButton = screen.getByText("LOG IN");

    fireEvent.click(loginButton);

    // Check that form validation prevents submission
    expect(
      screen.queryByText("Invalid email or password")
    ).not.toBeInTheDocument();
  });

  test("forgot password link is present", () => {
    renderLogin();

    expect(screen.getByText("FORGOT PASSWORD?")).toBeInTheDocument();
  });

  test("logo is displayed", () => {
    renderLogin();

    // Check for the SVG logo element
    const logoElement = document.querySelector('svg[viewBox="0 0 145 30"]');
    expect(logoElement).toBeInTheDocument();
  });
});
