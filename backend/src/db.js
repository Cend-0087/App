const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');

const file = path.join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter, { users: [], cars: [] }); // ← сразу указываем дефолтную структуру

async function initDB() {
  await db.read();
  db.data ||= { users: [], cars: [] }; // если файл пуст — инициализируем
  await db.write();
}

initDB();

module.exports = { db };
