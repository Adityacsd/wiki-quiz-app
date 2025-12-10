import Link from "next/link";

export default function NavBar() {
  return (
    <div style={{
      display: "flex",
      gap: "20px",
      padding: "15px 30px",
      borderBottom: "1px solid #ddd",
      marginBottom: "20px"
    }}>
      <Link href="/" style={{ fontWeight: "bold", fontSize: 18 }}>
        Generate Quiz
      </Link>

      <Link href="/history" style={{ fontWeight: "bold", fontSize: 18 }}>
        Past Quizzes
      </Link>
    </div>
  );
}
