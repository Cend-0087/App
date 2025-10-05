const express = require('express');
const router = express.Router();
const { db } = require('../db');

router.get('/:id/favorites', async (req, res) => {
  await db.read();
  const favs = db.data.favorites.filter(f=>f.userId === req.params.id).map(f=>f.carId);
  const cars = db.data.cars.filter(c=>favs.includes(c.id));
  res.json(cars);
});

router.post('/:id/favorites', async (req, res) => {
  await db.read();
  const { carId } = req.body;
  db.data.favorites.push({ id: 'fav_'+Date.now(), userId: req.params.id, carId });
  await db.write();
  res.status(201).json({ message: 'Добавлено' });
});

module.exports = router;
