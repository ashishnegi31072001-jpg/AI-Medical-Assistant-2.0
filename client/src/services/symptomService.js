import api from "./api";

export const analyzeSymptoms = (data) =>
  api.post("/api/symptoms", data);
