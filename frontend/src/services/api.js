import axios from 'axios';

// Для локальной разработки используем localhost, для продакшена — относительный путь
const API_BASE = process.env.REACT_APP_API_URL || '';

const api = axios.create({
  baseURL: API_BASE
});

export default api;
