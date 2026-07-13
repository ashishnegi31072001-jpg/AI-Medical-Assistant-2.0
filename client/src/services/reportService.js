import axios from "axios";

const API = "http://localhost:5000/api/report";

const token = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getReports = async () => {
  const { data } = await axios.get(
    `${API}/history`,
    token()
  );

  return data;
};

export const deleteReport = async (id) => {
  const { data } = await axios.delete(
    `${API}/${id}`,
    token()
  );

  return data;
};