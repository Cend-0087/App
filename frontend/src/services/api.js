import axios from "axios";

// Определяем базовый URL в зависимости от среды
const API_BASE =
  import.meta.env.VITE_API_URL || "https://app-z8kj.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE,
});

export default api;
