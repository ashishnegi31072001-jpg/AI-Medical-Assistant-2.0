import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/symptoms",
});

// Analyze Symptoms
export const analyzeSymptoms = async (data) => {
  const token = localStorage.getItem("token");

  const response = await API.post("/analyze", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Get History
export const getSymptomHistory = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/history", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Delete Report
export const deleteSymptom = async (id) => {
  const token = localStorage.getItem("token");

  const response = await API.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};