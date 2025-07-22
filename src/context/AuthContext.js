/**
 * AuthContext.js
 * React context for managing authentication state and helpers.
 */

import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Holds user info and JWT token
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);

  // On mount, try to fetch user info if token exists
  useEffect(() => {
    async function fetchUser() {
      if (token) {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const data = await res.json();
          if (data.user) setUser(data.user);
          else {
            setUser(null);
            setToken("");
            localStorage.removeItem("token");
          }
        } catch {
          setUser(null);
          setToken("");
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    }
    fetchUser();
    // eslint-disable-next-line
  }, []);

  // Login helper
  const login = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
  };

  // Logout helper
  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
