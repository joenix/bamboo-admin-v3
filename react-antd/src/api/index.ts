import axios from "axios";

const api = axios.create({
  baseURL: "https://api.lhdd.club",
  timeout: 10000,
  headers: {
    Token: JSON.parse(localStorage.getItem("user") || "{}").token,
  },
});

export default api;
