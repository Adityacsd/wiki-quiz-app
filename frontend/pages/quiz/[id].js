import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function QuizPage() {
  const router = useRouter();
  const { id } = router.query;

  const [quizData, setQuizData] = useState(null);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!id) return;

    async function loadQuiz() {
      const res = await fetch(`http://127.0.0.1:8000/quiz/${id}`);
      const data = await res.json();

      console.log("LOADED QUIZ:", data);

      // Prevent crash if no quiz generated
      if (!data.quiz || data.quiz.length === 0) {
        setQuizData({ ...data, quiz: [] });
        return;
      }

      setQuizData(data);
    }

    loadQuiz();
  }, [id]);

  if (!quizData) return <p>Loading...</p>;

  // No quiz generated from backend
  if (quizData.quiz.length === 0) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>No Quiz Generated</h1>
        <p>The article did not produce any quiz questions.</p>

        <button
          onClick={() => router.push("/")}
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            background: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  // If quiz finished → show score screen
  if (index >= quizData.quiz.length) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>Quiz Finished!</h1>
        <h3>
          Score: {score} / {quizData.quiz.length}
        </h3>

        <button
          onClick={() => router.push("/")}
          style={{
            marginTop: "30px",
            padding: "12px 20px",
            background: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  const question = quizData.quiz[index];

  // Prevent undefined crash
  if (!question) return <p>Loading question...</p>;

  function next() {
    // Add score if correct
    if (selected === question.answer) {
      setScore((prev) => prev + 1);
    }

    // Next question or finish
    setIndex((prev) => prev + 1);
    setSelected(null);
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>{quizData.title}</h2>
      <h3>Question {index + 1}</h3>
      <p>{question.question}</p>

      {question.options.map((opt, i) => (
        <button
          key={i}
          onClick={() => setSelected(opt)}
          style={{
            display: "block",
            width: "100%",
            textAlign: "left",
            padding: "12px",
            marginTop: "10px",
            borderRadius: "8px",
            border: selected === opt ? "2px solid #0070f3" : "1px solid #ccc",
          }}
        >
          {opt}
        </button>
      ))}

      <button
        onClick={next}
        disabled={!selected}
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          background: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Next
      </button>
    </div>
  );
}
