import { useState } from "react";

function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message);

    setMessage("");
  };

  return (
    <div className="border-t border-slate-800 p-4 flex gap-3">

      <input
        type="text"
        value={message}
        placeholder="Ask MedAssist AI..."
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        className="flex-1 rounded-xl bg-slate-800 p-4 text-white outline-none"
      />

      <button
        onClick={handleSend}
        className="bg-blue-600 px-8 rounded-xl hover:bg-blue-700"
      >
        Send
      </button>

    </div>
  );
}

export default ChatInput;