import { useEffect, useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";

import {
  chatWithAI,
  getChatHistory,
  clearChat,
} from "../services/aiService";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  // Welcome Message
  const welcomeMessage = {
    sender: "ai",
    text: "Hello 👋 I'm MedAssist AI.\n\nHow can I help you today?",
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  // Load Chat History
  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await getChatHistory();

        if (data.success && data.chats.length > 0) {
          setMessages(
            data.chats.map((chat) => ({
              sender: chat.sender,
              text: chat.message,
              time: new Date(chat.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }))
          );
        } else {
          setMessages([welcomeMessage]);
        }
      } catch (error) {
        console.error(error);
        setMessages([welcomeMessage]);
      }
    };

    loadChats();
  }, []);

  // Send Message
  const handleSend = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTyping(true);

    try {
      const response = await chatWithAI(message);

      const aiMessage = {
        sender: "ai",
        text: response.reply,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Sorry, I couldn't process your request. Please try again.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  // Clear Chat
  const handleClearChat = async () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all chat history?"
    );

    if (!confirmClear) return;

    try {
      const response = await clearChat();

      if (response.success) {
        setMessages([welcomeMessage]);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to clear chat history.");
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Navbar */}
        <Navbar onClearChat={handleClearChat} />

        {/* Chat Window */}
        <ChatWindow
          messages={messages}
          typing={typing}
        />

        {/* Chat Input */}
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}

export default Chat;