import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/chat",
});

// Send message to AI
export const chatWithAI = async (message) => {
  const token = localStorage.getItem("token");

  const response = await API.post(
    "/",
    { message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Get chat history
export const getChatHistory = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/history", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Clear chat history
export const clearChat = async () => {
  const token = localStorage.getItem("token");

  const response = await API.delete("/clear", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};