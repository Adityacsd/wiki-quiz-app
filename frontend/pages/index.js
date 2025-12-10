import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateQuiz() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/generate_quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      window.location.href = `/quiz/${data.id}`;
    } catch (err) {
      setError("Server not responding.");
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ marginBottom: "10px" }}>Wiki Quiz Generator</h1>
      <p style={{ marginBottom: "30px", color: "#555", lineHeight: "1.6" }}>
        Paste any valid Wikipedia URL below and automatically generate a
        structured quiz with MCQs, difficulty levels, and explanations.
      </p>

      <label style={{ fontWeight: "bold" }}>Wikipedia URL</label>
      <input
        type="text"
        placeholder="https://en.wikipedia.org/wiki/..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "8px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />

      <button
        onClick={generateQuiz}
        disabled={loading || !url.trim()}
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "14px",
          background: loading ? "#999" : "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        {loading ? "Generating Quiz..." : "Generate Quiz"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "20px", fontSize: "14px" }}>
          {error}
        </p>
      )}
    </div>
  );
}
