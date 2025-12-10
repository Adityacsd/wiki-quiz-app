import { useEffect, useState } from "react";
import Link from "next/link";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await fetch("http://127.0.0.1:8000/history");
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error("Failed to load history:", err);
      }
    }
    loadHistory();
  }, []);

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{ marginBottom: "20px" }}>Past Quizzes</h1>

      {history.length === 0 && (
        <p>No quizzes found. Generate one from the home page.</p>
      )}

      {history.length > 0 && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            border: "1px solid #ccc",
          }}
        >
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>URL</th>
              <th style={thStyle}>Created At</th>
              <th style={thStyle}>Details</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td style={tdStyle}>{item.title}</td>

                <td style={tdStyle}>
                  <a href={item.url} target="_blank" style={{ color: "#0070f3" }}>
                    Open Page
                  </a>
                </td>

                <td style={tdStyle}>
                  {new Date(item.created_at).toLocaleString()}
                </td>

                <td style={tdStyle}>
                  <Link href={`/quiz/${item.id}`}>
                    <button style={btnStyle}>View Quiz</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = {
  padding: "10px",
  borderBottom: "1px solid #ccc",
  textAlign: "left",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};

const btnStyle = {
  padding: "6px 12px",
  background: "#0070f3",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};
