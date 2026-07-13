import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SmartToyIcon from "@mui/icons-material/SmartToy";

function ChatWindow({ messages, typing }) {
  const bottomRef = useRef(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Auto Scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  // Copy AI Message
  const copyMessage = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);

      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">

      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex items-start gap-3 ${
            message.sender === "user"
              ? "justify-end"
              : "justify-start"
          }`}
        >
          {/* AI Avatar */}
          {message.sender === "ai" && (
            <div className="mt-1">
              <SmartToyIcon
                sx={{ fontSize: 38 }}
                className="text-blue-500"
              />
            </div>
          )}

          {/* Message Bubble */}
          <div
            className={`max-w-[75%] rounded-2xl px-5 py-4 shadow-lg ${
              message.sender === "user"
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-white"
            }`}
          >
            {/* Header */}
            <div className="mb-3 flex items-center justify-between">

              <span className="font-semibold text-sm">
                {message.sender === "ai"
                  ? "MedAssist AI"
                  : "You"}
              </span>

              <span className="text-xs opacity-70">
                {message.time}
              </span>

            </div>

            {/* Message */}
            {message.sender === "ai" ? (
              <>
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.text}
                  </ReactMarkdown>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() =>
                      copyMessage(message.text, index)
                    }
                    className="rounded-lg bg-slate-700 px-3 py-1 text-sm transition hover:bg-slate-600"
                  >
                    {copiedIndex === index
                      ? "✅ Copied!"
                      : "📋 Copy"}
                  </button>
                </div>
              </>
            ) : (
              <p className="whitespace-pre-wrap">
                {message.text}
              </p>
            )}
          </div>

          {/* User Avatar */}
          {message.sender === "user" && (
            <div className="mt-1">
              <AccountCircleIcon
                sx={{ fontSize: 38 }}
                className="text-green-400"
              />
            </div>
          )}
        </div>
      ))}

      {/* Typing Indicator */}
      {typing && (
        <div className="flex items-start gap-3">

          <SmartToyIcon
            sx={{ fontSize: 38 }}
            className="text-blue-500"
          />

          <div className="rounded-2xl bg-slate-800 px-5 py-3 text-white animate-pulse">
            🤖 MedAssist AI is typing...
          </div>

        </div>
      )}

      <div ref={bottomRef}></div>

    </div>
  );
}

export default ChatWindow;