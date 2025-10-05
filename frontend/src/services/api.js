import axios from "axios";

const api = axios.create({
  baseURL: "https://app-z8kj.onrender.com/api"
});

console.log("🔥 Использую продакшн API");

export default api;
