import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/**
 * Landing.js
 * Beautiful, modern landing page for the AI Notes Beautifier & Summarizer web app.
 */
function Landing() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #e3eafc 0%, #f1f5fe 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 1rem",
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          background: "#fff",
          borderRadius: 22,
          boxShadow: "0 8px 32px rgba(44,62,80,0.13)",
          padding: "2.7rem 2.2rem 2.2rem 2.2rem",
          maxWidth: 520,
          width: "100%",
          margin: "2.5rem 0 1.5rem 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          animation: "fadeIn 0.7s",
        }}
      >
        {/* Simple Illustration */}
        <div style={{ marginBottom: 18 }}>
          <span
            style={{ fontSize: 54, color: "#2563eb" }}
            role="img"
            aria-label="notes"
          >
            📝
          </span>
        </div>
        <h1
          style={{
            color: "#2563eb",
            fontWeight: 800,
            fontSize: 32,
            marginBottom: 12,
            letterSpacing: 0.5,
          }}
        >
          AI Notes Beautifier & Summarizer
        </h1>
        <p
          style={{
            color: "#2d3e50",
            fontSize: 18,
            marginBottom: 28,
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          Instantly turn your rough class notes into beautiful, organized, and
          summarized study material with the power of AI. Save, access, and
          review your notes anytime, anywhere.
        </p>
        <div style={{ display: "flex", gap: 18, marginBottom: 10 }}>
          {user ? (
            <button
              onClick={() => navigate("/app")}
              style={{
                padding: "0.9rem 2.2rem",
                background: "linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 18,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(44,62,80,0.07)",
                transition: "background 0.18s, color 0.18s",
              }}
            >
              Go to App
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/signup")}
                style={{
                  padding: "0.9rem 2.2rem",
                  background:
                    "linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: 18,
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(44,62,80,0.07)",
                  transition: "background 0.18s, color 0.18s",
                }}
              >
                Get Started
              </button>
              <button
                onClick={() => navigate("/login")}
                style={{
                  padding: "0.9rem 2.2rem",
                  background: "#fff",
                  color: "#2563eb",
                  border: "2px solid #2563eb",
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: 18,
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(44,62,80,0.07)",
                  transition: "background 0.18s, color 0.18s",
                }}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
      {/* Features Section */}
      <div
        style={{
          maxWidth: 540,
          width: "100%",
          background: "#f4f4ff",
          borderRadius: 18,
          boxShadow: "0 4px 18px rgba(44,62,80,0.09)",
          padding: "2.2rem 1.7rem 2.2rem 1.7rem",
          marginBottom: "2.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            color: "#2563eb",
            fontWeight: 700,
            fontSize: 24,
            marginBottom: 18,
          }}
        >
          Why You'll Love It
        </h2>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            width: "100%",
            fontSize: 17,
            color: "#2d3e50",
          }}
        >
          <li
            style={{
              marginBottom: 18,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span role="img" aria-label="sparkles" style={{ fontSize: 22 }}>
              ✨
            </span>
            Beautify messy notes into clear, organized study material
          </li>
          <li
            style={{
              marginBottom: 18,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span role="img" aria-label="bulb" style={{ fontSize: 22 }}>
              💡
            </span>
            Summarize and extract key takeaways instantly
          </li>
          <li
            style={{
              marginBottom: 18,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span role="img" aria-label="save" style={{ fontSize: 22 }}>
              💾
            </span>
            Save and access your notes anytime, anywhere
          </li>
          <li
            style={{
              marginBottom: 0,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span role="img" aria-label="lock" style={{ fontSize: 22 }}>
              🔒
            </span>
            Secure, private, and student-friendly
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Landing;
