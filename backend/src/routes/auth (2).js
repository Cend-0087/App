const express = require('express');
const router = express.Router();
const { db } = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

router.post('/register', async (req, res) => {
  await db.read();
  const { name, email, password } = req.body;
  if(!email || !password) return res.status(400).json({ message: 'Email и пароль обязательны' });
  const exists = db.data.users.find(u=>u.email === email);
  if(exists) return res.status(400).json({ message: 'Email занят' });
  const hash = bcrypt.hashSync(password, 8);
  const user = { id: nanoid(), name: name||'User', email, password_hash: hash, role: 'user' };
  db.data.users.push(user);
  await db.write();
  res.status(201).json({ id: user.id, email: user.email });
});

router.post('/login', async (req, res) => {
  await db.read();
  const { email, password } = req.body;
  const user = db.data.users.find(u=>u.email === email);
  if(!user) return res.status(401).json({ message: 'Неверные данные' });
  const ok = bcrypt.compareSync(password, user.password_hash);
  if(!ok) return res.status(401).json({ message: 'Неверные данные' });
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

router.get('/me', async (req, res) => {
  const header = req.headers.authorization;
  if(!header) return res.status(401).json({ message: 'Нет токена' });
  const token = header.split(' ')[1];
  try{
    const data = jwt.verify(token, JWT_SECRET);
    await db.read();
    const user = db.data.users.find(u=>u.id === data.id);
    if(!user) return res.status(404).json({ message: 'Пользователь не найден' });
    res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
  }catch(e){ res.status(401).json({ message: 'Неверный токен' }); }
});

module.exports = router;
