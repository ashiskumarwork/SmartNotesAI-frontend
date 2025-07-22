/**
 * Navbar.js
 * Top navigation bar with links to Home and Saved Notes. Shows Logout if logged in.
 */

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../context/AuthContext";

/**
 * Navbar
 * Renders the top navigation bar. Shows Logout if user is logged in.
 */
function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle logout and redirect
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          AI Notes Beautifier
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          {user && (
            <>
              <Link to="/dashboard" className="navbar-link">
                Dashboard
              </Link>
              <Link to="/saved" className="navbar-link">
                Saved Notes
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  background: "#fff",
                  color: "#2d3e50",
                  border: "1px solid #2d3e50",
                  borderRadius: 5,
                  padding: "0.4rem 1rem",
                  marginLeft: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontSize: 15,
                  transition: "background 0.18s, color 0.18s",
                }}
                onMouseOver={(e) => {
                  e.target.style.background = "#ffd700";
                  e.target.style.color = "#2d3e50";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "#fff";
                  e.target.style.color = "#2d3e50";
                }}
              >
                Logout
              </button>
            </>
          )}
          {!user && (
            <>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/signup" className="navbar-link">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
