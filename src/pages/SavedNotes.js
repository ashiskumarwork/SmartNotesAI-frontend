/**
 * SavedNotes.js
 * Page to display all saved notes from the backend.
 */

import React, { useEffect, useState } from "react";

/**
 * SavedNotesPage
 * Fetches and displays all saved notes from the backend.
 */
function SavedNotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch notes from backend on mount
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/notes`
        );
        const data = await res.json();
        if (data.success) {
          setNotes(data.data);
        } else {
          setError(data.message || "Failed to fetch notes.");
        }
      } catch (err) {
        setError("Error connecting to backend.");
      }
      setLoading(false);
    };
    fetchNotes();
  }, []);

  return (
    <div
      className="saved-notes-container"
      style={{
        margin: "2.5rem auto",
        maxWidth: 540,
        width: "100%",
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 8px 32px rgba(44, 62, 80, 0.13)",
        padding: "2.5rem 2rem 2.7rem 2rem",
        border: "1.5px solid #dbeafe",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: "#2563eb", marginBottom: 28 }}>Saved Notes</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && notes.length === 0 && <p>No notes saved yet.</p>}
      <div
        className="notes-list"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
        }}
      >
        {notes.map((note, idx) => (
          <div
            className="note-card"
            key={note._id}
            style={{
              maxWidth: 500, // slightly less than container
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
              background: "linear-gradient(120deg, #f1f5fe 0%, #e0e7ff 100%)",
              borderRadius: 14,
              boxShadow: "0 2px 10px rgba(44,62,80,0.10)",
              border: "1.5px solid #dbeafe",
              padding: "1.6rem 1.3rem 1.3rem 1.3rem",
              marginBottom: idx !== notes.length - 1 ? 18 : 0,
              position: "relative",
            }}
          >
            <div
              className="note-meta"
              style={{
                fontSize: 14,
                color: "#6c7a89",
                marginBottom: 10,
                textAlign: "right",
              }}
            >
              <span className="note-date">
                {new Date(note.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="note-section">
              <span style={{ fontWeight: 600, color: "#2563eb", fontSize: 17 }}>
                Raw Notes:
              </span>
              <div className="note-raw" style={{ marginTop: 6 }}>
                {note.rawText}
              </div>
            </div>
            <div className="note-section">
              <span style={{ fontWeight: 600, color: "#2563eb", fontSize: 17 }}>
                Beautified Notes:
              </span>
              <div className="note-beautified" style={{ marginTop: 6 }}>
                {note.beautifiedText}
              </div>
            </div>
            <div className="note-section">
              <span style={{ fontWeight: 600, color: "#2563eb", fontSize: 17 }}>
                Summary:
              </span>
              <div className="note-summary" style={{ marginTop: 6 }}>
                {note.summaryText}
              </div>
            </div>
            <div className="note-section" style={{ marginBottom: 0 }}>
              <span
                style={{
                  fontWeight: 600,
                  color: "#2563eb",
                  fontSize: 17,
                  display: "block",
                  marginTop: 18,
                  marginBottom: 6,
                }}
              >
                Key Takeaways:
              </span>
              <ul
                className="note-takeaways"
                style={{ marginTop: 0, marginBottom: 0, paddingLeft: 22 }}
              >
                {note.takeaways && note.takeaways.length > 0 ? (
                  note.takeaways.map((takeaway, idx2) => (
                    <li key={idx2} style={{ marginBottom: 7 }}>
                      {takeaway}
                    </li>
                  ))
                ) : (
                  <li style={{ color: "#888" }}>No key takeaways found.</li>
                )}
              </ul>
            </div>
            {idx !== notes.length - 1 && (
              <hr
                style={{
                  border: 0,
                  borderTop: "1.5px solid #dbeafe",
                  margin: "1.5rem 0 0.5rem 0",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedNotesPage;
