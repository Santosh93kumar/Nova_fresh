import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const verifyUser = async () => {
      try {
        const res = await axios.get(
         ` ${import.meta.env.VITE_API_URL}/api/auth/verify`,
          {
            withCredentials: true,
          }
        );
        console.log("verify response: ", res.data.user);
        if (res.data.user) {
          setUser(res.data.user);
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);


  const login = async (email, password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message || "Login failed"
        };
      }

      const data = await response.json();
      
      // Important: Update the user state after successful login
      setUser(data.user);
      
      return { 
        success: true,
        user: data.user,
        token: data.token
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: "An unexpected error occurred"
      };
    }
  };
  

  // Logout function
  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {}, {
        withCredentials: true
      });
      
      // Important: Update the user state to null after logout
      setUser(null);
      
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Logout failed'
      };
    }
  };

  const value = {
    user,
    loading,
    login,
    // signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};