const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/cars');
const userRoutes = require('./routes/users');
const uploads = require('./routes/uploads');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/users', userRoutes);
app.use('/api/uploads', uploads);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('✅ Backend running on port', PORT));
