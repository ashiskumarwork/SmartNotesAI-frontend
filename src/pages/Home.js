/**
 * Home.js
 * Home page for beautifying, summarizing, and saving notes.
 * Handles all user input and API interactions for note processing.
 */

import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ReactMarkdown from "react-markdown";

/**
 * HomePage
 * Main page for pasting raw notes, beautifying, summarizing, and saving them.
 */
function HomePage() {
  // State for user input and results
  const [rawNotes, setRawNotes] = useState("");
  const [beautifiedNotes, setBeautifiedNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [takeaways, setTakeaways] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { token } = useContext(AuthContext);

  /**
   * Calls backend to beautify and then summarize notes using AI.
   */
  const handleBeautifyAndSummarize = async () => {
    setLoading(true);
    setMessage("");
    setSummary("");
    setTakeaways([]);
    setBeautifiedNotes("");
    try {
      // Step 1: Beautify
      const beautifyRes = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/beautify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: rawNotes }),
        }
      );
      const beautifyData = await beautifyRes.json();
      if (!beautifyData.result) {
        setMessage(
          beautifyData.message || beautifyData.error || "Beautification failed."
        );
        setLoading(false);
        return;
      }
      setBeautifiedNotes(beautifyData.result);

      // Step 2: Summarize
      const summarizeRes = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/summarize`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: beautifyData.result }),
        }
      );
      const summarizeData = await summarizeRes.json();
      if (summarizeData.success) {
        setSummary(summarizeData.data.summaryText);
        setTakeaways(summarizeData.data.takeaways);
      } else {
        setMessage(
          summarizeData.message ||
            summarizeData.error ||
            "Summarization failed."
        );
      }
    } catch (err) {
      setMessage("Error connecting to backend.");
    }
    setLoading(false);
  };

  /**
   * Calls backend to save the full note (raw, beautified, summary, takeaways).
   */
  const handleSave = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rawText: rawNotes,
          beautifiedText: beautifiedNotes,
          summaryText: summary,
          takeaways,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Notes saved successfully!");
      } else {
        setMessage(data.message || "Save failed.");
      }
    } catch (err) {
      setMessage("Error connecting to backend.");
    }
    setLoading(false);
  };

  return (
    <div className="home-container">
      <h2>AI Notes Beautifier & Summarizer</h2>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          padding: "0 1.5rem",
        }}
      >
        <textarea
          className="notes-textarea"
          placeholder="Paste your rough class notes here..."
          value={rawNotes}
          onChange={(e) => setRawNotes(e.target.value)}
          rows={12}
          style={{
            width: "80%",
            minWidth: 500,
            maxWidth: 700,
            margin: "0 auto",
            minHeight: 180,
            boxSizing: "border-box",
            borderRadius: 12,
            background: "#f1f5fe",
            border: "1.7px solid #93c5fd",
            fontSize: "1.09rem",
            padding: "1rem",
            lineHeight: 1.6,
            transition: "border 0.2s, background 0.2s",
            display: "block",
          }}
        />
        <div
          className="button-group"
          style={{
            width: "80%",
            minWidth: 500,
            margin: "28px auto 0 auto",
          }}
        >
          <button
            onClick={handleBeautifyAndSummarize}
            disabled={loading || !rawNotes}
            style={{ width: "100%" }}
          >
            {loading ? "Processing..." : "Beautify & Summarize"}
          </button>
        </div>
      </form>
      {beautifiedNotes && (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              maxWidth: 520, // match .home-container
              margin: "2.2rem 0 1.2rem 0", // center in parent
              background: "#f4f4ff",
              borderRadius: 14,
              boxShadow: "0 2px 10px rgba(44,62,80,0.08)",
              padding: "1.5rem 1.2rem 1.2rem 1.2rem",
              lineHeight: 1.6,
              fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
              textAlign: "left",
              width: "100%",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 22,
                color: "#2d3e50",
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              ✨ Beautified Notes
            </div>
            <ReactMarkdown>
              {beautifiedNotes.replace(/\*\*/g, "")}
            </ReactMarkdown>
          </div>
        </div>
      )}
      {summary && (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              maxWidth: 520, // match .home-container
              margin: "2.2rem 0 1.2rem 0", // center in parent
              background: "#f4f4ff",
              borderRadius: 14,
              boxShadow: "0 2px 10px rgba(44,62,80,0.08)",
              padding: "1.5rem 1.2rem 1.2rem 1.2rem",
              lineHeight: 1.6,
              fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
              textAlign: "left",
              width: "100%",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 22,
                color: "#2d3e50",
                marginBottom: 18,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              📌 Beautified and Summarized Notes
            </div>
            <div style={{ marginBottom: 18 }}>
              <span
                style={{
                  fontWeight: 600,
                  color: "#2563eb",
                  fontSize: 17,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                Summary:
              </span>
              <div style={{ marginTop: 6 }}>
                <ReactMarkdown>{summary.replace(/\*\*/g, "")}</ReactMarkdown>
              </div>
            </div>
            <div>
              <span
                style={{
                  fontWeight: 600,
                  color: "#2563eb",
                  fontSize: 17,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                Key Takeaways:
              </span>
              <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 22 }}>
                {takeaways.length === 0 ? (
                  <li style={{ marginBottom: 6 }}>No key takeaways found.</li>
                ) : (
                  takeaways.map((takeaway, idx) => (
                    <li
                      key={idx}
                      style={{
                        marginBottom: 8,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <span role="img" aria-label="pin">
                        📌
                      </span>
                      <span>
                        <ReactMarkdown>
                          {takeaway.replace(/\*\*/g, "")}
                        </ReactMarkdown>
                      </span>
                    </li>
                  ))
                )}
              </ul>
            </div>
            {/* Save Notes Button */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 24,
              }}
            >
              <button
                onClick={handleSave}
                disabled={loading || !beautifiedNotes || !summary}
                style={{
                  minWidth: 170,
                  padding: "0.9rem 2.2rem",
                  background:
                    "linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 17,
                  cursor:
                    loading || !beautifiedNotes || !summary
                      ? "not-allowed"
                      : "pointer",
                  boxShadow: "0 2px 8px rgba(44,62,80,0.07)",
                  transition: "background 0.18s, color 0.18s",
                  letterSpacing: 0.01,
                }}
              >
                {loading ? "Saving..." : "Save Notes"}
              </button>
            </div>
          </div>
        </div>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default HomePage;
