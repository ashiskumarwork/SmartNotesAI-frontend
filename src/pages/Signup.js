/**
 * Signup.js
 * Signup page for new users. Handles registration and shows messages.
 */

import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Signup() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!form.name || !form.email || !form.password) {
      setMessage("All fields are required.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (data.token) {
        login(data.token, data.user);
        setMessage("");
        navigate("/");
      } else {
        setMessage(data.error || "Signup failed.");
      }
    } catch {
      setMessage("Signup failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#e3eafc",
      }}
    >
      <div
        className="home-container"
        style={{
          maxWidth: 400,
          width: "100%",
          margin: "0 auto",
          boxShadow: "0 6px 24px rgba(44,62,80,0.13)",
          borderRadius: 16,
        }}
      >
        <h2 style={{ color: "#2563eb", marginBottom: 24 }}>Sign Up</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ marginBottom: 14, width: "100%" }}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="notes-textarea"
              style={{
                minHeight: 38,
                resize: "none",
                width: "90%",
                margin: "0 auto",
                display: "block",
              }}
              autoComplete="name"
            />
          </div>
          <div style={{ marginBottom: 14, width: "100%" }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="notes-textarea"
              style={{
                minHeight: 38,
                resize: "none",
                width: "90%",
                margin: "0 auto",
                display: "block",
              }}
              autoComplete="email"
            />
          </div>
          <div style={{ marginBottom: 22, width: "100%" }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="notes-textarea"
              style={{
                minHeight: 38,
                resize: "none",
                width: "90%",
                margin: "0 auto",
                display: "block",
              }}
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ width: "90%", margin: "0 auto" }}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        {message && (
          <p className="error-message" style={{ marginTop: 16 }}>
            {message}
          </p>
        )}
        <div style={{ marginTop: 22, fontSize: 15, textAlign: "center" }}>
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
