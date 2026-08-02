import { useState } from "react";
import axios from "axios";

function ReportChat({ reportId }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/report-chat/ask",
        {
          reportId,
          question,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnswer(response.data.answer);

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to get AI response."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 rounded-2xl bg-slate-900 p-6">

      <h2 className="mb-5 text-2xl font-bold text-cyan-400">
        💬 Ask AI About This Report
      </h2>

      <textarea
        rows={4}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Example: Why is my cholesterol high?"
        className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
      />

      <button
        onClick={askAI}
        disabled={loading}
        className="mt-4 rounded-xl bg-cyan-600 px-6 py-3 font-semibold hover:bg-cyan-700 disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {answer && (
        <div className="mt-6 rounded-xl bg-slate-800 p-5">
          <h3 className="mb-3 text-xl font-bold text-green-400">
            🤖 AI Answer
          </h3>

          <p className="whitespace-pre-wrap leading-8">
            {answer}
          </p>
        </div>
      )}

    </div>
  );
}

export default ReportChat;