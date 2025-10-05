const express = require('express');
const router = express.Router();
const { db } = require('../db');
router.get('/', async (req, res) => {
  await db.read();
  // simple filters: minPrice, maxPrice, year, body
  let list = db.data.cars;
  const { minPrice, maxPrice, year, body } = req.query;
  if(minPrice) list = list.filter(c=>c.price >= Number(minPrice));
  if(maxPrice) list = list.filter(c=>c.price <= Number(maxPrice));
  if(year) list = list.filter(c=>c.year === Number(year));
  if(body) list = list.filter(c=>c.body.toLowerCase() === body.toLowerCase());
  res.json(list);
});

router.get('/:id', async (req, res) => {
  await db.read();
  const car = db.data.cars.find(c=>c.id === req.params.id);
  if(!car) return res.status(404).json({ message: 'Не найдено' });
  res.json(car);
});

// minimal admin create/update/delete (no auth for simplicity in starter)
router.post('/', async (req, res) => {
  await db.read();
  const car = { id: 'car_'+Date.now(), ...req.body };
  db.data.cars.push(car);
  await db.write();
  res.status(201).json(car);
});

module.exports = router;
