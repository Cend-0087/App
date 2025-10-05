import axios from 'axios';

// Автоматически использовать Render API, если сайт запущен в продакшене
const API_BASE =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname.includes("onrender.com")
    ? "https://app-z8kj.onrender.com/api"
    : "http://localhost:4000/api");

const api = axios.create({
  baseURL: API_BASE,
});

export default api;
