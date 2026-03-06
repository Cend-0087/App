import axios from 'axios';

// Жестко задать URL. Для локалки.

// const api = axios.create({
//   baseURL: 'http://localhost:4000/api',
// });

// Для деплоя
// Почему-то теперь картинки щагружаются по тому адресу даже на локалке!!!

const api = axios.create({
  baseURL: "https://app-z8kj.onrender.com/api"
});

console.log("🔥 Использую продакшн API");


export default api;
