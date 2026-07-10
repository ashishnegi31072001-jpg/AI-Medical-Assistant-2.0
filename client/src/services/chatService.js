import api from "./api";

export const sendMessage = (data) =>
  api.post("/api/chat", data);