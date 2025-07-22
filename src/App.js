/**
 * App.js
 * Main application component. Sets up the navbar and page routing.
 */

import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import SavedNotesPage from "./pages/SavedNotes";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import "./App.css";

/**
 * ProtectedRoute
 * Only renders children if user is logged in, else redirects to login.
 */
function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  if (loading)
    return <div style={{ textAlign: "center", marginTop: 60 }}>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
}

/**
 * App
 * Renders the Navbar and routes for Home and Saved Notes pages.
 * Shows login/signup if not authenticated.
 */
function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved"
            element={
              <ProtectedRoute>
                <SavedNotesPage />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
