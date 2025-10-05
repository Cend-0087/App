const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Импорт маршрутов
const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/cars');
const userRoutes = require('./routes/users');
const uploads = require('./routes/uploads');

// Middlewares
app.use(cors());
app.use(express.json());

// Раздача загруженных файлов
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API маршруты
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/users', userRoutes);
app.use('/api/uploads', uploads);

// Путь к фронтенду
const frontendPath = path.join(__dirname, '../../frontend/dist');

// Раздаём фронтенд (Vite build)
app.use(express.static(frontendPath));

// Все остальные GET-запросы отдаем index.html для SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Запуск сервера
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
