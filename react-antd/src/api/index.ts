import axios from "axios";

const api = axios.create({
  baseURL: "https://api.lhdd.club",
  timeout: 10000,
});

export default api;
