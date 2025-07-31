import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, LoginCredentials, LoginResult, User } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in from localStorage
    // For development, we'll start fresh each time
    // const storedAuth = localStorage.getItem("lendsqr_auth");
    // if (storedAuth) {
    //   const authData = JSON.parse(storedAuth);
    //   setIsAuthenticated(true);
    //   setUser(authData.user);
    // }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<LoginResult> => {
    try {
      // Mock login - in real app this would be an API call
      // For assessment purposes: accept any valid email + password with 8+ characters
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(credentials.email);
      const isValidPassword = credentials.password.length >= 8;
      
      // Return specific error messages
      if (!isValidEmail) {
        return { success: false, error: "Please enter a valid email address" };
      }
      
      if (!isValidPassword) {
        return { success: false, error: "Password must be at least 8 characters long" };
      }
      
      if (isValidEmail && isValidPassword) {
        const mockUser: User = {
          id: "1",
          organization: "Lendsqr",
          username: credentials.email.split("@")[0], // Use email prefix as username
          email: credentials.email,
          phoneNumber: "08012345678",
          dateJoined: "2020-01-01",
          status: "Active",
          fullName: credentials.email.split("@")[0], // Use email prefix as full name
          bvn: "12345678901",
          gender: "Male",
          maritalStatus: "Single",
          children: "None",
          typeOfResidence: "Own Apartment",
          levelOfEducation: "M.Sc",
          employmentStatus: "Employed",
          sectorOfEmployment: "FinTech",
          durationOfEmployment: "5 years",
          officeEmail: credentials.email,
          monthlyIncome: "₦500,000.00 - ₦1,000,000.00",
          loanRepayment: "100,000",
          twitter: `@${credentials.email.split("@")[0]}`,
          facebook: credentials.email.split("@")[0],
          instagram: `@${credentials.email.split("@")[0]}`,
          guarantors: [],
          tier: 3,
          accountBalance: "₦500,000.00",
          accountNumber: "1234567890",
          bank: "Providus Bank",
        };

        const authData = { user: mockUser, token: "mock_token" };
        localStorage.setItem("lendsqr_auth", JSON.stringify(authData));
        setIsAuthenticated(true);
        setUser(mockUser);
        return { success: true };
      }
      
      return { success: false, error: "Invalid credentials" };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "An error occurred. Please try again." };
    }
  };

  const logout = () => {
    localStorage.removeItem("lendsqr_auth");
    setIsAuthenticated(false);
    setUser(null);
  };

  const value: AuthContextType = {
    isAuthenticated,
    login,
    logout,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
